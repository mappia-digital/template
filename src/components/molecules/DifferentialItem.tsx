import { Icon } from "@/components/atoms/Icon"
import { cn } from "@/lib/utils"

type DifferentialItemProps = {
  icon: string
  title: string
  description: string
  className?: string
}

export function DifferentialItem({ icon, title, description, className }: DifferentialItemProps) {
  return (
    <div
      className={cn(
        "group flex flex-col items-start gap-4 rounded-2xl p-6 transition-colors hover:bg-muted",
        className,
      )}
    >
      <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
        <Icon name={icon} className="size-7" />
      </div>

      <div>
        <h3 className="mb-2 text-lg font-bold text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
