"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Phone,
  Receipt,
  Shield,
  Settings,
  X,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const allLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: null },
  { href: "/leads", label: "Leads", icon: FileText, roles: null },
  { href: "/followups", label: "Follow-ups", icon: Phone, roles: null },
  { href: "/invoices", label: "Invoices", icon: Receipt, roles: null },
  {
    href: "/users",
    label: "Users",
    icon: Users,
    roles: ["ADMIN", "MANAGER"],
  },
  {
    href: "/audit-logs",
    label: "Audit Logs",
    icon: Shield,
    roles: ["ADMIN", "MANAGER"],
  },
  { href: "/settings", label: "Settings", icon: Settings, roles: ["ADMIN"] },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: Props) {
  const pathname = usePathname();
  const { user } = useAuth();

  const links = allLinks.filter(
    (link) => !link.roles || link.roles.includes(user?.role),
  );

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white flex flex-col z-50
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <h2 className="text-xl font-bold tracking-wide bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            BusinessOps
          </h2>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(link.href + "/");
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User info footer */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-slate-500">{user?.role || "—"}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
