// lib/hotelService.ts

export async function fetchHotels(location: string): Promise<any[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/hotels/?location=${encodeURIComponent(location)}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch hotels from Django API");
    }
    const hotels = await response.json();
    return hotels;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return [];
  }
}

export async function fetchAttractions(location: string): Promise<any[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/attractions/?location=${encodeURIComponent(location)}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch attractions from Django API");
    }
    const attractions = await response.json();
    return attractions;
  } catch (error) {
    console.error("Error fetching attractions:", error);
    return [];
  }
}

export async function getHotelById(id: string): Promise<any | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/hotels/${id}/`);
    if (!response.ok) {
      throw new Error("Failed to fetch hotel by ID");
    }
    const hotel = await response.json();
    return hotel;
  } catch (error) {
    console.error("Error fetching hotel by ID:", error);
    return null;
  }
}

export async function getAttractionsById(id: string): Promise<any | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/attractions/${id}/`);
    if (!response.ok) {
      throw new Error("Failed to fetch hotel by ID");
    }
    const hotel = await response.json();
    return hotel;
  } catch (error) {
    console.error("Error fetching hotel by ID:", error);
    return null;
  }
}