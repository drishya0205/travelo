"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Heart, Clock } from "lucide-react"
import type { Attraction } from "@/lib/data"

interface AttractionCardProps {
  attraction: Attraction
}

export function AttractionCard({ attraction }: AttractionCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img src={attraction.image || "/pretty.jpg"} alt={attraction.name} className="w-full h-48 object-cover" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background/90"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          <span className="sr-only">Add to favorites</span>
        </Button>
        {attraction.mustSee && (
          <Badge className="absolute top-2 left-2" variant="secondary">
            Must See
          </Badge>
        )}
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{attraction.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span>{attraction.location}</span>
            </div>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="font-medium">{attraction.rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{attraction.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{attraction.duration}</span>
          </div>
          <div className="text-sm">{attraction.entryFee ? `₹${attraction.entryFee}` : "Free Entry"}</div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  )
}

