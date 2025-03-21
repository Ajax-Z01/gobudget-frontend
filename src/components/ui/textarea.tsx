import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-lg border border-[var(--foreground)] bg-transparent p-3 text-sm shadow-sm focus:border--[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        className
      )}
      {...props}
    />
  );
}
