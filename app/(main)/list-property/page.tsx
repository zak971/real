import type { Metadata } from "next"
import ListPropertyForm from "@/components/ListPropertyForm"

export const metadata: Metadata = {
  title: "List Your Property | Sell or Rent Your Property in Goa",
  description: "List your property for sale or rent in Goa. Get maximum exposure and the best price for your property.",
}

export default function ListPropertyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">List Your Property</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Get maximum exposure for your property. Our expert team will help you sell or rent your property at the best
            price.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ListPropertyForm />
      </div>
    </div>
  )
}
