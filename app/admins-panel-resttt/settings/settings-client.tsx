"use client";

import React, { useState, useTransition } from "react";
import { motion } from "framer-motion";
import {
    Settings,
    User,
    Shield,
    Database,
    Globe,
    Smartphone,
    CheckCircle2,
    Lock,
    Eye,
    EyeOff,
    Loader2,
    MessageSquare,
    Briefcase,
    Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { changePassword } from "@/lib/actions/settings";

type SettingsClientProps = {
    user: {
        id: string;
        email: string;
        role: string;
        createdAt: string;
    } | null;
    stats: {
        testimonialsCount: number;
        caseStudiesCount: number;
        usersCount: number;
    };
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export default function SettingsClient({ user, stats }: SettingsClientProps) {
    const [isPending, startTransition] = useTransition();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    function handlePasswordChange() {
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        startTransition(async () => {
            try {
                await changePassword(passwordForm);
                toast.success("Password changed successfully");
                setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
            } catch (error: any) {
                toast.error(error.message || "Failed to change password");
            }
        });
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
            >
                <div className="p-3 rounded-2xl bg-linear-to-br from-blue-600/20 to-purple-600/20 border border-white/10">
                    <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-semibold text-white">Settings</h1>
                    <p className="text-sm text-white/60">
                        Manage your account and view system status
                    </p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Profile Card */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="show"
                    transition={{ delay: 0.1 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-6"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-white">Admin Profile</h2>
                        <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                            <User className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-2xl shadow-lg shadow-blue-900/30">
                            {user?.email?.charAt(0).toUpperCase() || "A"}
                        </div>
                        <div>
                            <p className="font-semibold text-white">{user?.email || "Admin"}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    {user?.role || "ADMIN"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                        <div>
                            <p className="text-xs text-white/40 uppercase tracking-wider">User ID</p>
                            <p className="text-sm text-white/80 font-mono mt-1 truncate">{user?.id || "—"}</p>
                        </div>
                        <div>
                            <p className="text-xs text-white/40 uppercase tracking-wider">Member Since</p>
                            <p className="text-sm text-white/80 mt-1">
                                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Password Change Card */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="show"
                    transition={{ delay: 0.2 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-6"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-white">Change Password</h2>
                        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                            <Lock className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs text-white/50 uppercase tracking-wider">Current Password</label>
                            <div className="relative">
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    value={passwordForm.currentPassword}
                                    onChange={(e) => setPasswordForm(p => ({ ...p, currentPassword: e.target.value }))}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50 transition-colors pr-10"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                                >
                                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-white/50 uppercase tracking-wider">New Password</label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    value={passwordForm.newPassword}
                                    onChange={(e) => setPasswordForm(p => ({ ...p, newPassword: e.target.value }))}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50 transition-colors pr-10"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                                >
                                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-white/50 uppercase tracking-wider">Confirm Password</label>
                            <input
                                type="password"
                                value={passwordForm.confirmPassword}
                                onChange={(e) => setPasswordForm(p => ({ ...p, confirmPassword: e.target.value }))}
                                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            onClick={handlePasswordChange}
                            disabled={isPending || !passwordForm.currentPassword || !passwordForm.newPassword}
                            className={cn(
                                "w-full py-3 rounded-xl font-medium text-sm transition-all",
                                "bg-linear-to-r from-blue-600 to-purple-600 text-white",
                                "hover:from-blue-500 hover:to-purple-500",
                                "disabled:opacity-50 disabled:cursor-not-allowed",
                                "flex items-center justify-center gap-2"
                            )}
                        >
                            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                            Update Password
                        </button>
                    </div>
                </motion.div>

                {/* Database Stats Card */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="show"
                    transition={{ delay: 0.3 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-6"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-white">Database Status</h2>
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                            <Database className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
                        <span className="text-sm font-medium text-emerald-400">PostgreSQL Connected</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                            <MessageSquare className="w-5 h-5 mx-auto text-white/40 mb-2" />
                            <p className="text-2xl font-bold text-white">{stats.testimonialsCount}</p>
                            <p className="text-xs text-white/50 mt-1">Testimonials</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                            <Briefcase className="w-5 h-5 mx-auto text-white/40 mb-2" />
                            <p className="text-2xl font-bold text-white">{stats.caseStudiesCount}</p>
                            <p className="text-xs text-white/50 mt-1">Case Studies</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                            <Users className="w-5 h-5 mx-auto text-white/40 mb-2" />
                            <p className="text-2xl font-bold text-white">{stats.usersCount}</p>
                            <p className="text-xs text-white/50 mt-1">Users</p>
                        </div>
                    </div>
                </motion.div>

                {/* System Info Card */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="show"
                    transition={{ delay: 0.4 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-6"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-white">System Info</h2>
                        <div className="p-2.5 rounded-xl bg-white/5 text-white/60">
                            <Globe className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                            <span className="text-sm text-white/60">Framework</span>
                            <span className="text-sm font-medium text-white">Next.js 16</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                            <span className="text-sm text-white/60">ORM</span>
                            <span className="text-sm font-medium text-white">Prisma</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                            <span className="text-sm text-white/60">Authentication</span>
                            <span className="text-sm font-medium text-white">Auth.js v5</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                            <span className="text-sm text-white/60">Database</span>
                            <span className="text-sm font-medium text-white">Supabase PostgreSQL</span>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Smartphone className="w-4 h-4 text-white/40" />
                            <span className="text-xs text-white/40">Cedar Core Admin v1.0</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span className="text-xs font-medium text-emerald-400">All Systems Operational</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
