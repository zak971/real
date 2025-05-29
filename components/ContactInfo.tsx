"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { getWhatsAppUrl } from "@/lib/utils"

export default function ContactInfo() {
  const handleWhatsAppClick = () => {
    alert('WhatsApp Contact: +91 98765 43210')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
                <p className="text-gray-600">+91 98765 43210</p>
                <p className="text-gray-600">+91 98765 43211</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600">info@goahomes.com</p>
                <p className="text-gray-600">sales@goahomes.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Office Address</h3>
                <p className="text-gray-600">
                  123 Real Estate Plaza,
                  <br />
                  Near Panaji Bus Stand,
                  <br />
                  Panaji, Goa 403001
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Office Hours</h3>
                <p className="text-gray-600">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                <p className="text-gray-600">Sunday: 10:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Button onClick={handleWhatsAppClick} className="w-full bg-green-600 hover:bg-green-700">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat on WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Response</h3>
          <p className="text-gray-600 mb-4">
            Need immediate assistance? Our team is available on WhatsApp for quick responses to your queries.
          </p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Property inquiries</li>
            <li>• Price negotiations</li>
            <li>• Site visits scheduling</li>
            <li>• Documentation assistance</li>
            <li>• Investment advice</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
