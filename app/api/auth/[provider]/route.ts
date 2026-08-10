import { NextResponse } from "next/server";

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

export async function GET(request: Request, { params }: { params: { provider: string } }) {
  const providerKey = params.provider?.toLowerCase();
  const provider = providers[providerKey as keyof typeof providers];

  if (!provider) {
    return NextResponse.json({ error: "Unsupported provider" }, { status: 400 });
  }

  if (!provider.params.client_id) {
    return NextResponse.json({ error: `${providerKey} client ID is not configured.` }, { status: 500 });
  }

  const searchParams = new URLSearchParams(provider.params as Record<string, string>);
  const url = `${provider.authUrl}?${searchParams.toString()}`;

  return NextResponse.redirect(url);
}
