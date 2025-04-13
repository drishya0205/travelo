import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Heart } from "lucide-react";
import Link from "next/link";
import type { Hotel } from "@/lib/data";

interface HotelCardProps {
  hotel: Hotel;
}

export function HotelCard({ hotel }: HotelCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const rating = hotel.average_rating !== undefined ? hotel.average_rating.toFixed(1) : "N/A";

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-[3/2] w-full">
        <img
          src={hotel.image || "/default-hotel.jpg"}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background/90"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          <span className="sr-only">Add to favorites</span>
        </Button>
        {hotel.average_rating !== undefined && hotel.average_rating >= 4.5 && (
          <Badge className="absolute top-2 left-2" variant="secondary">
            Top Rated
          </Badge>
        )}
      </div>

      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{hotel.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span><b>Elo Rating: </b>{Math.floor(Math.random() * 500) + 1200}</span>
            </div>
          </div>
          {hotel.average_rating !== undefined && (
            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="font-medium">{rating}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <div className="mt-2 flex items-center justify-between">
          <div>
            <span className="font-bold text-lg">₹{hotel.price}</span>
            <span className="text-sm text-muted-foreground"> / night</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {hotel.amenities?.length ? hotel.amenities.slice(0, 2).join(" • ") : "No amenities"}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
      <Link href={`/hotels/${hotel.id}`} className="w-full">
        <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
