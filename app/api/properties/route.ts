import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export const revalidate = 3600 // Revalidate every hour

export async function GET(request: NextRequest) {
  try {
    console.log("Fetching properties...")
    console.log("Environment check:", {
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasDirectUrl: !!process.env.DIRECT_URL,
      nodeEnv: process.env.NODE_ENV
    })

    // Test database connection
    try {
      console.log("Attempting database connection...")
      await db.$connect()
      console.log("Database connection successful")
    } catch (error) {
      console.error("Database connection failed:", error)
      return NextResponse.json({ 
        error: "Database connection failed", 
        details: error instanceof Error ? error.message : String(error)
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

    const response = NextResponse.json({
      properties,
      total,
        page,
      totalPages: Math.ceil(total / limit),
    })

    // Add cache control headers
    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')

    return response
  } catch (error) {
    console.error("Error fetching properties:", error)
    return NextResponse.json({ 
      error: "Failed to fetch properties",
      details: error instanceof Error ? error.message : String(error)
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
