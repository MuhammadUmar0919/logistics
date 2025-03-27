"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { Truck, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-provider"

const formSchema = z.object({
  phone_number: z.string().min(9, {
    message: "Telefon raqam kamida 9 ta raqamdan iborat bo'lishi kerak",
  }),
  password: z.string().min(6, {
    message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
  }),
})

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone_number: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Format phone number if needed
    const formattedPhone = values.phone_number.startsWith("+") ? values.phone_number : `+${values.phone_number}`

    await login(formattedPhone, values.password)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Image */}
      <div className="hidden md:flex md:w-1/2 bg-blue-700 text-white p-8 items-center justify-center">
        <div className="max-w-md">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Truck className="h-16 w-16 mb-6" />
            <h1 className="text-3xl font-bold mb-4">Logistika platformasiga xush kelibsiz</h1>
            <p className="text-lg mb-6">Yuk tashish va qabul qilish uchun eng qulay platforma</p>
            <div className="bg-white/10 p-6 rounded-lg">
              <p className="italic">
                "Logistika platformasi bizning kompaniyamiz uchun juda foydali bo'ldi. Yuklar tashishni tashkil qilish
                jarayoni ancha osonlashdi."
              </p>
              <div className="mt-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 mr-3"></div>
                <div>
                  <p className="font-semibold">Akbar Karimov</p>
                  <p className="text-sm">Logistika kompaniyasi direktori</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Truck className="h-12 w-12 text-blue-700 mx-auto mb-4 md:hidden" />
            <h2 className="text-2xl font-bold">Tizimga kirish</h2>
            <p className="text-gray-600 mt-2">Platformadan foydalanish uchun tizimga kiring</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefon raqam</FormLabel>
                    <FormControl>
                      <Input placeholder="+998901234567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parol</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Parolingizni kiriting"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Kirish
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Hisobingiz yo&apos;qmi?{" "}
              <Link href="/register" className="text-blue-700 hover:underline font-medium">
                Ro&apos;yxatdan o&apos;tish
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Yoki</span>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="outline" className="w-full">
                <Link href="/" className="w-full flex items-center justify-center">
                  Bosh sahifaga qaytish
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

