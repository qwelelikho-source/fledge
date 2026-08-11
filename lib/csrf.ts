import { cookies } from "next/headers";

// Simple CSRF token implementation (in production, use a more robust solution)
const CSRF_SECRET = process.env.CSRF_SECRET || "default-csrf-secret-change-in-production";

function generateToken(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const signature = Buffer.from(`${CSRF_SECRET}-${timestamp}-${random}`).toString('base64');
  return `${timestamp}-${random}-${signature}`;
}

function verifyToken(token: string): boolean {
  try {
    const [timestamp, random, signature] = token.split('-');
    if (!timestamp || !random || !signature) return false;
    
    // Check if token is expired (1 hour)
    const tokenTime = parseInt(timestamp, 10);
    if (Date.now() - tokenTime > 3600000) return false;
    
    // Verify signature
    const expectedSignature = Buffer.from(`${CSRF_SECRET}-${timestamp}-${random}`).toString('base64');
    return signature === expectedSignature;
  } catch {
    return false;
  }
}

export async function getCsrfToken(): Promise<string> {
  const cookieStore = await cookies();
  let token = cookieStore.get('csrf_token')?.value;
  
  if (!token || !verifyToken(token)) {
    token = generateToken();
    cookieStore.set('csrf_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1 hour
      path: '/',
    });
  }
  
  return token;
}

export async function verifyCsrfToken(token: string): Promise<boolean> {
  const cookieStore = await cookies();
  const storedToken = cookieStore.get('csrf_token')?.value;
  
  if (!storedToken) return false;
  
  return verifyToken(token) && token === storedToken;
}

export async function refreshCsrfToken(): Promise<string> {
  const cookieStore = await cookies();
  const token = generateToken();
  
  cookieStore.set('csrf_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600, // 1 hour
    path: '/',
  });
  
  return token;
}
