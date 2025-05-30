import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://www.goarealestate.in"), // ✅ Replace with your real domain
  title: "Goa Real Estate | Premium Properties in Goa",
  description:
    "Find your dream property in Goa. Luxury villas, apartments, and houses for sale and rent. Expert real estate services for NRI and local clients.",
  keywords:
    "Goa real estate, properties in Goa, villas for sale, apartments for rent, NRI property investment",
  openGraph: {
    title: "Goa Real Estate | Premium Properties in Goa",
    description:
      "Find your dream property in Goa. Luxury villas, apartments, and houses for sale and rent.",
    images: ["/placeholder.svg?height=630&width=1200"],
  },
  generator: "v0.dev",
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
