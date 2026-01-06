"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    BarChart3,
    MessageSquare,
    Briefcase,
    Settings,
    LogOut,
    Home,
    Menu,
    X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SessionProvider, signOut } from "next-auth/react";

const sidebarItems = [
    { name: "Dashboard", href: "/admins-panel-resttt", icon: BarChart3 },
    { name: "Testimonials", href: "/admins-panel-resttt/testimonials", icon: MessageSquare },
    { name: "Case Studies", href: "/admins-panel-resttt/case-studies", icon: Briefcase },
    { name: "Settings", href: "/admins-panel-resttt/settings", icon: Settings },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const handleSignOut = () => {
        signOut({ callbackUrl: "/admins-panel-resttt/login" });
    };

    return (
        <SessionProvider>
            <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">
                {/* Mobile Header */}
                <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                            <BarChart3 className="w-5 h-5 text-white" />
                        </div>
                        <span>Admin</span>
                    </div>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-md hover:bg-white/5 transition-colors"
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Sidebar - Desktop */}
                <aside className="hidden lg:flex w-64 flex-col border-r border-white/10 bg-black sticky top-0 h-screen overflow-y-auto">
                    <div className="p-8">
                        <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
                            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                                <BarChart3 className="w-6 h-6 text-white" />
                            </div>
                            <span>Admin</span>
                        </div>
                    </div>

                    <nav className="flex-1 px-4 py-4 space-y-1">
                        {sidebarItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                                        isActive
                                            ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.2)]"
                                            : "text-white/60 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "group-hover:text-blue-400")} />
                                    <span className="font-medium">{item.name}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="absolute inset-0 rounded-xl border border-white/20 z-[-1]"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-white/10">
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all"
                        >
                            <Home className="w-5 h-5" />
                            <span className="font-medium">Exit to Site</span>
                        </Link>
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-400/5 transition-all mt-1"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </div>
                </aside>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            className="fixed inset-0 z-40 bg-black flex flex-col p-6 lg:hidden"
                        >
                            <div className="flex justify-between items-center mb-12">
                                <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
                                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                                        <BarChart3 className="w-6 h-6 text-white" />
                                    </div>
                                    <span>Admin</span>
                                </div>
                                <button onClick={() => setIsMobileMenuOpen(false)}>
                                    <X className="w-8 h-8" />
                                </button>
                            </div>

                            <nav className="space-y-4">
                                {sidebarItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            "flex items-center gap-4 text-2xl font-semibold p-2",
                                            pathname === item.href ? "text-blue-500" : "text-white/70"
                                        )}
                                    >
                                        <item.icon className="w-8 h-8" />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>

                            <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-4">
                                <Link href="/" className="flex items-center gap-4 text-xl text-white/70">
                                    <Home className="w-7 h-7" />
                                    Return to Site
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center gap-4 text-xl text-red-400"
                                >
                                    <LogOut className="w-7 h-7" />
                                    Sign Out
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Content Area */}
                <main className="flex-1 min-w-0 bg-black overflow-y-auto">
                    <div className="max-w-[1400px] mx-auto p-6 lg:p-10">
                        {children}
                    </div>
                </main>
            </div>
        </SessionProvider>
    );
}
