"use client";
import { useState } from "react";
import {
  Calendar,
  Clock,
  CalendarDays,
  Percent,
  Info,
  RotateCcw,
  Calculator,
  DollarSign,
} from "lucide-react";
import clsx from "clsx";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { TimelineInput } from "../helpers/timeline-calculator";
import { CURRENCIES } from "@/lib/constants";
import { DatePicker } from "@/components/ui/date-picker";

interface TimelineFormProps {
  onCalculate: (input: TimelineInput) => void;
  onReset: () => void;
}

export function TimelineForm({ onCalculate, onReset }: TimelineFormProps) {
  const [totalHours, setTotalHours] = useState<string>("120");
  const [hoursPerDay, setHoursPerDay] = useState<string>("8");
  const [workingDaysPerWeek, setWorkingDaysPerWeek] = useState<number>(5);
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [bufferPercent, setBufferPercent] = useState<number>(15);

  // Budget fields
  const [includeBudget, setIncludeBudget] = useState<boolean>(false);
  const [isHourly, setIsHourly] = useState<boolean>(true);
  const [rate, setRate] = useState<string>("");
  const [currency, setCurrency] = useState<string>("USD");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const hours = parseFloat(totalHours);
    const perDay = parseFloat(hoursPerDay);

    if (isNaN(hours) || isNaN(perDay) || hours <= 0 || perDay <= 0) {
      return;
    }

    // Record click event to Google Analytics if gtag is available
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      try {
        (window as any).gtag("event", "estimate_timeline", {
          event_category: "engagement",
          event_label: "Estimate Timeline",
          value: hours,
        });
      } catch (err) {
        // ignore analytics errors
      }
    }

    onCalculate({
      totalHours: hours,
      hoursPerDay: perDay,
      workingDaysPerWeek,
      startDate: new Date(startDate),
      bufferPercent,
      includeBudget,
      isHourly,
      rate: parseFloat(rate) || 0,
      currency,
    });
  };

  const handleReset = () => {
    setTotalHours("120");
    setHoursPerDay("8");
    setWorkingDaysPerWeek(5);
    setStartDate(new Date().toISOString().split("T")[0]);
    setBufferPercent(15);
    setIncludeBudget(false);
    setIsHourly(true);
    setRate("");
    setCurrency("USD");
    // Record reset event to Google Analytics if gtag is available
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      try {
        (window as any).gtag("event", "reset_timeline_estimate_form", {
          event_category: "engagement",
          event_label: "Reset Timeline Form",
        });
      } catch (err) {
        // ignore analytics errors
      }
    }

    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Hours */}
        <div className="input-group">
          <Label htmlFor="totalHours" className="flex items-center gap-1 md:gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="hidden xl:block">Total Estimated Hours</span>
            <span className="xl:hidden">Total Hours</span>
          </Label>
          <Input
            id="totalHours"
            type="number"
            min="1"
            step="0.5"
            placeholder="120"
            value={totalHours}
            onChange={(e) => setTotalHours(e.target.value)}
            required
            className="text-lg"
          />
        </div>
        {/* Hours Per Day */}
        <div className="input-group">
          <Label htmlFor="hoursPerDay" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            Hours Per Day
          </Label>
          <Input
            id="hoursPerDay"
            type="number"
            min="1"
            max="24"
            step="0.5"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(e.target.value)}
            required
            className="text-lg"
          />
        </div>

        {/* Working Days Per Week */}
        <div className="input-group">
          <Label htmlFor="workingDaysPerWeek" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            Days Per Week
          </Label>
          <Input
            id="workingDaysPerWeek"
            type="number"
            min="1"
            max="7"
            step="1"
            value={workingDaysPerWeek}
            onChange={(e) =>
              setWorkingDaysPerWeek(Math.min(7, Math.max(1, parseInt(e.target.value) || 1)))
            }
            required
            className="text-lg"
          />
        </div>

        {/* Start Date */}
        <div className="input-group">
          <Label htmlFor="startDate" className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            Project Start Date
          </Label>
          <DatePicker
            date={new Date(startDate)}
            onSelect={(date) => (date ? setStartDate(date.toDateString() || "") : "")}
          />
        </div>

        {/* Buffer Slider */}
        <div className="input-group col-span-2">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Percent className="h-4 w-4 text-muted-foreground" />
              Buffer / Contingency
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" className="p-1 rounded-full hover:bg-accent">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[200px]">
                <p>Accounts for delays, meetings, revisions, and unexpected work</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Slider
                value={[bufferPercent]}
                onValueChange={(value) => setBufferPercent(value[0])}
                min={0}
                max={30}
                step={1}
                className="flex-1"
              />
              <span className="ml-4 w-12 text-right font-semibold text-foreground">
                {bufferPercent}%
              </span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0% (Aggressive)</span>
              <span>30% (Safe)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Calculator Section */}
      <div className="col-span-1 md:col-span-3 input-group border-t border-border pt-4">
        <div className="flex items-center mb-4 gap-6">
          <Label className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            Calculate Budget
          </Label>
          <Switch checked={includeBudget} onCheckedChange={setIncludeBudget} />

          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" className="p-1 rounded-full hover:bg-accent">
                <Info className="h-4 w-4 text-muted-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[220px]">
              <p>Enable to calculate an estimated budget from hours and rate.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        className={clsx(
          "flex flex-col md:flex-row gap-3",
          includeBudget ? "justify-between" : "justify-end"
        )}
      >
        {includeBudget && (
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
            {/* Hourly/Fixed Toggle */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50">
              <span
                className={`text-sm ${
                  !isHourly ? "text-muted-foreground" : "font-medium text-foreground"
                }`}
              >
                Hourly
              </span>
              <Switch checked={!isHourly} onCheckedChange={(checked) => setIsHourly(!checked)} />
              <span
                className={`text-sm ${
                  isHourly ? "text-muted-foreground" : "font-medium text-foreground"
                }`}
              >
                Fixed
              </span>
            </div>

            <div className="flex flex-row gap-3 items-start sm:items-end">
              {/* Currency Dropdown */}
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-[110px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Rate Input */}
              <div className="flex-1 min-w-0">
                <div className="relative">
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder={isHourly ? "Rate" : "Total Price"}
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className={isHourly ? "pr-16" : ""}
                  />
                  {isHourly && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      /hour
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex gap-3 sm:justify-end">
          <Button type="submit" className="flex-1 gap-2">
            <Calculator className="h-5 w-5" />
            Estimate Timeline
          </Button>
          <Button type="button" variant="outline" onClick={handleReset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </form>
  );
}
