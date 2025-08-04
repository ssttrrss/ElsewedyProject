import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  if (props.onClick) {
    return (
      <div
        ref={ref}
        className={cn(
          "group cursor-pointer rounded-xl border bg-white/80 backdrop-blur-sm text-card-foreground shadow-sm",
          "hover:shadow-md hover:-translate-y-1 hover:bg-white/90 hover:border-blue-200",
          "transition-all duration-200 ease-in-out",
          "dark:bg-slate-900/80 dark:hover:bg-slate-900/90 dark:border-slate-800 dark:hover:border-slate-700",
          className,
        )}
        {...props}
      />
    )
  }

  return (
    <div
      ref={ref}
      className={cn(
        "group rounded-xl border bg-white/80 backdrop-blur-sm text-card-foreground shadow-sm",
        "hover:shadow-md hover:-translate-y-1 hover:bg-white/90",
        "transition-all duration-200 ease-in-out",
        "dark:bg-slate-900/80 dark:hover:bg-slate-900/90 dark:border-slate-800",
        className,
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("font-semibold leading-none tracking-tight", className)} {...props} />
  ),
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "p-6 pt-0 relative overflow-hidden",
        "transition-all duration-200 ease-in-out",
        "group-hover:before:opacity-10",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-50 before:to-indigo-50",
        "before:opacity-0 before:transition-opacity before:duration-200",
        "dark:before:from-blue-950/20 dark:before:to-indigo-950/20",
        className,
      )}
      {...props}
    />
  ),
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
