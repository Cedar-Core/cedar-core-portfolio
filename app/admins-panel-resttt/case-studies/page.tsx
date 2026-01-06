import { prisma } from "@/lib/db/prisma";
import CaseStudiesClient from "./case-studies-client";
import type { CaseStudy } from "@prisma/client";

export default async function CaseStudiesPage() {
    const studies: CaseStudy[] = await prisma.caseStudy.findMany({
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    const safe = studies.map((s) => ({
        ...s,
        createdAt: s.createdAt.toISOString(),
        updatedAt: s.updatedAt.toISOString(),
    }));

    return <CaseStudiesClient initialStudies={safe} />;
}
