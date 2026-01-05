"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Navigation structure
const navigation = {
  work: {
    title: "Work",
    hasDropdown: true,
    items: [
      { title: "Clinix AI", subtitle: "Web & App Design, AI Development, GTM", href: "#clinix" },
      { title: "Synergies4", subtitle: "App Design, AI Development", href: "#synergies" },
      { title: "Curehire", subtitle: "Web Design, Development", href: "#curehire" },
      { title: "OWASP Foundation", subtitle: "Web Design, Development", href: "#owasp" },
      { title: "Feature", subtitle: "App Design, GTM Strategy", href: "#feature" },
    ],
  },
  company: {
    title: "Company",
    hasDropdown: false,
    href: "#company",
  },
  services: {
    title: "Services",
    hasDropdown: true,
    items: [
      { id: "01", title: "Product Design", description: "End-to-end product design—from research and UX flows to polished UI systems.", href: "#product-design" },
      { id: "02", title: "Development", description: "Robust, scalable products across web and mobile—from elegant UIs to reliable APIs.", href: "#development" },
      { id: "03", title: "GTM Strategy", description: "Data-driven go-to-market for SaaS and AI—clear positioning and smart pricing.", href: "#gtm" },
      { id: "04", title: "Healthcare Apps", description: "Secure, compliant healthcare software—from telehealth to EHR integrations.", href: "#healthcare" },
      { id: "05", title: "AI Development", description: "Build production-ready AI—rapid prototyping to deployed models with solid evals.", href: "#ai-development" },
      { id: "06", title: "IoT Development", description: "From device firmware to cloud ingestion—secure, reliable IoT systems.", href: "#iot" },
    ],
  },
  atomAi: {
    title: "Atom AI",
    hasDropdown: true,
    items: [
      { title: "Atom Framework", subtitle: "Build AI-powered applications faster", href: "#atom-framework", status: "available" },
      { title: "Atom Voice", subtitle: "Voice AI for conversational interfaces", href: "#atom-voice", status: "available" },
      { title: "Atom Search", subtitle: "Semantic search infrastructure", href: "#atom-search", status: "available" },
      { title: "Atom Finance", subtitle: "AI for financial services", href: "#atom-finance", status: "coming-soon" },
      { title: "Atom Chat", subtitle: "Conversational AI platform", href: "#atom-chat", status: "coming-soon" },
    ],
  },
  contact: {
    title: "Contact",
    hasDropdown: false,
    href: "#contact",
  },
};

export function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (key: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-black/90 backdrop-blur-lg border-b border-white/10"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-white">
              Cedar Core
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {Object.entries(navigation).map(([key, item]) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => item.hasDropdown && handleMouseEnter(key)}
                onMouseLeave={handleMouseLeave}
              >
                {item.hasDropdown ? (
                  <button
                    className={cn(
                      "text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1",
                      activeDropdown === key && "text-white"
                    )}
                  >
                    {item.title}
                    <svg
                      className={cn(
                        "w-4 h-4 transition-transform",
                        activeDropdown === key && "rotate-180"
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : (
                  <a
                    href={(item as any).href}
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    {item.title}
                  </a>
                )}

                {/* Dropdowns */}
                <AnimatePresence>
                  {item.hasDropdown && activeDropdown === key && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "absolute top-full left-0 mt-2 bg-gray-900/95 backdrop-blur-lg rounded-xl border border-white/10 shadow-xl overflow-hidden",
                        key === "services" ? "w-[600px] -left-48" : "w-80"
                      )}
                    >
                      {key === "work" && (
                        <div className="p-4">
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Featured Work</p>
                          <div className="space-y-2">
                            {navigation.work.items.map((workItem, idx) => (
                              <a
                                key={idx}
                                href={workItem.href}
                                className="block p-3 rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <div className="font-medium text-white">{workItem.title}</div>
                                <div className="text-sm text-gray-400">{workItem.subtitle}</div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {key === "services" && (
                        <div className="p-4">
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Our Services</p>
                          <div className="grid grid-cols-2 gap-2">
                            {navigation.services.items.map((service) => (
                              <a
                                key={service.id}
                                href={service.href}
                                className="block p-4 rounded-lg hover:bg-white/5 transition-colors group"
                              >
                                <div className="flex items-start gap-3">
                                  <span className="text-purple-400 font-mono text-sm">{service.id}</span>
                                  <div>
                                    <div className="font-medium text-white group-hover:text-purple-400 transition-colors">
                                      {service.title}
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1 line-clamp-2">
                                      {service.description}
                                    </div>
                                  </div>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {key === "atomAi" && (
                        <div className="p-4">
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Atom AI Products</p>
                          <div className="space-y-2">
                            {navigation.atomAi.items.map((atomItem, idx) => (
                              <a
                                key={idx}
                                href={atomItem.href}
                                className={cn(
                                  "block p-3 rounded-lg transition-colors",
                                  atomItem.status === "coming-soon"
                                    ? "opacity-60 cursor-not-allowed"
                                    : "hover:bg-white/5"
                                )}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="font-medium text-white">{atomItem.title}</div>
                                    <div className="text-sm text-gray-400">{atomItem.subtitle}</div>
                                  </div>
                                  {atomItem.status === "coming-soon" && (
                                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
                                      Coming Soon
                                    </span>
                                  )}
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              className="group flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all text-sm font-medium text-white"
            >
              Start Your Project
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/95 backdrop-blur-lg border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {Object.entries(navigation).map(([key, item]) => (
                <div key={key}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setMobileSubmenu(mobileSubmenu === key ? null : key)}
                        className="w-full flex items-center justify-between py-3 text-white font-medium"
                      >
                        {item.title}
                        <svg
                          className={cn(
                            "w-4 h-4 transition-transform",
                            mobileSubmenu === key && "rotate-180"
                          )}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {mobileSubmenu === key && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 pb-2 space-y-2"
                          >
                            {key === "work" &&
                              navigation.work.items.map((workItem, idx) => (
                                <a
                                  key={idx}
                                  href={workItem.href}
                                  className="block py-2 text-gray-400 hover:text-white transition-colors"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {workItem.title}
                                </a>
                              ))}
                            {key === "services" &&
                              navigation.services.items.map((service) => (
                                <a
                                  key={service.id}
                                  href={service.href}
                                  className="flex items-center gap-2 py-2 text-gray-400 hover:text-white transition-colors"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <span className="text-purple-400 text-xs">{service.id}</span>
                                  {service.title}
                                </a>
                              ))}
                            {key === "atomAi" &&
                              navigation.atomAi.items.map((atomItem, idx) => (
                                <a
                                  key={idx}
                                  href={atomItem.href}
                                  className={cn(
                                    "flex items-center justify-between py-2 transition-colors",
                                    atomItem.status === "coming-soon"
                                      ? "text-gray-600"
                                      : "text-gray-400 hover:text-white"
                                  )}
                                  onClick={() => atomItem.status !== "coming-soon" && setIsMobileMenuOpen(false)}
                                >
                                  {atomItem.title}
                                  {atomItem.status === "coming-soon" && (
                                    <span className="text-xs text-purple-400">Soon</span>
                                  )}
                                </a>
                              ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a
                      href={(item as any).href}
                      className="block py-3 text-white font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </a>
                  )}
                </div>
              ))}

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href="#contact"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-linear-to-r from-purple-600 to-blue-600 text-white font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Start Your Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

