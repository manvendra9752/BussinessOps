"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/services/auth.service";
import { Menu, LogOut } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: Props) {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      document.cookie = "token=; path=/; max-age=0; secure; samesite=lax";
      toast.success("Logged out successfully");
      router.replace("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 text-red-700";
      case "MANAGER":
        return "bg-purple-100 text-purple-700";
      case "AGENT":
        return "bg-blue-100 text-blue-700";
      case "FINANCE":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <header className="h-16 border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 bg-white sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <Menu size={20} className="text-gray-600" />
        </button>
        <div>
          <h2 className="text-sm font-semibold text-gray-900">
            Welcome back, {user?.name || "User"}
          </h2>
          <p className="text-xs text-gray-500">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(user?.role)}`}
        >
          {user?.role}
        </span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
