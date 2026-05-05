import Link from "next/link"
import { type AnchorHTMLAttributes, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type Variant = "primary" | "secondary" | "accent" | "outline" | "ghost"
type Size = "sm" | "md" | "lg"

type CTAButtonProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string
  variant?: Variant
  size?: Size
  /** Adiciona ícone à esquerda do texto */
  leadingIcon?: ReactNode
  /** Adiciona ícone à direita do texto */
  trailingIcon?: ReactNode
  /** Abre em nova aba (target=_blank com rel seguro) */
  external?: boolean
  fullWidth?: boolean
}

const VARIANT_STYLES: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98] shadow-soft hover:shadow-elevated",
  secondary:
    "bg-secondary text-secondary-foreground hover:opacity-90 active:scale-[0.98] shadow-soft hover:shadow-elevated",
  accent:
    "bg-accent text-accent-foreground hover:opacity-90 active:scale-[0.98] shadow-soft hover:shadow-elevated",
  outline:
    "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground active:scale-[0.98]",
  ghost:
    "bg-transparent text-foreground hover:bg-muted active:scale-[0.98]",
}

const SIZE_STYLES: Record<Size, string> = {
  sm: "h-9 px-4 text-sm gap-1.5 rounded-lg",
  md: "h-11 px-6 text-base gap-2 rounded-xl",
  lg: "h-14 px-8 text-base md:text-lg gap-2 rounded-2xl",
}

export function CTAButton({
  href,
  variant = "primary",
  size = "md",
  leadingIcon,
  trailingIcon,
  external,
  fullWidth,
  className,
  children,
  ...rest
}: CTAButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
    VARIANT_STYLES[variant],
    SIZE_STYLES[size],
    fullWidth && "w-full",
    className,
  )

  const content = (
    <>
      {leadingIcon && <span className="shrink-0">{leadingIcon}</span>}
      <span>{children}</span>
      {trailingIcon && <span className="shrink-0">{trailingIcon}</span>}
    </>
  )

  if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
        {...rest}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  )
}
