"use client";

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Something went wrong</h1>

      <button onClick={reset} className="mt-4 border px-4 py-2">
        Retry
      </button>
    </div>
  );
}
