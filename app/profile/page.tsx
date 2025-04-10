"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type Review = {
  hotelId: string
  hotelName: string
  name: string
  rating: number
  elo: number
  text: string
}

export default function ProfilePage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const router = useRouter()

  useEffect(() => {
    const savedReviewsJson = localStorage.getItem("user-reviews")
    if (savedReviewsJson) {
      setReviews(JSON.parse(savedReviewsJson))
    }
  }, [])

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">My Reviews</h1>
      {reviews.length === 0 ? (
        <p>You have not reviewed any hotels yet.</p>
      ) : (
        reviews.map((review, index) => (
          <Card key={index} className="mb-4">
            <CardContent>
              <h2 className="text-xl font-semibold">{review.hotelName}</h2>
              <p className="mt-2">
                <strong>Rating:</strong> {review.rating.toFixed(1)}
              </p>
              <p>
                <strong>Elo Ranking:</strong> {review.elo}
              </p>
              <p className="mt-2">{review.text}</p>
              <p className="text-sm text-gray-500 mt-2">Reviewed by: {review.name}</p>
            </CardContent>
          </Card>
        ))
      )}
      <Button className="mt-6" onClick={() => router.back()}>
        Back
      </Button>
    </div>
  )
}
