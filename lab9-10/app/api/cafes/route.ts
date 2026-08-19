import { NextResponse } from "next/server";

export async function GET() {
  const cafes = [
    {
      id: 1,
      name: "Bean Theory",
      location: "Koramangala",
      rating: 4.5,
      speciality: "Specialty Coffee",
      event: "Coding Meetup",
    },
    {
      id: 2,
      name: "Brew & Books",
      location: "Indiranagar",
      rating: 4.7,
      speciality: "Coffee & Books",
      event: "Book Club",
    },
    {
      id: 3,
      name: "The Coffee Lab",
      location: "HSR Layout",
      rating: 4.6,
      speciality: "Artisan Coffee",
      event: "Workshop",
    },
    {
      id: 4,
      name: "Roast House",
      location: "Jayanagar",
      rating: 4.4,
      speciality: "Cold Brew",
      event: "Community Meetup",
    },
  ];

  return NextResponse.json(cafes);
}