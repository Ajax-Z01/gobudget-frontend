import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  const isAuthRoute = path.startsWith("/login") || path.startsWith("/register");

  if (isAuthRoute && token) {
    console.log("✅ Sudah login, redirect ke /dashboard");
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!isAuthRoute && !token) {
    console.log("🔹 Tidak ada token, redirect ke /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
