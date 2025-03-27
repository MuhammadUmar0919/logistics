"use client"

import { ArrowRight, DollarSign, MapPin, Truck } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import type { Cargo } from "@/lib/api-hooks"

interface RecentCargosSectionProps {
  cargos?: Cargo[]
}

export function RecentCargosSection({ cargos }: RecentCargosSectionProps) {
  if (!cargos || cargos.length === 0) return null

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 gradient-text">So&apos;nggi yuklar</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Platformada joylashtirilgan so&apos;nggi yuklar bilan tanishing
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cargos.slice(0, 3).map((cargo, index) => (
            <motion.div
              key={cargo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden card-hover h-full border border-border/50">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold">{cargo.name}</h3>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{cargo.status}</span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>Qayerdan: {cargo.origin}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>Qayerga: {cargo.destination}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Truck className="h-4 w-4 mr-2" />
                        <span>Transport turi: {cargo.vehicle_type}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <DollarSign className="h-4 w-4 mr-2" />
                        <span>Narxi: {cargo.price ? `${cargo.price} so'm` : "Kelishiladi"}</span>
                      </div>
                    </div>

                    <Button asChild variant="default" className="w-full group">
                      <Link href={`/cargos/${cargo.id}`}>
                        Batafsil ma&apos;lumot
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild size="lg" variant="default" className="group">
            <Link href="/cargos">
              Barcha yuklarni ko&apos;rish
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

