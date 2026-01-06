"use client";

import { BarChart3, Briefcase, MessageSquare, CheckCircle2 } from "lucide-react";
import { AdminCard, AdminCardBody, AdminPage, FadeIn } from "./_components/admin-shell";

function Stat({
    title,
    value,
    sub,
    icon: Icon,
}: {
    title: string;
    value: React.ReactNode;
    sub: string;
    icon: any;
}) {
    return (
        <AdminCard className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(700px_circle_at_20%_10%,rgba(255,255,255,0.08),transparent_40%)]" />
            <AdminCardBody>
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                        <div className="text-xs text-white/55">{title}</div>
                        <div className="text-3xl font-semibold tracking-tight text-white">
                            {value}
                        </div>
                        <div className="text-xs text-white/50">{sub}</div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/6 p-3">
                        <Icon className="h-5 w-5 text-white/70" />
                    </div>
                </div>
            </AdminCardBody>
        </AdminCard>
    );
}

export default function DashboardClient({
    stats,
}: {
    stats: {
        caseStudiesTotal: number;
        caseStudiesPublished: number;
        testimonialsTotal: number;
        testimonialsPublished: number;
    };
}) {
    const publishedTotal = stats.caseStudiesPublished + stats.testimonialsPublished;

    return (
        <AdminPage
            title="Dashboard"
            description="A quick overview of what’s live on your portfolio."
        >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <FadeIn delay={0.02}>
                    <Stat
                        title="Case Studies"
                        value={stats.caseStudiesTotal}
                        sub={`${stats.caseStudiesPublished} published`}
                        icon={Briefcase}
                    />
                </FadeIn>

                <FadeIn delay={0.06}>
                    <Stat
                        title="Testimonials"
                        value={stats.testimonialsTotal}
                        sub={`${stats.testimonialsPublished} published`}
                        icon={MessageSquare}
                    />
                </FadeIn>

                <FadeIn delay={0.1}>
                    <Stat
                        title="Published Total"
                        value={publishedTotal}
                        sub="Across all sections"
                        icon={CheckCircle2}
                    />
                </FadeIn>

                <FadeIn delay={0.14}>
                    <Stat
                        title="Admin Status"
                        value="Live"
                        sub="DB-backed (Prisma)"
                        icon={BarChart3}
                    />
                </FadeIn>
            </div>

            <div className="mt-6">
                <AdminCard>
                    <AdminCardBody>
                        <div className="text-sm text-white/80">
                            Tip: keep <span className="text-white">sortOrder</span> low for
                            items you want on top. Use <span className="text-white">Published</span>{" "}
                            to control what appears on the public site.
                        </div>
                    </AdminCardBody>
                </AdminCard>
            </div>
        </AdminPage>
    );
}
