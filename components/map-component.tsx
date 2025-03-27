"use client"

import { useEffect, useRef, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"

interface MapComponentProps {
  address: string
  className?: string
}

export function MapComponent({ address, className }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [hasApiKey, setHasApiKey] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function checkApiKey() {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/map?address=${encodeURIComponent(address)}`)
        const data = await response.json()

        setHasApiKey(data.hasApiKey)

        if (data.hasApiKey) {
          // Load the map using the script tag approach
          // This way the API key is not directly exposed in the client code
          const loader = new Loader({
            apiKey: "", // We don't need to provide the key here as it's in the script tag
            version: "weekly",
          })

          loader
            .load()
            .then((google) => {
              if (!mapRef.current) return

              const geocoder = new google.maps.Geocoder()
              geocoder.geocode({ address }, (results, status) => {
                if (status === "OK" && results && results[0]) {
                  const map = new google.maps.Map(mapRef.current, {
                    center: results[0].geometry.location,
                    zoom: 15,
                    styles: [
                      {
                        featureType: "all",
                        elementType: "geometry.fill",
                        stylers: [{ weight: "2.00" }],
                      },
                      {
                        featureType: "all",
                        elementType: "geometry.stroke",
                        stylers: [{ color: "#9c9c9c" }],
                      },
                      {
                        featureType: "all",
                        elementType: "labels.text",
                        stylers: [{ visibility: "on" }],
                      },
                      {
                        featureType: "landscape",
                        elementType: "all",
                        stylers: [{ color: "#f2f2f2" }],
                      },
                      {
                        featureType: "landscape",
                        elementType: "geometry.fill",
                        stylers: [{ color: "#e6f3f7" }],
                      },
                      {
                        featureType: "landscape.man_made",
                        elementType: "geometry.fill",
                        stylers: [{ color: "#e6f3f7" }],
                      },
                      {
                        featureType: "poi",
                        elementType: "all",
                        stylers: [{ visibility: "off" }],
                      },
                      {
                        featureType: "road",
                        elementType: "all",
                        stylers: [{ saturation: -100 }, { lightness: 45 }],
                      },
                      {
                        featureType: "road",
                        elementType: "geometry.fill",
                        stylers: [{ color: "#eeeeee" }],
                      },
                      {
                        featureType: "road",
                        elementType: "labels.text.fill",
                        stylers: [{ color: "#7b7b7b" }],
                      },
                      {
                        featureType: "road",
                        elementType: "labels.text.stroke",
                        stylers: [{ color: "#ffffff" }],
                      },
                      {
                        featureType: "road.highway",
                        elementType: "all",
                        stylers: [{ visibility: "simplified" }],
                      },
                      {
                        featureType: "road.arterial",
                        elementType: "labels.icon",
                        stylers: [{ visibility: "off" }],
                      },
                      {
                        featureType: "transit",
                        elementType: "all",
                        stylers: [{ visibility: "off" }],
                      },
                      {
                        featureType: "water",
                        elementType: "all",
                        stylers: [{ color: "#46bcec" }, { visibility: "on" }],
                      },
                      {
                        featureType: "water",
                        elementType: "geometry.fill",
                        stylers: [{ color: "#3b82f6" }],
                      },
                      {
                        featureType: "water",
                        elementType: "labels.text.fill",
                        stylers: [{ color: "#ffffff" }],
                      },
                      {
                        featureType: "water",
                        elementType: "labels.text.stroke",
                        stylers: [{ color: "#3b82f6" }],
                      },
                    ],
                  })

                  const marker = new google.maps.Marker({
                    map,
                    position: results[0].geometry.location,
                    icon: {
                      path: google.maps.SymbolPath.CIRCLE,
                      scale: 10,
                      fillColor: "#3b82f6",
                      fillOpacity: 1,
                      strokeWeight: 2,
                      strokeColor: "#FFFFFF",
                    },
                    animation: google.maps.Animation.DROP,
                  })

                  const infoWindow = new google.maps.InfoWindow({
                    content: `<div style="padding: 10px; max-width: 200px;">
                            <h3 style="margin: 0 0 5px; font-weight: bold; color: #3b82f6;">Logistika</h3>
                            <p style="margin: 0;">${address}</p>
                          </div>`,
                  })

                  marker.addListener("click", () => {
                    infoWindow.open(map, marker)
                  })

                  // Open info window by default
                  infoWindow.open(map, marker)
                } else {
                  setError("Manzilni topishda xatolik yuz berdi")
                }
              })
            })
            .catch((err) => {
              setError("Xaritani yuklashda xatolik yuz berdi")
              console.error("Error loading Google Maps:", err)
            })
            .finally(() => {
              setIsLoading(false)
            })
        } else {
          setIsLoading(false)
        }
      } catch (err) {
        setError("Serverga ulanishda xatolik yuz berdi")
        setIsLoading(false)
        console.error("Error checking API key:", err)
      }
    }

    checkApiKey()
  }, [address])

  if (isLoading) {
    return (
      <div
        className={`w-full h-[400px] rounded-lg overflow-hidden shadow-lg ${className} bg-card flex items-center justify-center`}
      >
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Xarita yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div
        className={`w-full h-[400px] rounded-lg overflow-hidden shadow-lg ${className} bg-card flex items-center justify-center`}
      >
        <p className="text-muted-foreground">{error}</p>
      </div>
    )
  }

  if (!hasApiKey) {
    return (
      <div
        className={`w-full h-[400px] rounded-lg overflow-hidden shadow-lg ${className} bg-card flex items-center justify-center`}
      >
        <p className="text-muted-foreground">
          Google Maps API kaliti mavjud emas. Xaritani ko'rish uchun API kalitini sozlamalaringizga qo'shing.
        </p>
      </div>
    )
  }

  return <div ref={mapRef} className={`w-full h-[400px] rounded-lg overflow-hidden shadow-lg ${className}`} />
}

