import { prisma } from "@/lib/db/prisma";
import TestimonialsClient from "./testimonials-client";

export default async function TestimonialsPage() {
    const testimonials = await prisma.testimonial.findMany({
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    // Serialize dates safely for client component
    const safe = testimonials.map((t) => ({
        ...t,
        createdAt: t.createdAt.toISOString(),
        updatedAt: t.updatedAt.toISOString(),
    }));

    return <TestimonialsClient initialTestimonials={safe} />;
}
