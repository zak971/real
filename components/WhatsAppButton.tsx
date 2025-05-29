"use client"

import { MessageCircle } from 'lucide-react'
import { getWhatsAppUrl } from "@/lib/utils"

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    alert('WhatsApp Contact: +91 98765 43210\nMessage: Hi! I\'m interested in your real estate services.')
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  )
}
