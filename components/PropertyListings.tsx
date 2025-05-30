"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import PropertyCard from "@/components/PropertyCard"
import { PropertyFilters } from "@/components/PropertyFilters"
import type { Property, SearchFilters } from "@/lib/types"
import { Button, buttonVariants } from "@/components/ui/button"
import { Grid, List } from 'lucide-react'

interface PropertyListingsProps {
  type: "sale" | "rent"
}

export default function PropertyListings({ type }: PropertyListingsProps) {
  const searchParams = useSearchParams()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const propertiesPerPage = 8

  const [filters, setFilters] = useState<SearchFilters>({
    type: type,
    location: searchParams.get("location") || "all",
    propertyType: searchParams.get("propertyType") || "all",
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : 0,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 0,
    bedrooms: searchParams.get("bedrooms") ? Number(searchParams.get("bedrooms")) : 0,
  })

  useEffect(() => {
    console.log("PropertyListings: Component mounted")
    fetchProperties()
    // Refresh properties every 30 seconds
    const interval = setInterval(fetchProperties, 30000)
    return () => clearInterval(interval)
  }, [filters, currentPage, type])

  const fetchProperties = async () => {
    console.log("PropertyListings: Fetching properties with filters:", filters)
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: propertiesPerPage.toString(),
        type: type,
      })

      if (filters.location && filters.location !== "all") {
        params.set("location", filters.location)
      }
      if (filters.propertyType && filters.propertyType !== "all") {
        params.set("propertyType", filters.propertyType)
      }
      if (filters.minPrice > 0) {
        params.set("minPrice", filters.minPrice.toString())
      }
      if (filters.maxPrice > 0) {
        params.set("maxPrice", filters.maxPrice.toString())
      }
      if (filters.bedrooms > 0) {
        params.set("bedrooms", filters.bedrooms.toString())
      }

      const url = `/api/properties?${params}`
      console.log("PropertyListings: Fetching from URL:", url)

      const response = await fetch(url, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("PropertyListings: Received data:", data)
      
      if (!data.properties) {
        console.error("PropertyListings: No properties in response data")
        setProperties([])
        return
      }

      setProperties(data.properties)
      setTotalPages(data.pagination?.pages || 1)
    } catch (error) {
      console.error("PropertyListings: Error fetching properties:", error)
      setProperties([])
    } finally {
      setLoading(false)
    }
  }

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <PropertyFilters onFiltersChange={handleFiltersChange} initialFilters={filters} />
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{properties.length} Properties Found</h2>
              <p className="text-gray-600">{type === "sale" ? "Properties for Sale" : "Properties for Rent"} in Goa</p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                className={buttonVariants({ 
                  variant: viewMode === "grid" ? "default" : "outline",
                  size: "sm"
                })}
                onClick={() => setViewMode("grid")}
              >
                <Grid className={`h-4 w-4 ${viewMode === "grid" ? "text-white" : "text-black"}`} />
              </Button>
              <Button
                className={buttonVariants({ 
                  variant: viewMode === "list" ? "default" : "outline",
                  size: "sm"
                })}
                onClick={() => setViewMode("list")}
              >
                <List className={`h-4 w-4 ${viewMode === "list" ? "text-white" : "text-black"}`} />
              </Button>
            </div>
          </div>

          {/* Properties Grid/List */}
          {properties.length > 0 ? (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "flex flex-col divide-y divide-blue-200"}>
              {properties.map((property) => (
                <div key={property.id} className={viewMode === "list" ? "py-6 first:pt-0 last:pb-0" : ""}>
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">No properties found</h3>
              <p className="text-gray-600 mb-8">Try adjusting your search filters to find more properties.</p>
              <Button
                className={buttonVariants({ variant: "default" })}
                onClick={() =>
                  handleFiltersChange({
                    type: type,
                    location: "all",
                    propertyType: "all",
                    minPrice: 0,
                    maxPrice: 0,
                    bedrooms: 0,
                  })
                }
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                <Button
                  className={buttonVariants({ variant: "outline" })}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  className={buttonVariants({ variant: "outline" })}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
