import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { logger } from "@/lib/logger";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  logger.error("DATABASE_URL environment variable is not set");
  throw new Error("DATABASE_URL must be set to initialize Prisma.");
}

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString,
    }),
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
