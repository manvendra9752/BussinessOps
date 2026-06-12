"use client";

import { useAuth } from "@/hooks/useAuth";
import { useUsers } from "@/hooks/useUsers";
import UserTable from "@/components/users/user-table";
import CreateUserForm from "@/components/users/create-user-form";

export default function UsersPageView() {
  const { user } = useAuth();
  const { data, refetch } = useUsers();
  const canCreate = user?.role === "ADMIN";

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage team members and their roles
        </p>
      </div>

      {canCreate && <CreateUserForm refresh={refetch} />}
      <UserTable users={data || []} refresh={refetch} />
    </div>
  );
}
