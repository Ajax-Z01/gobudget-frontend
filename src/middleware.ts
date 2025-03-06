import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const allCookies = req.cookies.getAll();
  const path = req.nextUrl.pathname;

  console.log(`🔍 Middleware Debugging:
  Path: ${path}
  Token: ${token}
  All Cookies:`, allCookies);

  const isAuthRoute = path.startsWith("/login") || path.startsWith("/register");

  // Jika user sudah login dan masuk ke /login atau /register, arahkan ke dashboard
  if (isAuthRoute && token) {
    console.log("✅ Sudah login, redirect ke /dashboard");
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Jika user belum login dan mencoba mengakses halaman yang butuh autentikasi
  if (!isAuthRoute && !token) {
    console.log("🔹 Tidak ada token, redirect ke /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Pastikan cache tidak menyimpan middleware
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"], // Hindari API routes agar tidak terganggu
};
