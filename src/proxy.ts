import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";

// Optimistic, cookie-only redirect for dashboard pages. The actual data access
// control lives in each Route Handler via requireRole() — this just avoids
// flashing protected UI before the client-side checks would otherwise run.
export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getSessionFromRequest(request);

  if (pathname.startsWith("/admin/dashboard")) {
    if (!session || session.role !== "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  if (pathname.startsWith("/portal/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/portal", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard", "/admin/dashboard/:path*", "/portal/dashboard", "/portal/dashboard/:path*"],
};
