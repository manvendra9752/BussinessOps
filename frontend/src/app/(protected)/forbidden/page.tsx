import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
      px-4"
    >
      <div
        className="
        bg-white
        shadow-lg
        rounded-xl
        p-10
        max-w-md
        w-full
        text-center"
      >
        <h1
          className="
          text-6xl
          font-bold
          text-red-500"
        >
          403
        </h1>

        <h2
          className="
          mt-4
          text-2xl
          font-semibold
          text-gray-800"
        >
          Access Denied
        </h2>

        <p
          className="
          mt-3
          text-gray-600"
        >
          You do not have permission to access this page.
        </p>

        <p
          className="
          mt-1
          text-sm
          text-gray-500"
        >
          Please contact your administrator if you believe this is an error.
        </p>

        <div className="mt-6">
          <Link
            href="/dashboard"
            className="
            inline-block
            bg-blue-600
            text-white
            px-5
            py-2
            rounded-lg
            hover:bg-blue-700
            transition"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
