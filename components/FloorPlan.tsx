"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Layout, ZoomIn, Download, Maximize } from "lucide-react"

interface FloorPlanProps {
  floorPlan?: string
  propertyTitle: string
  area: number
}

export default function FloorPlan({ floorPlan, propertyTitle, area }: FloorPlanProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (!floorPlan) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Layout className="h-5 w-5 mr-2" />
          Floor Plan
        </CardTitle>
        <p className="text-gray-600 text-sm">Detailed layout showing room dimensions and flow</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Floor Plan Image */}
        <div className="relative bg-gray-50 rounded-lg overflow-hidden aspect-[4/3] group cursor-pointer">
          <Image
            src={floorPlan || "/placeholder.svg"}
            alt={`Floor plan for ${propertyTitle}`}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        {/* Floor Plan Details */}
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Plan Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Total Area:</span>
                <span className="font-medium ml-2">{area.toLocaleString()} sq ft</span>
              </div>
              <div>
                <span className="text-gray-600">Scale:</span>
                <span className="font-medium ml-2">1:100</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Floor Plan Features</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Accurate room dimensions</li>
              <li>• Furniture placement suggestions</li>
              <li>• Door and window locations</li>
              <li>• Electrical and plumbing points</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
            <DialogTrigger asChild>
              <Button className="flex-1">
                <Maximize className="h-4 w-4 mr-2" />
                View Full Size
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl w-full">
              <DialogHeader>
                <DialogTitle>Floor Plan - {propertyTitle}</DialogTitle>
              </DialogHeader>
              <div className="relative bg-gray-50 rounded-lg overflow-hidden aspect-[4/3]">
                <Image
                  src={floorPlan || "/placeholder.svg"}
                  alt={`Floor plan for ${propertyTitle}`}
                  fill
                  className="object-contain p-4"
                />
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" asChild>
            <a href={floorPlan} download={`${propertyTitle}-floor-plan.jpg`}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
