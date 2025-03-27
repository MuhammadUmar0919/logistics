"use client"

import { motion } from "framer-motion"
import { ArrowRight, Truck, Package, Shield } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Carousel } from "@/components/carousel"
import type { User } from "@/lib/auth-provider"

interface HeroSlide {
  title: string
  description: string
  image: string
}

interface HeroSectionProps {
  user: User | null
}

export function HeroSection({ user }: HeroSectionProps) {
  // Hero carousel items
  const heroSlides = [
    {
      title: "Logistika - Yuk Tashish Platformasi",
      description: "Yuklaringizni ishonchli va tez yetkazib berish uchun eng qulay platforma",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Tezkor va Ishonchli Yetkazib Berish",
      description: "Yuklaringizni o'z vaqtida va xavfsiz yetkazib beramiz",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Qulay Narxlar va Shaffof To'lovlar",
      description: "Arzon narxlar va shaffof to'lov tizimlari bilan xizmat ko'rsatamiz",
      image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=2070&auto=format&fit=crop",
    },
  ]

  const features = [
    {
      icon: Truck,
      title: "Tezkor yetkazib berish",
      description: "Yuklaringizni eng qisqa vaqt ichida manzilga yetkazib beramiz",
    },
    {
      icon: Package,
      title: "Qulay narxlar",
      description: "Bozordagi eng qulay narxlar va shaffof to'lov tizimlari",
    },
    {
      icon: Shield,
      title: "Xavfsiz tashish",
      description: "Yuklaringiz sug'urtalangan va xavfsiz tashiladi",
    },
  ]

  return (
    <section className="relative overflow-hidden hero">
      <Carousel autoSlideInterval={7000} className="h-full" indicators={false}>
        {heroSlides.map((slide, index) => (
          <div key={index} className="relative h-full w-full">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-700/80"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center pt-24">
              <div className="container mx-auto px-4 py-6">
                <div className="max-w-4xl">
                  <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-4xl md:text-5xl font-bold mb-6 text-white"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-xl mb-8 text-white/90"
                  >
                    {slide.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 mb-12"
                  >
                    <Button asChild size="lg" variant="white" className="group">
                      <Link href="/cargos">
                        Yuklar ro&apos;yxati
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    {!user ? (
                      <Button asChild size="lg" variant="whiteOutline" className="group">
                        <Link href="/register">
                          Ro&apos;yxatdan o&apos;tish
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 opacity-0 group-hover:opacity-100" />
                        </Link>
                      </Button>
                    ) : (
                      <Button asChild size="lg" variant="whiteOutline" className="group">
                        <Link href="/add-cargo">
                          Yuk qo&apos;shish
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 opacity-0 group-hover:opacity-100" />
                        </Link>
                      </Button>
                    )}
                  </motion.div>
                </div>

                {/* Features - Desktop View */}
                <div className="hidden md:block">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="grid grid-cols-3 gap-6"
                  >
                    {features.map((feature, i) => (
                      <div
                        key={i}
                        className="bg-white/10 backdrop-blur-sm p-5 rounded-xl flex items-start hover:bg-white/15 transition-all duration-300 hover:shadow-lg"
                      >
                        <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mr-4 shrink-0">
                          <feature.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1 text-white">{feature.title}</h3>
                          <p className="text-white/80 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Features - Mobile Carousel */}
                <div className="md:hidden">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                  >
                    <Carousel controls={false} autoSlideInterval={4000} className="mt-4">
                      {features.map((feature, i) => (
                        <div key={i} className="px-4">
                          <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl flex items-start hover:bg-white/15 transition-all duration-300 hover:shadow-lg">
                            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mr-4 shrink-0">
                              <feature.icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold mb-1 text-white">{feature.title}</h3>
                              <p className="text-white/80 text-sm">{feature.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Carousel>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Wave effect */}
      {/* <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path
            fill="currentColor"
            fillOpacity="1"
            className="text-background"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,53.3C672,53,768,75,864,80C960,85,1056,75,1152,64C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div> */}
    </section>
  )
}

