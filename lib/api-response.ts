import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function handleApiError(error: unknown): NextResponse {
  // Log the error
  if (error instanceof Error) {
    logger.error("API error", error);
  } else {
    logger.error("Unknown API error", undefined, { error });
  }

  // Handle known API errors
  if (error instanceof ApiError) {
    const response: { error: string; details?: unknown } = {
      error: error.message,
    };
    if (error.details) {
      response.details = error.details;
    }
    return NextResponse.json(response, { status: error.statusCode });
  }

  // Handle Prisma errors
  if (error && typeof error === "object" && "code" in error) {
    const prismaError = error as { code: string; meta?: unknown };
    
    switch (prismaError.code) {
      case "P2002":
        return NextResponse.json(
          { error: "A record with this unique constraint already exists." },
          { status: 409 }
        );
      case "P2025":
        return NextResponse.json(
          { error: "Record not found." },
          { status: 404 }
        );
      case "P2003":
        return NextResponse.json(
          { error: "Foreign key constraint failed." },
          { status: 400 }
        );
      default:
        return NextResponse.json(
          { error: "Database error occurred." },
          { status: 500 }
        );
    }
  }

  // Handle validation errors
  if (error && typeof error === "object" && "errors" in error) {
    const response: { error: string; details: unknown } = {
      error: "Validation failed",
      details: (error as { errors: unknown }).errors,
    };
    return NextResponse.json(response, { status: 400 });
  }

  // Default error response
  return NextResponse.json(
    { error: "An unexpected error occurred. Please try again." },
    { status: 500 }
  );
}

export function successResponse<T>(data: T, status: number = 200): NextResponse {
  return NextResponse.json({ success: true, data }, { status });
}

export function errorResponse(message: string, status: number = 400, details?: unknown): NextResponse {
  const response: { error: string; details?: unknown } = {
    error: message,
  };
  if (details) {
    response.details = details;
  }
  return NextResponse.json(response, { status });
}

export function notFoundResponse(message: string = "Resource not found"): NextResponse {
  return errorResponse(message, 404);
}

export function unauthorizedResponse(message: string = "Unauthorized"): NextResponse {
  return errorResponse(message, 401);
}

export function forbiddenResponse(message: string = "Forbidden"): NextResponse {
  return errorResponse(message, 403);
}

export function conflictResponse(message: string = "Resource conflict"): NextResponse {
  return errorResponse(message, 409);
}

export function tooManyRequestsResponse(retryAfter?: number): NextResponse {
  const headers: Record<string, string> = {};
  if (retryAfter) {
    headers["Retry-After"] = retryAfter.toString();
  }
  
  return NextResponse.json(
    { error: "Too many requests. Please try again later." },
    { status: 429, headers }
  );
}

export function serverErrorResponse(message: string = "Internal server error"): NextResponse {
  return errorResponse(message, 500);
}
