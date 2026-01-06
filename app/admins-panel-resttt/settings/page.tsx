import { prisma } from "@/lib/db/prisma";
import { auth } from "@/auth";
import SettingsClient from "./settings-client";

export default async function SettingsPage() {
    const session = await auth();

    // Fetch admin user data
    const user = session?.user?.email ? await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { role: true },
    }) : null;

    // Fetch database stats
    const [testimonialsCount, caseStudiesCount, usersCount] = await Promise.all([
        prisma.testimonial.count(),
        prisma.caseStudy.count(),
        prisma.user.count(),
    ]);

    return (
        <SettingsClient
            user={user ? {
                id: user.id,
                email: user.email,
                role: user.role.name,
                createdAt: user.createdAt.toISOString(),
            } : null}
            stats={{
                testimonialsCount,
                caseStudiesCount,
                usersCount,
            }}
        />
    );
}
