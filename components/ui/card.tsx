"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function Card({
  className,
  onPhotoUpload,
  allowPhotoUpload = false,
  ...props
}: React.ComponentProps<"div"> & {
  onPhotoUpload?: (files: FileList) => void
  allowPhotoUpload?: boolean
}) {
  const [isDragOver, setIsDragOver] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (allowPhotoUpload) {
      setIsDragOver(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (allowPhotoUpload && onPhotoUpload) {
      const files = e.dataTransfer.files
      if (files.length > 0) {
        onPhotoUpload(files)
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (allowPhotoUpload && onPhotoUpload && e.target.files) {
      onPhotoUpload(e.target.files)
    }
  }

  const handleClick = () => {
    if (allowPhotoUpload && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card/95 text-card-foreground backdrop-blur-sm flex flex-col gap-6 rounded-2xl border border-border/50 py-6 shadow-lg shadow-black/5 dark:shadow-black/20 transition-all duration-300 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30 hover:-translate-y-1 hover:border-border/80 relative overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none",
        "after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent",
        allowPhotoUpload && "cursor-pointer",
        isDragOver && allowPhotoUpload && "border-primary/50 bg-primary/5 scale-[1.02]",
        className,
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={allowPhotoUpload ? handleClick : undefined}
      {...props}
    >
      {allowPhotoUpload && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          {isDragOver && (
            <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary/50 rounded-2xl flex items-center justify-center z-10">
              <div className="text-center">
                <div className="text-2xl mb-2">📸</div>
                <p className="text-sm font-medium text-primary">Drop photos here</p>
              </div>
            </div>
          )}
        </>
      )}
      {props.children}
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 [.border-b]:border-border/30",
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "leading-tight font-semibold text-lg tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text",
        className,
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground/90 text-sm leading-relaxed", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("px-6 space-y-4", className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center justify-between px-6 [.border-t]:pt-6 [.border-t]:border-border/30 [.border-t]:mt-6",
        className,
      )}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
