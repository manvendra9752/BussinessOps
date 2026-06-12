import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: number | string;
  icon?: LucideIcon;
  color?: string;
}

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  red: "bg-red-100 text-red-600",
  orange: "bg-orange-100 text-orange-600",
  purple: "bg-purple-100 text-purple-600",
  indigo: "bg-indigo-100 text-indigo-600",
  teal: "bg-teal-100 text-teal-600",
  pink: "bg-pink-100 text-pink-600",
  yellow: "bg-yellow-100 text-yellow-700",
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "blue",
}: Props) {
  const iconClasses = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">{value}</h2>
        </div>
        {Icon && (
          <div
            className={`h-11 w-11 rounded-lg flex items-center justify-center ${iconClasses}`}
          >
            <Icon size={22} />
          </div>
        )}
      </div>
    </div>
  );
}
