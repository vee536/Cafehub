interface Cafe {
  id: number;
  name: string;
  location: string;
  rating: number;
  speciality: string;
  event: string;
}

async function getCafe(id: string): Promise<Cafe | undefined> {
  const response = await fetch(
    "http://localhost:3000/api/cafes",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cafes");
  }

  const cafes: Cafe[] = await response.json();

  return cafes.find((cafe) => cafe.id === Number(id));
}

export default async function CafeDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cafe = await getCafe(id);

  if (!cafe) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-100 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Café Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            We couldn't find this café.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-100 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl bg-white p-6 shadow-md sm:p-10">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-4xl">
            
          </div>

          <h1 className="text-3xl font-bold text-green-800 sm:text-4xl">
            {cafe.name}
          </h1>

          <div className="mt-6 space-y-4 text-gray-600">
            <p>
              <span className="font-semibold"> Location:</span>{" "}
              {cafe.location}
            </p>

            <p>
              <span className="font-semibold"> Rating:</span>{" "}
              {cafe.rating}
            </p>

            <p>
              <span className="font-semibold"> Speciality:</span>{" "}
              {cafe.speciality}
            </p>

            <p>
              <span className="font-semibold">Event:</span>{" "}
              {cafe.event}
            </p>
          </div>

          <div className="mt-8 rounded-xl bg-green-50 p-4">
            <p className="text-sm text-green-800">
              Café ID: {cafe.id}
            </p>

            <p className="mt-1 text-xs text-green-700">
              This page uses Next.js dynamic routing.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}