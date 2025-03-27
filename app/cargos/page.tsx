"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Package, Search, Filter, MapPin, TruckIcon, Weight, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useApiHooks } from "@/lib/api-hooks"

const filterFormSchema = z.object({
  origin: z.string().optional(),
  destination: z.string().optional(),
  vehicle_type: z.string().optional(),
  min_weight: z.coerce.number().min(0).optional(),
  max_weight: z.coerce.number().min(0).optional(),
  min_price: z.coerce.number().min(0).optional(),
  max_price: z.coerce.number().min(0).optional(),
})

export default function CargosPage() {
  const [filteredCargos, setFilteredCargos] = useState<any[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const { useCargos } = useApiHooks()
  const { data: cargos, isLoading } = useCargos()
  const router = useRouter()

  const form = useForm<z.infer<typeof filterFormSchema>>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      origin: "",
      destination: "",
      vehicle_type: "",
      min_weight: 0,
      max_weight: 100,
      min_price: 0,
      max_price: 10000000,
    },
  })

  // Set filtered cargos when data is loaded
  useState(() => {
    if (cargos) {
      setFilteredCargos(cargos)
    }
  })

  function onSubmit(values: z.infer<typeof filterFormSchema>) {
    // Filter cargos based on form values
    if (!cargos) return

    const filtered = cargos.filter((cargo) => {
      // Origin filter
      if (values.origin && !cargo.origin.toLowerCase().includes(values.origin.toLowerCase())) {
        return false
      }

      // Destination filter
      if (values.destination && !cargo.destination.toLowerCase().includes(values.destination.toLowerCase())) {
        return false
      }

      // Vehicle type filter
      if (values.vehicle_type && cargo.vehicle_type !== values.vehicle_type) {
        return false
      }

      // Weight filter
      if (values.min_weight && cargo.weight < values.min_weight) {
        return false
      }
      if (values.max_weight && cargo.weight > values.max_weight) {
        return false
      }

      // Price filter
      if (values.min_price && cargo.price && cargo.price < values.min_price) {
        return false
      }
      if (values.max_price && cargo.price && cargo.price > values.max_price) {
        return false
      }

      return true
    })

    setFilteredCargos(filtered)
    setIsFilterOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar - Desktop Filter */}
            <div className="hidden md:block md:w-1/4">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    Yuk qidirish
                  </CardTitle>
                  <CardDescription>Qidiruv parametrlarini kiriting</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <Accordion type="single" collapsible defaultValue="location">
                        <AccordionItem value="location">
                          <AccordionTrigger>Manzil bo&apos;yicha</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <FormField
                                control={form.control}
                                name="origin"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Olish manzili</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Davlat, viloyat" {...field} />
                                    </FormControl>
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
                                      <Input placeholder="Davlat, viloyat" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="vehicle">
                          <AccordionTrigger>Mashina turi bo&apos;yicha</AccordionTrigger>
                          <AccordionContent>
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
                                      <SelectItem value="all">Barcha turlar</SelectItem>
                                      <SelectItem value="Tentli">Tentli</SelectItem>
                                      <SelectItem value="Bortli">Bortli</SelectItem>
                                      <SelectItem value="Refrijerator">Refrijerator</SelectItem>
                                      <SelectItem value="Konteyner">Konteyner</SelectItem>
                                      <SelectItem value="Samosval">Samosval</SelectItem>
                                      <SelectItem value="Ploshadka">Ploshadka</SelectItem>
                                      <SelectItem value="Shalanda">Shalanda</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="weight">
                          <AccordionTrigger>Og&apos;irlik diapazoni</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-6">
                              <FormField
                                control={form.control}
                                name="min_weight"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Minimal og&apos;irlik (tonna)</FormLabel>
                                    <FormControl>
                                      <Input type="number" placeholder="Minimal og'irlik" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="max_weight"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Maksimal og&apos;irlik (tonna)</FormLabel>
                                    <FormControl>
                                      <Input type="number" placeholder="Maksimal og'irlik" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="price">
                          <AccordionTrigger>Narx diapazoni</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-6">
                              <FormField
                                control={form.control}
                                name="min_price"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Minimal narx (so&apos;m)</FormLabel>
                                    <FormControl>
                                      <Input type="number" placeholder="Minimal narx" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="max_price"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Maksimal narx (so&apos;m)</FormLabel>
                                    <FormControl>
                                      <Input type="number" placeholder="Maksimal narx" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      <Button type="submit" className="w-full">
                        <Search className="mr-2 h-4 w-4" />
                        Qidirish
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Mobile Filter Button */}
            <div className="md:hidden mb-4">
              <Drawer open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrlash
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Yuk qidirish</DrawerTitle>
                    <DrawerDescription>Qidiruv parametrlarini kiriting</DrawerDescription>
                  </DrawerHeader>
                  <div className="px-4">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <Accordion type="single" collapsible defaultValue="location">
                          <AccordionItem value="location">
                            <AccordionTrigger>Manzil bo&apos;yicha</AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-4">
                                <FormField
                                  control={form.control}
                                  name="origin"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Olish manzili</FormLabel>
                                      <FormControl>
                                        <Input placeholder="Davlat, viloyat" {...field} />
                                      </FormControl>
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
                                        <Input placeholder="Davlat, viloyat" {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          {/* Other accordion items same as desktop */}
                          <AccordionItem value="vehicle">
                            <AccordionTrigger>Mashina turi bo&apos;yicha</AccordionTrigger>
                            <AccordionContent>
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
                                        <SelectItem value="">Barcha turlar</SelectItem>
                                        <SelectItem value="Tentli">Tentli</SelectItem>
                                        <SelectItem value="Bortli">Bortli</SelectItem>
                                        <SelectItem value="Refrijerator">Refrijerator</SelectItem>
                                        <SelectItem value="Konteyner">Konteyner</SelectItem>
                                        <SelectItem value="Samosval">Samosval</SelectItem>
                                        <SelectItem value="Ploshadka">Ploshadka</SelectItem>
                                        <SelectItem value="Shalanda">Shalanda</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormItem>
                                )}
                              />
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="weight">
                            <AccordionTrigger>Og&apos;irlik diapazoni</AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-6">
                                <FormField
                                  control={form.control}
                                  name="min_weight"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Minimal og&apos;irlik (tonna)</FormLabel>
                                      <FormControl>
                                        <Input type="number" placeholder="Minimal og'irlik" {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name="max_weight"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Maksimal og&apos;irlik (tonna)</FormLabel>
                                      <FormControl>
                                        <Input type="number" placeholder="Maksimal og'irlik" {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="price">
                            <AccordionTrigger>Narx diapazoni</AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-6">
                                <FormField
                                  control={form.control}
                                  name="min_price"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Minimal narx (so&apos;m)</FormLabel>
                                      <FormControl>
                                        <Input type="number" placeholder="Minimal narx" {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name="max_price"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Maksimal narx (so&apos;m)</FormLabel>
                                      <FormControl>
                                        <Input type="number" placeholder="Maksimal narx" {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>

                        <Button type="submit" className="w-full">
                          <Search className="mr-2 h-4 w-4" />
                          Qidirish
                        </Button>
                      </form>
                    </Form>
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Yopish</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>

            {/* Main Content */}
            <div className="md:w-3/4">
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Yuklar ro&apos;yxati</h1>
                <p className="text-gray-600">Platformadagi barcha yuklar ro&apos;yxati</p>
              </div>

              {isLoading ? (
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-32" />
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Skeleton className="h-10 w-24" />
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : filteredCargos.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {filteredCargos.map((cargo) => (
                    <motion.div
                      key={cargo.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card
                        className="hover:border-blue-500 transition-colors cursor-pointer"
                        onClick={() => router.push(`/cargos/${cargo.id}`)}
                      >
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{cargo.name}</CardTitle>
                              <CardDescription>{new Date(cargo.created_at).toLocaleDateString()}</CardDescription>
                            </div>
                            <Badge variant="outline" className="bg-blue-50">
                              {cargo.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                          </div>

                          {cargo.price && (
                            <div className="flex items-center mt-2">
                              <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                              <p className="font-semibold text-green-600">{cargo.price} so&apos;m</p>
                            </div>
                          )}

                          {cargo.description && (
                            <div className="mt-4">
                              <Separator className="mb-4" />
                              <p className="text-gray-700">{cargo.description}</p>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="flex justify-end">
                          <Button variant="outline" size="sm">
                            Batafsil
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-16">
                  <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">Yuklar topilmadi</h2>
                  <p className="text-gray-600 mb-6">Qidiruv parametrlarini o&apos;zgartirib ko&apos;ring</p>
                  <Button onClick={() => form.reset()}>Filtrlarni tozalash</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

