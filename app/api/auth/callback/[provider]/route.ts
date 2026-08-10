import { NextResponse } from "next/server";

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

  if (error) {
    return NextResponse.redirect(`/signin?error=${encodeURIComponent(error)}`);
  }

  if (!code) {
    return NextResponse.json({ error: "Missing authorization code" }, { status: 400 });
  }

  const tokenParams = new URLSearchParams();
  tokenParams.set("code", code);
  tokenParams.set("client_id", credentials.client_id || "");
  tokenParams.set("client_secret", credentials.client_secret || "");
  tokenParams.set("redirect_uri", `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/${providerKey}`);
  tokenParams.set("grant_type", "authorization_code");

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: tokenParams.toString(),
  });

  const tokenData = await response.json();

  if (!response.ok) {
    console.error("OAuth token exchange failed", tokenData);
    return NextResponse.redirect(`/signin?error=${encodeURIComponent("OAuth token exchange failed")}`);
  }

  return NextResponse.redirect(`/dashboard?provider=${providerKey}&access_token=${encodeURIComponent(tokenData.access_token)}`);
}
