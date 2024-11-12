import { NextResponse } from "next/server";

export function middleware(req) {
  const { nextUrl } = req;

  // Get the accessToken value
  const isLoggedIn = req.cookies.get("united-threads-access-token")?.value;

  const isAuthRoute =
    nextUrl.pathname === "/login" || nextUrl.pathname === "/sign-up";

  if (nextUrl.pathname === "/products") {
    return NextResponse.next();
  }

  // If user exists, redirect to `/` from `login`
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If user not found, redirect to `/login` from protected routes
  // no redirect happen if already in `/login`
  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/user/:path*",
    "/chat",
    "/notification",
    "/checkout",
    "/login",
    "/sign-up",
    "/products/:path*",
  ],
};
