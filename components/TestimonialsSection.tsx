"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    name: "Rajesh Sharma",
    location: "Mumbai (NRI Client)",
    rating: 5,
    text: "Excellent service! They helped me find the perfect vacation home in Candolim. The entire process was smooth and transparent.",
    property: "Beach Villa in Candolim",
  },
  {
    name: "Priya Menon",
    location: "Bangalore",
    rating: 5,
    text: "Professional and reliable. They understood our requirements perfectly and found us a beautiful family home in Margao.",
    property: "Family House in Margao",
  },
  {
    name: "David Johnson",
    location: "UK (NRI Client)",
    rating: 5,
    text: "As an NRI, I was concerned about the buying process. Their team made everything easy and handled all the paperwork efficiently.",
    property: "Luxury Apartment in Panaji",
  },
  {
    name: "Anita Desai",
    location: "Goa",
    rating: 5,
    text: "They helped us sell our property quickly at a great price. Highly recommend their services to anyone in Goa.",
    property: "Villa in Anjuna",
  },
]

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real experiences from satisfied clients who found their dream properties with us
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8 md:p-12">
              <div className="text-center">
                {/* Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 italic">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                {/* Client Info */}
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-gray-600">{testimonials[currentTestimonial].location}</p>
                  <p className="text-sm text-blue-600 mt-1">{testimonials[currentTestimonial].property}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <Button variant="outline" size="sm" onClick={prevTestimonial} className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <Button variant="outline" size="sm" onClick={nextTestimonial} className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
