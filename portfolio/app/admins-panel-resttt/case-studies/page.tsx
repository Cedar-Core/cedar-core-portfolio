"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Briefcase,
    Plus,
    Search,
    Edit2,
    Trash2,
    Image as ImageIcon,
    ExternalLink,
    Layers,
    Info
} from "lucide-react";
import { cn } from "@/lib/utils";

// Static data
const initialCaseStudies = [
    { id: "PointVerse", number: "01", title: "PointVerse", tags: ["SaaS", "Software"], image: "/images/case-studies/pointverse.png", status: "Published" },
    { id: "Invoverse", number: "02", title: "Invoverse", tags: ["Web", "SaaS"], image: "/images/case-studies/invoverse.png", status: "Published" },
    { id: "Walletly", number: "03", title: "Walletly", tags: ["App", "Mobile"], image: "/images/case-studies/walletly.png", status: "Published" },
    { id: "Drop-x", number: "04", title: "Drop-x", tags: ["Web", "AI"], image: "/images/case-studies/drop-x.png", status: "Published" },
    { id: "feature", number: "05", title: "Feature", tags: ["Design", "GTM"], image: "/images/case-studies/feature.jpg", status: "Published" },
];

export default function CaseStudiesPanel() {
    const [studies, setStudies] = useState(initialCaseStudies);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <div className="space-y-8">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">Case Studies</h1>
                    <p className="text-white/50 mt-1">Manage your professional work and portfolio items.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-900/20 active:scale-95 shrink-0"
                >
                    <Plus className="w-5 h-5" />
                    Add Project
                </button>
            </div>

            {/* Filter Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Total", count: studies.length, color: "text-blue-400" },
                    { label: "Published", count: studies.length, color: "text-emerald-400" },
                    { label: "Drafts", count: 0, color: "text-amber-400" },
                    { label: "Archived", count: 0, color: "text-rose-400" },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                        <p className="text-[10px] font-black tracking-widest uppercase text-white/30 mb-1">{stat.label}</p>
                        <p className={cn("text-2xl font-bold", stat.color)}>{stat.count}</p>
                    </div>
                ))}
            </div>

            {/* Database Warning */}
            <div className="bg-purple-900/10 border border-purple-500/20 p-4 rounded-3xl flex gap-4 items-start shadow-inner">
                <div className="mt-1 bg-purple-500/20 p-2 rounded-xl text-purple-400 shadow-glow shadow-purple-900/40">
                    <Layers className="w-5 h-5 shadow-2xl" />
                </div>
                <div>
                    <p className="font-bold text-purple-100 flex items-center gap-2 italic">
                        Visual Editor
                    </p>
                    <p className="text-purple-200/60 text-sm mt-0.5 leading-relaxed">
                        Case studies depend on asset management (images). Supabase Storage is recommended for production.
                    </p>
                </div>
            </div>

            {/* Grid Container */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {studies.map((study) => (
                    <motion.div
                        key={study.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="group relative bg-white/5 rounded-[2.5rem] border border-white/10 overflow-hidden hover:border-white/30 transition-all duration-300 shadow-2xl"
                    >
                        <div className="flex flex-col sm:flex-row h-full">
                            {/* Preview Block */}
                            <div className="w-full sm:w-48 xl:w-56 h-48 sm:h-auto relative bg-black shrink-0 group-hover:scale-105 transition-transform duration-700">
                                <div className="absolute inset-0 bg-linear-to-tr from-black/80 to-transparent z-10" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <ImageIcon className="w-10 h-10 text-white/10" />
                                </div>
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="px-3 py-1.5 rounded-full bg-blue-600/90 text-[10px] font-black text-white uppercase tracking-widest shadow-lg">
                                        {study.number}
                                    </span>
                                </div>
                            </div>

                            {/* Info Block */}
                            <div className="flex-1 p-8 flex flex-col justify-between space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-2xl font-bold tracking-tight">{study.title}</h3>
                                        <div className="flex items-center gap-1">
                                            <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2.5 rounded-xl bg-red-400/5 hover:bg-red-400/20 text-red-400/60 hover:text-red-400 transition-all">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {study.tags.map((tag) => (
                                            <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 text-[10px] font-bold text-white/50 border border-white/10">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        {study.status}
                                    </span>
                                    <a href={study.id} className="text-white/30 hover:text-white transition-all text-xs flex items-center gap-1 group/link">
                                        View project
                                        <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

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
                            <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-purple-600 to-blue-500" />
                            <h2 className="text-3xl font-bold tracking-tight mb-8">New Case Study</h2>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-white/40">Project Title</label>
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500/50 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-white/40">Project Number</label>
                                        <input type="text" placeholder="e.g. 06" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500/50 transition-all" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Tags (Comma separated)</label>
                                    <input type="text" placeholder="SaaS, AI, Web Design" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500/50 transition-all" />
                                </div>
                                <div className="flex items-center justify-end gap-4 mt-10">
                                    <button onClick={() => setIsAddModalOpen(false)} className="px-8 py-4 rounded-2xl text-white/40 font-bold hover:text-white transition-all">Cancel</button>
                                    <button className="px-8 py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-lg shadow-purple-900/20">Create Project</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
