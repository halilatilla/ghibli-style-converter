import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-2xl border-2 border-slate-700/50 bg-slate-950/60 backdrop-blur-sm px-4 py-3 text-sm text-slate-200 shadow-inner placeholder:text-slate-500 focus-visible:outline-none focus-visible:border-[var(--ghibli-primary)] focus-visible:shadow-[0_0_0_3px_rgba(var(--ghibli-primary-rgb,91,140,90),0.15)] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
