"use client"

import { HotelCard } from "@/components/hotel-card"
import { AttractionCard } from "@/components/attraction-card"
import Link from "next/link"
import { PlaneTakeoff, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getHotels, getAttractions } from "@/lib/data"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ResultsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const location = searchParams.get("location") || "coorg"
  const [username, setUsername] = useState("")

  useEffect(() => {
    // In a real app, this would check for authentication
    const storedName = localStorage.getItem("travelo-username") || "Traveler"
    setUsername(storedName)
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("travelo-username")
    router.push("/")
  }

  const hotels = getHotels(location)
  const attractions = getAttractions(location)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b">
        <Link href="/welcome" className="flex items-center gap-2">
          <PlaneTakeoff className="h-6 w-6" />
          <span className="font-bold text-xl">Travelo</span>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hi, {username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>My Profile</DropdownMenuItem>
            <DropdownMenuItem>My Trips</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="sm" className="gap-1" onClick={() => router.push("/welcome")}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold ml-4 capitalize">{location}</h1>
        </div>

        <Tabs defaultValue="hotels" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="hotels">Top Hotels</TabsTrigger>
            <TabsTrigger value="attractions">Top Attractions</TabsTrigger>
          </TabsList>
          <TabsContent value="hotels" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="attractions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attractions.map((attraction) => (
                <AttractionCard key={attraction.id} attraction={attraction} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2024 Travelo. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}

