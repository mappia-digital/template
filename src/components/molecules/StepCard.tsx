import { cn } from "@/lib/utils"

type StepCardProps = {
  step: number
  title: string
  description: string
  /** Total de passos — usado para mostrar/esconder a linha conectora */
  isLast?: boolean
  className?: string
}

export function StepCard({ step, title, description, isLast, className }: StepCardProps) {
  return (
    <div className={cn("relative flex flex-col items-start", className)}>
      {!isLast && (
        <div
          className="absolute left-7 top-14 hidden h-[calc(100%-3.5rem)] w-px bg-gradient-to-b from-secondary to-transparent md:block"
          aria-hidden
        />
      )}

      <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-secondary text-xl font-bold text-secondary-foreground shadow-soft">
        {String(step).padStart(2, "0")}
      </div>

      <h3 className="mb-2 text-lg font-bold text-foreground md:text-xl">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{description}</p>
    </div>
  )
}
