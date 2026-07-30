import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as {
  prismaClient?: PrismaClient;
};

const createPrismaClient = () => {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not defined.");
  }

  const adapter = new PrismaPg({
    connectionString,
  });

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "warn", "error"]
        : ["error"],
  });
};

export const prismaClient =
  globalForPrisma.prismaClient ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaClient = prismaClient;
}