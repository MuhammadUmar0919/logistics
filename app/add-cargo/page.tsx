"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Package, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useApiHooks } from "@/lib/api-hooks"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Yuk nomi kamida 2 ta belgidan iborat bo'lishi kerak",
  }),
  weight: z.coerce.number().min(0.1, {
    message: "Yuk og'irligi 0.1 tonnadan kam bo'lmasligi kerak",
  }),
  origin: z.string().min(2, {
    message: "Olish manzili kamida 2 ta belgidan iborat bo'lishi kerak",
  }),
  destination: z.string().min(2, {
    message: "Yetkazish manzili kamida 2 ta belgidan iborat bo'lishi kerak",
  }),
  vehicle_type: z.string().min(1, {
    message: "Mashina turini tanlang",
  }),
  price: z.coerce.number().optional(),
  description: z.string().optional(),
})

export default function AddCargoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { useCreateCargo } = useApiHooks()
  const createCargoMutation = useCreateCargo()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      weight: undefined,
      origin: "",
      destination: "",
      vehicle_type: "",
      price: undefined,
      description: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      await createCargoMutation.mutateAsync(values)
      router.push("/profile")
    } catch (error) {
      console.error("Error adding cargo:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <Package className="h-12 w-12 text-blue-700 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Yuk qo&apos;shish</h1>
              <p className="text-gray-600">Yuk ma&apos;lumotlarini to&apos;ldiring va platformaga joylashtiring</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Yuk nomi</FormLabel>
                        <FormControl>
                          <Input placeholder="Yuk nomini kiriting" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="origin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Olish manzili</FormLabel>
                          <FormControl>
                            <Input placeholder="Olish manzilini kiriting" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="destination"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Yetkazish manzili</FormLabel>
                          <FormControl>
                            <Input placeholder="Yetkazish manzilini kiriting" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Yuk og&apos;irligi (tonna)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" placeholder="Yuk og'irligini kiriting" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Narxi (so&apos;m)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Narxni kiriting" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="vehicle_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Yuk mashina turi</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Mashina turini tanlang" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Tentli">Tentli</SelectItem>
                            <SelectItem value="Bortli">Bortli</SelectItem>
                            <SelectItem value="Refrijerator">Refrijerator</SelectItem>
                            <SelectItem value="Konteyner">Konteyner</SelectItem>
                            <SelectItem value="Samosval">Samosval</SelectItem>
                            <SelectItem value="Ploshadka">Ploshadka</SelectItem>
                            <SelectItem value="Shalanda">Shalanda</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Yuk haqida batafsil ma&apos;lumot</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Yuk haqida qo'shimcha ma'lumotlarni kiriting"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting || createCargoMutation.isPending}>
                      {isSubmitting || createCargoMutation.isPending ? (
                        <>
                          <span className="animate-spin mr-2">
                            <svg className="h-4 w-4" viewBox="0 0 24 24">
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                          </span>
                          Yuklanmoqda...
                        </>
                      ) : (
                        <>
                          Yuk qo&apos;shish
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

