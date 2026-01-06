"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    MessageSquare,
    Briefcase,
    Users,
    Eye,
    TrendingUp,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
    const stats = [
        { name: "Total Testimonials", value: "3", icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-500/10" },
        { name: "Live Case Studies", value: "5", icon: Briefcase, color: "text-purple-500", bg: "bg-purple-500/10" },
        { name: "Site Visits", value: "1,240", icon: Eye, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { name: "User Growth", value: "+12%", icon: TrendingUp, color: "text-cyan-500", bg: "bg-cyan-500/10" },
    ];

    return (
        <div className="space-y-10">
            {/* Header */}
            <div>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold tracking-tight mb-2"
                >
                    Welcome back, Admin
                </motion.h1>
                <p className="text-white/50 text-lg">
                    Manage your portfolio content and track performance.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.bg} p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.bg} ${stat.color}`}>
                                Live
                            </span>
                        </div>
                        <div>
                            <p className="text-white/50 text-sm font-medium">{stat.name}</p>
                            <p className="text-3xl font-bold mt-1 tracking-tight">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions & Recent Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Recent Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold tracking-tight">Recent Activity</h2>
                        <Link href="/admins-panel-resttt/testimonials" className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium flex items-center gap-1 group">
                            View all
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
                        <div className="divide-y divide-white/5">
                            {[
                                { type: "Testimonial", title: "New quote from Ahmad K.", date: "2 hours ago" },
                                { type: "Case Study", title: "Updated PointVerse project", date: "5 hours ago" },
                                { type: "Case Study", title: "Published Walletly mobile app", date: "1 day ago" },
                                { type: "Testimonial", title: "New quote from Rami S.", date: "3 days ago" },
                            ].map((item, i) => (
                                <div key={i} className="p-6 flex items-center justify-between hover:bg-white/2 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center",
                                            item.type === "Testimonial" ? "bg-blue-500/10" : "bg-purple-500/10"
                                        )}>
                                            {item.type === "Testimonial" ? <MessageSquare className="w-5 h-5 text-blue-400" /> : <Briefcase className="w-5 h-5 text-purple-400" />}
                                        </div>
                                        <div>
                                            <p className="font-medium text-white/90">{item.title}</p>
                                            <p className="text-xs text-white/40 mt-1">{item.type} • {item.date}</p>
                                        </div>
                                    </div>
                                    <button className="text-white/40 hover:text-white transition-colors">
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Quick Tools */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight">Quick Actions</h2>
                    <div className="space-y-4">
                        <button className="w-full p-6 text-left bg-blue-600 hover:bg-blue-500 rounded-3xl transition-all shadow-lg shadow-blue-900/20 group">
                            <MessageSquare className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
                            <p className="font-bold text-lg leading-tight">Add New<br />Testimonial</p>
                        </button>
                        <button className="w-full p-6 text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl transition-all group">
                            <Briefcase className="w-8 h-8 mb-4 text-purple-400 group-hover:scale-110 transition-transform" />
                            <p className="font-bold text-lg leading-tight">New Case<br />Study</p>
                        </button>
                        <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                            <div className="flex items-center gap-2 mb-4 text-cyan-400">
                                <Users className="w-5 h-5" />
                                <span className="font-bold text-sm tracking-widest uppercase">Database Status</span>
                            </div>
                            <p className="text-white/50 text-sm mb-4 leading-relaxed">
                                Connect your Supabase project to enable live dynamic updates.
                            </p>
                            <button className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all text-sm">
                                Connect Prisma
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
