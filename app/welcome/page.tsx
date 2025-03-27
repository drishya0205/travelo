"use client"

import { SearchForm } from "@/components/search-form"
import Link from "next/link"
import { PlaneTakeoff, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function WelcomePage() {
  const router = useRouter()
  const [username, setUsername] = useState("")

  useEffect(() => {
    // In a real app, this would check for authentication
    // For demo purposes, we'll just use a mock username
    const storedName = localStorage.getItem("travelo-username") || "Traveler"
    setUsername(storedName)
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("travelo-username")
    router.push("/")
  }

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
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-sky-100">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Welcome, {username}!
                </h1>
                <p className="mx-auto max-w-[700px] text-sky-700 md:text-xl">Where would you like to explore today?</p>
              </div>
              <div className="w-full max-w-md bg-white backdrop-blur p-6 rounded-lg shadow-lg">
                <SearchForm />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-sky-50">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center text-sky-800">Popular Destinations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src="/placeholder.svg?height=400&width=600&text=Coorg"
                  alt="Coorg"
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-xl font-bold text-white">Coorg</h3>
                    <p className="text-white/80">Karnataka, India</p>
                  </div>
                </div>
                <Link href="/results?location=coorg" className="absolute inset-0">
                  <span className="sr-only">View Coorg</span>
                </Link>
              </div>
              <div className="group relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src="/placeholder.svg?height=400&width=600&text=Goa"
                  alt="Goa"
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-xl font-bold text-white">Goa</h3>
                    <p className="text-white/80">India</p>
                  </div>
                </div>
                <Link href="/results?location=goa" className="absolute inset-0">
                  <span className="sr-only">View Goa</span>
                </Link>
              </div>
              <div className="group relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src="/placeholder.svg?height=400&width=600&text=Munnar"
                  alt="Munnar"
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-xl font-bold text-white">Munnar</h3>
                    <p className="text-white/80">Kerala, India</p>
                  </div>
                </div>
                <Link href="/results?location=munnar" className="absolute inset-0">
                  <span className="sr-only">View Munnar</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
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

