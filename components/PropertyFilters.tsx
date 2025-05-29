"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { SearchFilters } from "@/lib/types"
import { propertyTypes } from "@/lib/data"

interface PropertyFiltersProps {
  onFiltersChange: (filters: SearchFilters) => void
  initialFilters: SearchFilters
}

const locations = [
  "Panaji",
  "Mapusa",
  "Margao",
  "Vasco",
  "Calangute",
  "Candolim",
  "Baga",
  "Anjuna",
  "Morjim",
  "Arambol",
]

export function PropertyFilters({ onFiltersChange, initialFilters }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    ...initialFilters,
    minPrice: initialFilters.minPrice || 0,
    maxPrice: initialFilters.maxPrice || 0,
    bedrooms: initialFilters.bedrooms || 0,
  })

  const handleFilterChange = (key: keyof SearchFilters, value: string | number) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters: SearchFilters = {
      type: filters.type,
      location: "all",
      propertyType: "all",
      minPrice: 0,
      maxPrice: 0,
      bedrooms: 0,
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-4">
        <div>
          <Label htmlFor="location">Location</Label>
          <Select
            value={filters.location}
            onValueChange={(value: string) => handleFilterChange("location", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="propertyType">Property Type</Label>
          <Select
            value={filters.propertyType}
            onValueChange={(value: string) => handleFilterChange("propertyType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select property type" />
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

        <div>
          <Label htmlFor="priceRange">Price Range</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", Number(e.target.value) || 0)}
                min={0}
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Select
            value={filters.bedrooms.toString()}
            onValueChange={(value: string) => handleFilterChange("bedrooms", Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select bedrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        className="w-full"
        onClick={clearFilters}
      >
        Clear Filters
      </Button>
    </div>
  )
}
