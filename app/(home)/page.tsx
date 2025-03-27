"use client"
import { useAuth } from "@/lib/auth-provider"
import { useApiHooks } from "@/lib/api-hooks"
import { useScrollTop } from "@/lib/hooks/use-scroll-top"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { RecentCargosSection } from "@/components/recent-cargos-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"

export default function Home() {
  const { user } = useAuth()
  const { useCargos } = useApiHooks()
  const { data: recentCargos } = useCargos({ limit: 5 })

  // Scroll to top on page load
  useScrollTop()

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Akbar Karimov",
      position: "Logistika kompaniyasi direktori",
      rating: 5,
      text: "Logistika platformasi juda qulay va ishonchli. Yuklarimizni tez va xavfsiz yetkazib berishadi. Platformadan foydalanish juda oson, narxlar ham juda qulay. Keyingi safar ham albatta ushbu platformadan foydalanamiz.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      id: 2,
      name: "Dilshod Rahimov",
      position: "Haydovchi",
      rating: 4,
      text: "Platformada yuk topish juda oson. Interfeys tushunarli va qulay. Mijozlar bilan bog'lanish ham oson. Yuk egasi bilan to'g'ridan-to'g'ri bog'lanish imkoniyati juda yaxshi.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      id: 3,
      name: "Nodira Azizova",
      position: "Tadbirkor",
      rating: 5,
      text: "Bizning kompaniya uchun juda foydali platforma. Yuklar tashishni tashkil qilish jarayoni ancha osonlashdi. GPS kuzatuv tizimi orqali yukimiz qayerda ekanligini real vaqtda ko'rib turamiz.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <HeroSection user={user} />

      <RecentCargosSection cargos={recentCargos} />

      <FeaturesSection />

      <TestimonialsSection testimonials={testimonials} />

      <CTASection />

      <Footer />
    </div>
  )
}

