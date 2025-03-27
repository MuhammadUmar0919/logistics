"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Star, Truck, Package, User, Calendar, FileText } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAuth } from "@/lib/auth-provider"
import { useApiHooks } from "@/lib/api-hooks"

const profileFormSchema = z.object({
  vehicle_type: z.string().optional(),
  license_type: z.string().optional(),
  vehicle_capacity: z.coerce.number().min(0).optional(),
  experience: z.coerce.number().min(0).optional(),
})

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const { useUserCargos } = useApiHooks()
  const { data: userCargos, isLoading } = useUserCargos()
  const router = useRouter()

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      vehicle_type: user?.vehicle_type || "",
      license_type: user?.license_type || "",
      vehicle_capacity: user?.vehicle_capacity || 0,
      experience: user?.experience || 0,
    },
  })

  useEffect(() => {
    if (user) {
      form.reset({
        vehicle_type: user.vehicle_type || "",
        license_type: user.license_type || "",
        vehicle_capacity: user.vehicle_capacity || 0,
        experience: user.experience || 0,
      })
    }
  }, [user, form])

  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    try {
      await updateProfile(values)
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  if (!user) {
    router.push("/login")
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/4"
            >
              <Card>
                <CardHeader className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.phone_number}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-2 text-gray-500" />
                      <span>{user.email}</span>
                    </div>
                    {user.vehicle_type && (
                      <div className="flex items-center">
                        <Truck className="h-5 w-5 mr-2 text-gray-500" />
                        <span>{user.vehicle_type}</span>
                      </div>
                    )}
                    {user.license_type && (
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-gray-500" />
                        <span>Haydovchilik toifasi: {user.license_type}</span>
                      </div>
                    )}
                    {user.vehicle_capacity && (
                      <div className="flex items-center">
                        <Package className="h-5 w-5 mr-2 text-gray-500" />
                        <span>Mashina sig&apos;imi: {user.vehicle_capacity} tonna</span>
                      </div>
                    )}
                    {user.experience && (
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                        <span>Tajriba: {user.experience} yil</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <Button onClick={() => router.push("/add-cargo")} className="w-full">
                      <Package className="mr-2 h-4 w-4" />
                      Yuk qo&apos;shish
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:w-3/4"
            >
              <Tabs defaultValue="cargos">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="cargos">Yuklar tarixi</TabsTrigger>
                  <TabsTrigger value="ratings">Reyting va sharhlar</TabsTrigger>
                  <TabsTrigger value="settings">Sozlamalar</TabsTrigger>
                </TabsList>

                {/* Cargos Tab */}
                <TabsContent value="cargos">
                  <Card>
                    <CardHeader>
                      <CardTitle>Yuklar tarixi</CardTitle>
                      <CardDescription>Sizning barcha yuklar ro&apos;yxatingiz</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isLoading ? (
                        <div className="space-y-4">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="flex flex-col space-y-3">
                              <Skeleton className="h-5 w-40" />
                              <Skeleton className="h-4 w-full" />
                              <Skeleton className="h-4 w-full" />
                              <Skeleton className="h-4 w-3/4" />
                            </div>
                          ))}
                        </div>
                      ) : userCargos && userCargos.length > 0 ? (
                        <div className="space-y-6">
                          {userCargos.map((cargo) => (
                            <div
                              key={cargo.id}
                              className="border rounded-lg p-4 hover:border-blue-500 transition-colors"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold text-lg">{cargo.name}</h3>
                                  <p className="text-gray-500 text-sm">
                                    {new Date(cargo.created_at).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                  {cargo.status}
                                </div>
                              </div>

                              <div className="mt-3 grid grid-cols-2 gap-2">
                                <div>
                                  <p className="text-sm text-gray-500">Olish manzili</p>
                                  <p>{cargo.origin}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Yetkazish manzili</p>
                                  <p>{cargo.destination}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Og&apos;irligi</p>
                                  <p>{cargo.weight} tonna</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Mashina turi</p>
                                  <p>{cargo.vehicle_type}</p>
                                </div>
                              </div>

                              {cargo.price && (
                                <div className="mt-2">
                                  <p className="text-sm text-gray-500">Narxi</p>
                                  <p className="font-semibold">{cargo.price} so&apos;m</p>
                                </div>
                              )}

                              {cargo.description && (
                                <div className="mt-2">
                                  <p className="text-sm text-gray-500">Tavsif</p>
                                  <p>{cargo.description}</p>
                                </div>
                              )}

                              <div className="mt-4 flex justify-end">
                                <Button variant="outline" size="sm" onClick={() => router.push(`/cargos/${cargo.id}`)}>
                                  Batafsil
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium">Yuklar yo&apos;q</h3>
                          <p className="text-gray-500 mt-2">Siz hali hech qanday yuk joylashtirmagansiz</p>
                          <Button className="mt-4" onClick={() => router.push("/add-cargo")}>
                            Yuk qo&apos;shish
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Ratings Tab */}
                <TabsContent value="ratings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Reyting va sharhlar</CardTitle>
                      <CardDescription>Sizning reytingiz va mijozlar sharhlari</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center py-8">
                        <div className="flex items-center mb-4">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-8 w-8 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <p className="text-2xl font-bold">4.0</p>
                        <p className="text-gray-500">12 ta sharh asosida</p>

                        <div className="w-full mt-8 space-y-6">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="border-b pb-4">
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                  <Avatar className="h-10 w-10 mr-3">
                                    <AvatarFallback>MK</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">Mijoz {i}</p>
                                    <p className="text-sm text-gray-500">
                                      {new Date(2023, i, i * 5).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`h-4 w-4 ${
                                        star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p>Yuk o&apos;z vaqtida va sifatli yetkazib berildi. Haydovchi juda yaxshi inson ekan.</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Haydovchi ma&apos;lumotlari</CardTitle>
                      <CardDescription>Haydovchi sifatida ma&apos;lumotlaringizni to&apos;ldiring</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <FormField
                            control={form.control}
                            name="vehicle_type"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Mashina turi</FormLabel>
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
                            name="license_type"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Haydovchilik guvohnomasi toifasi</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Toifani tanlang" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="A">A</SelectItem>
                                    <SelectItem value="B">B</SelectItem>
                                    <SelectItem value="C">C</SelectItem>
                                    <SelectItem value="D">D</SelectItem>
                                    <SelectItem value="E">E</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="vehicle_capacity"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Mashina sig&apos;imi (tonna)</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="Mashina sig'imini kiriting" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="experience"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Haydovchilik tajribasi (yil)</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="Tajribangizni kiriting" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button type="submit">Ma&apos;lumotlarni saqlash</Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

