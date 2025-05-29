"use client"

import { Card, CardContent } from "@/components/ui/card"
import PropertyImageGallery from "./PropertyImageGallery"
import type { Property } from "@/lib/types"

interface MediaNavigationProps {
  property: Property
}

export default function MediaNavigation({ property }: MediaNavigationProps) {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto">
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <PropertyImageGallery images={property.images} title={property.title} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
