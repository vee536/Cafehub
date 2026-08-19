//slef learning concept
export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-100 px-4">
      <div className="text-center">
        <div className="mb-4 animate-pulse text-5xl">
          ☕
        </div>

        <h2 className="text-2xl font-bold text-green-800">
          CafeHub
        </h2>

        <p className="mt-2 text-gray-500">
          Finding the best cafés for you...
        </p>

        <div className="mx-auto mt-5 h-2 w-40 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-green-700" />
        </div>
      </div>
    </main>
  );
}