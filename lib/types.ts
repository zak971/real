export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  type: "sale" | "rent"
  propertyType: "apartment" | "villa" | "house" | "commercial" | "land" | "penthouse" | "studio" | "duplex" | "bungalow" | "farmhouse" | "beach house" | "townhouse" | "condominium" | "office space" | "retail space" | "warehouse" | "industrial"
  bedrooms: number
  bathrooms: number
  area: number
  images: string[]
  amenities: string[]
  featured: boolean
  createdAt: string
  videoWalkthrough?: {
    provider: "youtube" | "vimeo" | "custom"
    url: string
    embedId?: string
    thumbnail?: string
  }
  floorPlan?: string
}

export interface ContactForm {
  name: string
  email: string
  phone: string
  message: string
}

export interface ListPropertyForm {
  ownerName: string
  email: string
  phone: string
  propertyTitle: string
  description: string
  location: string
  type: "sale" | "rent"
  propertyType: "apartment" | "villa" | "house" | "commercial" | "land" | "penthouse" | "studio" | "duplex" | "bungalow" | "farmhouse" | "beach house" | "townhouse" | "condominium" | "office space" | "retail space" | "warehouse" | "industrial"
  bedrooms: number
  bathrooms: number
  area: number
  price: number
  amenities: string[]
}

export interface SearchFilters {
  type: "all" | "sale" | "rent"
  location: string
  propertyType: string
  minPrice: number
  maxPrice: number
  bedrooms: number
}
