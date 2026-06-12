"use client";

import { useAuth } from "@/hooks/useAuth";

import { useUsers } from "@/hooks/useUsers";

import UserTable from "@/components/users/user-table";

import CreateUserForm from "@/components/users/create-user-form";
import RoleGuard from "../auth/role-guard";

export default function UsersPage() {
  const { user } = useAuth();

  const { data, refetch } = useUsers();

  const canCreate = user?.role === "ADMIN";

  return (
    <RoleGuard roles={["ADMIN", "MANAGER"]}>
      <div>
        <h1 className="text-3xl font-bold mb-6">Users</h1>

        {canCreate && <CreateUserForm refresh={refetch} />}

        <UserTable users={data || []} refresh={refetch} />
      </div>
    </RoleGuard>
  );
}
