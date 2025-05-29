"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import PropertyCard from "@/components/PropertyCard"
import type { Property } from "@/lib/types"

interface SimilarPropertiesProps {
  currentProperty: Property
}

export default function SimilarProperties({ currentProperty }: SimilarPropertiesProps) {
  const [similarProperties, setSimilarProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSimilarProperties()
  }, [currentProperty])

  const fetchSimilarProperties = async () => {
    try {
      // Fetch properties with the same property type
      const params = new URLSearchParams({
        propertyType: currentProperty.propertyType,
        limit: "3",
        exclude: currentProperty.id
      })

      const response = await fetch(`/api/properties?${params}`)
      const data = await response.json()
      setSimilarProperties(data.properties || [])
    } catch (error) {
      console.error("Error fetching similar properties:", error)
      setSimilarProperties([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">More {currentProperty.propertyType.charAt(0).toUpperCase() + currentProperty.propertyType.slice(1)}s</h2>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading similar properties...</p>
        </div>
      </section>
    )
  }

  if (similarProperties.length === 0) {
    return null
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">More {currentProperty.propertyType.charAt(0).toUpperCase() + currentProperty.propertyType.slice(1)}s</h2>
        <Button asChild className={buttonVariants({ variant: "outline", className: "text-black" })}>
          <Link href={currentProperty.type === "sale" ? "/buy" : "/rent"}>View All Properties</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {similarProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  )
}
