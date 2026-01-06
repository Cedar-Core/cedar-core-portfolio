"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Linkedin, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  },
};

export function ContactInfo() {
  const [currentTime, setCurrentTime] = useState("--:--");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div variants={itemVariants} className="mt-12 lg:mt-16 space-y-6">
      {/* Section Label */}
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        Quick Contact
      </p>

      {/* Contact Items */}
      <div className="space-y-4">
        {/* Email */}
        <a
          href="mailto:hello@cedarcore.io"
          className="group flex items-center gap-3 text-blue-100/70 hover:text-white transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-500/30 group-hover:bg-blue-500/10 transition-all">
            <Mail className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-sm font-medium">hello@cedarcore.io</span>
        </a>

        {/* Location */}
        <div className="flex items-center gap-3 text-blue-100/50">
          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-sm">Lebanon — Serving globally</span>
        </div>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/company/cedarcore"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 text-blue-100/70 hover:text-white transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-500/30 group-hover:bg-blue-500/10 transition-all">
            <Linkedin className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-sm font-medium">LinkedIn</span>
        </a>

        {/* Local Time */}
        <div className="flex items-center gap-3 text-blue-100/40">
          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
            <Clock className="w-4 h-4 text-gray-500" />
          </div>
          <span className="text-sm font-mono">{currentTime} local</span>
        </div>
      </div>

      {/* Footer Micro Text */}
      <motion.p
        variants={itemVariants}
        className="pt-8 text-xs text-gray-600 italic border-t border-white/5"
      >
        Built in Lebanon. Designed for growth.
      </motion.p>
    </motion.div>
  );
}
