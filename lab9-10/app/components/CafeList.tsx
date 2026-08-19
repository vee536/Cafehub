"use client";

import { useEffect, useState } from "react";

interface Cafe {
  id: number;
  name: string;
  location: string;
  rating: number;
  speciality: string;
  event: string;
}

export default function CafeList() {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/cafes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cafes");
        }

        return response.json();
      })
      .then((data) => {
        setCafes(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const filteredCafes = cafes.filter((cafe) =>
    cafe.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <p className="py-10 text-center text-gray-500">
        Loading cafes...
      </p>
    );
  }

  if (error) {
    return (
      <p className="py-10 text-center text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search cafes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none focus:border-green-600 sm:max-w-md"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCafes.map((cafe) => (
          <div
            key={cafe.id}
            className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mb-4 text-4xl">
              
            </div>

            <h3 className="mb-2 text-xl font-bold text-gray-800">
              {cafe.name}
            </h3>

            <p className="mb-2 text-gray-600">
              {cafe.location}
            </p>

            <p className="mb-2 text-gray-600">
               {cafe.rating}
            </p>

            <p className="mb-2 text-gray-600">
               {cafe.speciality}
            </p>

            <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm font-medium text-green-700">
               {cafe.event}
            </p>

            <p className="mt-4 text-xs text-gray-400">
              Data fetched using Client-Side Rendering
            </p>
          </div>
        ))}
      </div>

      {filteredCafes.length === 0 && (
        <p className="mt-8 text-center text-gray-500">
          No cafes found.
        </p>
      )}
    </div>
  );
}