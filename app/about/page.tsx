"use client"

import { motion } from "framer-motion"
import { CheckCircle, Users, TrendingUp, Award } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { TeamCarousel } from "@/components/team-carousel"
import { useScrollTop } from "@/lib/hooks/use-scroll-top"
import { CountUp } from "@/components/count-up"

export default function AboutPage() {
  // Scroll to top on page load
  useScrollTop()

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Alisher Usmanov",
      position: "Bosh direktor",
      bio: "10 yildan ortiq logistika sohasida tajribaga ega. Kompaniyani rivojlantirish va yangi texnologiyalarni joriy etish bo'yicha mutaxassis.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
      contact: {
        email: "alisher@logistika.uz",
        phone: "+998 90 123 45 67",
      },
    },
    {
      id: 2,
      name: "Nodira Karimova",
      position: "Marketing bo'limi boshlig'i",
      bio: "7 yillik marketing sohasidagi tajriba. Raqamli marketing va mijozlar bilan ishlash bo'yicha mutaxassis.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
      contact: {
        email: "nodira@logistika.uz",
        phone: "+998 90 234 56 78",
      },
    },
    {
      id: 3,
      name: "Rustam Azimov",
      position: "Texnik direktor",
      bio: "12 yillik IT sohasidagi tajriba. Platformani texnik jihatdan rivojlantirish va yangi funksiyalarni joriy etish bo'yicha mutaxassis.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
      contact: {
        email: "rustam@logistika.uz",
        phone: "+998 90 345 67 89",
      },
    },
    {
      id: 4,
      name: "Dilnoza Rahimova",
      position: "Mijozlar bilan ishlash bo'limi boshlig'i",
      bio: "5 yillik mijozlar bilan ishlash tajribasi. Mijozlar ehtiyojlarini qondirish va xizmat sifatini oshirish bo'yicha mutaxassis.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
      contact: {
        email: "dilnoza@logistika.uz",
        phone: "+998 90 456 78 90",
      },
    },
    {
      id: 5,
      name: "Jahongir Tursunov",
      position: "Moliya direktori",
      bio: "8 yillik moliya sohasidagi tajriba. Kompaniya moliyaviy faoliyatini boshqarish va optimallashtirishda mutaxassis.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop",
      contact: {
        email: "jahongir@logistika.uz",
        phone: "+998 90 567 89 01",
      },
    },
    {
      id: 6,
      name: "Kamola Yusupova",
      position: "HR menejer",
      bio: "6 yillik HR sohasidagi tajriba. Jamoa tuzish va rivojlantirish bo'yicha mutaxassis.",
      image: "https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?q=80&w=1974&auto=format&fit=crop",
      contact: {
        email: "kamola@logistika.uz",
        phone: "+998 90 678 90 12",
      },
    },
  ]

  // Stats data
  const stats = [
    { value: 1000, label: "Foydalanuvchilar", suffix: "+" },
    { value: 500, label: "Haydovchilar", suffix: "+" },
    { value: 5000, label: "Yuklar", suffix: "+" },
    { value: 10, label: "Viloyatlar", suffix: "+" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop)`,
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
            Biz haqimizda
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl max-w-3xl mx-auto"
          >
            Logistika platformasi - bu yuk tashish va qabul qilish jarayonini osonlashtirish uchun yaratilgan
            innovatsion yechim
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl font-bold mb-6 gradient-text">Bizning hikoyamiz</h2>
              <div className="space-y-4 text-card-foreground">
                <p>
                  Logistika platformasi 2023-yilda yuk tashish bozorini yanada shaffof va qulay qilish maqsadida tashkil
                  etilgan. Bizning jamoamiz yuk tashish sohasida ko&apos;p yillik tajribaga ega mutaxassislardan tashkil
                  topgan.
                </p>
                <p>
                  Biz O&apos;zbekistonda yuk tashish sohasidagi muammolarni o&apos;rganib chiqdik va ularni hal qilish
                  uchun zamonaviy texnologiyalardan foydalanishga qaror qildik. Natijada, Logistika platformasi
                  yaratildi.
                </p>
                <p>
                  Bugungi kunda biz O&apos;zbekistonning barcha hududlarida faoliyat yuritamiz va mijozlarimizga sifatli
                  xizmat ko&apos;rsatishga intilamiz. Bizning maqsadimiz - yuk tashish sohasini raqamlashtirish va uni
                  yanada samarali qilish.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1622030411594-c330ea0cea9e?q=80&w=2070&auto=format&fit=crop"
                  alt="Logistika platformasi"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Ishonchli yetkazib berish</h3>
                    <p>Yuklaringizni xavfsiz va o&apos;z vaqtida yetkazib beramiz</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 gradient-text">Bizning maqsadimiz</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Biz quyidagi maqsadlarni o&apos;z oldimizga qo&apos;yganmiz
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card dark:bg-card/80 p-6 rounded-lg shadow-md text-center border border-border/50 hover:border-primary/20 transition-all duration-300 card-hover"
            >
              <div className="bg-blue-500/10 dark:bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-500 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Qulay interfeys</h3>
              <p className="text-muted-foreground">Foydalanuvchilar uchun qulay va tushunarli interfeys yaratish</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-card dark:bg-card/80 p-6 rounded-lg shadow-md text-center border border-border/50 hover:border-primary/20 transition-all duration-300 card-hover"
            >
              <div className="bg-green-500/10 dark:bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-500 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Soddalashtirish</h3>
              <p className="text-muted-foreground">Yuk tashish jarayonini soddalashtirish va osonlashtirish</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card dark:bg-card/80 p-6 rounded-lg shadow-md text-center border border-border/50 hover:border-primary/20 transition-all duration-300 card-hover"
            >
              <div className="bg-purple-500/10 dark:bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-500 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Shaffoflik</h3>
              <p className="text-muted-foreground">
                Narxlarni shaffof va ochiq ko&apos;rsatish, ishonchli ma&apos;lumotlar taqdim etish
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-card dark:bg-card/80 p-6 rounded-lg shadow-md text-center border border-border/50 hover:border-primary/20 transition-all duration-300 card-hover"
            >
              <div className="bg-amber-500/10 dark:bg-amber-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-amber-500 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sifat</h3>
              <p className="text-muted-foreground">
                Yuqori sifatli xizmat ko&apos;rsatish va mijozlar ehtiyojlarini qondirish
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 gradient-text">Bizning jamoa</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Logistika platformasi jamoasi tajribali va professional mutaxassislardan tashkil topgan
            </p>
          </div>

          <TeamCarousel teamMembers={teamMembers} />
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 gradient-bg text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=2070&auto=format&fit=crop)`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-5xl font-bold mb-2">
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    delay={0.2 * index}
                    suffix={stat.suffix}
                    className="tabular-nums"
                  />
                </p>
                <p className="text-xl">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

