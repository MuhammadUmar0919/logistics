"use client"

import { useEffect, useState, useRef } from "react"
import { useInView } from "react-intersection-observer"

interface CountUpProps {
  end: number
  duration?: number
  delay?: number
  prefix?: string
  suffix?: string
  separator?: string
  decimals?: number
  className?: string
}

export function CountUp({
  end,
  duration = 2,
  delay = 0,
  prefix = "",
  suffix = "",
  separator = ",",
  decimals = 0,
  className = "",
}: CountUpProps) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const startTimeRef = useRef<number | null>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!inView) return

    const startAnimation = () => {
      const startTime = performance.now()
      startTimeRef.current = startTime

      const animateCount = (currentTime: number) => {
        if (!startTimeRef.current) return

        const elapsedTime = currentTime - startTimeRef.current
        const progress = Math.min(elapsedTime / (duration * 1000), 1)

        // Easing function for smoother animation
        const easedProgress = easeOutQuart(progress)

        const currentCount = Math.min(easedProgress * end, end)
        setCount(currentCount)

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animateCount)
        }
      }

      // Start the animation after the delay
      setTimeout(() => {
        frameRef.current = requestAnimationFrame(animateCount)
      }, delay * 1000)
    }

    startAnimation()

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [inView, end, duration, delay])

  // Easing function for smoother animation
  const easeOutQuart = (x: number): number => {
    return 1 - Math.pow(1 - x, 4)
  }

  // Format the number with separators and decimals
  const formatNumber = (num: number): string => {
    const fixedNum = num.toFixed(decimals)
    const [whole, decimal] = fixedNum.split(".")

    // Add separators to the whole part
    const parts = []
    let i = whole.length
    while (i > 0) {
      const take = Math.min(i, 3)
      parts.unshift(whole.substring(i - take, i))
      i -= take
    }

    const formattedWhole = parts.join(separator)

    // Return with or without decimals
    return decimals > 0 ? `${formattedWhole}.${decimal}` : formattedWhole
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  )
}

