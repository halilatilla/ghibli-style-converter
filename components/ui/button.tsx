import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 disabled:grayscale cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-slate-800/90 text-slate-50 shadow-lg hover:bg-slate-700/90 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 border border-slate-700/50",
        destructive:
          "bg-gradient-to-br from-red-500 to-red-600 text-slate-50 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 border border-red-400/30",
        outline:
          "border-2 border-slate-600/50 bg-slate-900/50 backdrop-blur-sm shadow-md hover:bg-slate-800/60 hover:border-slate-500/60 hover:shadow-lg text-slate-200",
        secondary:
          "bg-gradient-to-br from-slate-700 to-slate-800 text-slate-100 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 border border-slate-600/40",
        ghost: "hover:bg-slate-800/50 backdrop-blur-sm text-slate-300 hover:text-slate-100",
        link: "text-slate-300 underline-offset-4 hover:underline hover:text-slate-100",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-8 rounded-xl px-4 text-xs",
        lg: "h-12 rounded-2xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
