"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Eye, CheckCircle, XCircle, Clock, Trash2 } from 'lucide-react'

interface PropertySubmission {
  id: string
  ownerName: string
  email: string
  phone: string
  propertyTitle: string
  description: string
  location: string
  type: string
  propertyType: string
  bedrooms: number
  bathrooms: number
  area: number
  price: number
  amenities: string[]
  status: string
  adminNotes?: string
  createdAt: string
}

export default function SubmissionsManager() {
  const [submissions, setSubmissions] = useState<PropertySubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<PropertySubmission | null>(null)
  const [adminNotes, setAdminNotes] = useState("")

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch("/api/property-submission?limit=50")
      const data = await response.json()
      setSubmissions(data.submissions || [])
    } catch (error) {
      console.error("Error fetching submissions:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateSubmissionStatus = async (id: string, status: string, notes?: string) => {
    try {
      const response = await fetch(`/api/property-submission/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, adminNotes: notes }),
      })

      if (response.ok) {
        fetchSubmissions()
        setSelectedSubmission(null)
        setAdminNotes("")
      }
    } catch (error) {
      console.error("Error updating submission:", error)
    }
  }

  const deleteSubmission = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return

    try {
      const response = await fetch(`/api/property-submission/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchSubmissions()
      }
    } catch (error) {
      console.error("Error deleting submission:", error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="default" className="bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatPrice = (price: number, type: string) => {
    if (type === "rent") {
      return `₹${price.toLocaleString("en-IN")}/month`
    }
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`
    }
    return `₹${price.toLocaleString("en-IN")}`
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading submissions...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Property Submissions</h2>
        <div className="text-sm text-gray-600">
          Total: {submissions.length} | Pending: {submissions.filter((s) => s.status === "pending").length} | Approved:{" "}
          {submissions.filter((s) => s.status === "approved").length}
        </div>
      </div>

      {submissions.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {submissions.map((submission) => (
            <Card key={submission.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{submission.propertyTitle}</CardTitle>
                    <p className="text-gray-600">
                      {submission.location} • {submission.propertyType}
                    </p>
                  </div>
                  {getStatusBadge(submission.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Owner:</span> {submission.ownerName}
                  </div>
                  <div>
                    <span className="font-medium">Price:</span> {formatPrice(submission.price, submission.type)}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {submission.email}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span> {submission.phone}
                  </div>
                  <div>
                    <span className="font-medium">Beds/Baths:</span> {submission.bedrooms}/{submission.bathrooms}
                  </div>
                  <div>
                    <span className="font-medium">Area:</span> {submission.area} sq ft
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 line-clamp-2">{submission.description}</p>
                </div>

                {submission.amenities.length > 0 && (
                  <div>
                    <span className="text-sm font-medium">Amenities: </span>
                    <span className="text-sm text-gray-600">{submission.amenities.join(", ")}</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4">
                  <span className="text-xs text-gray-500">{new Date(submission.createdAt).toLocaleDateString()}</span>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedSubmission(submission)
                        setAdminNotes(submission.adminNotes || "")
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Review
                    </Button>

                    {submission.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => updateSubmissionStatus(submission.id, "approved")}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateSubmissionStatus(submission.id, "rejected")}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}

                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => deleteSubmission(submission.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 mb-4">No property submissions yet</p>
            <p className="text-sm text-gray-400">Submissions will appear here when users list their properties</p>
          </CardContent>
        </Card>
      )}

      {/* Review Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{selectedSubmission.propertyTitle}</CardTitle>
                  <p className="text-gray-600">{selectedSubmission.location}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedSubmission(null)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Owner Details</h4>
                  <p>Name: {selectedSubmission.ownerName}</p>
                  <p>Email: {selectedSubmission.email}</p>
                  <p>Phone: {selectedSubmission.phone}</p>
                </div>
                <div>
                  <h4 className="font-medium">Property Details</h4>
                  <p>Type: {selectedSubmission.type}</p>
                  <p>Category: {selectedSubmission.propertyType}</p>
                  <p>Price: {formatPrice(selectedSubmission.price, selectedSubmission.type)}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-gray-600">{selectedSubmission.description}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Admin Notes</h4>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes about this submission..."
                  rows={3}
                />
              </div>

              <div>
                <h4 className="font-medium mb-2">Update Status</h4>
                <div className="flex space-x-2">
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => updateSubmissionStatus(selectedSubmission.id, "approved", adminNotes)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => updateSubmissionStatus(selectedSubmission.id, "rejected", adminNotes)}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => updateSubmissionStatus(selectedSubmission.id, "pending", adminNotes)}
                  >
                    Mark Pending
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}