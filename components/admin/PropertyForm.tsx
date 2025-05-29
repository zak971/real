"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, X, Loader2 } from 'lucide-react'
import { toast } from "sonner"

interface Property {
  id?: string
  title: string
  description: string
  price: number
  location: string
  type: string
  propertyType: string
  bedrooms: number
  bathrooms: number
  area: number
  images: string[]
  amenities: string[]
  featured: boolean
  videoUrl?: string
  floorPlan?: string
}

interface PropertyFormProps {
  property?: Property | null
  onSave: () => void
  onCancel: () => void
}

const amenitiesList = [
  "Swimming Pool", "Garden", "Parking", "Security", "Elevator", 
  "Balcony", "Terrace", "Gym", "Beach Access", "Furnished", "AC", "WiFi"
]

const locations = [
  "Candolim", "Panaji", "Margao", "Baga", "Calangute", "Old Goa",
  "Anjuna", "Arambol", "Ponda", "Vasco da Gama"
]

export default function PropertyForm({ property, onSave, onCancel }: PropertyFormProps) {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof Property, string>>>({})
  const [formData, setFormData] = useState<Property>({
    title: "",
    description: "",
    price: 0,
    location: "",
    type: "sale",
    propertyType: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: 0,
    images: [],
    amenities: [],
    featured: false,
    videoUrl: "",
    floorPlan: "",
  })

  useEffect(() => {
    if (property) {
      setFormData(property)
    }
  }, [property])

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Property, string>> = {}

    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.location) newErrors.location = "Location is required"
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0"
    if (formData.area <= 0) newErrors.area = "Area must be greater than 0"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleImageUpload = async (files: FileList) => {
    setUploading(true)
    const uploadedImages: string[] = []

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("folder", "properties")

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error("Failed to upload image")
        }

        const result = await response.json()
        uploadedImages.push(result.url)
      }

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedImages],
      }))
      toast.success("Images uploaded successfully")
    } catch (error) {
      console.error("Error uploading image:", error)
      toast.error("Failed to upload images")
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
    toast.success("Image removed")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields")
      return
    }

    setLoading(true)

    try {
      const url = property?.id ? `/api/properties/${property.id}` : "/api/properties"
      const method = property?.id ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to save property")
      }

      toast.success(property?.id ? "Property updated successfully" : "Property added successfully")
      onSave()
    } catch (error) {
      console.error("Error saving property:", error)
      toast.error("Failed to save property")
    } finally {
      setLoading(false)
    }
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({ ...prev, amenities: [...prev.amenities, amenity] }))
    } else {
      setFormData(prev => ({ 
        ...prev, 
        amenities: prev.amenities.filter(a => a !== amenity) 
      }))
    }
  }

  const handleNumericInput = (field: keyof Property, value: string) => {
    const numericValue = value === "" ? 0 : Number(value)
    setFormData(prev => ({ 
      ...prev, 
      [field]: numericValue
    }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{property?.id ? "Edit Property" : "Add New Property"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Property Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className={errors.title ? "border-red-500" : ""}
                    required
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <Label>Location *</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value: string) => setFormData(prev => ({ ...prev, location: value }))}
                  >
                    <SelectTrigger className={errors.location ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className={errors.description ? "border-red-500" : ""}
                  required
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label>Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: string) => setFormData(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Property Type *</Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(value: string) => setFormData(prev => ({ ...prev, propertyType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="land">Plot/Land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price === 0 ? "" : formData.price}
                    onChange={(e) => handleNumericInput("price", e.target.value)}
                    className={errors.price ? "border-red-500" : ""}
                    required
                  />
                  {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {formData.propertyType !== "land" && (
                  <>
                    <div>
                      <Label htmlFor="bedrooms">Bedrooms *</Label>
                      <Input
                        id="bedrooms"
                        type="number"
                        value={formData.bedrooms === 0 ? "" : formData.bedrooms}
                        onChange={(e) => handleNumericInput("bedrooms", e.target.value)}
                        className={errors.bedrooms ? "border-red-500" : ""}
                        required
                      />
                      {errors.bedrooms && <p className="text-red-500 text-sm mt-1">{errors.bedrooms}</p>}
                    </div>

                    <div>
                      <Label htmlFor="bathrooms">Bathrooms *</Label>
                      <Input
                        id="bathrooms"
                        type="number"
                        value={formData.bathrooms === 0 ? "" : formData.bathrooms}
                        onChange={(e) => handleNumericInput("bathrooms", e.target.value)}
                        className={errors.bathrooms ? "border-red-500" : ""}
                        required
                      />
                      {errors.bathrooms && <p className="text-red-500 text-sm mt-1">{errors.bathrooms}</p>}
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="area">Area (sq ft) *</Label>
                  <Input
                    id="area"
                    type="number"
                    value={formData.area === 0 ? "" : formData.area}
                    onChange={(e) => handleNumericInput("area", e.target.value)}
                    className={errors.area ? "border-red-500" : ""}
                    required
                  />
                  {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
                </div>
              </div>

              {/* Images */}
              <div>
                <Label>Property Images</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                    className="hidden"
                    id="image-upload"
                    disabled={uploading}
                  />
                  <label
                    htmlFor="image-upload"
                    className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                      uploading ? "border-gray-300 bg-gray-50" : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="text-center">
                      {uploading ? (
                        <>
                          <Loader2 className="h-8 w-8 text-gray-400 mx-auto mb-2 animate-spin" />
                          <p className="text-gray-600">Uploading...</p>
                        </>
                      ) : (
                        <>
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">Click to upload images</p>
                        </>
                      )}
                    </div>
                  </label>
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Property ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
              </div>

              {/* Amenities */}
              <div>
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {amenitiesList.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={formData.amenities.includes(amenity)}
                        onCheckedChange={(checked: boolean) => handleAmenityChange(amenity, checked)}
                      />
                      <Label htmlFor={amenity}>{amenity}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optional Media */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="videoUrl">Video URL (Optional)</Label>
                  <Input
                    id="videoUrl"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                    placeholder="YouTube or Vimeo URL"
                  />
                </div>

                <div>
                  <Label htmlFor="floorPlan">Floor Plan URL (Optional)</Label>
                  <Input
                    id="floorPlan"
                    value={formData.floorPlan}
                    onChange={(e) => setFormData(prev => ({ ...prev, floorPlan: e.target.value }))}
                    placeholder="Floor plan image URL"
                  />
                </div>
              </div>

              {/* Featured Property */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked: boolean) => setFormData(prev => ({ ...prev, featured: checked }))}
                />
                <Label htmlFor="featured">Featured Property</Label>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  className={buttonVariants({ variant: "outline" })}
                  onClick={onCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Property"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
