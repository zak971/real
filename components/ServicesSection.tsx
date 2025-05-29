import { Card, CardContent } from "@/components/ui/card"
import { Home, Search, FileText, Users, TrendingUp, Shield } from "lucide-react"

const services = [
  {
    icon: Search,
    title: "Property Search",
    description: "Find your perfect property with our advanced search and personalized recommendations.",
  },
  {
    icon: Home,
    title: "Property Management",
    description: "Complete property management services for landlords and property investors.",
  },
  {
    icon: FileText,
    title: "Legal Assistance",
    description: "Expert legal guidance for property transactions, documentation, and compliance.",
  },
  {
    icon: Users,
    title: "NRI Services",
    description: "Specialized services for Non-Resident Indians looking to invest in Goa real estate.",
  },
  {
    icon: TrendingUp,
    title: "Investment Advisory",
    description: "Strategic investment advice to maximize returns on your real estate investments.",
  },
  {
    icon: Shield,
    title: "Verified Properties",
    description: "All properties are thoroughly verified for legal compliance and authenticity.",
  },
]

export default function ServicesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive real estate services to make your property journey smooth and successful
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                  <service.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
