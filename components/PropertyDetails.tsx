import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, Calendar, Home, CheckCircle } from 'lucide-react'
import type { Property } from "@/lib/types"
import { formatPrice } from "@/lib/utils"
import VideoWalkthrough from "@/components/VideoWalkthrough"
import FloorPlan from "@/components/FloorPlan"

interface PropertyDetailsProps {
  property: Property
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
    <div className="space-y-8">
      {/* Property Header */}
      <div>
        <div className="flex items-center space-x-4 mb-4">
          <Badge variant="secondary" className="text-sm">
            {property.type === "sale" ? "For Sale" : "For Rent"}
          </Badge>
          <Badge variant="outline" className="text-sm">
            {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}
          </Badge>
          {property.featured && <Badge className="bg-yellow-500 hover:bg-yellow-600 text-sm">Featured</Badge>}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{property.title}</h1>

        <div className="flex items-center text-gray-600 mb-6">
          <MapPin className="h-5 w-5 mr-2" />
          <span className="text-lg">{property.location}, Goa</span>
        </div>

        <div className="text-4xl font-bold text-blue-600 mb-6">{formatPrice(property.price, property.type)}</div>
      </div>

      {/* Property Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Home className="h-5 w-5 mr-2" />
            Property Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3 mx-auto">
                <Bed className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
              <div className="text-sm text-gray-600">Bedrooms</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3 mx-auto">
                <Bath className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
              <div className="text-sm text-gray-600">Bathrooms</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3 mx-auto">
                <Square className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{property.area.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Sq Ft</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3 mx-auto">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{new Date(property.createdAt).getFullYear()}</div>
              <div className="text-sm text-gray-600">Listed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>About This Property</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{property.description}</p>
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>Amenities & Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {property.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{amenity}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Video Walkthrough */}
      {property.videoWalkthrough && (
        <VideoWalkthrough videoWalkthrough={property.videoWalkthrough} propertyTitle={property.title} />
      )}

      {/* Floor Plan */}
      {property.floorPlan && (
        <FloorPlan floorPlan={property.floorPlan} propertyTitle={property.title} area={property.area} />
      )}

      {/* Location Map */}
      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <MapPin className="h-12 w-12 mx-auto mb-2" />
              <p>Interactive map would be displayed here</p>
              <p className="text-sm">Showing location in {property.location}, Goa</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
