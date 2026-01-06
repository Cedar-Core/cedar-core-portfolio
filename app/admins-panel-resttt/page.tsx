import { prisma } from "@/lib/db/prisma";
import DashboardClient from "./dashboard-client";

export default async function AdminDashboardPage() {
    const [
        caseStudiesTotal,
        caseStudiesPublished,
        testimonialsTotal,
        testimonialsPublished,
    ] = await Promise.all([
        prisma.caseStudy.count(),
        prisma.caseStudy.count({ where: { published: true } }),
        prisma.testimonial.count(),
        prisma.testimonial.count({ where: { published: true } }),
    ]);

    return (
        <DashboardClient
            stats={{
                caseStudiesTotal,
                caseStudiesPublished,
                testimonialsTotal,
                testimonialsPublished,
            }}
        />
    );
}
