import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// In a real application, you would store this in an environment variable
const JWT_SECRET = "your-secret-key"

// Simple token verification for edge runtime
function verifyToken(token: string): boolean {
  try {
    // For demo purposes, we'll just check if the token exists
    // In a real application, you would implement proper JWT verification
    return token.length > 0
  } catch (error) {
    console.error("Token verification error:", error)
    return false
  }
}

export function middleware(request: NextRequest) {
  // Only protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    console.log("Middleware: Checking admin route:", request.nextUrl.pathname)
    
    // Allow access to login page
    if (request.nextUrl.pathname === "/admin/login") {
      console.log("Middleware: Allowing access to login page")
      return NextResponse.next()
    }

    const token = request.cookies.get("auth_token")?.value
    console.log("Middleware: Token present:", !!token)

    if (!token) {
      console.log("Middleware: No token found, redirecting to login")
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    try {
      // Verify the token using our edge-compatible function
      const isValid = verifyToken(token)
      if (isValid) {
        console.log("Middleware: Token verified successfully")
        return NextResponse.next()
      } else {
        throw new Error("Invalid token")
      }
    } catch (error) {
      console.log("Middleware: Token verification failed:", error)
      // Token is invalid or expired
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
} 