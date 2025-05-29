import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// In a real application, you would store these in environment variables
const ADMIN_EMAIL = "admin@example.com"
const ADMIN_PASSWORD = "admin123"

// Simple token generation for demo purposes
function generateToken(email: string): string {
  // In a real application, you would use a proper JWT implementation
  return `admin_${email}_${Date.now()}`
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // In a real application, you would validate against a database
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Create a simple token
      const token = generateToken(email)

      // Set the token in an HTTP-only cookie
      const cookieStore = cookies()
      cookieStore.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { message: "An error occurred" },
      { status: 500 }
    )
  }
} 