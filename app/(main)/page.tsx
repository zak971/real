import React from "react"
import Hero from "@/components/Hero"
import SearchSection from "@/components/SearchSection"
import FeaturedProperties from "@/components/FeaturedProperties"
import ServicesSection from "@/components/ServicesSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import WhatsAppButton from "@/components/WhatsAppButton"

export default function Home() {
  return (
    <>
      <Hero />
      <SearchSection />
      <FeaturedProperties />
      <ServicesSection />
      <TestimonialsSection />
      <WhatsAppButton />
    </>
  )
} 