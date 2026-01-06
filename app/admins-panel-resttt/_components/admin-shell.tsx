"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AdminPage({
    title,
    description,
    right,
    children,
}: {
    title: string;
    description?: string;
    right?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                        {title}
                    </h1>
                    {description ? (
                        <p className="text-sm leading-relaxed text-white/60">
                            {description}
                        </p>
                    ) : null}
                </div>

                {right ? <div className="flex items-center gap-2">{right}</div> : null}
            </div>

            <div className="mt-6">{children}</div>
        </div>
    );
}

export function AdminCard({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className={cn(
                "rounded-2xl border border-white/10 bg-white/4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]",
                className
            )}
        >
            {children}
        </div>
    );
}

export function AdminCardHeader({
    title,
    subtitle,
    right,
}: {
    title: string;
    subtitle?: string;
    right?: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-3 border-b border-white/10 px-5 py-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
                <div className="text-sm font-medium text-white">{title}</div>
                {subtitle ? (
                    <div className="text-xs text-white/50">{subtitle}</div>
                ) : null}
            </div>
            {right ? <div className="flex items-center gap-2">{right}</div> : null}
        </div>
    );
}

export function AdminCardBody({ children }: { children: React.ReactNode }) {
    return <div className="px-5 py-4">{children}</div>;
}

export function AdminInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={cn(
                "h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none",
                "placeholder:text-white/35 focus:border-white/20 focus:bg-white/[0.07]",
                props.className
            )}
        />
    );
}

export function AdminButton({
    variant = "primary",
    className,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "ghost" | "danger" | "soft";
}) {
    const base =
        "inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition active:scale-[0.99]";
    const styles = {
        primary: "bg-white text-black hover:bg-white/90",
        soft: "bg-white/[0.08] text-white hover:bg-white/[0.12] border border-white/10",
        ghost: "text-white/80 hover:bg-white/[0.08]",
        danger:
            "bg-red-500/15 text-red-200 hover:bg-red-500/20 border border-red-500/30",
    };

    return (
        <button {...props} className={cn(base, styles[variant], className)} />
    );
}

export function FadeIn({
    children,
    delay = 0,
}: {
    children: React.ReactNode;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay }}
        >
            {children}
        </motion.div>
    );
}
