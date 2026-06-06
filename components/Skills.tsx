"use client";

import React from "react";
import { skills } from "@/data/skills";
import SectionHeading from "./SectionHeading";
import { motion } from "framer-motion";

export default function Skills() {
  // Define border glow classes depending on index/category for visual playfulness
  const categoryThemes = [
    {
      glow: "hover:shadow-neon-cyan/10 hover:border-neon-cyan/40",
      accent: "bg-neon-cyan",
      text: "text-neon-cyan",
    },
    {
      glow: "hover:shadow-electric-violet/10 hover:border-electric-violet/40",
      accent: "bg-electric-violet",
      text: "text-electric-violet",
    },
    {
      glow: "hover:shadow-signal-lime/10 hover:border-signal-lime/40",
      accent: "bg-signal-lime",
      text: "text-signal-lime",
    },
    {
      glow: "hover:shadow-warm-orange/10 hover:border-warm-orange/40",
      accent: "bg-warm-orange",
      text: "text-warm-orange",
    },
    {
      glow: "hover:shadow-hot-pink/10 hover:border-hot-pink/40",
      accent: "bg-hot-pink",
      text: "text-hot-pink",
    },
  ];

  return (
    <section id="skills" className="py-20 bg-bg-deep relative">
      {/* Background blobs */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-hot-pink/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-signal-lime/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading title="Technical Skills" subtitle="My Toolkit" gradient="orange-lime" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((category, idx) => {
            const theme = categoryThemes[idx % categoryThemes.length];
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`p-6 rounded-2xl bg-surface-ink border border-border-dark transition-all duration-300 hover:shadow-lg ${theme.glow}`}
              >
                {/* Category Title */}
                <div className="flex items-center gap-3 mb-6">
                  <span className={`w-2.5 h-2.5 rounded-full ${theme.accent} inline-block`} />
                  <h3 className="text-lg font-bold font-sora text-text-primary">
                    {category.category}
                  </h3>
                </div>

                {/* Chips Grid */}
                <div className="flex flex-wrap gap-2.5">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-text-primary bg-surface-elevated border border-border-dark/60 font-mono-jb hover:border-text-muted/30 hover:scale-105 transition-all cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
