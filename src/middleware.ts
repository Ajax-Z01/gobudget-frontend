import { NextResponse } from "next/server";

export function middleware(req: Request) {
  const token = req.headers.get("authorization") || "";
  const isAuthRoute = req.url.includes("/login") || req.url.includes("/register");

  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
