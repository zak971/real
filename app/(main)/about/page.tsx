import type { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Home, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | Goa Real Estate Experts",
  description:
    "Learn about our experienced team of real estate professionals in Goa. We specialize in luxury properties and provide expert guidance for NRI and local clients.",
}

const stats = [
  { icon: Home, label: "Properties Sold", value: "500+" },
  { icon: Users, label: "Happy Clients", value: "1000+" },
  { icon: Award, label: "Years Experience", value: "15+" },
  { icon: TrendingUp, label: "Success Rate", value: "95%" },
]

const team = [
  {
    name: "Rajesh Sharma",
    role: "Founder & CEO",
    experience: "15+ years",
    specialization: "Luxury Properties & NRI Services",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Priya Menon",
    role: "Senior Property Consultant",
    experience: "10+ years",
    specialization: "Residential Properties",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "David D'Souza",
    role: "Legal Advisor",
    experience: "12+ years",
    specialization: "Property Law & Documentation",
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About GoaHomes</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Your trusted partner in Goa real estate for over 15 years. We specialize in connecting people with their
            dream properties.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2009, GoaHomes has been at the forefront of Goa's real estate market, helping thousands of
                  families find their perfect homes and investors discover lucrative opportunities in this tropical
                  paradise.
                </p>
                <p>
                  What started as a small family business has grown into one of Goa's most trusted real estate agencies.
                  Our deep understanding of the local market, combined with our commitment to transparency and customer
                  service, has earned us the trust of both local residents and NRI clients worldwide.
                </p>
                <p>
                  We specialize in luxury villas, modern apartments, heritage properties, and commercial spaces across
                  all major locations in Goa. Our team of experienced professionals ensures that every transaction is
                  smooth, legal, and beneficial for our clients.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="GoaHomes Office"
                width={600}
                height={500}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To make real estate transactions in Goa transparent, efficient, and stress-free while helping our
                  clients make informed decisions that align with their goals and dreams.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  To be Goa's most trusted and innovative real estate agency, setting new standards in customer service
                  and market expertise while contributing to the sustainable development of our beautiful state.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our experienced professionals are dedicated to providing you with the best real estate experience in Goa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <Badge variant="secondary" className="mb-3">
                    {member.experience}
                  </Badge>
                  <p className="text-gray-600 text-sm">{member.specialization}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose GoaHomes?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Local Expertise",
                description: "Deep knowledge of Goa's real estate market and regulations",
              },
              {
                title: "NRI Specialists",
                description: "Dedicated services for Non-Resident Indians with remote assistance",
              },
              {
                title: "Legal Compliance",
                description: "All properties are verified for legal compliance and clear titles",
              },
              {
                title: "Transparent Process",
                description: "No hidden fees, clear communication throughout the process",
              },
              {
                title: "After-Sales Support",
                description: "Continued support even after the transaction is complete",
              },
              {
                title: "Market Insights",
                description: "Regular market updates and investment advice for our clients",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-blue-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
