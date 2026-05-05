import * as Icons from "lucide-react"
import { type LucideIcon } from "lucide-react"

type IconProps = {
  /** Nome do ícone do lucide-react. Ex: "ShieldCheck", "Globe", "Zap" */
  name: string
  className?: string
  size?: number | string
  strokeWidth?: number
  "aria-hidden"?: boolean
}

/**
 * Renderiza um ícone do lucide-react pelo nome (string).
 * Permite que o client-data.ts referencie ícones sem import direto.
 * Fallback gracioso: se o ícone não existe, renderiza Circle.
 */
export function Icon({ name, className, size, strokeWidth = 2, ...rest }: IconProps) {
  const LucideComponent = (Icons as unknown as Record<string, LucideIcon>)[name] ?? Icons.Circle

  return (
    <LucideComponent
      className={className}
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden={rest["aria-hidden"] ?? true}
    />
  )
}
