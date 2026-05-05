import { Check } from "lucide-react"

type ValueItemProps = {
  title: string
  description: string
}

export function ValueItem({ title, description }: ValueItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
        <Check className="size-5" strokeWidth={3} aria-hidden />
      </div>
      <div>
        <h3 className="mb-1 text-lg font-bold text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
