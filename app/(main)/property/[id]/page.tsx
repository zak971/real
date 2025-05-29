"use client"

import { useState, useEffect } from "react"
import { notFound, useParams } from "next/navigation"
import MediaNavigation from "@/components/MediaNavigation"
import PropertyInquiryForm from "@/components/PropertyInquiryForm"
import SimilarProperties from "@/components/SimilarProperties"
import PropertyDetails from "@/components/PropertyDetails"
import WhatsAppButton from "@/components/WhatsAppButton"
import type { Property } from "@/lib/types"

export default function PropertyPage() {
  const params = useParams()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchProperty()
    }
  }, [params.id])

  const fetchProperty = async () => {
    try {
      const response = await fetch(`/api/properties/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setProperty(data)
      } else {
        setProperty(null)
      }
    } catch (error) {
      console.error("Error fetching property:", error)
      setProperty(null)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property...</p>
        </div>
      </div>
    )
  }

  if (!property) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MediaNavigation property={property} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <PropertyDetails property={property} />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <PropertyInquiryForm property={property} />
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <SimilarProperties currentProperty={property} />
        </div>
      </div>
      
      <WhatsAppButton />
    </div>
  )
}
