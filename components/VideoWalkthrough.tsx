"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Play, Volume2, VolumeX, Maximize, Download, Share2 } from "lucide-react"
import type { Property } from "@/lib/types"

interface VideoWalkthroughProps {
  videoWalkthrough: Property["videoWalkthrough"]
  propertyTitle: string
}

export default function VideoWalkthrough({ videoWalkthrough, propertyTitle }: VideoWalkthroughProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLIFrameElement>(null)

  if (!videoWalkthrough) return null

  const getEmbedUrl = () => {
    const baseParams = `autoplay=0&mute=${isMuted ? 1 : 0}&controls=1&rel=0&modestbranding=1`

    switch (videoWalkthrough.provider) {
      case "youtube":
        return `https://www.youtube.com/embed/${videoWalkthrough.embedId}?${baseParams}`
      case "vimeo":
        return `https://player.vimeo.com/video/${videoWalkthrough.embedId}?autoplay=0&muted=${isMuted}&controls=1`
      default:
        return videoWalkthrough.url
    }
  }

  const getFullscreenUrl = () => {
    const baseParams = `autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&fs=1`

    switch (videoWalkthrough.provider) {
      case "youtube":
        return `https://www.youtube.com/embed/${videoWalkthrough.embedId}?${baseParams}`
      case "vimeo":
        return `https://player.vimeo.com/video/${videoWalkthrough.embedId}?autoplay=1&muted=0&controls=1`
      default:
        return videoWalkthrough.url
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Video Tour - ${propertyTitle}`,
        url: videoWalkthrough.url,
      })
    } else {
      navigator.clipboard.writeText(videoWalkthrough.url)
      // You could add a toast notification here
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Play className="h-5 w-5 mr-2" />
            Video Walkthrough
          </CardTitle>
          <Badge variant="secondary" className="capitalize">
            {videoWalkthrough.provider}
          </Badge>
        </div>
        <p className="text-gray-600 text-sm">Professional video tour showcasing every detail</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Video Player */}
        <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video group">
          {!isPlaying && videoWalkthrough.thumbnail ? (
            // Video Thumbnail with Play Button
            <div className="relative w-full h-full cursor-pointer" onClick={() => setIsPlaying(true)}>
              <Image
                src={videoWalkthrough.thumbnail || "/placeholder.svg"}
                alt={`Video thumbnail for ${propertyTitle}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-20 transition-all">
                <div className="bg-white bg-opacity-90 rounded-full p-4 group-hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 text-gray-900 ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm">
                HD Video Tour
              </div>
            </div>
          ) : (
            // Embedded Video Player
            <iframe
              ref={videoRef}
              src={getEmbedUrl()}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title={`Video walkthrough of ${propertyTitle}`}
            />
          )}

          {/* Video Controls Overlay */}
          {isPlaying && (
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>

              <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                  >
                    <Maximize className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-7xl w-full h-[90vh]">
                  <DialogHeader>
                    <DialogTitle>Video Walkthrough - {propertyTitle}</DialogTitle>
                  </DialogHeader>
                  <div className="flex-1 bg-gray-900 rounded-lg overflow-hidden">
                    <iframe
                      src={getFullscreenUrl()}
                      className="w-full h-full"
                      frameBorder="0"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      title={`Video walkthrough of ${propertyTitle}`}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>

        {/* Video Information */}
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">What You'll See</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Complete room-by-room walkthrough</li>
              <li>• Detailed view of all amenities and features</li>
              <li>• Neighborhood and surrounding area</li>
              <li>• Natural lighting throughout the day</li>
              <li>• Professional narration and insights</li>
            </ul>
          </div>

          {/* Video Stats */}
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              HD Quality
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
              Professional Tour
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
              Recent Footage
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button asChild className="flex-1">
            <a href={videoWalkthrough.url} target="_blank" rel="noopener noreferrer">
              <Play className="h-4 w-4 mr-2" />
              Watch on {videoWalkthrough.provider === "youtube" ? "YouTube" : "Vimeo"}
            </a>
          </Button>

          <Button variant="outline" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>

          <Button variant="outline" asChild>
            <a href={videoWalkthrough.url} download>
              <Download className="h-4 w-4 mr-2" />
              Download
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
