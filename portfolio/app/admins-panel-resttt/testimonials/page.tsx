"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageSquare,
    Plus,
    Search,
    Edit2,
    Trash2,
    MoreVertical,
    ChevronDown,
    Info
} from "lucide-react";
import { cn } from "@/lib/utils";

// Static data for now
const initialTestimonials = [
    { id: "1", author: "Ahmad K.", role: "Operations Manager", company: "Local Trading Company", quote: "Cedar Core helped us redesign our website...", active: true },
    { id: "2", author: "Rami S.", role: "Founder", company: "SaaS Startup", quote: "We worked with Cedar Core to build...", active: true },
    { id: "3", author: "Lara A.", role: "Product Lead", company: "SaaS Startup", quote: "Cedar Core delivered exactly what we needed...", active: true },
];

export default function TestimonialsPanel() {
    const [testimonials, setTestimonials] = useState(initialTestimonials);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [hoveredRow, setHoveredRow] = useState<string | null>(null);

    return (
        <div className="space-y-8">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">Testimonials</h1>
                    <p className="text-white/50 mt-1">Manage client quotes and social proof.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-900/20 active:scale-95 shrink-0"
                >
                    <Plus className="w-5 h-5" />
                    Add Testimonial
                </button>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-blue-400 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search testimonials..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-blue-500/50 transition-all text-sm"
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                    <button className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-blue-600 hover:border-blue-600 transition-all flex items-center gap-2">
                        Status <ChevronDown className="w-4 h-4" />
                    </button>
                    <button className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-blue-600 hover:border-blue-600 transition-all flex items-center gap-2">
                        Company <ChevronDown className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Database Warning */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-blue-900/10 border border-blue-500/20 p-4 rounded-3xl flex gap-4 items-start"
            >
                <div className="mt-1 bg-blue-500/20 p-2 rounded-xl">
                    <Info className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                    <p className="font-bold text-blue-100 italic">Static Mode Active</p>
                    <p className="text-blue-200/60 text-sm mt-0.5">
                        Changes made here will not persist until Supabase is integrated.
                    </p>
                </div>
            </motion.div>

            {/* List Container */}
            <div className="bg-white/5 rounded-4xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto overflow-y-visible">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/2">
                                <th className="px-8 py-5 text-xs font-bold uppercase tracking-[0.2em] text-white/30">Client</th>
                                <th className="px-8 py-5 text-xs font-bold uppercase tracking-[0.2em] text-white/30">Quote Snippet</th>
                                <th className="px-8 py-5 text-xs font-bold uppercase tracking-[0.2em] text-white/30">Status</th>
                                <th className="px-8 py-5 text-xs font-bold uppercase tracking-[0.2em] text-white/30 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {testimonials.map((t) => (
                                <tr
                                    key={t.id}
                                    className="hover:bg-white/2 transition-all group/row"
                                    onMouseEnter={() => setHoveredRow(t.id)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-500/10 to-blue-900/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xl">
                                                {t.author[0]}
                                            </div>
                                            <div>
                                                <p className="font-bold text-white/90">{t.author}</p>
                                                <p className="text-xs text-white/40 font-medium">{t.company}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm text-white/60 line-clamp-2 italic max-w-md">
                                            "{t.quote}"
                                        </p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={cn(
                                            "px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase",
                                            t.active ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-white/40"
                                        )}>
                                            {t.active ? "Visible" : "Draft"}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-transform translate-x-4 group-hover/row:translate-x-0 transition-transform duration-300">
                                            <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-3 rounded-xl bg-red-400/5 hover:bg-red-400/20 border border-red-400/10 text-red-400 hover:text-red-300 transition-all">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Modal Placeholder */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAddModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-black border border-white/10 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-blue-600 to-cyan-500" />

                            <h2 className="text-3xl font-bold tracking-tight mb-8">Add Testimonial</h2>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-white/40">Full Name</label>
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500/50 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-white/40">Company</label>
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500/50 transition-all" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Testimonial Quote</label>
                                    <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500/50 transition-all resize-none" />
                                </div>

                                <div className="flex items-center justify-end gap-4 mt-10">
                                    <button
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="px-8 py-4 rounded-2xl text-white/40 font-bold hover:text-white transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-95">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
