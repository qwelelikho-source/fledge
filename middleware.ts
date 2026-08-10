import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidSession } from "@/lib/session";

// Routes that require authentication
const protectedRoutes = ["/dashboard", "/storefront", "/settings"];

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ["/signin", "/signup", "/auth"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionId = request.cookies.get("session_id")?.value;

  const isAuthenticated = sessionId ? isValidSession(sessionId) : false;

  // Protect routes that require authentication
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const redirectUrl = new URL("/signin", request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Redirect authenticated users away from auth pages
  if (authRoutes.some(route => pathname.startsWith(route)) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
