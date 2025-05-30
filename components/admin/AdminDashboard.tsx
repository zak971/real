"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Plus, Eye, Edit, Trash2, LogOut, Loader2 } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"
import PropertyForm from "./PropertyForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText } from 'lucide-react'
import SubmissionsManager from "./SubmissionsManager"
import { toast } from "sonner"

interface Property {
  id: string
  title: string
  description: string
  location: string
  price: number
  type: string
  propertyType: string
  bedrooms: number
  bathrooms: number
  area: number
  featured: boolean
  createdAt: string
  images: string[]
  amenities: string[]
}

export default function AdminDashboard() {
  const router = useRouter()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [isSeeding, setIsSeeding] = useState(false)

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/properties?limit=50")
      if (!response.ok) {
        throw new Error("Failed to fetch properties")
      }
      const data = await response.json()
      setProperties(data.properties || [])
    } catch (error) {
      console.error("Error fetching properties:", error)
      toast.error("Failed to load properties")
    } finally {
      setLoading(false)
    }
  }

  const deleteProperty = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return

    try {
      setIsDeleting(id)
      const response = await fetch(`/api/properties/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete property")
      }

      await fetchProperties()
      toast.success("Property deleted successfully")
    } catch (error) {
      console.error("Error deleting property:", error)
      toast.error("Failed to delete property")
    } finally {
      setIsDeleting(null)
    }
  }

  const seedDatabase = async () => {
    try {
      setIsSeeding(true)
      const response = await fetch("/api/seed", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to seed database")
      }

      await fetchProperties()
      toast.success("Database seeded successfully!")
    } catch (error) {
      console.error("Error seeding database:", error)
      toast.error("Failed to seed database")
    } finally {
      setIsSeeding(false)
    }
  }

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to logout")
      }

      router.push("/admin/login")
      toast.success("Logged out successfully")
    } catch (error) {
      console.error("Error during logout:", error)
      toast.error("Failed to logout")
    }
  }

  if (showForm) {
    return (
      <PropertyForm
        property={editingProperty}
        onSave={() => {
          setShowForm(false)
          setEditingProperty(null)
          fetchProperties()
        }}
        onCancel={() => {
          setShowForm(false)
          setEditingProperty(null)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Button
              onClick={seedDatabase}
              disabled={isSeeding}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSeeding ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Seeding...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Seed Database
                </>
              )}
            </Button>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
  
        <Tabs defaultValue="properties" className="space-y-4">
          <TabsList>
            <TabsTrigger value="properties" className="flex items-center">
              <Home className="h-4 w-4 mr-2" />
              Properties
            </TabsTrigger>
            <TabsTrigger value="submissions" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              User Submissions
            </TabsTrigger>
          </TabsList>
  
          <TabsContent value="properties" className="space-y-4">
            {/* Actions */}
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">Total Properties: {properties.length}</div>
            </div>
  
            {/* Properties List */}
            <Card>
              <CardHeader className="py-4">
                <CardTitle>All Properties</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-6">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-500">Loading properties...</p>
                  </div>
                ) : properties.length > 0 ? (
                  <div className="space-y-3">
                    {properties.map((property) => (
                      <div key={property.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="font-semibold text-gray-900">{property.title}</h3>
                            <Badge className={property.type === "sale" ? "bg-blue-600" : "bg-gray-600"}>
                              {property.type}
                            </Badge>
                            {property.featured && (
                              <Badge className="text-yellow-600 border-yellow-600">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm">{property.location}</p>
                          <p className="text-blue-600 font-medium">₹{property.price.toLocaleString("en-IN")}</p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <span>{property.bedrooms} beds</span>
                            <span>{property.bathrooms} baths</span>
                            <span>{property.area} sq ft</span>
                            <span>{property.propertyType}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button asChild>
                            <Link href={`/property/${property.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            onClick={() => {
                              setEditingProperty(property)
                              setShowForm(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            className="text-red-600 hover:text-red-700"
                            onClick={() => deleteProperty(property.id)}
                            disabled={isDeleting === property.id}
                          >
                            {isDeleting === property.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Home className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 mb-3">No properties found</p>
                    <Button onClick={() => setShowForm(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Property
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
  
          <TabsContent value="submissions">
            <SubmissionsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
