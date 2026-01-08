"use client";
import { useState } from "react";
import { TimelineForm } from "./components/TimelineForm";
import { TimelineResults } from "./components/TimelineResult";
import {
  calculateTimeline,
  TimelineInput,
  TimelineResult,
} from "@/app/estimate-project-timeline/helpers/timeline-calculator";
import { Clock } from "lucide-react";

const EstimateProjectTimelinePage = () => {
  const [result, setResult] = useState<TimelineResult | null>(null);
  const [lastInput, setLastInput] = useState<TimelineInput | null>(null);

  const handleCalculate = (input: TimelineInput) => {
    const calculatedResult = calculateTimeline(input);
    setResult(calculatedResult);
    setLastInput(input);
  };

  const handleReset = () => {
    setResult(null);
    setLastInput(null);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-3">
            Project Timeline Calculator
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Convert your estimated hours into a realistic delivery timeline
          </p>
        </header>

        {/* Main Content */}
        <div className="flex flex-col gap-6">
          {/* Form Card */}
          <div className="card-elevated p-4 sm:p-5">
            <TimelineForm onCalculate={handleCalculate} onReset={handleReset} />
          </div>

          {/* Results */}
          {result && lastInput ? (
            <div className="flex-1 w-full lg:sticky lg:top-6 lg:self-start">
              <TimelineResults result={result} totalHours={lastInput.totalHours} />
            </div>
          ) : (
            <div className="hidden lg:flex card-elevated p-6 sm:p-8 items-center justify-center text-muted-foreground">
              <div className="text-center space-y-2">
                <Clock className="h-12 w-12 mx-auto opacity-30" />
                <p>Enter your project details and click "Estimate Timeline"</p>
              </div>
            </div>
          )}
        </div>
        {/* Usage / How it works */}
        <div className="prose mx-auto mt-8 max-w-6xl text-muted-foreground text-center">
          <h2 className="sr-only">How to use</h2>
          <p>
            This <b>Project Timeline Calculator</b> helps you quickly turn effort into a realistic
            delivery plan. Just enter your total estimated hours, how many hours you work per day,
            working days per week, and a start date. Add a buffer to account for meetings or delays,
            and optionally turn on <b>budget calculation</b> by entering your hourly rate.
          </p>
          <br />
          <p>
            For example, if a project needs <b>120 hours</b>, you work <b>8 hours/day</b>,{" "}
            <b>5 days/week</b>, start on
            <b> Feb 1 2026</b>, and add a <b>15% buffer</b>, the tool shows it will take about{" "}
            <b>3 weeks 3 days</b>, finishing around <b>Feb 25 2026</b>, with a safe project cost of
            <b> $3,450</b> at <b>$25/hour</b>. It’s a fast, no-guesswork way to plan timelines and
            budgets with confidence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EstimateProjectTimelinePage;
