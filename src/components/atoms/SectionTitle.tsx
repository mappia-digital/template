import { cn } from "@/lib/utils"
import { parseHighlights } from "@/lib/utils"

type SectionTitleProps = {
  /** Texto curto exibido acima do título (ex: "NOSSOS SERVIÇOS") */
  eyebrow?: string
  /** Título principal — suporta **destaque** com negrito */
  title: string
  /** Descrição abaixo do título */
  description?: string
  /** Alinhamento do bloco */
  align?: "left" | "center"
  /** Tamanho do título */
  size?: "md" | "lg" | "xl"
  className?: string
  /** Tag HTML do título — usar h1 para Hero, h2 para seções */
  as?: "h1" | "h2" | "h3"
}

const SIZE_MAP = {
  md: "text-display-sm",
  lg: "text-display-md",
  xl: "text-display-lg",
} as const

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  size = "lg",
  className,
  as: Tag = "h2",
}: SectionTitleProps) {
  const parts = parseHighlights(title)

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary-muted px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary">
          {eyebrow}
        </span>
      )}

      <Tag className={cn(SIZE_MAP[size], "max-w-3xl text-foreground")}>
        {parts.map((part, i) =>
          part.highlight ? (
            <span key={i} className="text-gradient">
              {part.text}
            </span>
          ) : (
            <span key={i}>{part.text}</span>
          ),
        )}
      </Tag>

      {description && (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
