import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border-2 px-4 py-1.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md hover:shadow-lg hover:-translate-y-0.5",
  {
    variants: {
      variant: {
        default:
          "border-slate-600/40 bg-gradient-to-br from-slate-700 to-slate-800 text-slate-100 hover:from-slate-600 hover:to-slate-700",
        secondary:
          "border-slate-600/30 bg-slate-800/80 backdrop-blur-sm text-slate-200 hover:bg-slate-700/80",
        destructive:
          "border-red-500/40 bg-gradient-to-br from-red-600 to-red-700 text-slate-50 hover:from-red-500 hover:to-red-600",
        outline: "text-slate-300 border-slate-600/50 hover:bg-slate-800/50 hover:text-slate-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

