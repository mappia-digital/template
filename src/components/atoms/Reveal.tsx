"use client"

import { type ReactNode } from "react"
import { useScrollReveal } from "@/hooks/useScrollReveal"
import { cn } from "@/lib/utils"

type RevealProps = {
  children: ReactNode
  /** Delay em ms para criar efeito stagger em listas */
  delay?: 0 | 100 | 200 | 300 | 400 | 500
  className?: string
  /** Tag HTML — padrão div */
  as?: "div" | "section" | "article" | "li"
}

/**
 * Wrapper que aplica fade-up quando o elemento entra na viewport.
 * Respeita prefers-reduced-motion via globals.css.
 */
export function Reveal({ children, delay = 0, className, as: Tag = "div" }: RevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <Tag
      ref={ref as never}
      className={cn(
        "reveal-init",
        isVisible && "reveal-show",
        delay > 0 && `delay-${delay}`,
        className,
      )}
    >
      {children}
    </Tag>
  )
}
