"use server";

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import bcrypt from "bcryptjs";

// -------------------- Password Change --------------------

const passwordChangeSchema = z.object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
    confirmPassword: z.string().min(6),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export async function changePassword(data: z.infer<typeof passwordChangeSchema>) {
    const session = await requireAdmin();
    const userId = (session.user as any).id;

    const parsed = passwordChangeSchema.parse(data);

    // Get user from DB
    const user = await prisma.user.findUnique({
        where: { email: session.user?.email ?? "" },
    });

    if (!user) {
        throw new Error("User not found");
    }

    // Verify current password
    const isValid = await bcrypt.compare(parsed.currentPassword, user.password);
    if (!isValid) {
        throw new Error("Current password is incorrect");
    }

    // Hash new password and update
    const hashedPassword = await bcrypt.hash(parsed.newPassword, 10);
    await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
    });

    revalidatePath("/admins-panel-resttt/settings");
    return { success: true };
}

// -------------------- Get Admin User --------------------

export async function getAdminUser() {
    const session = await requireAdmin();

    const user = await prisma.user.findUnique({
        where: { email: session.user?.email ?? "" },
        include: { role: true },
    });

    if (!user) return null;

    return {
        id: user.id,
        email: user.email,
        role: user.role.name,
        createdAt: user.createdAt.toISOString(),
    };
}

// -------------------- Get Database Stats --------------------

export async function getDatabaseStats() {
    await requireAdmin();

    const [
        testimonialsCount,
        caseStudiesCount,
        usersCount,
    ] = await Promise.all([
        prisma.testimonial.count(),
        prisma.caseStudy.count(),
        prisma.user.count(),
    ]);

    return {
        testimonialsCount,
        caseStudiesCount,
        usersCount,
        databaseProvider: "PostgreSQL (Supabase)",
        connectionStatus: "Connected",
    };
}
