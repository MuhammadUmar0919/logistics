"use client"

import { Carousel } from "@/components/carousel"
import { Star, User } from "lucide-react"
import { motion } from "framer-motion"

interface Testimonial {
  id: number
  name: string
  rating: number
  text: string
  position?: string
  image?: string
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4 gradient-text">Mijozlarimiz fikrlari</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Platformamizdan foydalanuvchilar fikrlari bilan tanishing
          </p>
        </motion.div>

        <Carousel className="max-w-4xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-8 bg-card dark:bg-card/80 rounded-lg shadow-sm border border-border/50 card-hover"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mr-4 overflow-hidden">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-8 w-8 text-primary" />
                  )}
                </div>
                <div>
                  <h4 className="text-xl font-semibold">{testimonial.name}</h4>
                  {testimonial.position && <p className="text-sm text-muted-foreground">{testimonial.position}</p>}
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-card-foreground text-lg italic">"{testimonial.text}"</p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  )
}

