import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidSession } from "@/lib/session";
import { logger } from "@/lib/logger";

// Routes that require authentication
const protectedRoutes = ["/dashboard", "/storefront", "/settings"];

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ["/signin", "/signup"];

// Routes that should be completely bypassed by middleware
const bypassRoutes = ["/auth", "/api/auth"];

// Security monitoring
function logSecurityEvent(event: string, details: Record<string, unknown>) {
  logger.info(`Security Event: ${event}`, details);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionId = request.cookies.get("session_id")?.value;
  const userAgent = request.headers.get("user-agent") || "unknown";
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || 
             request.headers.get("x-real-ip") || "unknown";

  const isAuthenticated = sessionId ? isValidSession(sessionId) : false;

  // Bypass OAuth-related routes to prevent interference
  if (bypassRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Log suspicious activities
  if (pathname.includes("..") || pathname.includes("%2e%2e")) {
    logSecurityEvent("Path traversal attempt", { pathname, ip, userAgent });
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Log access to sensitive routes
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      logSecurityEvent("Unauthorized access attempt", { pathname, ip, userAgent });
      const redirectUrl = new URL("/signin", request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }
    logger.info("Protected route accessed", { pathname, ip, sessionId: sessionId?.substring(0, 8) + "..." });
  }

  // Redirect authenticated users away from auth pages
  if (authRoutes.some(route => pathname.startsWith(route)) && isAuthenticated) {
    logger.info("Authenticated user redirected from auth page", { pathname, ip });
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Log API route access
  if (pathname.startsWith("/api")) {
    logger.debug("API route accessed", { pathname, ip, method: request.method });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (API routes handle their own security)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
