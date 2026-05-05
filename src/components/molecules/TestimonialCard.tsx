import Image from "next/image"
import { Quote, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { clientData } from "../../../client-data"

type TestimonialCardProps = {
  testimonial: typeof clientData.testimonials[number]
  className?: string
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const initial = testimonial.name.charAt(0).toUpperCase()

  return (
    <article
      className={cn(
        "card-base card-hover group relative flex h-full flex-col p-6 md:p-8",
        className,
      )}
    >
      <Quote
        className="absolute right-6 top-6 size-12 text-secondary-muted/60 transition-colors group-hover:text-secondary-muted"
        aria-hidden
      />

      <div className="mb-4 flex gap-0.5" aria-label={`Avaliação: ${testimonial.rating} de 5 estrelas`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "size-4",
              i < testimonial.rating ? "fill-accent text-accent" : "text-muted",
            )}
            aria-hidden
          />
        ))}
      </div>

      <blockquote className="mb-6 flex-1 text-base leading-relaxed text-foreground md:text-lg">
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>

      <footer className="flex items-center gap-3">
        {testimonial.photo ? (
          <Image
            src={testimonial.photo}
            alt={testimonial.name}
            width={48}
            height={48}
            className="size-12 rounded-full object-cover"
          />
        ) : (
          <div
            className="flex size-12 items-center justify-center rounded-full bg-secondary text-lg font-bold text-secondary-foreground"
            aria-hidden
          >
            {initial}
          </div>
        )}
        <div>
          <div className="font-semibold text-foreground">{testimonial.name}</div>
          {testimonial.role && (
            <div className="text-sm text-muted-foreground">{testimonial.role}</div>
          )}
        </div>
      </footer>
    </article>
  )
}
