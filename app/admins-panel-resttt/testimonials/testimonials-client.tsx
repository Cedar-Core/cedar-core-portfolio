"use client";

import React, { useMemo, useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
    MessageSquare,
    Plus,
    Search,
    Edit2,
    Trash2,
    X,
    Check,
    Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "@/lib/actions/admin";

type TestimonialRow = {
    id: string;
    quote: string;
    author: string;
    role: string | null;
    company: string | null;
    avatarUrl: string | null;
    featured: boolean;
    published: boolean;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
};

type FormState = {
    quote: string;
    author: string;
    role?: string;
    company?: string;
    avatarUrl?: string;
    featured: boolean;
    published: boolean;
    sortOrder: number;
};

const modalVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.985 },
    show: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 10, scale: 0.985 },
};

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
                    ? "border-white/15 bg-white/10 text-white"
                    : "border-white/10 bg-white/5 text-white/70 hover:bg-white/8",
                disabled && "pointer-events-none opacity-60"
            )}
            title={`Toggle ${label}`}
        >
            <span className={cn("h-2 w-2 rounded-full", checked ? "bg-emerald-300" : "bg-white/25")} />
            {label}
        </button>
    );
}

export default function TestimonialsClient({
    initialTestimonials,
}: {
    initialTestimonials: TestimonialRow[];
}) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [search, setSearch] = useState("");
    const [rows] = useState<TestimonialRow[]>(initialTestimonials);

    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<TestimonialRow | null>(null);

    const [form, setForm] = useState<FormState>({
        quote: "",
        author: "",
        role: "",
        company: "",
        avatarUrl: "",
        featured: false,
        published: true,
        sortOrder: 0,
    });

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return rows;

        return rows.filter((t) => {
            return (
                t.author.toLowerCase().includes(q) ||
                (t.company ?? "").toLowerCase().includes(q) ||
                (t.role ?? "").toLowerCase().includes(q) ||
                t.quote.toLowerCase().includes(q)
            );
        });
    }, [rows, search]);

    function openCreate() {
        setEditing(null);
        setForm({
            quote: "",
            author: "",
            role: "",
            company: "",
            avatarUrl: "",
            featured: false,
            published: true,
            sortOrder: 0,
        });
        setModalOpen(true);
    }

    function openEdit(row: TestimonialRow) {
        setEditing(row);
        setForm({
            quote: row.quote,
            author: row.author,
            role: row.role ?? "",
            company: row.company ?? "",
            avatarUrl: row.avatarUrl ?? "",
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
                if (!form.author.trim()) {
                    toast.error("Author is required");
                    return;
                }
                if (!form.quote.trim()) {
                    toast.error("Quote is required");
                    return;
                }

                if (editing) {
                    await updateTestimonial(editing.id, {
                        quote: form.quote,
                        author: form.author,
                        role: form.role?.trim() || undefined,
                        company: form.company?.trim() || undefined,
                        avatarUrl: form.avatarUrl?.trim() || undefined,
                        featured: form.featured,
                        published: form.published,
                        sortOrder: form.sortOrder,
                    });
                    toast.success("Testimonial updated");
                } else {
                    await createTestimonial({
                        quote: form.quote,
                        author: form.author,
                        role: form.role?.trim() || undefined,
                        company: form.company?.trim() || undefined,
                        avatarUrl: form.avatarUrl?.trim() || undefined,
                        featured: form.featured,
                        published: form.published,
                        sortOrder: form.sortOrder,
                    });
                    toast.success("Testimonial created");
                }

                closeModal();
                router.refresh();
            } catch {
                toast.error("Failed to save testimonial");
            }
        });
    }

    function remove(id: string) {
        const ok = confirm("Delete this testimonial?");
        if (!ok) return;

        startTransition(async () => {
            try {
                await deleteTestimonial(id);
                toast.success("Testimonial deleted");
                router.refresh();
            } catch {
                toast.error("Failed to delete testimonial");
            }
        });
    }

    function quickToggle(id: string, patch: Partial<Pick<TestimonialRow, "published" | "featured">>) {
        startTransition(async () => {
            try {
                await updateTestimonial(id, patch);
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
                            <MessageSquare className="h-5 w-5 text-white/80" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-white">Testimonials</h1>
                            <p className="text-sm text-white/55">Edit quotes, publish, and feature the best ones.</p>
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
                    New Testimonial
                </button>
            </div>

            {/* Toolbar */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-2 text-sm text-white/70">
                        <Badge>{filtered.length} shown</Badge>
                        <span className="text-white/35">•</span>
                        <span className="text-white/55">{rows.length} total</span>
                    </div>

                    <div className="relative w-full md:max-w-md">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search author, role, company, quote…"
                            className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/20 focus:bg-white/[0.07]"
                        />
                    </div>
                </div>
            </div>

            {/* Table (desktop) */}
            <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-white/4 md:block">
                <div className="grid grid-cols-12 gap-3 border-b border-white/10 bg-black/20 px-5 py-3 text-xs text-white/55">
                    <div className="col-span-3">Person</div>
                    <div className="col-span-3">Role / Company</div>
                    <div className="col-span-4">Quote</div>
                    <div className="col-span-1">Status</div>
                    <div className="col-span-1 text-right">Actions</div>
                </div>

                <div className="divide-y divide-white/10">
                    {filtered.map((t) => (
                        <div
                            key={t.id}
                            className="grid grid-cols-12 gap-3 px-5 py-4 text-sm hover:bg-white/3 transition"
                        >
                            <div className="col-span-3">
                                <div className="flex items-center justify-between gap-2">
                                    <div>
                                        <div className="font-medium text-white">{t.author}</div>
                                        <div className="text-xs text-white/45">order: {t.sortOrder}</div>
                                    </div>
                                    {t.featured ? (
                                        <Badge tone="warn">
                                            <Sparkles className="mr-1 h-3.5 w-3.5" />
                                            Featured
                                        </Badge>
                                    ) : null}
                                </div>
                            </div>

                            <div className="col-span-3">
                                <div className="text-white/85">{t.role ?? "—"}</div>
                                <div className="text-xs text-white/55">{t.company ?? "—"}</div>
                            </div>

                            <div className="col-span-4">
                                <div className="line-clamp-2 text-white/80">“{t.quote}”</div>
                            </div>

                            <div className="col-span-1 flex flex-wrap gap-2">
                                <TogglePill
                                    checked={t.published}
                                    label={t.published ? "Published" : "Draft"}
                                    disabled={isPending}
                                    onClick={() => quickToggle(t.id, { published: !t.published })}
                                />
                                <TogglePill
                                    checked={t.featured}
                                    label="Featured"
                                    disabled={isPending}
                                    onClick={() => quickToggle(t.id, { featured: !t.featured })}
                                />
                            </div>

                            <div className="col-span-1 flex justify-end gap-2">
                                <button
                                    onClick={() => openEdit(t)}
                                    className={cn(
                                        "rounded-xl border border-white/10 bg-white/4 p-2 text-white/75 hover:bg-white/8",
                                        isPending && "opacity-60 pointer-events-none"
                                    )}
                                    title="Edit"
                                >
                                    <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => remove(t.id)}
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
                            No testimonials found.
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile list */}
            <div className="grid gap-3 md:hidden">
                {filtered.map((t) => (
                    <div key={t.id} className="rounded-2xl border border-white/10 bg-white/4 p-4">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <div className="text-base font-semibold text-white">{t.author}</div>
                                <div className="mt-1 text-xs text-white/50">
                                    {t.role ?? "—"} • {t.company ?? "—"}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openEdit(t)}
                                    className={cn(
                                        "rounded-xl border border-white/10 bg-white/4 p-2 text-white/75 hover:bg-white/8",
                                        isPending && "opacity-60 pointer-events-none"
                                    )}
                                >
                                    <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => remove(t.id)}
                                    className={cn(
                                        "rounded-xl border border-white/10 bg-white/4 p-2 text-white/75 hover:bg-white/8",
                                        isPending && "opacity-60 pointer-events-none"
                                    )}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="mt-3 text-sm text-white/80 line-clamp-3">“{t.quote}”</div>

                        <div className="mt-3 flex flex-wrap gap-2">
                            <TogglePill
                                checked={t.published}
                                label={t.published ? "Published" : "Draft"}
                                disabled={isPending}
                                onClick={() => quickToggle(t.id, { published: !t.published })}
                            />
                            <TogglePill
                                checked={t.featured}
                                label="Featured"
                                disabled={isPending}
                                onClick={() => quickToggle(t.id, { featured: !t.featured })}
                            />
                            <Badge>Order: {t.sortOrder}</Badge>
                        </div>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <div className="rounded-2xl border border-white/10 bg-white/4 p-10 text-center text-sm text-white/55">
                        No testimonials found.
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
                            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0f]"
                        >
                            <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-black/20 px-5 py-4">
                                <div>
                                    <div className="text-lg font-semibold text-white">
                                        {editing ? "Edit Testimonial" : "New Testimonial"}
                                    </div>
                                    <div className="text-sm text-white/55">Saved directly to your database.</div>
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
                                    <label className="space-y-1.5">
                                        <div className="text-xs text-white/60">
                                            Author <span className="text-red-300">*</span>
                                        </div>
                                        <input
                                            value={form.author}
                                            onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
                                            className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/20 focus:bg-white/[0.07]"
                                            placeholder="e.g. Nour H."
                                        />
                                    </label>

                                    <label className="space-y-1.5">
                                        <div className="text-xs text-white/60">Role</div>
                                        <input
                                            value={form.role ?? ""}
                                            onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                                            className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/20 focus:bg-white/[0.07]"
                                            placeholder="e.g. Founder"
                                        />
                                    </label>

                                    <label className="space-y-1.5">
                                        <div className="text-xs text-white/60">Company</div>
                                        <input
                                            value={form.company ?? ""}
                                            onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                                            className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/20 focus:bg-white/[0.07]"
                                            placeholder="e.g. Cedar Point"
                                        />
                                    </label>

                                    <label className="space-y-1.5">
                                        <div className="text-xs text-white/60">Avatar URL</div>
                                        <input
                                            value={form.avatarUrl ?? ""}
                                            onChange={(e) => setForm((p) => ({ ...p, avatarUrl: e.target.value }))}
                                            className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/20 focus:bg-white/[0.07]"
                                            placeholder="https://..."
                                        />
                                    </label>

                                    <label className="space-y-1.5 md:col-span-2">
                                        <div className="text-xs text-white/60">
                                            Quote <span className="text-red-300">*</span>
                                        </div>
                                        <textarea
                                            value={form.quote}
                                            onChange={(e) => setForm((p) => ({ ...p, quote: e.target.value }))}
                                            rows={4}
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/20 focus:bg-white/[0.07]"
                                            placeholder="Write the testimonial quote here…"
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
                                </div>

                                <div className="mt-6 flex items-center justify-between gap-3">
                                    <div className="text-xs text-white/45">{isPending ? "Saving…" : " "}</div>
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
