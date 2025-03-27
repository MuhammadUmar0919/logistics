"use client"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Package,
  MapPin,
  TruckIcon,
  Weight,
  DollarSign,
  Calendar,
  User,
  Phone,
  Mail,
  MessageSquare,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useApiHooks } from "@/lib/api-hooks"
import { useAuth } from "@/lib/auth-provider"

const commentFormSchema = z.object({
  comment: z.string().min(3, {
    message: "Sharh kamida 3 ta belgidan iborat bo'lishi kerak",
  }),
})

export default function CargoDetailPage() {
  const { id } = useParams()
  const cargoId = Number.parseInt(id as string)
  const { useCargoById, useAddComment } = useApiHooks()
  const { data: cargo, isLoading, error } = useCargoById(cargoId)
  const addCommentMutation = useAddComment()
  const { user } = useAuth()
  const router = useRouter()

  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      comment: "",
    },
  })

  async function onSubmit(values: z.infer<typeof commentFormSchema>) {
    try {
      await addCommentMutation.mutateAsync({
        cargoId,
        comment: values.comment,
      })
      form.reset()
    } catch (error) {
      console.error("Error adding comment:", error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Orqaga
          </Button>

          {isLoading ? (
            <div className="space-y-8">
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-40" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-40" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-40" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : cargo ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <div className="mb-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{cargo.name}</h1>
                    <p className="text-gray-600">{new Date(cargo.created_at).toLocaleDateString()}</p>
                  </div>
                  <Badge className="text-sm px-3 py-1">{cargo.status}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Cargo Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Yuk ma&apos;lumotlari</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Olish manzili</p>
                          <p className="font-medium">{cargo.origin}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Yetkazish manzili</p>
                          <p className="font-medium">{cargo.destination}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Weight className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Og&apos;irligi</p>
                          <p className="font-medium">{cargo.weight} tonna</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <TruckIcon className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Mashina turi</p>
                          <p className="font-medium">{cargo.vehicle_type}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Yaratilgan sana</p>
                          <p className="font-medium">{new Date(cargo.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      {cargo.price && (
                        <div className="flex items-start">
                          <DollarSign className="h-5 w-5 mr-2 text-green-600 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Narxi</p>
                            <p className="font-medium text-green-600">{cargo.price} so&apos;m</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {cargo.description && (
                      <div>
                        <Separator className="my-4" />
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Yuk haqida batafsil ma&apos;lumot</p>
                          <p>{cargo.description}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Customer Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Mijoz ma&apos;lumotlari</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {cargo.customer ? (
                      <div className="space-y-6">
                        <div className="flex items-center">
                          <Avatar className="h-12 w-12 mr-4">
                            <AvatarFallback>{cargo.customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{cargo.customer.name}</p>
                            <p className="text-sm text-gray-500">Mijoz</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start">
                            <Phone className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                            <div>
                              <p className="text-sm text-gray-500">Telefon raqam</p>
                              <p className="font-medium">{cargo.customer.phone_number}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Mail className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                            <div>
                              <p className="text-sm text-gray-500">Email</p>
                              <p className="font-medium">{cargo.customer.email}</p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4">
                          <Button className="w-full">Bog&apos;lanish</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Mijoz ma&apos;lumotlari mavjud emas</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Comments Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Sharhlar</h2>

                {user ? (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Sharh qoldirish</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Textarea placeholder="Sharh yozing..." className="min-h-[100px]" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button type="submit" disabled={addCommentMutation.isPending}>
                            {addCommentMutation.isPending ? "Yuborilmoqda..." : "Yuborish"}
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="mb-6">
                    <CardContent className="py-6">
                      <p className="text-center">
                        Sharh qoldirish uchun{" "}
                        <Button variant="link" className="p-0 h-auto" onClick={() => router.push("/login")}>
                          tizimga kiring
                        </Button>
                      </p>
                    </CardContent>
                  </Card>
                )}

                {cargo.reviews && cargo.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {cargo.reviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="py-6">
                          <div className="flex items-start">
                            <Avatar className="h-10 w-10 mr-4">
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-2">
                                <p className="font-semibold">Foydalanuvchi</p>
                                <p className="text-sm text-gray-500">
                                  {new Date(review.created_at).toLocaleDateString()}
                                </p>
                              </div>
                              <p>{review.comment}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Hozircha sharhlar yo&apos;q. Birinchi bo&apos;lib sharh qoldiring!</p>
                  </div>
                )}
              </div>

              {/* Related Cargos */}
              <div>
                <h2 className="text-2xl font-bold mb-4">O&apos;xshash yuklar</h2>

                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Hozircha o&apos;xshash yuklar yo&apos;q</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Yuk topilmadi</h2>
              <p className="text-gray-600 mb-6">So&apos;ralgan yuk ma&apos;lumotlari topilmadi</p>
              <Button onClick={() => router.push("/cargos")}>Yuklar ro&apos;yxatiga qaytish</Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

