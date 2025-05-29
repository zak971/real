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

    const submission = await db.propertySubmission.create({
      data: {
        ownerName: data.ownerName,
        email: data.email,
        phone: data.phone,
        propertyTitle: data.propertyTitle,
        description: data.description,
        location: data.location,
        type: data.type,
        propertyType: data.propertyType,
        bedrooms: parseInt(data.bedrooms),
        bathrooms: parseInt(data.bathrooms),
        area: parseFloat(data.area),
        price: parseFloat(data.price),
        amenities: data.amenities || [],
        status: "pending",
      },
    })

    return NextResponse.json(submission, { status: 201 })
  } catch (error) {
    console.error("Error creating submission:", error)
    return NextResponse.json({ error: "Failed to create submission" }, { status: 500 })
  }
}