"use client";

import React from "react";
import { profile } from "@/data/profile";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-8 bg-bg-deep border-t border-border-dark/50">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side */}
        <p className="text-xs text-text-muted font-medium text-center md:text-left">
          &copy; {currentYear} {profile.name}. All rights reserved.
        </p>

        {/* Middle Stack Info */}
        <p className="text-[11px] text-text-muted/80 font-mono-jb text-center">
          Built with{" "}
          <span className="text-neon-cyan">Next.js 16</span> +{" "}
          <span className="text-electric-violet">Tailwind CSS v4</span> +{" "}
          <span className="text-hot-pink">Framer Motion</span>
        </p>

        {/* Right Side - Back to Top */}
        <a
          href="#hero"
          onClick={handleBackToTop}
          className="flex items-center gap-1.5 text-xs font-bold font-sora tracking-wide text-text-muted hover:text-neon-cyan transition-colors"
        >
          <span>BACK TO TOP</span>
          <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}
