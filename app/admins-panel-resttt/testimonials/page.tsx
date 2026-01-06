import { prisma } from "@/lib/db/prisma";
import TestimonialsClient from "./testimonials-client";
import type { Testimonial } from "@prisma/client";

export default async function TestimonialsPage() {
    const testimonials: Testimonial[] = await prisma.testimonial.findMany({
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    const safe = testimonials.map((t) => ({
        ...t,
        createdAt: t.createdAt.toISOString(),
        updatedAt: t.updatedAt.toISOString(),
    }));

    return <TestimonialsClient initialTestimonials={safe} />;
}
