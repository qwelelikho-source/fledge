// Simple in-memory rate limiting (in production, use Redis or similar)
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
  skipSuccessfulRequests?: boolean; // Don't count successful requests
}

export class RateLimiter {
  constructor(private config: RateLimitConfig) {}

  check(identifier: string): { success: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const entry = rateLimitStore.get(identifier);

    // Clean up expired entries
    if (entry && now > entry.resetTime) {
      rateLimitStore.delete(identifier);
    }

    const currentEntry = rateLimitStore.get(identifier) || {
      count: 0,
      resetTime: now + this.config.windowMs,
    };

    if (currentEntry.count >= this.config.maxRequests) {
      return {
        success: false,
        remaining: 0,
        resetTime: currentEntry.resetTime,
      };
    }

    currentEntry.count++;
    rateLimitStore.set(identifier, currentEntry);

    return {
      success: true,
      remaining: this.config.maxRequests - currentEntry.count,
      resetTime: currentEntry.resetTime,
    };
  }

  reset(identifier: string): void {
    rateLimitStore.delete(identifier);
  }

  // Clean up expired entries periodically
  static cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];
    
    rateLimitStore.forEach((entry, key) => {
      if (now > entry.resetTime) {
        keysToDelete.push(key);
      }
    });
    
    keysToDelete.forEach(key => rateLimitStore.delete(key));
  }
}

// Pre-configured rate limiters for different use cases
export const rateLimiters = {
  // Strict rate limiting for authentication endpoints
  auth: new RateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 requests per 15 minutes
  }),

  // Moderate rate limiting for general API
  api: new RateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // 100 requests per 15 minutes
  }),

  // Lenient rate limiting for public endpoints
  public: new RateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 200, // 200 requests per 15 minutes
  }),
};

// Clean up expired entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => RateLimiter.cleanup(), 5 * 60 * 1000);
}

// Helper function to get client identifier
export function getClientIdentifier(request: Request): string {
  // Try to get IP from various headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';
  
  // Add user agent to make it more specific
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  return `${ip}-${userAgent}`;
}
