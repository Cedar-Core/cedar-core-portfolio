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
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/Toaster";
import { handleSignOut } from "@/lib/actions/auth";

const sidebarItems = [
  { name: "Dashboard", href: "/admins-panel-resttt", icon: BarChart3 },
  {
    name: "Testimonials",
    href: "/admins-panel-resttt/testimonials",
    icon: MessageSquare,
  },
  {
    name: "Case Studies",
    href: "/admins-panel-resttt/case-studies",
    icon: Briefcase,
  },
  { name: "Settings", href: "/admins-panel-resttt/settings", icon: Settings },
];

function Brand() {
  return (
    <div className="flex items-center gap-2 font-semibold tracking-tight">
      <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
        <BarChart3 className="h-5 w-5 text-white/85" />
      </div>
      <div className="leading-none">
        <div className="text-base text-white">Admin</div>
        <div className="text-xs text-white/45">Content Manager</div>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const onSignOut = async () => {
    await handleSignOut();
  };

  return (
    <SessionProvider>
      <div className="min-h-screen bg-[#07070a] text-white">
        {/* Background */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 [background:radial-gradient(1200px_circle_at_20%_10%,rgba(255,255,255,0.06),transparent_45%)]" />
          <div className="absolute inset-0 [background:radial-gradient(900px_circle_at_90%_20%,rgba(59,130,246,0.14),transparent_40%)]" />
        </div>

        {/* Mobile Topbar */}
        <div className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Brand />
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/8"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="mx-auto flex max-w-[1400px] lg:min-h-screen lg:gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden w-72 flex-col lg:flex">
            <div className="sticky top-0 flex h-screen flex-col">
              <div className="px-6 pb-4 pt-6">
                <Brand />
              </div>

              <nav className="flex-1 space-y-1 px-4 pb-4">
                {sidebarItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition",
                        isActive
                          ? "text-white"
                          : "text-white/60 hover:text-white hover:bg-white/6"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-nav"
                          className="absolute inset-0 rounded-2xl border border-white/10 bg-white/6"
                        />
                      )}
                      <Icon
                        className={cn(
                          "relative h-5 w-5",
                          isActive
                            ? "text-white"
                            : "text-white/65 group-hover:text-white"
                        )}
                      />
                      <span className="relative font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="px-4 pb-6">
                <div className="rounded-2xl border border-white/10 bg-white/4 p-2">
                  <Link
                    href="/"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/70 hover:bg-white/6 hover:text-white"
                  >
                    <Home className="h-5 w-5" />
                    <span className="font-medium">Exit to Site</span>
                  </Link>
                  <button
                    onClick={onSignOut}
                    className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-200/80 hover:bg-red-500/10 hover:text-red-200"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Drawer */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <motion.div
                  initial={{ x: -320 }}
                  animate={{ x: 0 }}
                  exit={{ x: -320 }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  className="h-full w-[88%] max-w-sm border-r border-white/10 bg-[#07070a] p-5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between">
                    <Brand />
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/8"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-6 space-y-1">
                    {sidebarItems.map((item) => {
                      const isActive = pathname === item.href;
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 rounded-2xl px-4 py-3 text-base",
                            isActive
                              ? "border border-white/10 bg-white/6 text-white"
                              : "text-white/70 hover:bg-white/6 hover:text-white"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="font-semibold">{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-8 rounded-2xl border border-white/10 bg-white/4 p-2">
                    <Link
                      href="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/70 hover:bg-white/6 hover:text-white"
                    >
                      <Home className="h-5 w-5" />
                      <span className="font-medium">Exit to Site</span>
                    </Link>
                    <button
                      onClick={onSignOut}
                      className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-200/80 hover:bg-red-500/10 hover:text-red-200"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main */}
          <main className="min-w-0 flex-1 px-4 py-6 lg:px-0 lg:py-10">
            <div className="mx-auto w-full max-w-6xl">{children}</div>
          </main>
        </div>
      </div>

      <Toaster />
    </SessionProvider>
  );
}
