import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteSession } from "@/lib/session";
import { logger } from "@/lib/logger";

export async function POST() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value;

  if (sessionId) {
    deleteSession(sessionId);
    logger.info("User signed out", { sessionId });
  }

  // Clear the session cookie
  const response = NextResponse.redirect("/signin");
  response.cookies.delete("session_id");

  return response;
}
