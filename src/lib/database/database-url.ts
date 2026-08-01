const runtimeDatabaseUrlCandidates = [
  "DATABASE_URL",
  "STORAGE_POSTGRES_PRISMA_URL",
  "STORAGE_POSTGRES_URL",
  "STORAGE_DATABASE_URL",
] as const;

const migrationDatabaseUrlCandidates = [
  "DATABASE_URL_UNPOOLED",
  "STORAGE_DATABASE_URL_UNPOOLED",
  "STORAGE_POSTGRES_URL_NON_POOLING",
  "DATABASE_URL",
  "STORAGE_DATABASE_URL",
] as const;

function getRequiredEnvironmentVariable(
  variableNames: readonly string[],
  purpose: string,
) {
  for (const variableName of variableNames) {
    const value = process.env[variableName];

    if (value) {
      return value;
    }
  }

  throw new Error(
    `Database connection string for ${purpose} is not defined. Expected one of: ${variableNames.join(", ")}.`,
  );
}

export function getRuntimeDatabaseUrl() {
  return getRequiredEnvironmentVariable(
    runtimeDatabaseUrlCandidates,
    "application runtime",
  );
}

export function getMigrationDatabaseUrl() {
  return getRequiredEnvironmentVariable(
    migrationDatabaseUrlCandidates,
    "Prisma CLI and migrations",
  );
}