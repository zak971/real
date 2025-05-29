"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { locations, propertyTypes } from "@/lib/data"

export default function SearchSection() {
  const router = useRouter()
  const [searchParams, setSearchParams] = useState({
    type: "all",
    location: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
  })

  const handleSearch = () => {
    const params = new URLSearchParams()
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })

    const targetPage = searchParams.type === "rent" ? "/rent" : searchParams.type === "sale" ? "/buy" : "/buy"
    router.push(`${targetPage}?${params.toString()}`)
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Property</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Search through our extensive collection of premium properties in Goa
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Property Type */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <Select
                value={searchParams.type}
                onValueChange={(value: string) => setSearchParams({ ...searchParams, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Buy/Rent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="sale">Buy</SelectItem>
                  <SelectItem value="rent">Rent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <Select
                value={searchParams.location}
                onValueChange={(value: string) => setSearchParams({ ...searchParams, location: value })}
              >
                <SelectTrigger>
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
            </div>

            {/* Property Type */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Property</label>
              <Select
                value={searchParams.propertyType}
                onValueChange={(value: string) => setSearchParams({ ...searchParams, propertyType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Min Price */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
              <Input
                type="number"
                placeholder="Min Price"
                value={searchParams.minPrice}
                onChange={(e) => setSearchParams({ ...searchParams, minPrice: e.target.value })}
                min={0}
              />
            </div>

            {/* Max Price */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
              <Input
                type="number"
                placeholder="Max Price"
                value={searchParams.maxPrice}
                onChange={(e) => setSearchParams({ ...searchParams, maxPrice: e.target.value })}
                min={0}
              />
            </div>

            {/* Search Button */}
            <div className="lg:col-span-1 flex items-end">
              <Button onClick={handleSearch} className="w-full bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
