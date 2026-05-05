import { type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg" | "xl"
}

const SIZE_MAP = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
} as const

export function Container({ size = "xl", className, children, ...rest }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", SIZE_MAP[size], className)} {...rest}>
      {children}
    </div>
  )
}
