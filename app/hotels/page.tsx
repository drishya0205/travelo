"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Star,
  MapPin,
  Wifi,
  Coffee,
  Utensils,
  Car,
  PlaneTakeoff,
  User,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { getHotelById } from "@/lib/hotelService"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function HotelDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const [hotel, setHotel] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState("Traveler")
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [reviews, setReviews] = useState<
    Array<{ name: string; rating: number; text: string }>
  >([])

  useEffect(() => {
    const storedName = localStorage.getItem("travelo-username") || "Traveler"
    setUsername(storedName)

    const fetchHotel = async () => {
      try {
        if (id === "[id]") {
          setHotel({
            id: "preview",
            name: "Sample Hotel",
            image: "/placeholder.svg",
            description: "This is a sample hotel for preview purposes.",
            location: "Sample Location",
            price: "199",
            rating: 4.5,
            amenities: ["Free WiFi", "Breakfast", "Pool"],
            reviews: [],
          })
          setLoading(false)
          return
        }

        const hotelData = await getHotelById(id)
        if (!hotelData) {
          setHotel({
            id: "not-found",
            name: "Hotel Not Found",
            image: "/placeholder.svg",
            description: "The hotel you are looking for could not be found.",
            location: "Unknown",
            price: "0",
            amenities: [],
            reviews: [],
          })
        } else {
          setHotel(hotelData)
          if (hotelData.reviews) {
            setReviews(hotelData.reviews)
          }
        }
      } catch (error) {
        console.error("Error fetching hotel:", error)
        setHotel({
          id: "error",
          name: "Error Loading Hotel",
          image: "/placeholder.svg",
          description: "There was an error loading this hotel.",
          location: "Error",
          price: "0",
          amenities: [],
          reviews: [],
        })
      } finally {
        setLoading(false)
      }
    }

    fetchHotel()
  }, [id])

  const handleSignOut = () => {
    localStorage.removeItem("travelo-username")
    router.push("/")
  }

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userRating === 0) {
      alert("Please select a rating")
      return
    }
    const newReview = { name: username, rating: userRating, text: reviewText }
    setReviews([...reviews, newReview])
    setUserRating(0)
    setReviewText("")
    alert("Thank you for your review!")
  }

  const handleBookNow = () => setBookingSuccess(true)

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    )
  if (!hotel)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Hotel not found</p>
      </div>
    )

  const amenityIcons: Record<string, JSX.Element> = {
    "Free WiFi": <Wifi className="h-4 w-4 mr-2" />,
    Breakfast: <Coffee className="h-4 w-4 mr-2" />,
    Restaurant: <Utensils className="h-4 w-4 mr-2" />,
    Parking: <Car className="h-4 w-4 mr-2" />,
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 lg:px-10 h-16 flex items-center justify-between border-b">
        <Link href="/welcome" className="flex items-center gap-2">
          <PlaneTakeoff className="h-6 w-6" />
          <span className="font-bold text-xl">Travelo</span>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hi, {username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <main className="min-h-screen flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-screen-md">
          <Button
            variant="ghost"
            className="mb-6 flex items-center"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to results
          </Button>

          <div className="space-y-10">
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden border">
              {/* Image or image placeholder */}
            </div>

            <div className="space-y-4 text-center">
              <h1 className="text-3xl font-bold">{hotel.name}</h1>
              <div className="flex items-center justify-center mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{hotel.location}</span>
              </div>
              {hotel.rating && (
                <div className="flex items-center bg-yellow-50 px-3 py-1.5 rounded-full shadow-sm mx-auto">
                  <Star className="h-5 w-5 text-yellow-500 mr-1.5" />
                  <span className="font-medium text-lg">
                    {hotel.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            <Tabs defaultValue="details" className="mt-6">
              <TabsList className="mb-6 flex justify-center">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-10 text-center">
                <section>
                  <h2 className="text-xl font-semibold mb-3">
                    About this hotel
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {hotel.description || "No description available."}
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {hotel.amenities?.length > 0 ? (
                      hotel.amenities.map((a, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-center"
                        >
                          {amenityIcons[a] || (
                            <Star className="h-4 w-4 mr-2" />
                          )}
                          <span>{a}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No amenities available.
                      </p>
                    )}
                  </div>
                </section>
              </TabsContent>

              <TabsContent
                value="reviews"
                className="space-y-10 text-center mx-auto max-w-screen-md"
              >
                <section>
                  <h2 className="text-xl font-semibold">Guest Reviews</h2>
                  {reviews.length > 0 ? (
                    <div className="space-y-4">
                      {reviews.map((r, i) => (
                        <div key={i} className="flex justify-center">
                          <Card className="w-full max-w-md">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div className="font-medium">{r.name}</div>
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                  <span>{r.rating.toFixed(1)}</span>
                                </div>
                              </div>
                              <p className="mt-2 text-gray-700">{r.text}</p>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      No reviews yet. Be the first to review!
                    </p>
                  )}
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">
                    Write a Review
                  </h2>
                  <form
                    onSubmit={handleRatingSubmit}
                    className="space-y-6 max-w-md mx-auto"
                  >
                    <div>
                      <Label htmlFor="rating" className="block mb-5">
                        Your Rating
                        
                    
                      </Label>
                      <div className="flex justify-center">
                        {[1, 2, 3, 4, 5].map((r) => (
                          <Star
                            key={r}
                            className={`h-8 w-8 cursor-pointer ${
                              (hoverRating || userRating) >= r
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                            onClick={() => setUserRating(r)}
                            onMouseEnter={() => setHoverRating(r)}
                            onMouseLeave={() => setHoverRating(0)}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="review" className="block mb-2">
                        Your Review
                      </Label>
                      <Textarea
                        id="review"
                        placeholder="Share your experience..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        rows={4}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Submit Review
                    </Button>
                  </form>
                </section>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div>
          <Card className="sticky top-6 h-fit border shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-2">₹{hotel.price}</h2>
              <p className="text-muted-foreground mb-6">per night</p>
              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="check-in">Check-in</Label>
                  <Input id="check-in" type="date" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="check-out">Check-out</Label>
                  <Input id="check-out" type="date" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="guests">Guests</Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    defaultValue="2"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>₹{hotel.price} x 1 night</span>
                  <span>₹{hotel.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & fees</span>
                  <span>₹{Math.round(Number(hotel.price) * 0.18)}</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2 text-black">
                  <span>Total</span>
                  <span>₹{Math.round(Number(hotel.price) * 1.18)}</span>
                </div>
              </div>
              <Dialog open={bookingSuccess} onOpenChange={setBookingSuccess}>
                <DialogTrigger asChild>
                  <Button className="w-full" onClick={handleBookNow}>
                    Book Now
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Booking Confirmed!</DialogTitle>
                    <DialogDescription>
                      Your booking at {hotel.name} has been confirmed. A
                      confirmation email has been sent.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button onClick={() => router.push("/welcome")}>
                      Return to Home
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <p className="text-xs text-center text-muted-foreground mt-4">
                You won't be charged yet
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
