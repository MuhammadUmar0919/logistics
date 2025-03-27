"use client"

import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { Package, Truck, Shield, Clock, MapPin, CreditCard } from "lucide-react"

export function FeaturesSection() {
  // Animation controls
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const features = [
    {
      icon: Package,
      title: "Qulay interfeys",
      description: "Foydalanuvchilar uchun qulay va tushunarli interfeys",
      color: "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400",
    },
    {
      icon: Truck,
      title: "Tezkor bog'lanish",
      description: "Yuklar va haydovchilar o'rtasida tezkor bog'lanish",
      color: "bg-purple-500/10 text-purple-500 dark:bg-purple-500/20 dark:text-purple-400",
    },
    {
      icon: Shield,
      title: "Shaffof narxlar",
      description: "Narxlar shaffof va ochiq ko'rsatiladi",
      color: "bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400",
    },
    {
      icon: Clock,
      title: "GPS kuzatuv",
      description: "GPS orqali yukning joylashuvini kuzatish imkoniyati",
      color: "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400",
    },
    {
      icon: MapPin,
      title: "Keng qamrov",
      description: "O'zbekistonning barcha hududlarida xizmat ko'rsatish",
      color: "bg-red-500/10 text-red-500 dark:bg-red-500/20 dark:text-red-400",
    },
    {
      icon: CreditCard,
      title: "Qulay to'lov",
      description: "Turli xil to'lov usullari orqali xizmat haqini to'lash",
      color: "bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20 dark:text-indigo-400",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-4 gradient-text">
            Nima uchun bizni tanlashingiz kerak?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl mx-auto">
            Logistika platformasi foydalanuvchilar uchun yuk tashish va qabul qilish jarayonini osonlashtiradi
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              className="bg-cardd dark:bg-card/80 p-6 rounded-lg shadow-sm border border-border/50 hover:border-primary/20 transition-colors duration-300 hover:shadow-md card-hover"
            >
              <div
                className={`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform duration-500 hover:scale-110 hover:rotate-3`}
              >
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

