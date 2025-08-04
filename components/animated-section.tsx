"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  animation?: "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "zoomIn" | "zoomOut"
}

export function AnimatedSection({ children, className, delay = 0, animation = "fadeIn" }: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay])

  const animationClasses = {
    fadeIn: "opacity-0 transition-opacity duration-700 ease-out",
    slideUp: "opacity-0 translate-y-8 transition-all duration-700 ease-out",
    slideDown: "opacity-0 -translate-y-8 transition-all duration-700 ease-out",
    slideLeft: "opacity-0 translate-x-8 transition-all duration-700 ease-out",
    slideRight: "opacity-0 -translate-x-8 transition-all duration-700 ease-out",
    zoomIn: "opacity-0 scale-95 transition-all duration-700 ease-out",
    zoomOut: "opacity-0 scale-105 transition-all duration-700 ease-out",
  }

  const visibleClasses = {
    fadeIn: "opacity-100",
    slideUp: "opacity-100 translate-y-0",
    slideDown: "opacity-100 translate-y-0",
    slideLeft: "opacity-100 translate-x-0",
    slideRight: "opacity-100 translate-x-0",
    zoomIn: "opacity-100 scale-100",
    zoomOut: "opacity-100 scale-100",
  }

  return (
    <div ref={ref} className={cn(animationClasses[animation], isVisible && visibleClasses[animation], className)}>
      {children}
    </div>
  )
}
