import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const sampleProperties = [
  {
    title: "Luxury Beach Villa in Candolim",
    description: "Stunning 4-bedroom villa with private pool and beach access. Perfect for luxury living or investment. This magnificent property features contemporary architecture with traditional Goan elements.",
    price: 25000000,
    location: "Candolim",
    type: "sale",
    propertyType: "villa",
    bedrooms: 4,
    bathrooms: 3,
    area: 3500,
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    amenities: ["Swimming Pool", "Beach Access", "Garden", "Parking", "Security", "Furnished", "AC", "WiFi"],
    featured: true,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    floorPlan: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Modern Apartment in Panaji",
    description: "Contemporary 2-bedroom apartment in the heart of Panaji with city views. This stylish apartment offers modern living with premium finishes.",
    price: 8500000,
    location: "Panaji",
    type: "sale",
    propertyType: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    amenities: ["Elevator", "Parking", "Balcony", "Security", "AC", "Furnished"],
    featured: false,
  },
  {
    title: "Cozy House in Margao",
    description: "Perfect family home with 3 bedrooms and a beautiful garden. Located in a quiet residential area with easy access to schools and markets.",
    price: 45000,
    location: "Margao",
    type: "rent",
    propertyType: "house",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    amenities: ["Garden", "Parking", "Furnished", "AC", "Security"],
    featured: true,
  },
]

async function main() {
  try {
    // Clear existing properties
    await prisma.property.deleteMany()

    // Create sample properties
    const properties = await Promise.all(
      sampleProperties.map((property) =>
        prisma.property.create({
          data: property,
        })
      )
    )

    console.log('Database seeded successfully')
    console.log(`Created ${properties.length} properties`)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main() 