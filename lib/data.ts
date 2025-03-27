export interface Hotel {
  id: number
  name: string
  location: string
  description: string
  price: number
  rating: number
  image: string
  amenities: string[]
}

export interface Attraction {
  id: number
  name: string
  location: string
  description: string
  rating: number
  image: string
  duration: string
  entryFee: number | null
  mustSee: boolean
}

// Mock data for hotels
const coorgHotels: Hotel[] = [
  {
    id: 1,
    name: "Taj Coorg Resort & Spa",
    location: "Madikeri, Coorg",
    description: "Luxury resort nestled in the hills with panoramic views of coffee plantations.",
    price: 12500,
    rating: 4.8,
    image: "/placeholder.svg?height=400&width=600&text=Taj+Coorg+Resort",
    amenities: ["Spa", "Pool", "Restaurant", "Free WiFi"],
  },
  {
    id: 2,
    name: "Club Mahindra Madikeri",
    location: "Galibeedu Road, Coorg",
    description: "Family-friendly resort with spacious rooms and various recreational activities.",
    price: 8500,
    rating: 4.5,
    image: "/placeholder.svg?height=400&width=600&text=Club+Mahindra",
    amenities: ["Pool", "Restaurant", "Kids Play Area", "Spa"],
  },
  {
    id: 3,
    name: "The Tamara Coorg",
    location: "Kabbinakad Estate, Coorg",
    description: "Eco-friendly luxury resort with private cottages amidst coffee plantations.",
    price: 15000,
    rating: 4.7,
    image: "/placeholder.svg?height=400&width=600&text=The+Tamara",
    amenities: ["Spa", "Restaurant", "Coffee Tours", "Yoga"],
  },
  {
    id: 4,
    name: "Orange County Resort",
    location: "Siddapur, Coorg",
    description: "Colonial-style luxury resort with private pools and coffee plantation views.",
    price: 18000,
    rating: 4.9,
    image: "/placeholder.svg?height=400&width=600&text=Orange+County",
    amenities: ["Private Pool", "Spa", "Restaurant", "Coffee Tours"],
  },
  {
    id: 5,
    name: "Heritage Resort Coorg",
    location: "Madikeri, Coorg",
    description: "Traditional Kodava-style resort with modern amenities and cultural experiences.",
    price: 7500,
    rating: 4.3,
    image: "/placeholder.svg?height=400&width=600&text=Heritage+Resort",
    amenities: ["Restaurant", "Cultural Shows", "Free WiFi", "Tours"],
  },
  {
    id: 6,
    name: "Coorg Wilderness Resort",
    location: "Virajpet, Coorg",
    description: "Luxury resort surrounded by lush forests with spacious suites and outdoor activities.",
    price: 9500,
    rating: 4.4,
    image: "/placeholder.svg?height=400&width=600&text=Wilderness+Resort",
    amenities: ["Pool", "Restaurant", "Trekking", "Spa"],
  },
]

// Mock data for attractions
const coorgAttractions: Attraction[] = [
  {
    id: 1,
    name: "Namdroling Monastery",
    location: "Bylakuppe, Coorg",
    description:
      "Also known as the Golden Temple, this is the largest teaching center of the Nyingma lineage of Tibetan Buddhism in the world.",
    rating: 4.7,
    image: "/placeholder.svg?height=400&width=600&text=Namdroling+Monastery",
    duration: "2-3 hours",
    entryFee: null,
    mustSee: true,
  },
  {
    id: 2,
    name: "Abbey Falls",
    location: "Madikeri, Coorg",
    description: "A scenic waterfall nestled amidst coffee plantations and spice estates, offering breathtaking views.",
    rating: 4.5,
    image: "/placeholder.svg?height=400&width=600&text=Abbey+Falls",
    duration: "1-2 hours",
    entryFee: 15,
    mustSee: true,
  },
  {
    id: 3,
    name: "Raja's Seat",
    location: "Madikeri, Coorg",
    description:
      "A scenic spot where the kings of Coorg spent their evenings, offering panoramic views of the valleys and mountains.",
    rating: 4.3,
    image: "/placeholder.svg?height=400&width=600&text=Raja's+Seat",
    duration: "1 hour",
    entryFee: 5,
    mustSee: false,
  },
  {
    id: 4,
    name: "Dubare Elephant Camp",
    location: "Dubare, Coorg",
    description:
      "An elephant training camp where visitors can interact with elephants, bathe them, and learn about these gentle giants.",
    rating: 4.4,
    image: "/placeholder.svg?height=400&width=600&text=Dubare+Elephant+Camp",
    duration: "3-4 hours",
    entryFee: 220,
    mustSee: true,
  },
  {
    id: 5,
    name: "Talacauvery",
    location: "Bhagamandala, Coorg",
    description: "The birthplace of the River Cauvery, considered sacred with a temple dedicated to Lord Brahma.",
    rating: 4.6,
    image: "/placeholder.svg?height=400&width=600&text=Talacauvery",
    duration: "1-2 hours",
    entryFee: null,
    mustSee: false,
  },
  {
    id: 6,
    name: "Iruppu Falls",
    location: "Srimangala, Coorg",
    description:
      "A sacred waterfall in the Brahmagiri hills with the Rameshwara Temple nearby, believed to cleanse sins.",
    rating: 4.2,
    image: "/placeholder.svg?height=400&width=600&text=Iruppu+Falls",
    duration: "2 hours",
    entryFee: 50,
    mustSee: false,
  },
]

// Function to get hotels based on location
export function getHotels(location: string): Hotel[] {
  // In a real app, this would fetch from an API
  // For demo purposes, we'll just return mock data
  switch (location.toLowerCase()) {
    case "coorg":
      return coorgHotels
    default:
      return coorgHotels // Default to Coorg for demo
  }
}

// Function to get attractions based on location
export function getAttractions(location: string): Attraction[] {
  // In a real app, this would fetch from an API
  // For demo purposes, we'll just return mock data
  switch (location.toLowerCase()) {
    case "coorg":
    default:
      return coorgAttractions // Default to Coorg for demo
  }
}

