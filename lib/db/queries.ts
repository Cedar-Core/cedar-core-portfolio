import "server-only";
import { prisma } from "./prisma";

export type CaseStudyDTO = {
    id: string;
    slug: string;
    number?: string | null;
    title: string;
    tags: string[];
    image?: string | null;
    color: string; // keep your UI API: "from-x to-y"
    href?: string | null;
};

export type TestimonialDTO = {
    id: string;
    quote: string;
    author: string;
    company?: string | null;
};

export async function getFeaturedCaseStudies(): Promise<CaseStudyDTO[]> {
    const items = await prisma.caseStudy.findMany({
        where: { published: true, featured: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    return items.map((x) => ({
        id: x.id,
        slug: x.slug,
        number: x.number,
        title: x.title,
        tags: Array.isArray(x.tags) ? (x.tags as string[]) : [],
        image: x.coverImage,
        color: `${x.accentFrom ?? "from-indigo-600/80"} ${x.accentTo ?? "to-blue-600/80"}`,
        href: x.href ?? `#/case-studies/${x.slug}`,
    }));
}

export async function getFeaturedTestimonials(): Promise<TestimonialDTO[]> {
    const items = await prisma.testimonial.findMany({
        where: { published: true, featured: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    return items.map((x) => ({
        id: x.id,
        quote: x.quote,
        author: x.author,
        company: x.company,
    }));
}
