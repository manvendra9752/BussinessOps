import UsersPageView from "@/components/users/user-page-view";
import RoleGuard from "@/components/auth/role-guard";

export default function Page() {
  return (
    <RoleGuard roles={["ADMIN", "MANAGER"]}>
      <UsersPageView />
    </RoleGuard>
  );
}
