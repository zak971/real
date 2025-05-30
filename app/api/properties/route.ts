import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import type { Property } from "@/lib/types"

export const revalidate = 0 // Disable revalidation to always fetch fresh data

export async function GET(request: NextRequest) {
  try {
    console.log("=== Properties API Debug ===")
    console.log("Request URL:", request.url)
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

    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get("limit") || "10")
    const page = parseInt(searchParams.get("page") || "1")
    const type = searchParams.get("type")
    const propertyType = searchParams.get("propertyType")
    const location = searchParams.get("location")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const bedrooms = searchParams.get("bedrooms")
    const featured = searchParams.get("featured")

    const where: any = {}

    if (type) where.type = type
    if (propertyType) where.propertyType = propertyType
    if (location) where.location = { contains: location, mode: "insensitive" }
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseInt(minPrice)
      if (maxPrice) where.price.lte = parseInt(maxPrice)
    }

    // Bedrooms filter
    if (bedrooms && !isNaN(parseInt(bedrooms))) {
      where.bedrooms = { gte: parseInt(bedrooms) }
    }

    // Featured filter
    if (featured === "true") {
      where.featured = true
    }

    console.log("Query parameters:", { limit, page, where })

    try {
      const [properties, total] = await Promise.all([
        db.property.findMany({
          where,
          take: limit,
          skip: (page - 1) * limit,
          orderBy: { createdAt: "desc" },
        }),
        db.property.count({ where }),
      ])

      console.log(`Found ${properties.length} properties out of ${total} total`)
      console.log("Properties:", properties.map((p: Property) => ({ 
        id: p.id, 
        title: p.title,
        type: p.type,
        featured: p.featured
      })))

      const response = NextResponse.json({
        properties,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      })

      // Disable caching to always get fresh data
      response.headers.set('Cache-Control', 'no-store, must-revalidate')
      response.headers.set('Pragma', 'no-cache')
      response.headers.set('Expires', '0')

      return response
    } catch (error) {
      console.error("Error fetching properties from database:", error)
      throw error
    }
  } catch (error) {
    console.error("Error in properties API:", error)
    return NextResponse.json({ 
      error: "Failed to fetch properties",
      details: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  } finally {
    await db.$disconnect()
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const property = await db.property.create({
      data: {
        title: data.title,
        description: data.description,
        price: parseFloat(data.price),
        location: data.location,
        type: data.type,
        propertyType: data.propertyType,
        bedrooms: parseInt(data.bedrooms),
        bathrooms: parseInt(data.bathrooms),
        area: parseFloat(data.area),
        images: data.images || [],
        amenities: data.amenities || [],
        featured: data.featured || false,
        videoUrl: data.videoUrl,
        floorPlan: data.floorPlan,
      },
    })

    return NextResponse.json(property, { status: 201 })
  } catch (error) {
    console.error("Error creating property:", error)
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 })
  }
}
