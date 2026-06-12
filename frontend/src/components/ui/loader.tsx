"use client";

export default function Loader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>

          <div
            className="
              absolute
              inset-0
              h-16
              w-16
              rounded-full
              border-4
              border-transparent
              border-t-blue-600
              border-r-indigo-500
              animate-spin
            "
          />
        </div>

        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800">{text}</h3>

          <p className="text-sm text-gray-500 mt-1">Please wait a moment...</p>
        </div>
      </div>
    </div>
  );
}
