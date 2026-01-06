"use server";

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// --- Testimonials ---

const testimonialSchema = z.object({
    quote: z.string().min(1),
    author: z.string().min(1),
    company: z.string().optional(),
    avatarUrl: z.string().optional(),
    featured: z.boolean().default(false),
    published: z.boolean().default(true),
    sortOrder: z.number().default(0),
});

export async function createTestimonial(data: z.infer<typeof testimonialSchema>) {
    await prisma.testimonial.create({ data });
    revalidatePath("/admins-panel-resttt/testimonials");
}

export async function updateTestimonial(id: string, data: Partial<z.infer<typeof testimonialSchema>>) {
    await prisma.testimonial.update({ where: { id }, data });
    revalidatePath("/admins-panel-resttt/testimonials");
}

export async function deleteTestimonial(id: string) {
    await prisma.testimonial.delete({ where: { id } });
    revalidatePath("/admins-panel-resttt/testimonials");
}

// --- Case Studies ---

const caseStudySchema = z.object({
    title: z.string().min(1),
    slug: z.string().min(1),
    number: z.string().optional(),
    shortSummary: z.string().optional(),
    tags: z.any().optional(), // Json
    coverImage: z.string().optional(),
    accentFrom: z.string().optional(),
    accentTo: z.string().optional(),
    href: z.string().optional(),
    featured: z.boolean().default(false),
    published: z.boolean().default(true),
    sortOrder: z.number().default(0),
});

export async function createCaseStudy(data: z.infer<typeof caseStudySchema>) {
    await prisma.caseStudy.create({ data });
    revalidatePath("/admins-panel-resttt/case-studies");
}

export async function updateCaseStudy(id: string, data: Partial<z.infer<typeof caseStudySchema>>) {
    await prisma.caseStudy.update({ where: { id }, data });
    revalidatePath("/admins-panel-resttt/case-studies");
}

export async function deleteCaseStudy(id: string) {
    await prisma.caseStudy.delete({ where: { id } });
    revalidatePath("/admins-panel-resttt/case-studies");
}
