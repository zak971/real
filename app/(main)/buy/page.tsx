import type { Metadata } from "next"
import PropertyListings from "@/components/PropertyListings"

export const metadata: Metadata = {
  title: "Properties for Sale in Goa | Buy Your Dream Home",
  description:
    "Browse premium properties for sale in Goa. Luxury villas, modern apartments, and family homes available for purchase.",
}

export default function BuyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Properties for Sale</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Discover your dream property in Goa. From luxury villas to modern apartments, find the perfect home for your
            family or investment.
          </p>
        </div>
      </div>
      <PropertyListings type="sale" />
    </div>
  )
}
