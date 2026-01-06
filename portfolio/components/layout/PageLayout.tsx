"use client";

import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BackgroundEffects } from "../effects/BackgroundEffects";
import { usePathname } from "next/navigation";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith("/admins-panel-resttt");

  if (isAdminPath) {
    return (
      <div className="min-h-screen bg-black text-white relative">
        <main className="w-full">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative">
      <BackgroundEffects />
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
