import { NextResponse } from "next/server";
import { PlanTier, Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const idNumber = String(body?.idNumber ?? "").trim();
    const dateOfBirth = String(body?.dateOfBirth ?? "").trim();
    const plan = String(body?.plan ?? "").trim();
    const guardianName = String(body?.guardianName ?? "").trim();
    const guardianEmail = String(body?.guardianEmail ?? "").trim();

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    if (!idNumber) {
      return NextResponse.json({ error: "ID number is required." }, { status: 400 });
    }

    if (!dateOfBirth) {
      return NextResponse.json({ error: "Date of birth is required." }, { status: 400 });
    }

    if (!plan) {
      return NextResponse.json({ error: "Plan is required." }, { status: 400 });
    }

    const dob = new Date(dateOfBirth);
    if (Number.isNaN(dob.getTime())) {
      return NextResponse.json({ error: "Please provide a valid date of birth." }, { status: 400 });
    }

    const age = calculateAge(dateOfBirth);
    const isMinor = age < 18;

    if (isMinor) {
      if (!guardianName) {
        return NextResponse.json({ error: "Guardian name is required for account holders under 18." }, { status: 400 });
      }

      if (!guardianEmail) {
        return NextResponse.json({ error: "Guardian email is required for account holders under 18." }, { status: 400 });
      }
    }

    const planTier = mapPlanTier(plan);
    const trialEndsAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        idNumber,
        dateOfBirth: dob,
        isMinor,
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
                guardianName,
                guardianEmail,
                status: "pending",
              },
            }
          : undefined,
      },
    });

    return NextResponse.json({ success: true, userId: user.id }, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    console.error("Signup API error:", error);
    return NextResponse.json(
      { error: "Unable to complete signup at this time. Please try again." },
      { status: 500 }
    );
  }
}
