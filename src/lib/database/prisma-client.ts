import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/generated/prisma/client";

import { getRuntimeDatabaseUrl } from "./database-url";

const globalForPrisma = globalThis as {
  prismaClient?: PrismaClient;
};

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: getRuntimeDatabaseUrl(),
  });

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "warn", "error"]
        : ["error"],
  });
}

export const prismaClient =
  globalForPrisma.prismaClient ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaClient = prismaClient;
}