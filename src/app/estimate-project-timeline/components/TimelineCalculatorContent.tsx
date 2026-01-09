"use client";
import { useState } from "react";
import { Clock } from "lucide-react";

import {
  calculateTimeline,
  TimelineInput,
  TimelineResult,
} from "@/app/estimate-project-timeline/helpers/timeline-calculator";
import { TimelineForm } from "./TimelineForm";
import { TimelineResults } from "./TimelineResult";

const TimelineCalculatorContent = () => {
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
  );
};

export default TimelineCalculatorContent;
