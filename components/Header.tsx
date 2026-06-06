"use client";

import React, { useState, useEffect } from "react";
import { profile } from "@/data/profile";
import { Menu, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Focus Areas", href: "#focus" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg-deep/80 backdrop-blur-md border-b border-border-dark/50 py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="text-xl font-bold font-sora tracking-wider text-text-primary group-hover:text-gradient-cyan-violet transition-colors">
            {"<"}{profile.shortName}{" />"}
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-text-muted hover:text-neon-cyan transition-colors relative group py-2 font-sora"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-neon-cyan to-electric-violet transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Resume & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <a
            href={profile.resume}
            download
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 text-xs font-semibold tracking-wide transition-all glow-cyan font-mono-jb"
          >
            <FileText size={14} />
            <span>RESUME</span>
          </a>

          {/* Hamburger Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text-primary hover:text-neon-cyan transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-surface-ink border-b border-border-dark py-6 px-6 shadow-xl"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-semibold text-text-muted hover:text-neon-cyan transition-colors py-2 font-sora border-b border-border-dark/30"
                >
                  {item.name}
                </a>
              ))}
              <a
                href={profile.resume}
                download
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 mt-4 px-4 py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-electric-violet text-bg-deep text-sm font-bold tracking-wider hover:opacity-90 transition-opacity font-sora"
              >
                <FileText size={16} />
                <span>DOWNLOAD RESUME</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
