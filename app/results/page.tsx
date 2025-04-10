"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HotelCard } from "@/components/hotel-card";
import { AttractionCard } from "@/components/attraction-card";
import { PlaneTakeoff, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchHotels, fetchAttractions } from "@/lib/hotelService";

export default function ResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const location = searchParams?.get("location") ?? "";

  const [hotels, setHotels] = useState<any[]>([]);
  const [attractions, setAttractions] = useState<any[]>([]);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [sortOption, setSortOption] = useState("priceLowToHigh");
  const [filteredHotels, setFilteredHotels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedName = localStorage.getItem("travelo-username") || "Traveler";
    setUsername(storedName);

    const fetchData = async () => {
      try {
        console.log("[Travelo] Fetching hotels for:", location);
        const data = await fetchHotels(location);
        console.log("[Travelo] fetchHotels returned:", data);

        const spots = await fetchAttractions(location);
        console.log("[Travelo] Attractions from API call:", spots);

        setHotels(data);
        setFilteredHotels(data);
        setAttractions(spots || []);
        setError("");
      } catch (err) {
        console.error("[Travelo] Error fetching data:", err);
        setHotels([]);
        setAttractions([]);
        setError("Something went wrong while fetching results. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location]);

  useEffect(() => {
    let sorted = [...hotels];
    if (sortOption === "priceLowToHigh") {
      sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOption === "priceHighToLow") {
      sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
    setFilteredHotels(sorted);
  }, [sortOption, hotels]);

  const handleSignOut = () => {
    localStorage.removeItem("travelo-username");
    router.push("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b">
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
            <DropdownMenuSeparator />
              {/* New menu item to view profile */}
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                View Profile
              </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-full min-h-[300px]">
            <p className="text-xl font-semibold">Loading...</p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold capitalize">{location}</h1>
            <Tabs defaultValue="hotels">
              <TabsList>
                <TabsTrigger value="hotels">Top Hotels</TabsTrigger>
                <TabsTrigger value="attractions">Top Attractions</TabsTrigger>
              </TabsList>

              {/* Hotels Tab */}
              <TabsContent value="hotels">
                {error ? (
                  <p className="text-red-500">{error}</p>
                ) : filteredHotels.length > 0 ? (
                  <>
                    <div className="flex justify-end mb-4">
                      <select
                        className="border p-2 rounded"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                      >
                        <option value="priceLowToHigh">Price: Low to High</option>
                        <option value="priceHighToLow">Price: High to Low</option>
                      </select>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredHotels.map((hotel) => (
                        <HotelCard key={hotel.id || hotel.name} hotel={hotel} />
                      ))}
                    </div>
                  </>
                ) : (
                  <p>No hotels found.</p>
                )}
              </TabsContent>

              {/* Attractions Tab */}
              <TabsContent value="attractions">
                {attractions.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {attractions.map((attraction) => (
                      <AttractionCard key={attraction.id || attraction.name} attraction={attraction} />
                    ))}
                  </div>
                ) : (
                  <p>No attractions found.</p>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
    </div>
  );
}
