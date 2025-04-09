export interface Hotel {
  id: number
  name: string
  location: string
  description: string
  price: number
  average_rating: number
  image: string
  amenities: string[]
}

export interface Attraction {
  id: number
  name: string
  location: string
  description: string
  average_rating: number
  image: string
  duration: string
  entryFee: number | null
  mustSee: boolean
}


