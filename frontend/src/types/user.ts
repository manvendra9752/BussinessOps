export interface User {
  _id: string;

  name: string;

  email: string;

  role: "ADMIN" | "MANAGER" | "AGENT" | "FINANCE";

  isActive: boolean;

  createdAt: string;
}
