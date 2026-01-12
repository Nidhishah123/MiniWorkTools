"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
  /** Accessible label for the slider. If provided, a visually-hidden label will be rendered and used via aria-labelledby. */
  label?: string;
};

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, label, ...props }, ref) => {
    const generatedId = React.useId();
    const labelledBy = props["aria-label"]
      ? undefined
      : props["aria-labelledby"] || (label ? `slider-label-${generatedId}` : undefined);

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        aria-labelledby={labelledBy}
        {...props}
      >
        {label && !props["aria-label"] && (
          <span id={`slider-label-${generatedId}`} className="sr-only">
            {label}
          </span>
        )}

        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          aria-labelledby={labelledBy}
          aria-valuetext={
            Array.isArray(props.value) && typeof props.value[0] === "number"
              ? `${props.value[0]}%`
              : undefined
          }
        />
      </SliderPrimitive.Root>
    );
  }
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
