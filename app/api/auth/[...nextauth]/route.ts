import { handlers } from "@/auth";

export const { GET, POST } = handlers;

// Explicitly set runtime to Node.js for bcrypt/Prisma compatibility
export const runtime = "nodejs";
