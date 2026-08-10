import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const providers = {
  google: {
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    params: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      response_type: "code",
      scope: "openid email profile",
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/google`,
      access_type: "offline",
      prompt: "consent",
    },
  },
  facebook: {
    authUrl: "https://www.facebook.com/v17.0/dialog/oauth",
    params: {
      client_id: process.env.FACEBOOK_CLIENT_ID,
      response_type: "code",
      scope: "email public_profile",
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/facebook`,
    },
  },
};

function generateState(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export async function GET(request: Request, { params }: { params: { provider: string } }) {
  const providerKey = params.provider?.toLowerCase();
  const provider = providers[providerKey as keyof typeof providers];

  if (!provider) {
    return NextResponse.json({ error: "Unsupported provider" }, { status: 400 });
  }

  if (!provider.params.client_id) {
    return NextResponse.json({ error: `${providerKey} client ID is not configured.` }, { status: 500 });
  }

  // Generate state parameter for CSRF protection
  const state = generateState();
  
  // Store state in cookie for verification in callback
  const cookieStore = await cookies();
  cookieStore.set(`oauth_state_${providerKey}`, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600, // 10 minutes
  });

  const searchParams = new URLSearchParams({
    ...provider.params as Record<string, string>,
    state,
  });
  
  const url = `${provider.authUrl}?${searchParams.toString()}`;

  return NextResponse.redirect(url);
}
