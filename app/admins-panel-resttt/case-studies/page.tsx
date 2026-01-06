import { prisma } from "@/lib/db/prisma";
import CaseStudiesClient from "./case-studies-client";
import type { CaseStudy } from "@prisma/client";

type CaseStudyClient = Omit<CaseStudy, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
};

export default async function CaseStudiesPage() {
    const studies = await prisma.caseStudy.findMany({
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    const safe: CaseStudyClient[] = studies.map((s) => ({
        ...s,
        createdAt: s.createdAt.toISOString(),
        updatedAt: s.updatedAt.toISOString(),
    }));

    return <CaseStudiesClient initialStudies={safe} />;
}
