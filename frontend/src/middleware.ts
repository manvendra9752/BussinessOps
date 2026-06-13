import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const publicRoutes = ["/login", "/register"];

  if (!token && !publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/leads/:path*",
    "/followups/:path*",
    "/invoices/:path*",
    "/users/:path*",
    "/settings/:path*",
    "/audit-logs/:path*",
    "/payments/:path*",
  ],
};
