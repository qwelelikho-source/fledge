import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSession } from "@/lib/session";
import { logger } from "@/lib/logger";

const tokenEndpoints = {
  google: "https://oauth2.googleapis.com/token",
  facebook: "https://graph.facebook.com/v17.0/oauth/access_token",
};

const clientSecrets = {
  google: {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
  },
  facebook: {
    client_id: process.env.FACEBOOK_CLIENT_ID,
    client_secret: process.env.FACEBOOK_CLIENT_SECRET,
  },
};

export async function GET(request: Request, { params }: { params: { provider: string } }) {
  const providerKey = params.provider?.toLowerCase();
  const tokenEndpoint = tokenEndpoints[providerKey as keyof typeof tokenEndpoints];
  const credentials = clientSecrets[providerKey as keyof typeof clientSecrets];

  if (!tokenEndpoint || !credentials) {
    return NextResponse.json({ error: "Unsupported callback provider" }, { status: 400 });
  }

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  const state = url.searchParams.get("state");

  if (error) {
    logger.warn("OAuth error from provider", { provider: providerKey, error });
    return NextResponse.redirect(`/signin?error=${encodeURIComponent(error)}`);
  }

  if (!code) {
    logger.warn("Missing authorization code in OAuth callback", { provider: providerKey });
    return NextResponse.redirect(`/signin?error=${encodeURIComponent("Missing authorization code")}`);
  }

  // Verify state parameter for CSRF protection
  const cookieStore = await cookies();
  const storedState = cookieStore.get(`oauth_state_${providerKey}`);
  
  if (!storedState || storedState.value !== state) {
    logger.error("Invalid state parameter in OAuth callback", undefined, { provider: providerKey, state, storedState: storedState?.value });
    return NextResponse.redirect(`/signin?error=${encodeURIComponent("Invalid state parameter")}`);
  }

  // Clear the state cookie
  cookieStore.delete(`oauth_state_${providerKey}`);

  const tokenParams = new URLSearchParams();
  tokenParams.set("code", code);
  tokenParams.set("client_id", credentials.client_id || "");
  tokenParams.set("client_secret", credentials.client_secret || "");
  tokenParams.set("redirect_uri", `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/${providerKey}`);
  tokenParams.set("grant_type", "authorization_code");

  try {
    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: tokenParams.toString(),
    });

    const tokenData = await response.json();

    if (!response.ok) {
      logger.error("OAuth token exchange failed", undefined, { provider: providerKey, tokenData });
      return NextResponse.redirect(`/signin?error=${encodeURIComponent("OAuth token exchange failed")}`);
    }

    // Create a session
    const sessionId = createSession(providerKey, tokenData.access_token);
    logger.info("User authenticated successfully", { provider: providerKey, sessionId });

    // Set session cookie
    cookieStore.set("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600, // 1 hour
      path: "/",
    });

    return NextResponse.redirect("/dashboard");
  } catch (error) {
    logger.error("OAuth authentication failed", error as Error, { provider: providerKey });
    return NextResponse.redirect(`/signin?error=${encodeURIComponent("Authentication failed")}`);
  }
}
