"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function CTASection() {
  return (
    <section className="py-16 gradient-bg text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-white/5"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">Hoziroq boshlang!</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Logistika platformasiga qo&apos;shiling va yuk tashish jarayonini osonlashtiring
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="white" className="group">
              <Link href="/register">
                Ro&apos;yxatdan o&apos;tish
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="whiteOutline" className="group">
              <Link href="/cargos">
                Yuklar ro&apos;yxati
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 opacity-0 group-hover:opacity-100" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

