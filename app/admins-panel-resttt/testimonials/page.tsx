import { prisma } from "@/lib/db/prisma";
import TestimonialsClient from "./testimonials-client";
import type { Testimonial } from "@prisma/client";

type TestimonialClient = Omit<Testimonial, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
};

export default async function TestimonialsPage() {
    const testimonials = await prisma.testimonial.findMany({
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    const safe: TestimonialClient[] = testimonials.map((t) => ({
        ...t,
        createdAt: t.createdAt.toISOString(),
        updatedAt: t.updatedAt.toISOString(),
    }));

    return <TestimonialsClient initialTestimonials={safe} />;
}
