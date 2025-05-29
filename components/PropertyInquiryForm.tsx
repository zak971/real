"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MessageCircle, Calendar, CheckCircle } from 'lucide-react'
import type { Property } from "@/lib/types"
import { formatPrice } from "@/lib/utils"

interface PropertyInquiryFormProps {
  property: Property
}

interface InquiryForm {
  name: string
  email: string
  phone: string
  inquiryType: string
  message: string
  preferredContact: string
}

export default function PropertyInquiryForm({ property }: PropertyInquiryFormProps) {
  const [formData, setFormData] = useState<InquiryForm>({
    name: "",
    email: "",
    phone: "",
    inquiryType: "general",
    message: "",
    preferredContact: "phone",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<InquiryForm>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<InquiryForm> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    // Simulate inquiry submission
    setIsSubmitted(true)
  }

  const updateFormData = (field: keyof InquiryForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleWhatsAppInquiry = () => {
    alert('WhatsApp inquiry feature - Contact: +91 98765 43210')
  }

  const handleCallInquiry = () => {
    alert('Call feature - Contact: +91 98765 43210')
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h3 className="text-xl font-bold text-gray-900 mb-4">Inquiry Sent!</h3>
          <p className="text-gray-600 mb-6">Thank you for your interest. Our team will contact you within 2 hours.</p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline" className="w-full">
            Send Another Inquiry
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Contact Agent</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleCallInquiry} className="w-full" size="lg">
            <Phone className="h-4 w-4 mr-2" />
            Call Now
          </Button>

          <Button onClick={handleWhatsAppInquiry} className="w-full bg-green-600 hover:bg-green-700" size="lg">
            <MessageCircle className="h-4 w-4 mr-2" />
            WhatsApp Inquiry
          </Button>

          <Button variant="outline" className="w-full" size="lg">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Visit
          </Button>
        </CardContent>
      </Card>

      {/* Property Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">{formatPrice(property.price, property.type)}</div>
            <div className="text-gray-600">
              {property.bedrooms} bed • {property.bathrooms} bath • {property.area.toLocaleString()} sq ft
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inquiry Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Send Inquiry</CardTitle>
          <p className="text-gray-600 text-sm">Get detailed information about this property</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <Label>Inquiry Type</Label>
              <Select value={formData.inquiryType} onValueChange={(value) => updateFormData("inquiryType", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Information</SelectItem>
                  <SelectItem value="viewing">Schedule Viewing</SelectItem>
                  <SelectItem value="financing">Financing Options</SelectItem>
                  <SelectItem value="negotiation">Price Negotiation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Preferred Contact Method</Label>
              <Select
                value={formData.preferredContact}
                onValueChange={(value) => updateFormData("preferredContact", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone">Phone Call</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => updateFormData("message", e.target.value)}
                placeholder="Any specific questions or requirements..."
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              <Mail className="h-4 w-4 mr-2" />
              Send Inquiry
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
