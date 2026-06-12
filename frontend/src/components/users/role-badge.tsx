const roleColors: Record<string, string> = {
  ADMIN: "bg-red-100 text-red-700 border-red-200",
  MANAGER: "bg-purple-100 text-purple-700 border-purple-200",
  AGENT: "bg-blue-100 text-blue-700 border-blue-200",
  FINANCE: "bg-green-100 text-green-700 border-green-200",
};

export default function RoleBadge({ role }: { role: string }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
        roleColors[role] || "bg-gray-100 text-gray-700 border-gray-200"
      }`}
    >
      {role}
    </span>
  );
}
