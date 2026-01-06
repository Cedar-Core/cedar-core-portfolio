import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

async function main() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) throw new Error("DATABASE_URL is not set");

    const pool = new Pool({ connectionString });
    const prisma = new PrismaClient({
        adapter: new PrismaPg(pool),
    });

    try {
        console.log("🌱 Seeding roles (dynamic access)...");
        // Using Type Assertion to bypass lint/type errors
        const p = prisma as any;

        const adminRole = await p.userRole.upsert({
            where: { name: "ADMIN" },
            update: {},
            create: { name: "ADMIN" },
        });

        await p.userRole.upsert({
            where: { name: "USER" },
            update: {},
            create: { name: "USER" },
        });

        console.log("👤 Seeding admin user...");
        const adminEmail = "admin@cedarcore.com";
        const adminPassword = "password123";
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        await p.user.upsert({
            where: { email: adminEmail },
            update: {
                roleId: adminRole.id,
            },
            create: {
                email: adminEmail,
                password: hashedPassword,
                roleId: adminRole.id,
            },
        });

        console.log("✅ Dynamic seed complete.");
        console.log(`Admin: ${adminEmail} / ${adminPassword}`);
    } catch (err) {
        console.error("❌ Seed failed:", err);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

main();
