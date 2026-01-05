"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";


export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<"en" | "fr">("en");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "absolute top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-cyan-500/10"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-4 group relative">
            <div className="w-10 h-10 relative flex items-center justify-center">
              {/* Floating Particles */}
              <div className="absolute inset-0 overflow-visible pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-blue-400"
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={{
                      x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 5), 0],
                      y: [0, (i < 3 ? -1 : 1) * (20 + i * 5), 0],
                      opacity: [0, 0.8, 0],
                      scale: [0, 1.2, 0],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5,
                    }}
                    style={{
                      backgroundColor: i % 2 === 0 ? '#60A5FA' : '#A855F7',
                      left: '50%',
                      top: '50%',
                    }}
                  />
                ))}
              </div>

              {/* Abstract logo icon */}
              <div className="relative w-7 h-7 z-10">
                <Image
                  src="/logo.png"
                  alt="Cedar Core"
                  width={100}
                  height={100}
                  className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.5)] transition-all duration-500"
                />
              </div>
            </div>
            <span className="text-sm font-medium tracking-tight text-white/90 group-hover:text-white transition-colors">
              Cedar Core
            </span>
          </a>

          {/* Desktop Navigation - Right side controls */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Language Toggle */}
            <div className="flex items-center gap-1 bg-white/5 rounded-full p-1">
              <button
                onClick={() => setActiveLang("fr")}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200",
                  activeLang === "fr"
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white/80"
                )}
              >
                Fr
              </button>
              <button
                onClick={() => setActiveLang("en")}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200",
                  activeLang === "en"
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white/80"
                )}
              >
                En
              </button>
            </div>

            {/* Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors group"
            >
              <span>Menu</span>
              <div className="flex flex-col gap-1">
                <span className={cn(
                  "w-4 h-0.5 bg-current transition-transform duration-300",
                  isMobileMenuOpen && "rotate-45 translate-y-1.5"
                )} />
                <span className={cn(
                  "w-4 h-0.5 bg-current transition-opacity duration-300",
                  isMobileMenuOpen && "opacity-0"
                )} />
                <span className={cn(
                  "w-4 h-0.5 bg-current transition-transform duration-300",
                  isMobileMenuOpen && "-rotate-45 -translate-y-1.5"
                )} />
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Full-screen Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 top-16 lg:top-20 bg-black/98 backdrop-blur-2xl z-40"
          >
            <div className="container mx-auto px-6 lg:px-12 py-12">
              <nav className="flex flex-col gap-8">
                {[
                  { label: "Home", href: "#" },
                  { label: "Solutions", href: "#solutions" },
                  { label: "Technology", href: "#technology" },
                  { label: "About", href: "#about" },
                  { label: "Contact", href: "#contact" },
                ].map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl lg:text-5xl font-light text-white/80 hover:text-white transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              {/* Menu Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-16 pt-8 border-t border-white/10"
              >
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 text-white font-medium hover:from-cyan-400 hover:to-blue-500 transition-all"
                >
                  Explore the Ecosystem
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

