"use client";

import React from "react";
import {
    Settings,
    User,
    Shield,
    Database,
    Globe,
    Smartphone,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-4xl font-bold tracking-tight italic">Platform Settings</h1>
                <p className="text-white/50 text-lg mt-1 italic">Configure your environment and security.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Profile Card */}
                <div className="bg-white/5 rounded-[2.5rem] border border-white/10 p-10 space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold tracking-tight">Admin Profile</h2>
                        <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
                            <User className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-3xl shadow-xl shadow-blue-900/20">
                                A
                            </div>
                            <div>
                                <p className="font-bold text-xl italic">Portfolio Admin</p>
                                <p className="text-white/40 italic">admin@antimatterai.com</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Display Name</label>
                                <input type="text" defaultValue="Portfolio Admin" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500/50 transition-all font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Title</label>
                                <input type="text" defaultValue="Head of Content" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500/50 transition-all font-medium" />
                            </div>
                        </div>
                    </div>

                    <button className="w-full py-4 rounded-2xl bg-blue-600 font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]">
                        Save Profile Changes
                    </button>
                </div>

                {/* Database Integration Card */}
                <div className="bg-white/5 rounded-[2.5rem] border border-white/10 p-10 space-y-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Database className="w-40 h-40 -rotate-12" />
                    </div>

                    <div className="relative z-10 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold tracking-tight">Database Infrastructure</h2>
                            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400">
                                <Shield className="w-6 h-6" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/10 flex gap-4 items-start">
                                <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
                                <p className="text-sm text-amber-200/70 leading-relaxed font-medium">
                                    Database is currently in <span className="text-amber-400 font-bold italic">READ-ONLY STATIC MODE</span>.
                                    Connect to Supabase to enable dynamic persistence.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                        <span className="text-sm font-bold tracking-wide uppercase italic">Local Cache</span>
                                    </div>
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 opacity-40">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-white/20" />
                                        <span className="text-sm font-bold tracking-wide uppercase italic">Supabase Cluster</span>
                                    </div>
                                    <span className="text-[10px] font-black tracking-widest uppercase opacity-60">Disconnected</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Prisma API Key</label>
                                <div className="relative">
                                    <input type="password" value="••••••••••••••••••••••••••" readOnly className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none text-sm font-mono text-white/40" />
                                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black tracking-widest uppercase text-blue-400 hover:text-blue-300">Edit</button>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-4 rounded-2xl bg-white/10 font-bold hover:bg-white/20 border border-white/10 transition-all italic">
                            Connect Super-Cluster
                        </button>
                    </div>
                </div>
            </div>

            {/* Visual System Footer */}
            <div className="p-8 rounded-4xl bg-white/2 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-white/30" />
                    </div>
                    <div>
                        <p className="font-bold text-lg italic">Platform Core v1.4.2</p>
                        <p className="text-white/30 text-xs italic">Pure Black Theme System • Ultra Low Latency API</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-black tracking-widest uppercase text-white/30">System Status</p>
                        <p className="text-emerald-400 font-bold text-sm tracking-tight italic">Nominal & Optimal</p>
                    </div>
                    <div className="w-px h-10 bg-white/10 hidden sm:block" />
                    <div className="p-3 rounded-2xl bg-emerald-500/10">
                        <Globe className="w-6 h-6 text-emerald-500" />
                    </div>
                </div>
            </div>
        </div>
    );
}
