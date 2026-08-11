import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteSession } from "@/lib/session";
import { logger } from "@/lib/logger";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value;

  if (sessionId) {
    deleteSession(sessionId);
    logger.info("User signed out", { sessionId });
  }

  // Clear the session cookie and redirect with absolute URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || new URL(request.url).origin;
  const response = NextResponse.redirect(new URL("/signin", baseUrl));
  response.cookies.delete("session_id");

  return response;
}
