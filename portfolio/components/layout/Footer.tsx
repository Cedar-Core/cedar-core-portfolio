"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    title: "Services",
    links: [
      { label: "Web Design & Development", href: "#Web-Design-&-Development" },
      { label: "Custom Software Systems", href: "#Custom-Software-Systems" },
      { label: "SaaS & MVP Development", href: "#SaaS-&-MVP-Development" },
      { label: "AI & Automation Solutions", href: "#AI-&-Automation-Solutions" },
      { label: "Maintenance & Support", href: "#Maintenance-&-Support" },
      { label: "IoT Development", href: "#iot" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Workflow Automation", href: "#Workflow-Automation" },
      { label: "Data & Analytics Tools", href: "#Data-&-Analytics-Tools" },
      { label: "AI Assistants", href: "#Ai-Assistants" },
      { label: "Internal Tools For Businesses", href: "#Internal-Tools-For-Businesses" },
      { label: "Custom Integrations", href: "#Custom-Integrations" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "AI Vendor Matrix", href: "#ai-vendor-matrix" },
      { label: "Pointverse", href: "#pointverse" },
      { label: "Invoverse", href: "#invoverse" },
      { label: "Walletly", href: "#walletly" },
      { label: "Drop-x", href: "#drop-x" },
      { label: "Feature", href: "#feature" },
      { label: "OWASP", href: "#owasp" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black border-t border-blue-900/20">
      {/* Upper Footer - Link Columns */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {footerColumns.map((column, index) => (
            <div key={column.title} className={cn("", index === footerColumns.length - 1 && "sm:col-span-2 lg:col-span-1")}>
              {/* Column Title */}
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 sm:mb-6">
                {column.title}
              </h3>

              {/* Column Links */}
              <ul className="space-y-3 sm:space-y-4">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group text-sm text-blue-200/60 hover:text-white transition-colors inline-block relative"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Lower Footer - Copyright */}
      <div className="border-t border-blue-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <p className="text-center text-xs sm:text-sm text-blue-200/40">
            Cedar Core, © {currentYear}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

