import CafeList from "./components/CafeList";

async function getCoffeeData() {
  const response = await fetch(
    "https://api.sampleapis.com/coffee/hot"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch coffee data");
  }

  return response.json();
}

export default async function Home() {
  const coffees = await getCoffeeData();

  return (
    <main className="min-h-screen bg-stone-100 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mx-auto mb-12 max-w-6xl text-center">
        <div className="mb-3 text-5xl">☕</div>

        <h1 className="text-3xl font-bold text-green-800 sm:text-4xl lg:text-5xl">
          CafeHub
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600 sm:text-base">
          Discover cafés, coffee experiences and community events around you.
        </p>
      </header>

      {/* SSR Section */}
      <section className="mx-auto mb-16 max-w-6xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
            Server-Side Rendering
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-800 sm:text-3xl">
            Featured Coffee
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Coffee data fetched from an external API on the server.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coffees.slice(0, 6).map((coffee: any) => (
            <article
              key={coffee.id}
              className="rounded-2xl bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl">
              
              </div>

              <h3 className="text-lg font-bold text-gray-800">
                {coffee.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {coffee.description}
              </p>

              <div className="mt-5 border-t border-gray-100 pt-4">
                <p className="text-xs font-medium text-green-700">
                  External API • SSR
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CSR Section */}
      <section className="mx-auto max-w-6xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
            Client-Side Rendering
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-800 sm:text-3xl">
            Explore Cafés
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Café data is fetched in the browser from the CafeHub API.
          </p>
        </div>

        <CafeList />
      </section>
    </main>
  );
}