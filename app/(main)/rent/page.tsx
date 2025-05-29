import type { Metadata } from "next"
import PropertyListings from "@/components/PropertyListings"

export const metadata: Metadata = {
  title: "Properties for Rent in Goa | Find Your Perfect Rental",
  description:
    "Find properties for rent in Goa. Furnished apartments, villas, and houses available for short-term and long-term rental.",
}

export default function RentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Properties for Rent</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Find the perfect rental property in Goa. Furnished homes, luxury apartments, and budget-friendly options
            available.
          </p>
        </div>
      </div>
      <PropertyListings type="rent" />
    </div>
  )
}
