"use client"

import { useEffect, useRef, useState } from "react"
import { useScrollReveal } from "@/hooks/useScrollReveal"
import { cn } from "@/lib/utils"

type StatCounterProps = {
  value: string
  label: string
  /** Variante visual: light fica em fundo claro com gradiente; dark inverte para fundo escuro */
  variant?: "light" | "dark"
}

/**
 * Anima números quando entra na viewport. Detecta automaticamente se o
 * valor é numérico (ex: "500+") e anima o número, mantendo sufixos. Para
 * valores não-numéricos (ex: "10 dias"), apenas exibe sem animar.
 */
export function StatCounter({ value, label, variant = "light" }: StatCounterProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()
  const [displayValue, setDisplayValue] = useState(value)
  const animatedRef = useRef(false)

  useEffect(() => {
    if (!isVisible || animatedRef.current) return
    animatedRef.current = true

    const match = value.match(/^([\d.,]+)(.*)$/)
    if (!match) return

    const targetNum = parseFloat(match[1].replace(",", "."))
    if (isNaN(targetNum)) return

    const suffix = match[2]
    const duration = 1500
    const startTime = performance.now()

    let frameId: number
    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = targetNum * eased
      const formatted = Number.isInteger(targetNum)
        ? Math.round(current).toString()
        : current.toFixed(1).replace(".", ",")
      setDisplayValue(`${formatted}${suffix}`)

      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [isVisible, value])

  return (
    <div ref={ref} className="text-center">
      <div
        className={cn(
          "text-display-md font-bold",
          variant === "light" ? "text-gradient" : "text-primary-foreground",
        )}
      >
        {displayValue}
      </div>
      <div
        className={cn(
          "mt-2 text-sm font-medium md:text-base",
          variant === "light" ? "text-muted-foreground" : "text-primary-foreground/70",
        )}
      >
        {label}
      </div>
    </div>
  )
}
