"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Hook de revelação on-scroll. Adiciona uma classe quando o elemento entra
 * na viewport. Usa IntersectionObserver — leve, sem dependências externas.
 *
 * @example
 *   const { ref, isVisible } = useScrollReveal()
 *   <div ref={ref} className={isVisible ? "animate-fade-up" : "opacity-0"} />
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
) {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(node)
        }
      },
      options,
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [options])

  return { ref, isVisible }
}
