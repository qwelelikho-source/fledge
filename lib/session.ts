// Simple in-memory session storage (in production, use Redis or database)
const sessions = new Map<string, { provider: string; accessToken: string; createdAt: number }>();

export interface Session {
  provider: string;
  accessToken: string;
  createdAt: number;
}

export function createSession(provider: string, accessToken: string): string {
  const sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  sessions.set(sessionId, {
    provider,
    accessToken,
    createdAt: Date.now(),
  });
  return sessionId;
}

export function getSession(sessionId: string): Session | null {
  const session = sessions.get(sessionId);
  if (!session) return null;
  
  // Check if session is expired (1 hour)
  if (Date.now() - session.createdAt > 3600000) {
    sessions.delete(sessionId);
    return null;
  }
  
  return session;
}

export function deleteSession(sessionId: string): void {
  sessions.delete(sessionId);
}

export function isValidSession(sessionId: string): boolean {
  return getSession(sessionId) !== null;
}
