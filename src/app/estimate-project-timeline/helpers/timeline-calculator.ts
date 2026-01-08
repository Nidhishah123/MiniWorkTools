export interface TimelineInput {
  totalHours: number;
  hoursPerDay: number;
  workingDaysPerWeek: number;
  startDate: Date;
  bufferPercent: number;
  // Budget fields (optional)
  includeBudget?: boolean;
  isHourly?: boolean;
  rate?: number;
  currency?: string;
}

export interface BudgetResult {
  totalCost: number;
  optimisticCost: number;
  safeCost: number;
  monthlyOptimistic: number;
  monthlySafe: number;
  weeklyOptimistic: number;
  weeklySafe: number;
  currency: string;
  isHourly: boolean;
}

export interface TimelineResult {
  adjustedHours: number;
  totalWorkingDays: number;
  durationWeeks: number;
  durationDays: number;
  durationText: string;
  estimatedCompletionDate: Date;
  optimisticDate: Date;
  safeDate: Date;
  budget?: BudgetResult;
}

function addWorkingDays(startDate: Date, days: number, workingDaysPerWeek: number): Date {
  const result = new Date(startDate);
  let addedDays = 0;

  // For 7 days/week, count all days
  if (workingDaysPerWeek === 7) {
    result.setDate(result.getDate() + days);
    return result;
  }

  while (addedDays < days) {
    result.setDate(result.getDate() + 1);
    const dayOfWeek = result.getDay(); // 0 = Sunday, 6 = Saturday

    if (workingDaysPerWeek === 6) {
      // Skip Sunday only
      if (dayOfWeek !== 0) {
        addedDays++;
      }
    } else {
      // workingDaysPerWeek <= 5: Skip weekends (Saturday and Sunday)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        addedDays++;
      }
    }
  }

  return result;
}

function formatDuration(weeks: number, days: number): string {
  const parts: string[] = [];

  if (weeks > 0) {
    parts.push(`${weeks} ${weeks === 1 ? 'week' : 'weeks'}`);
  }

  if (days > 0) {
    parts.push(`${days} ${days === 1 ? 'day' : 'days'}`);
  }

  return parts.length > 0 ? parts.join(' ') : '0 days';
}

export function calculateTimeline(input: TimelineInput): TimelineResult {
  const { totalHours, hoursPerDay, workingDaysPerWeek, startDate, bufferPercent } = input;

  // Calculate adjusted hours with buffer
  const adjustedHours = Math.ceil(totalHours * (1 + bufferPercent / 100));

  // Calculate working days (round up to nearest 0.5)
  const rawDays = adjustedHours / hoursPerDay;
  const totalWorkingDays = Math.ceil(rawDays * 2) / 2;

  // Calculate optimistic days based on original hours (no buffer)
  const optimisticRawDays = totalHours / hoursPerDay;
  const optimisticDays = Math.ceil(optimisticRawDays * 2) / 2;

  // Calculate weeks and remaining days
  const fullWeeks = Math.floor(totalWorkingDays / workingDaysPerWeek);
  const remainingDays = Math.ceil(totalWorkingDays % workingDaysPerWeek);

  // Calculate dates
  const wholeDays = Math.ceil(totalWorkingDays);
  const optimisticWholeDays = Math.ceil(optimisticDays);

  const estimatedCompletionDate = addWorkingDays(startDate, wholeDays, workingDaysPerWeek);
  const optimisticDate = addWorkingDays(startDate, optimisticWholeDays, workingDaysPerWeek);
  const safeDate = addWorkingDays(startDate, wholeDays, workingDaysPerWeek);

  // Calculate budget if included
  let budget: BudgetResult | undefined;
  if (input.includeBudget && input.rate && input.rate > 0) {
    const rate = input.rate;
    const currency = input.currency || 'USD';

    // For hourly: cost = hours * rate
    // For fixed: rate is the total cost, but we still calculate ranges based on hours ratio
    if (input.isHourly) {
      const optimisticCost = totalHours * rate;
      const safeCost = adjustedHours * rate;
      const totalCost = safeCost;

      // Calculate duration in weeks for weekly/monthly costs
      const optimisticWeeks = Math.max(1, optimisticDays / workingDaysPerWeek);
      const safeWeeks = Math.max(1, totalWorkingDays / workingDaysPerWeek);
      const optimisticMonths = Math.max(1, optimisticWeeks / 4.33);
      const safeMonths = Math.max(1, safeWeeks / 4.33);

      budget = {
        totalCost,
        optimisticCost,
        safeCost,
        monthlyOptimistic: optimisticCost / optimisticMonths,
        monthlySafe: safeCost / safeMonths,
        weeklyOptimistic: optimisticCost / optimisticWeeks,
        weeklySafe: safeCost / safeWeeks,
        currency,
        isHourly: true,
      };
    } else {
      // Fixed price - the rate is the total project cost
      const totalCost = rate;
      const optimisticCost = rate;
      const safeCost = rate;

      const optimisticWeeks = Math.max(1, optimisticDays / workingDaysPerWeek);
      const safeWeeks = Math.max(1, totalWorkingDays / workingDaysPerWeek);
      const optimisticMonths = Math.max(1, optimisticWeeks / 4.33);
      const safeMonths = Math.max(1, safeWeeks / 4.33);

      budget = {
        totalCost,
        optimisticCost,
        safeCost,
        monthlyOptimistic: totalCost / optimisticMonths,
        monthlySafe: totalCost / safeMonths,
        weeklyOptimistic: totalCost / optimisticWeeks,
        weeklySafe: totalCost / safeWeeks,
        currency,
        isHourly: false,
      };
    }
  }

  return {
    adjustedHours,
    totalWorkingDays,
    durationWeeks: fullWeeks,
    durationDays: remainingDays,
    durationText: formatDuration(fullWeeks, remainingDays),
    estimatedCompletionDate,
    optimisticDate,
    safeDate,
    budget,
  };
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}
