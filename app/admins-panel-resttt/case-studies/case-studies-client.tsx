"use client";

import React, { useMemo, useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
    Briefcase,
    Plus,
    Search,
    Edit2,
    Trash2,
    X,
    Check,
    Sparkles,
    ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { createCaseStudy, updateCaseStudy, deleteCaseStudy } from "@/lib/actions/admin";

type CaseStudyRow = {
    id: string;
    slug: string;
    number: string | null;
    title: string;
    shortSummary: string | null;
    tags: any | null;
    coverImage: string | null;
    accentFrom: string | null;
    accentTo: string | null;
    href: string | null;
    featured: boolean;
    published: boolean;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
};

type FormState = {
    slug: string;
    number?: string;
    title: string;
    shortSummary?: string;
    tagsText: string;
    coverImage?: string;
    accentFrom?: string;
    accentTo?: string;
    href?: string;
    featured: boolean;
    published: boolean;
    sortOrder: number;
};

const modalVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.985 },
    show: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 10, scale: 0.985 },
};

function tagsToText(tags: any): string {
    if (!tags) return "";
    if (Array.isArray(tags)) return tags.join(", ");
    if (typeof tags === "string") return tags;
    try {
        return JSON.stringify(tags);
    } catch {
        return "";
    }
}

function textToTags(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return [];
    return trimmed
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
}

function slugify(input: string) {
    return input
        .toLowerCase()
        .trim()
        .replace(/['"]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function Badge({
    children,
    tone = "neutral",
}: {
    children: React.ReactNode;
    tone?: "neutral" | "good" | "warn";
}) {
    const styles =
        tone === "good"
            ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-200"
            : tone === "warn"
                ? "border-yellow-400/25 bg-yellow-500/10 text-yellow-100"
                : "border-white/10 bg-white/[0.06] text-white/70";

    return (
        <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium", styles)}>
            {children}
        </span>
    );
}

function TogglePill({
    checked,
    onClick,
    label,
    disabled,
}: {
    checked: boolean;
    onClick: () => void;
    label: string;
    disabled?: boolean;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition",
                checked
                    ? "border-white/15 bg-white/10t-white"
                    : "border-white/10 bg-white/5 text-white/70 hover:bg-white/8",
                disabled && "pointer-events-none opacity-60"
            )}
            title={`Toggle ${label}`}
        >
            <span
                className={cn(
                    "h-2 w-2 rounded-full",
                    checked ? "bg-emerald-300" : "bg-white/25"
                )}
            />
            {label}
        </button>
    );
}

export default function CaseStudiesClient({ initialStudies }: { initialStudies: CaseStudyRow[] }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [search, setSearch] = useState("");
    const [rows] = useState<CaseStudyRow[]>(initialStudies);

    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<CaseStudyRow | null>(null);

    const [form, setForm] = useState<FormState>({
        slug: "",
        number: "",
        title: "",
        shortSummary: "",
        tagsText: "",
        coverImage: "",
        accentFrom: "",
        accentTo: "",
        href: "",
        featured: false,
        published: false,
        sortOrder: 0,
    });

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return rows;
        return rows.filter((s) => {
            return (
                s.title.toLowerCase().includes(q) ||
                s.slug.toLowerCase().includes(q) ||
                (s.shortSummary ?? "").toLowerCase().includes(q)
            );
        });
    }, [rows, search]);

    function openCreate() {
        setEditing(null);
        setForm({
            slug: "",
            number: "",
            title: "",
            shortSummary: "",
            tagsText: "",
            coverImage: "",
            accentFrom: "",
            accentTo: "",
            href: "",
            featured: false,
            published: false,
            sortOrder: 0,
        });
        setModalOpen(true);
    }

    function openEdit(row: CaseStudyRow) {
        setEditing(row);
        setForm({
            slug: row.slug,
            number: row.number ?? "",
            title: row.title,
            shortSummary: row.shortSummary ?? "",
            tagsText: tagsToText(row.tags),
            coverImage: row.coverImage ?? "",
            accentFrom: row.accentFrom ?? "",
            accentTo: row.accentTo ?? "",
            href: row.href ?? "",
            featured: row.featured,
            published: row.published,
            sortOrder: row.sortOrder ?? 0,
        });
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
        setEditing(null);
    }

    function submit() {
        startTransition(async () => {
            try {
                const tags = textToTags(form.tagsText);

                // small UX: if creating and slug empty, generate from title
                const effectiveSlug = form.slug?.trim() || (!editing ? slugify(form.title) : form.slug);

                if (!form.title.trim()) {
                    toast.error("Title is required");
                    return;
                }
                if (!effectiveSlug.trim()) {
                    toast.error("Slug is required");
                    return;
                }

                if (editing) {
                    await updateCaseStudy(editing.id, {
                        slug: effectiveSlug,
                        number: form.number?.trim() || undefined,
                        title: form.title,
                        shortSummary: form.shortSummary?.trim() || undefined,
                        tags,
                        coverImage: form.coverImage?.trim() || undefined,
                        accentFrom: form.accentFrom?.trim() || undefined,
                        accentTo: form.accentTo?.trim() || undefined,
                        href: form.href?.trim() || undefined,
                        featured: form.featured,
                        published: form.published,
                        sortOrder: form.sortOrder,
                    });
                    toast.success("Case study updated");
                } else {
                    await createCaseStudy({
                        slug: effectiveSlug,
                        number: form.number?.trim() || undefined,
                        title: form.title,
                        shortSummary: form.shortSummary?.trim() || undefined,
                        tags,
                        coverImage: form.coverImage?.trim() || undefined,
                        accentFrom: form.accentFrom?.trim() || undefined,
                        accentTo: form.accentTo?.trim() || undefined,
                        href: form.href?.trim() || undefined,
                        featured: form.featured,
                        published: form.published,
                        sortOrder: form.sortOrder,
                    });
                    toast.success("Case study created");
                }

                closeModal();
                router.refresh();
            } catch {
                toast.error("Failed to save case study");
            }
        });
    }

    function remove(id: string) {
        const ok = confirm("Delete this case study?");
        if (!ok) return;

        startTransition(async () => {
            try {
                await deleteCaseStudy(id);
                toast.success("Case study deleted");
                router.refresh();
            } catch {
                toast.error("Failed to delete case study");
            }
        });
    }

    function quickToggle(id: string, patch: Partial<Pick<CaseStudyRow, "published" | "featured">>) {
        startTransition(async () => {
            try {
                await updateCaseStudy(id, patch);
                toast.success("Updated");
                router.refresh();
            } catch {
                toast.error("Failed to update");
            }
        });
    }

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/6">
                            <Briefcase className="h-5 w-5 text-white/80" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-white">Case Studies</h1>
                            <p className="text-sm text-white/55">Create, publish, and feature your real work.</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={openCreate}
                    className={cn(
                        "inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-medium transition active:scale-[0.99]",
                        "bg-white text-black hover:bg-white/90",
                        isPending && "opacity-60 pointer-events-none"
                    )}
                >
                    <Plus className="h-4 w-4" />
                    New Case Study
                </button>
            </div>

            {/* Toolbar */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-2 text-sm text-white/70">
                        <Badge tone="neutral">{filtered.length} shown</Badge>
                        <span className="text-white/35">•</span>
                        <span className="text-white/55">{rows.length} total</span>
                    </div>

                    <div className="relative w-full md:max-w-md">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search title, slug, summary…"
                            className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/20 focus:bg-white/[0.07]"
                        />
                    </div>
                </div>
            </div>

            {/* Table (desktop) */}
            <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-white/4 md:block">
                <div className="grid grid-cols-12 gap-3 border-b border-white/10 bg-black/20 px-5 py-3 text-xs text-white/55">
                    <div className="col-span-5">Case Study</div>
                    <div className="col-span-3">Slug</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-1 text-right">Order</div>
                    <div className="col-span-1 text-right">Actions</div>
                </div>

                <div className="divide-y divide-white/10">
                    {filtered.map((s) => (
                        <div
                            key={s.id}
                            className="grid grid-cols-12 gap-3 px-5 py-4 text-sm hover:bg-white/3sition"
                        >
                            <div className="col-span-5">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <div className="font-medium text-white">{s.title}</div>
                                            {s.href ? (
                                                <a
                                                    href={s.href}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-1 text-xs text-white/50 hover:text-white"
                                                    title="Open link"
                                                >
                                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                                </a>
                                            ) : null}
                                        </div>
                                        <div className="mt-0.5 text-xs text-white/50 line-clamp-1">
                                            {s.shortSummary ?? "—"}
                                        </div>
                                        <div className="mt-2 flex flex-wrap gap-1.5">
                                            {Array.isArray(s.tags) && s.tags.length > 0 ? (
                                                s.tags.slice(0, 4).map((t: string) => (
                                                    <Badge key={t}>{t}</Badge>
                                                ))
                                            ) : (
                                                <span className="text-xs text-white/35">No tags</span>
                                            )}
                                            {Array.isArray(s.tags) && s.tags.length > 4 ? (
                                                <Badge>+{s.tags.length - 4}</Badge>
                                            ) : null}
                                        </div>
                                    </div>

                                    {s.featured ? (
                                        <div className="mt-0.5">
                                            <Badge tone="warn">
                                                <Sparkles className="mr-1 h-3.5 w-3.5" />
                                                Featured
                                            </Badge>
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="col-span-3">
                                <div className="text-white/85">{s.slug}</div>
                                <div className="text-xs text-white/45">number: {s.number ?? "—"}</div>
                            </div>

                            <div className="col-span-2 flex flex-wrap gap-2">
                                <TogglePill
                                    checked={s.published}
                                    label={s.published ? "Published" : "Draft"}
                                    disabled={isPending}
                                    onClick={() => quickToggle(s.id, { published: !s.published })}
                                />
                                <TogglePill
                                    checked={s.featured}
                                    label="Featured"
                                    disabled={isPending}
                                    onClick={() => quickToggle(s.id, { featured: !s.featured })}
                                />
                            </div>

                            <div className="col-span-1 text-right text-white/70">{s.sortOrder}</div>

                            <div className="col-span-1 flex justify-end gap-2">
                                <button
                                    onClick={() => openEdit(s)}
                                    className={cn(
                                        "rounded-xl border border-white/10 bg-white/4text-white/75 hover:bg-white/8",
                                        isPending && "opacity-60 pointer-events-none"
                                    )}
                                    title="Edit"
                                >
                                    <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => remove(s.id)}
                                    className={cn(
                                        "rounded-xl border border-white/10 bg-white/4 p-2 text-white/75 hover:bg-white/8",
                                        isPending && "opacity-60 pointer-events-none"
                                    )}
                                    title="Delete"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}

                    {filtered.length === 0 && (
                        <div className="px-5 py-14 text-center text-sm text-white/55">
                            No case studies found.
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile list */}
            <div className="grid gap-3 md:hidden">
                {filtered.map((s) => (
                    <div key={s.id} className="rounded-2xl border border-white/10 bg-white/4 p-4">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <div className="text-base font-semibold text-white">{s.title}</div>
                                <div className="mt-1 text-xs text-white/50">{s.slug}</div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openEdit(s)}
                                    className={cn(
                                        "rounded-xl border border-white/10 bg-white/4 p-2 text-white/75 hover:bg-white/8",
                                        isPending && "opacity-60 pointer-events-none"
                                    )}
                                >
                                    <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => remove(s.id)}
                                    className={cn(
                                        "rounded-xl border border-white/10 bg-white/4 p-2 text-white/75 hover:bg-white/8",
                                        isPending && "opacity-60 pointer-events-none"
                                    )}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="mt-2 text-sm text-white/70 line-clamp-2">{s.shortSummary ?? "—"}</div>

                        <div className="mt-3 flex flex-wrap gap-2">
                            <TogglePill
                                checked={s.published}
                                label={s.published ? "Published" : "Draft"}
                                disabled={isPending}
                                onClick={() => quickToggle(s.id, { published: !s.published })}
                            />
                            <TogglePill
                                checked={s.featured}
                                label="Featured"
                                disabled={isPending}
                                onClick={() => quickToggle(s.id, { featured: !s.featured })}
                            />
                            <Badge>Order: {s.sortOrder}</Badge>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <div className="rounded-2xl border border-white/10 bg-white/4 p-10 text-center text-sm text-white/55">
                        No case studies found.
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            variants={modalVariants}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            transition={{ type: "spring", stiffness: 260, damping: 26 }}
                            className="w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0f]"
                        >
                            <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-black/20 px-5 py-4">
                                <div>
                                    <div className="text-lg font-semibold text-white">
                                        {editing ? "Edit Case Study" : "New Case Study"}
                                    </div>
                                    <div className="text-sm text-white/55">
                                        Everything here is saved to your database.
                                    </div>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="rounded-xl border border-white/10 bg-white/4 p-2 text-white/75 hover:bg-white/8"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="px-5 py-5">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <label className="space-y-1.5 md:col-span-2">
                                        <div className="text-xs text-white/60">
                                            Title <span className="text-red-300">*</span>
                                        </div>
                                        <input
                                            value={form.title}
                                            onChange={(e) =>
                                                setForm((p) => ({
                                                    ...p,
                                                    title: e.target.value,
                                                    slug: !editing && !p.slug ? slugify(e.target.value) : p.slug,
                                                }))
                                            }
                                            className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/20 focus:bg-white/[0.07]"
                                            placeholder="e.g. POS System for Retail"
                                        />
                                    </label>

                                    <label className="space-y-1.5">
                                        <div className="text-xs text-white/60">
                                            Slug <span className="text-red-300">*</span>
                                        </div>
                                        <input
                                            value={form.slug}
                                            onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                                            className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/20 focus:bg-white/[0.07]"
                                            placeholder="pos-system"
                                        />
                                        <div className="text-[11px] text-white/40">
                                            Used for URLs and unique lookup.
                                        </div>
                                    </label>

                                    <label className="space-y-1.5">
                                        <div className="text-xs text-white/60">Number</div>
                                        <input
                                            value={form.number ?? ""}
                                            onChange={(e) => setForm((p) => ({ ...p, number: e.target.value }))}
                                            className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/20 focus:bg-white/[0.07]"
                                            placeholder="01"
                                        />
                                    </label>

                                    <label className="space-y-1.5">
                                        <div className="text-xs text-white/60">Sort Order</div>
                                        <input
                                            type="number"
                                            value={form.sortOrder}
                                            onChange={(e) => setForm((p) => ({ ...p, sortOrder: Number(e.target.value) }))}
                                            className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-white/20 focus:bg-white/[0.07]"
                                        />
                                    </label>

                                    <div className="flex items-center gap-2 md:col-span-1">
                                        <button
                                            type="button"
                                            onClick={() => setForm((p) => ({ ...p, published: !p.published }))}
                                            className={cn(
                                                "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm",
                                                "border border-white/10 bg-white/5 text-white/80 hover:bg-white/8"
                                            )}
                                        >
                                            {form.published ? <Check className="h-4 w-4" /> : null}
                                            Published
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setForm((p) => ({ ...p, featured: !p.featured }))}
                                            className={cn(
                                                "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm",
                                                "border border-white/10 bg-white/5 text-white/80 hover:bg-white/8"
                                            )}
                                        >
                                            {form.featured ? <Check className="h-4 w-4" /> : null}
                                            Featured
                                        </button>
                                    </div>

                                    <label className="space-y-1.5 md:col-span-2">
                                        <div className="text-xs text-white/60">Short Summary</div>
                                        <textarea
                                            value={form.shortSummary ?? ""}
                                            onChange={(e) => setForm((p) => ({ ...p, shortSummary: e.target.value }))}
                                            rows={3}
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/20 focus:bg-white/[0.07]"
                                            placeholder="One paragraph summary for the public site."
                                        />
                                    </label>

                                    <label className="space-y-1.5 md:col-span-2">
                                        <div className="text-xs text-white/60">Tags</div>
                                        <input
                                            value={form.tagsText}
                                            onChange={(e) => setForm((p) => ({ ...p, tagsText: e.target.value }))}
                                            className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/20 focus:bg-white/[0.07]"
                                            placeholder="e.g. POS, Analytics, SaaS"
                                        />
                                        <div className="text-[11px] text-white/40">
                                            Comma-separated. Example: POS, Analytics, SaaS
                                        </div>
                                    </label>

                                    <label className="space-y-1.5 md:col-span-2">
                                        <div className="text-xs text-white/60">Public Link (href)</div>
                                        <input
                                            value={form.href ?? ""}
                                            onChange={(e) => setForm((p) => ({ ...p, href: e.target.value }))}
                                            className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/20 focus:bg-white/[0.07]"
                                            placeholder="https://..."
                                        />
                                    </label>

                                    <label className="space-y-1.5 md:col-span-2">
                                        <div className="text-xs text-white/60">Cover Image URL</div>
                                        <input
                                            value={form.coverImage ?? ""}
                                            onChange={(e) => setForm((p) => ({ ...p, coverImage: e.target.value }))}
                                            className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/20 focus:bg-white/[0.07]"
                                            placeholder="https://..."
                                        />
                                    </label>

                                    <div className="grid gap-4 md:grid-cols-2 md:col-span-2">
                                        <label className="space-y-1.5">
                                            <div className="text-xs text-white/60">Accent From</div>
                                            <input
                                                value={form.accentFrom ?? ""}
                                                onChange={(e) => setForm((p) => ({ ...p, accentFrom: e.target.value }))}
                                                className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/20 focus:bg-white/[0.07]"
                                                placeholder="#000000"
                                            />
                                        </label>
                                        <label className="space-y-1.5">
                                            <div className="text-xs text-white/60">Accent To</div>
                                            <input
                                                value={form.accentTo ?? ""}
                                                onChange={(e) => setForm((p) => ({ ...p, accentTo: e.target.value }))}
                                                className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/20 focus:bg-white/[0.07]"
                                                placeholder="#ffffff"
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-between gap-3">
                                    <div className="text-xs text-white/45">
                                        {isPending ? "Saving changes…" : " "}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={closeModal}
                                            className="h-10 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white/80 hover:bg-white/8"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={submit}
                                            className={cn(
                                                "h-10 rounded-xl bg-white px-4 text-sm font-medium text-black hover:bg-white/90",
                                                isPending && "opacity-60 pointer-events-none"
                                            )}
                                        >
                                            {editing ? "Save" : "Create"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
