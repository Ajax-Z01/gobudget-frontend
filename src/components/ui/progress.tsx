import React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  className?: string;
}

export const Progress = ({ value, className }: ProgressProps) => {
  return (
    <div className={cn("w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3", className)}>
      <div
        className="h-full bg-blue-500 rounded-full transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
