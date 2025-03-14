import React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  className?: string;
}

export const Progress = ({ value, className }: ProgressProps) => {
  return (
    <div
      className={cn(
        "w-full bg-[var(--background)] border border-[var(--border)] rounded-full h-3",
        className
      )}
    >
      <div
        className="h-full bg-[var(--secondary)] rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
