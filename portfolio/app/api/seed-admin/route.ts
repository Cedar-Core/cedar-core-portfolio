import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        console.log("🌱 Seeding roles...");
        const adminRole = await prisma.userRole.upsert({
            where: { name: "ADMIN" },
            update: {},
            create: { name: "ADMIN" },
        });

        await prisma.userRole.upsert({
            where: { name: "USER" },
            update: {},
            create: { name: "USER" },
        });

        // ---- ADMIN USER ----
        console.log("👤 Seeding admin user...");
        const adminEmail = "admin@cedarcore.com";
        const adminPassword = "password123";
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        await prisma.user.upsert({
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

        return NextResponse.json({ success: true, message: "Admin seeded successfully" });
    } catch (error: any) {
        console.error("❌ Seed failed:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
