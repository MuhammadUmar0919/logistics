"use client"

import { Carousel } from "@/components/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Mail, Phone, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TeamMember {
  id: number
  name: string
  position: string
  bio: string
  image: string
  contact: {
    email: string
    phone: string
  }
}

interface TeamCarouselProps {
  teamMembers: TeamMember[]
}

export function TeamCarousel({ teamMembers }: TeamCarouselProps) {
  // Group team members into sets of 2 for desktop, 1 for mobile
  const groupedMembers = []
  for (let i = 0; i < teamMembers.length; i += 2) {
    groupedMembers.push(teamMembers.slice(i, i + 2))
  }

  return (
    <Carousel autoSlideInterval={5000} className="max-w-5xl mx-auto">
      {groupedMembers.map((group, groupIndex) => (
        <div key={groupIndex} className="w-full px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {group.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (member.id % 2) }}
              >
                <Card className="overflow-hidden h-full border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-md card-hover">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg?height=256&width=384"}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="text-xl font-bold">{member.name}</h3>
                        <p className="text-white/90">{member.position}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <p className="text-muted-foreground mb-4">{member.bio}</p>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-primary" />
                        <a href={`mailto:${member.contact.email}`} className="hover:text-primary transition-colors">
                          {member.contact.email}
                        </a>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-primary" />
                        <a href={`tel:${member.contact.phone}`} className="hover:text-primary transition-colors">
                          {member.contact.phone}
                        </a>
                      </div>
                      <Button variant="default" size="sm" className="w-full mt-2 group">
                        <ExternalLink className="h-4 w-4 mr-2 transition-transform group-hover:translate-x-1" />
                        Batafsil ma&apos;lumot
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </Carousel>
  )
}

