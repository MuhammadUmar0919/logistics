"use client"

import { motion } from "framer-motion"
import { Check, Package, Truck, Shield, CreditCard, MapPin, Zap } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useScrollTop } from "@/lib/hooks/use-scroll-top"
import { Button } from "@/components/ui/button"

export default function ServicesPage() {
  // Scroll to top on page load
  useScrollTop()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop)`,
            }}
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Xizmatlar
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl max-w-3xl mx-auto"
          >
            Logistika platformasi foydalanuvchilar uchun yuk tashish va qabul qilish imkoniyatini beradi
          </motion.p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 gradient-text">Asosiy xizmatlar</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Logistika platformasi orqali siz quyidagi xizmatlardan foydalanishingiz mumkin
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card dark:bg-card/80 p-6 rounded-lg shadow-md border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg card-hover"
            >
              <div className="bg-blue-500/10 dark:bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Package className="h-8 w-8 text-blue-500 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Yuk joylash</h3>
              <p className="text-muted-foreground mb-4">
                O&apos;z yukingizni platformaga joylashtiring va haydovchilar bilan bog&apos;laning
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Yukingiz haqida to&apos;liq ma&apos;lumot kiriting</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Narxni o&apos;zingiz belgilang</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Haydovchilar takliflarini ko&apos;ring</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-card dark:bg-card/80 p-6 rounded-lg shadow-md border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg card-hover"
            >
              <div className="bg-green-500/10 dark:bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Truck className="h-8 w-8 text-green-500 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Yuk tashish</h3>
              <p className="text-muted-foreground mb-4">
                Haydovchilar uchun yuklar ro&apos;yxatidan o&apos;zingizga mos yukni tanlang
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Yuklar ro&apos;yxatidan o&apos;zingizga mos yukni toping</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Yuk egasi bilan bog&apos;laning</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Yuk tashish jarayonini boshlang</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card dark:bg-card/80 p-6 rounded-lg shadow-md border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg card-hover"
            >
              <div className="bg-purple-500/10 dark:bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <MapPin className="h-8 w-8 text-purple-500 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">GPS kuzatuv</h3>
              <p className="text-muted-foreground mb-4">
                Yukingizni GPS orqali kuzating va uning joylashuvini real vaqtda ko&apos;ring
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Yukingizni real vaqtda kuzating</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Yetkazib berish vaqtini taxminiy hisoblang</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Haydovchi bilan doimiy aloqada bo&apos;ling</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 gradient-text">Tariflar</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Logistika platformasi quyidagi tariflarni taklif qiladi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-card dark:bg-card/80 p-6 rounded-lg shadow-md border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg card-hover"
            >
              <h3 className="text-xl font-semibold mb-2">Bepul obuna</h3>
              <p className="text-3xl font-bold mb-4 gradient-text">0 so&apos;m</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
                  Oyiga 5 ta elonni ko&apos;rish
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
                  Oyiga 5 ta elonni joylash
                </li>
              </ul>
              <Button className="w-full">Tanlash</Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card dark:bg-card/80 p-6 rounded-lg shadow-md border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg card-hover"
            >
              <h3 className="text-xl font-semibold mb-2">O&apos;rta obuna</h3>
              <p className="text-3xl font-bold mb-4 gradient-text">15 000 so&apos;m</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
                  Oyiga 50 ta elonni ko&apos;rish
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
                  Oyiga 50 ta elonni joylash
                </li>
              </ul>
              <Button className="w-full">Tanlash</Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-card dark:bg-card/80 p-6 rounded-lg shadow-md border-primary relative hover:shadow-lg card-hover"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 gradient-bg text-white px-4 py-1 rounded-full text-sm font-medium">
                Eng mashhur
              </div>
              <h3 className="text-xl font-semibold mb-2">Yuqori obuna</h3>
              <p className="text-3xl font-bold mb-4 gradient-text">35 000 so&apos;m</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
                  Oyiga 200 ta elonni ko&apos;rish
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
                  Oyiga 200 ta elonni joylash
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>3 ta reklamani topga
                  chiqarish
                </li>
              </ul>
              <Button className="w-full">Tanlash</Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-card dark:bg-card/80 p-6 rounded-lg shadow-md border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg card-hover"
            >
              <h3 className="text-xl font-semibold mb-2">Eng yuqori obuna</h3>
              <p className="text-3xl font-bold mb-4 gradient-text">100 000 so&apos;m</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
                  Oyiga 500 ta elonni ko&apos;rish
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
                  Oyiga 500 ta elonni joylash
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>5 ta reklamani topga
                  chiqarish
                </li>
              </ul>
              <Button className="w-full">Tanlash</Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 gradient-text">Qo&apos;shimcha xizmatlar</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Logistika platformasi quyidagi qo&apos;shimcha xizmatlarni ham taklif qiladi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card dark:bg-card/80 p-6 rounded-lg shadow-md border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg card-hover"
            >
              <Shield className="h-12 w-12 text-blue-500 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sug&apos;urta xizmati</h3>
              <p className="text-muted-foreground">Yukingizni sug&apos;urtalang va xavfsiz tashishni ta&apos;minlang</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-card dark:bg-card/80 p-6 rounded-lg shadow-md border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg card-hover"
            >
              <CreditCard className="h-12 w-12 text-green-500 dark:text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">To&apos;lov xizmati</h3>
              <p className="text-muted-foreground">Xavfsiz va qulay to&apos;lov usullari orqali hisob-kitob qiling</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card dark:bg-card/80 p-6 rounded-lg shadow-md border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg card-hover"
            >
              <Zap className="h-12 w-12 text-purple-500 dark:text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tezkor yetkazib berish</h3>
              <p className="text-muted-foreground">Yukingizni eng qisqa vaqt ichida yetkazib berish xizmati</p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

