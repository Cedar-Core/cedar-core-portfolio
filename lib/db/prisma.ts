import "server-only";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
    pgPool: Pool | undefined;
};

function getPool() {
    if (globalForPrisma.pgPool) return globalForPrisma.pgPool;

    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        throw new Error("Missing DATABASE_URL env var");
    }

    const pool = new Pool({
        connectionString,
        // Supabase commonly needs SSL in production. Locally, ssl may be false.
        ssl:
            process.env.NODE_ENV === "production"
                ? { rejectUnauthorized: false }
                : undefined,
    });

    globalForPrisma.pgPool = pool;
    return pool;
}

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        adapter: new PrismaPg(getPool()),
        log:
            process.env.NODE_ENV === "development"
                ? ["query", "warn", "error"]
                : ["error"],
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
