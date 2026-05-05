"use client"

import { useState, useId } from "react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

type FAQItemProps = {
  question: string
  answer: string
  /** Inicia expandido */
  defaultOpen?: boolean
}

export function FAQItem({ question, answer, defaultOpen = false }: FAQItemProps) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-secondary md:py-6"
      >
        <span className="text-base font-semibold text-foreground md:text-lg">{question}</span>
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-background transition-all duration-300",
            open && "rotate-45 border-secondary bg-secondary text-secondary-foreground",
          )}
        >
          <Plus className="size-4" aria-hidden />
        </span>
      </button>

      <div
        id={`${id}-panel`}
        role="region"
        className={cn(
          "grid transition-all duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-6 pr-12 text-base leading-relaxed text-muted-foreground">{answer}</p>
        </div>
      </div>
    </div>
  )
}
