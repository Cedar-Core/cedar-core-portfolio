"use server";

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/requireAdmin";

/**
 * NOTE:
 * - These actions assume you have Prisma models:
 *   - testimonial (id, quote, author, role?, company?, avatarUrl?, featured, published, sortOrder, createdAt, updatedAt)
 *   - caseStudy (id, slug, number?, title, shortSummary?, tags?, coverImage?, accentFrom?, accentTo?, href?, featured, published, sortOrder, createdAt, updatedAt)
 * Adjust the fields here if your schema names differ.
 */

// -------------------- Testimonials --------------------

const testimonialCreateSchema = z.object({
    quote: z.string().min(1),
    author: z.string().min(1),
    role: z.string().optional(),
    company: z.string().optional(),
    avatarUrl: z.string().optional(),
    featured: z.boolean().optional().default(false),
    published: z.boolean().optional().default(true),
    sortOrder: z.coerce.number().optional().default(0),
});

export async function createTestimonial(
    data: z.infer<typeof testimonialCreateSchema>
) {
    await requireAdmin();
    const parsed = testimonialCreateSchema.parse(data);

    await prisma.testimonial.create({ data: parsed });
    revalidatePath("/admins-panel-resttt/testimonials");
}

export async function updateTestimonial(
    id: string,
    data: Partial<z.infer<typeof testimonialCreateSchema>>
) {
    await requireAdmin();
    const parsed = testimonialCreateSchema.partial().parse(data);

    await prisma.testimonial.update({
        where: { id },
        data: parsed,
    });

    revalidatePath("/admins-panel-resttt/testimonials");
}

export async function deleteTestimonial(id: string) {
    await requireAdmin();
    await prisma.testimonial.delete({ where: { id } });
    revalidatePath("/admins-panel-resttt/testimonials");
}

// -------------------- Case Studies --------------------

const caseStudyCreateSchema = z.object({
    slug: z.string().min(1),
    number: z.string().optional(),
    title: z.string().min(1),
    shortSummary: z.string().optional(),
    // tags stored as Json (recommended). We keep flexible:
    tags: z.any().optional(),
    coverImage: z.string().optional(),
    accentFrom: z.string().optional(),
    accentTo: z.string().optional(),
    href: z.string().optional(),
    featured: z.boolean().optional().default(false),
    published: z.boolean().optional().default(false),
    sortOrder: z.coerce.number().optional().default(0),
});

export async function createCaseStudy(
    data: z.infer<typeof caseStudyCreateSchema>
) {
    await requireAdmin();
    const parsed = caseStudyCreateSchema.parse(data);

    await prisma.caseStudy.create({ data: parsed });
    revalidatePath("/admins-panel-resttt/case-studies");
}

export async function updateCaseStudy(
    id: string,
    data: Partial<z.infer<typeof caseStudyCreateSchema>>
) {
    await requireAdmin();
    const parsed = caseStudyCreateSchema.partial().parse(data);

    await prisma.caseStudy.update({
        where: { id },
        data: parsed,
    });

    revalidatePath("/admins-panel-resttt/case-studies");
}

export async function deleteCaseStudy(id: string) {
    await requireAdmin();
    await prisma.caseStudy.delete({ where: { id } });
    revalidatePath("/admins-panel-resttt/case-studies");
}
