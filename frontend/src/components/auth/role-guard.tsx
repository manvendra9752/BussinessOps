"use client";

import ForbiddenPage from "@/app/(protected)/forbidden/page";
import { useAuth } from "@/hooks/useAuth";

export default function RoleGuard({ children, roles }: any) {
  const { user } = useAuth();
  if (!roles.includes(user?.role)) {
    return <ForbiddenPage />;
  }

  return children;
}
