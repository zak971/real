import type { Metadata } from "next"
import ContactForm from "@/components/ContactForm"
import ContactInfo from "@/components/ContactInfo"
import MapSection from "@/components/MapSection"

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch with Goa Real Estate Experts",
  description:
    "Contact our experienced real estate team in Goa. Get expert advice on buying, selling, or renting properties in Goa.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Ready to find your dream property in Goa? Get in touch with our expert team today.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <MapSection />
    </div>
  )
}
