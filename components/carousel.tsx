"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselProps = {
  children: React.ReactNode[]
  autoSlideInterval?: number
  className?: string
  indicators?: boolean
  controls?: boolean
}

export function Carousel({
  children,
  autoSlideInterval = 5000,
  className,
  indicators = true,
  controls = true,
}: CarouselProps) {
  const [current, setCurrent] = useState(0)
  const [autoSlideEnabled, setAutoSlideEnabled] = useState(true)
  const length = children.length

  const nextSlide = useCallback(() => {
    setCurrent((current) => (current === length - 1 ? 0 : current + 1))
  }, [length])

  const prevSlide = useCallback(() => {
    setCurrent((current) => (current === 0 ? length - 1 : current - 1))
  }, [length])

  const goToSlide = (index: number) => {
    setCurrent(index)
    setAutoSlideEnabled(false)
    setTimeout(() => setAutoSlideEnabled(true), autoSlideInterval)
  }

  useEffect(() => {
    if (!autoSlideEnabled) return

    const interval = setInterval(() => {
      nextSlide()
    }, autoSlideInterval)

    return () => clearInterval(interval)
  }, [nextSlide, autoSlideInterval, autoSlideEnabled])

  // Pause auto-slide when user hovers over carousel
  const handleMouseEnter = () => setAutoSlideEnabled(false)
  const handleMouseLeave = () => setAutoSlideEnabled(true)

  if (!Array.isArray(children) || children.length <= 0) {
    return null
  }

  return (
    <div className={cn("relative", className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="overflow-hidden relative rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {children.map((child, index) => (
            <div key={index} className="min-w-full">
              {child}
            </div>
          ))}
        </div>

        {controls && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>

      {indicators && (
        <div className="flex justify-center mt-4 space-x-2">
          {children.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === current ? "bg-primary w-4" : "bg-gray-300 dark:bg-gray-600"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

