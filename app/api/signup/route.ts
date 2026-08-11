import { NextResponse } from "next/server";
import { PlanTier, Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { rateLimiters, getClientIdentifier } from "@/lib/rate-limit";
import { validateSignupInput } from "@/lib/validations/signup";
import { verifyCsrfToken } from "@/lib/csrf";
import { 
  handleApiError, 
  successResponse, 
  errorResponse, 
  conflictResponse, 
  tooManyRequestsResponse 
} from "@/lib/api-response";

function calculateAge(dateString: string) {
  const dob = new Date(dateString);
  if (Number.isNaN(dob.getTime())) {
    return 0;
  }

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age -= 1;
  }

  return age;
}

function mapPlanTier(plan: string): PlanTier {
  const normalized = plan?.toLowerCase?.()?.trim();

  if (normalized === "pro") {
    return PlanTier.PRO;
  }

  if (normalized === "studio") {
    return PlanTier.STUDIO;
  }

  return PlanTier.STARTER;
}

function splitName(fullName: string) {
  const [firstName, ...rest] = fullName.split(" ").filter(Boolean);
  return {
    firstName: firstName || fullName,
    lastName: rest.join(" "),
  };
}

export async function POST(request: Request) {
  let pendingUserId: string | null = null;
  let userEmail = "";

  // Rate limiting
  const clientId = getClientIdentifier(request);
  const rateLimitResult = rateLimiters.auth.check(clientId);
  
  if (!rateLimitResult.success) {
    logger.warn("Rate limit exceeded for signup", { clientId });
    return tooManyRequestsResponse(
      Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
    );
  }

  try {
    const body = await request.json();
    
    // Verify CSRF token for form submissions
    if (body.csrf_token) {
      const isValidCsrf = await verifyCsrfToken(body.csrf_token);
      if (!isValidCsrf) {
        logger.warn("Invalid CSRF token in signup attempt", { clientId });
        return errorResponse("Invalid security token. Please refresh the page and try again.", 403);
      }
    }
    
    // Validate input using Zod schema
    const validationResult = validateSignupInput(body);
    if (!validationResult.success) {
      logger.warn("Signup validation failed", { errors: validationResult.errors });
      return errorResponse("Validation failed", 400, validationResult.errors);
    }

    const { name, email, idNumber, dateOfBirth, plan, guardianName, guardianEmail } = validationResult.data;
    userEmail = email;

    const dob = new Date(dateOfBirth);
    const age = calculateAge(dateOfBirth);
    const isMinor = age < 18;

    if (isMinor && (!guardianName || !guardianEmail)) {
      return errorResponse("Guardian name and email are required for account holders under 18.");
    }

    const existingLocalUser = await prisma.user.findUnique({ where: { email } });
    if (existingLocalUser) {
      return conflictResponse("An account with this email already exists.");
    }

    const planTier = mapPlanTier(plan);
    const trialEndsAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const { firstName, lastName } = splitName(name);
    const rawUsername = `${firstName || email.split("@")[0]}${lastName || "user"}`
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "")
      .substring(0, 30);
    const username = rawUsername || email.split("@")[0];

    const createdUser = await prisma.user.create({
      data: {
        email,
        name,
        idNumber,
        dateOfBirth: dob,
        isMinor,
      },
    });

    pendingUserId = createdUser.id;

    const user = await prisma.user.update({
      where: { id: createdUser.id },
      data: {
        subscription: {
          create: {
            plan: planTier,
            trialEndsAt,
            isActive: true,
          },
        },
        parentalConsent: isMinor
          ? {
              create: {
                guardianName: guardianName!,
                guardianEmail: guardianEmail!,
                status: "pending",
              },
            }
          : undefined,
      },
    });

    return successResponse({ userId: user.id });
  } catch (error) {
    // Reset rate limit on error to allow retry
    rateLimiters.auth.reset(clientId);
    if (pendingUserId) {
      await prisma.user.delete({ where: { id: pendingUserId } }).catch(() => null);
    }
    return handleApiError(error);
  }
}
