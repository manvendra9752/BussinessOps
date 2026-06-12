import RoleGuard from "@/components/auth/role-guard";

export default function AuditLogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard roles={["ADMIN"]}>{children}</RoleGuard>;
}
