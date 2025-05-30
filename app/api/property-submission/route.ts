import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const [submissions, total] = await Promise.all([
      db.propertySubmission.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      db.propertySubmission.count(),
    ])

    return NextResponse.json({
      submissions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching submissions:", error)
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log("Received submission data:", data)

    const submission = await db.propertySubmission.create({
      data: {
        propertyTitle: data.title,
        description: data.description,
        location: data.location,
        type: data.type,
        propertyType: data.propertyType,
        bedrooms: parseInt(data.bedrooms) || 0,
        bathrooms: parseInt(data.bathrooms) || 0,
        area: parseFloat(data.area) || 0,
        price: parseFloat(data.price) || 0,
        amenities: data.amenities || [],
        images: data.images || [],
        status: "pending",
      },
    })

    console.log("Created submission:", submission)
    return NextResponse.json(submission, { status: 201 })
  } catch (error) {
    console.error("Error creating submission:", error)
    return NextResponse.json({ 
      error: "Failed to create submission",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}