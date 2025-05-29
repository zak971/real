import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export const revalidate = 3600 // Revalidate every hour

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const type = searchParams.get("type")
    const location = searchParams.get("location")
    const propertyType = searchParams.get("propertyType")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const bedrooms = searchParams.get("bedrooms")
    const featured = searchParams.get("featured")

    const skip = (page - 1) * limit

    const where: any = {}

    // Type filter
    if (type && type !== "all") {
      where.type = type
    }

    // Location filter
    if (location && location !== "all") {
      where.location = {
        equals: location,
        mode: 'insensitive'
      }
    }

    // Property type filter
    if (propertyType && propertyType !== "all") {
      where.propertyType = propertyType
    }

    // Price range filter
    if (minPrice && !isNaN(parseFloat(minPrice))) {
      where.price = { ...where.price, gte: parseFloat(minPrice) }
    }

    if (maxPrice && !isNaN(parseFloat(maxPrice))) {
      where.price = { ...where.price, lte: parseFloat(maxPrice) }
    }

    // Bedrooms filter
    if (bedrooms && !isNaN(parseInt(bedrooms))) {
      where.bedrooms = { gte: parseInt(bedrooms) }
    }

    // Featured filter
    if (featured === "true") {
      where.featured = true
    }

    const [properties, total] = await Promise.all([
      db.property.findMany({
        where,
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          price: true,
          location: true,
          type: true,
          propertyType: true,
          bedrooms: true,
          bathrooms: true,
          area: true,
          images: true,
          amenities: true,
          featured: true,
          createdAt: true,
        },
      }),
      db.property.count({ where }),
    ])

    const response = NextResponse.json({
      properties,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })

    // Add cache control headers
    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')

    return response
  } catch (error) {
    console.error("Error fetching properties:", error)
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 })
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
