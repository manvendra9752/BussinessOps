export default function StatusBadge({ status }: { status: string }) {
  const styles = {
    PAID: `
      bg-green-100
      text-green-700
      border-green-200
    `,
    PENDING: `
      bg-yellow-100
      text-yellow-700
      border-yellow-200
    `,
    OVERDUE: `
      bg-red-100
      text-red-700
      border-red-200
    `,
    DRAFT: `
      bg-gray-100
      text-gray-700
      border-gray-200
    `,
    CANCELLED: `
      bg-red-50
      text-red-600
      border-red-200
    `,
    COMPLETED: `
      bg-green-100
      text-green-700
      border-green-200
    `,
    CONTACTED: `
      bg-blue-100
      text-blue-700
      border-blue-200
    `,
    FOLLOW_UP: `
      bg-purple-100
      text-purple-700
      border-purple-200
    `,
    CONVERTED: `
      bg-emerald-100
      text-emerald-700
      border-emerald-200
    `,
    LOST: `
      bg-red-100
      text-red-700
      border-red-200
    `,
    NEW: `
      bg-sky-100
      text-sky-700
      border-sky-200
    `,
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        border
        whitespace-nowrap
        ${
          styles[status as keyof typeof styles] ||
          `
          bg-gray-100
          text-gray-700
          border-gray-200
          `
        }
      `}
    >
      ● {status.replace("_", " ")}
    </span>
  );
}
