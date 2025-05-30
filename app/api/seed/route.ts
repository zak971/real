import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

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

export async function POST(request: NextRequest) {
  try {
    console.log("Starting database seeding...")
    console.log("Environment check:", {
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasDirectUrl: !!process.env.DIRECT_URL,
      nodeEnv: process.env.NODE_ENV,
      databaseUrl: process.env.DATABASE_URL?.substring(0, 20) + "...", // Log first 20 chars for safety
      directUrl: process.env.DIRECT_URL?.substring(0, 20) + "..." // Log first 20 chars for safety
    })
    
    // Test database connection
    try {
      console.log("Attempting database connection...")
      await db.$connect()
      console.log("Database connection successful")
      
      // Test a simple query
      const count = await db.property.count()
      console.log("Current property count:", count)
    } catch (error) {
      console.error("Database connection failed:", error)
      return NextResponse.json({ 
        error: "Database connection failed", 
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      }, { status: 500 })
    }

    // Clear existing properties
    console.log("Clearing existing properties...")
    try {
    await db.property.deleteMany()
      console.log("Existing properties cleared")
    } catch (error) {
      console.error("Error clearing properties:", error)
      return NextResponse.json({ 
        error: "Failed to clear existing properties",
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      }, { status: 500 })
    }

    // Create sample properties
    console.log("Creating sample properties...")
    try {
    const properties = await Promise.all(
      sampleProperties.map((property) =>
        db.property.create({
          data: property,
        })
      )
    )
      console.log(`Created ${properties.length} properties`)
    return NextResponse.json({
      message: "Database seeded successfully",
      count: properties.length,
      properties,
    })
    } catch (error) {
      console.error("Error creating properties:", error)
      return NextResponse.json({ 
        error: "Failed to create properties",
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      }, { status: 500 })
    }
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Failed to seed database",
      details: error,
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  } finally {
    await db.$disconnect()
  }
}
