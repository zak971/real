"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { MapPin, Bed, Bath, Square, Eye, Calendar, Shield, Car, Trees } from 'lucide-react'
import type { Property } from "@/lib/types"
import { formatPrice } from "@/lib/utils"

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  // Map amenity names to icons
  const amenityIcons: Record<string, any> = {
    "Security": Shield,
    "Parking": Car,
  }

  // Fixed amenities to display
  const displayAmenities = ["Security", "Parking"]

  // Check if property is land/plot
  const isLand = property.propertyType === "land"

  return (
    <Link href={`/property/${property.id}`}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 bg-white">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.images[0] || "/placeholder.svg"}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority={property.featured}
            loading={property.featured ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Property Type Badge */}
          <div className="absolute top-3 left-3 z-10 flex gap-2">
            <Badge className={`${property.type === "sale" ? "bg-blue-600" : "bg-gray-600"} text-white shadow-lg px-2.5 py-0.5 text-sm`}>
            {property.type === "sale" ? "For Sale" : "For Rent"}
          </Badge>
            {property.featured && (
              <Badge className="bg-yellow-500 text-white border-0 shadow-lg px-2.5 py-0.5 text-sm">
                Featured
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-5">
          <div className="space-y-3">
            {/* Enhanced Title and Location Section */}
            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-gray-900 line-clamp-2 min-h-[2.5rem] group-hover:text-blue-600 transition-colors duration-300">
                {property.title}
              </h3>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 flex-shrink-0 text-blue-600" />
                <span className="text-sm font-medium text-gray-700 line-clamp-1">{property.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              {isLand ? (
                <>
                  <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <div className="bg-blue-100 p-1.5 rounded-md">
                      <Bed className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-base font-semibold text-gray-900">0</div>
                      <div className="text-xs text-gray-500">Bedrooms</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <div className="bg-blue-100 p-1.5 rounded-md">
                      <Bath className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-base font-semibold text-gray-900">0</div>
                      <div className="text-xs text-gray-500">Bathrooms</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <div className="bg-blue-100 p-1.5 rounded-md">
                      <Square className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-base font-semibold text-gray-900">{property.area.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Sq Ft</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <div className="bg-blue-100 p-1.5 rounded-md">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-base font-semibold text-gray-900">{new Date(property.createdAt).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500">Listed</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <div className="bg-blue-100 p-1.5 rounded-md">
                      <Bed className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-base font-semibold text-gray-900">{property.bedrooms}</div>
                      <div className="text-xs text-gray-500">{property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <div className="bg-blue-100 p-1.5 rounded-md">
                      <Bath className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-base font-semibold text-gray-900">{property.bathrooms}</div>
                      <div className="text-xs text-gray-500">{property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</div>
                    </div>
          </div>
                </>
              )}
            </div>

            {/* Additional Amenities */}
            {!isLand && (
              <div className="grid grid-cols-2 gap-3">
                {displayAmenities.map((amenity, index) => {
                  const Icon = amenityIcons[amenity]
                  return (
                    <div key={index} className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                      <div className="bg-blue-100 p-1.5 rounded-md">
                        <Icon className="h-4 w-4 text-blue-600" />
            </div>
                      <div>
                        <div className="text-base font-semibold text-gray-900">{amenity}</div>
                        <div className="text-xs text-gray-500">Available</div>
            </div>
          </div>
                  )
                })}
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-gray-500">
                <Calendar className="h-3.5 w-3.5" />
                <span className="text-xs">Listed {new Date(property.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-xl font-bold text-blue-600">
                {formatPrice(property.price, property.type)}
              </p>
          </div>

            <div className="mt-3">
              <Button 
                className={buttonVariants({ 
                  variant: "default", 
                  size: "sm",
                  className: "w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-sm text-sm"
                })}
              >
                <Eye className="h-4 w-4 mr-1.5" />
                View Details
            </Button>
            </div>
          </div>
        </CardContent>
    </Card>
    </Link>
  )
}
