"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CheckCircle } from 'lucide-react'
import type { ListPropertyForm as ListPropertyFormType } from "@/lib/types"
import { locations, propertyTypes } from "@/lib/data"
import { getWhatsAppUrl } from "@/lib/utils"
import { cn } from "@/lib/utils"

const amenitiesList = [
  "Swimming Pool",
  "Garden",
  "Parking",
  "Security",
  "Elevator",
  "Balcony",
  "Terrace",
  "Gym",
  "Beach Access",
  "Furnished",
  "AC",
  "WiFi",
]

interface FormData {
  title: string;
  description: string;
  price: number;
  type: "sale" | "rent";
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
  amenities: string[];
  images: string[];
}

interface FormErrors {
  title?: string;
  description?: string;
  price?: string;
  type?: string;
  propertyType?: string;
  bedrooms?: string;
  bathrooms?: string;
  area?: string;
  location?: string;
  images?: string;
  amenities?: string;
  submit?: string;
}

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";

export default function ListPropertyForm() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: 0,
    type: "sale",
    propertyType: "",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    location: "",
    amenities: [],
    images: [],
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.price || formData.price <= 0) newErrors.price = "Price must be greater than 0"
    if (!formData.propertyType) newErrors.propertyType = "Property type is required"
    if (formData.propertyType !== "land") {
      if (!formData.bedrooms || formData.bedrooms <= 0) newErrors.bedrooms = "Bedrooms must be greater than 0"
      if (!formData.bathrooms || formData.bathrooms <= 0) newErrors.bathrooms = "Bathrooms must be greater than 0"
    }
    if (!formData.area || formData.area <= 0) newErrors.area = "Area must be greater than 0"
    if (!formData.location) newErrors.location = "Location is required"
    if (formData.images.length === 0) newErrors.images = "At least one image is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (!validateForm()) return
  
    setIsSubmitting(true)
    setErrors({})
  
    try {
      console.log("Submitting form data:", formData)
      const response = await fetch("/api/property-submission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
  
      const data = await response.json()
  
      if (response.ok) {
        setIsSubmitted(true)
        // Reset form
        setFormData({
          title: "",
          description: "",
          price: 0,
          type: "sale",
          propertyType: "",
          bedrooms: 0,
          bathrooms: 0,
          area: 0,
          location: "",
          amenities: [],
          images: [],
        })
      } else {
        console.error("Submission failed:", data)
        setErrors({
          submit: data.error || "Failed to submit property. Please try again."
        })
      }
    } catch (error) {
      console.error("Error submitting property:", error)
      setErrors({
        submit: "Failed to submit property. Please try again."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      updateFormData("amenities", [...formData.amenities, amenity])
    } else {
      updateFormData(
        "amenities",
        formData.amenities.filter((a) => a !== amenity),
      )
    }
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-12 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your property listing request has been submitted successfully. Our team will contact you within 24 hours to
            discuss the next steps.
          </p>
          <Button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          >
            List Another Property
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Property Details</CardTitle>
        <p className="text-gray-600">
          Fill in the details below to list your property. All fields marked with * are required.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.submit && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600">{errors.submit}</p>
            </div>
          )}
          {/* Owner Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>
            <div>
              <Label htmlFor="propertyType">Property Type</Label>
              <Select value={formData.propertyType} onValueChange={(value: string) => updateFormData("propertyType", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price || ""}
                onChange={(e) => updateFormData("price", Number(e.target.value))}
                placeholder={formData.type === "rent" ? "Monthly rent" : "Sale price"}
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <Label htmlFor="type">Listing Type</Label>
              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={() => updateFormData("type", "sale")}
                  className={cn(
                    "flex-1",
                    formData.type === "sale" ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  For Sale
                </Button>
                <Button
                  type="button"
                  onClick={() => updateFormData("type", "rent")}
                  className={cn(
                    "flex-1",
                    formData.type === "rent" ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  For Rent
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {formData.propertyType !== "land" && (
              <>
                <div>
                  <Label htmlFor="bedrooms">Bedrooms *</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={formData.bedrooms || ""}
                    onChange={(e) => updateFormData("bedrooms", Number(e.target.value))}
                    className={errors.bedrooms ? "border-red-500" : ""}
                  />
                  {errors.bedrooms && <p className="text-red-500 text-sm mt-1">{errors.bedrooms}</p>}
                </div>

                <div>
                  <Label htmlFor="bathrooms">Bathrooms *</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={formData.bathrooms || ""}
                    onChange={(e) => updateFormData("bathrooms", Number(e.target.value))}
                    className={errors.bathrooms ? "border-red-500" : ""}
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
                value={formData.area || ""}
                onChange={(e) => updateFormData("area", Number(e.target.value))}
                className={errors.area ? "border-red-500" : ""}
              />
              {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location *</Label>
            <Select value={formData.location} onValueChange={(value: string) => updateFormData("location", value)}>
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

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateFormData("description", e.target.value)}
              placeholder="Describe your property, its features, and what makes it special..."
              rows={4}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div>
            <Label>Amenities</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
              {amenitiesList.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={formData.amenities.includes(amenity)}
                    onCheckedChange={(checked: boolean) => {
                      const newAmenities = checked
                        ? [...formData.amenities, amenity]
                        : formData.amenities.filter((a) => a !== amenity);
                      updateFormData("amenities", newAmenities);
                    }}
                  />
                  <Label htmlFor={amenity} className="text-sm font-normal">
                    {amenity}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Images *</Label>
            <div className="mt-2">
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  const imageUrls = files.map((file) => URL.createObjectURL(file));
                  updateFormData("images", [...formData.images, ...imageUrls]);
                }}
                className={errors.images ? "border-red-500" : ""}
              />
              {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={image}
                    alt={`Property ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const newImages = formData.images.filter((_, i) => i !== index);
                      updateFormData("images", newImages);
                    }}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={Object.keys(errors).length > 0}
            >
              List Property
            </Button>
            <p className="text-sm text-gray-600 mt-2">
              By submitting this form, you agree to our terms and conditions. Our team will contact you within 24 hours.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
