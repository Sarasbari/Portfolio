"use client";

import React from "react";
import { achievements } from "@/data/achievements";
import SectionHeading from "./SectionHeading";
import { motion } from "framer-motion";
import { Trophy, Code2, Award, Lightbulb } from "lucide-react";

export default function Achievements() {
  // Map icons dynamically depending on title or index
  const getIcon = (title: string) => {
    if (title.includes("Winner") || title.includes("Showcase")) {
      return <Trophy className="text-warm-orange" size={28} />;
    }
    if (title.includes("Hackathon")) {
      return <Award className="text-neon-cyan" size={28} />;
    }
    return <Code2 className="text-signal-lime" size={28} />;
  };

  return (
    <section id="achievements" className="py-20 bg-bg-deep relative">
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading
          title="Achievements"
          subtitle="Recognition & milestones"
          gradient="orange-lime"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 md:p-8 rounded-2xl bg-surface-ink border border-border-dark flex flex-col justify-between hover:translate-y-[-4px] hover:border-border-dark/80 hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                {/* Icon Badge */}
                <div className="p-3.5 w-fit rounded-xl bg-surface-elevated border border-border-dark mb-6 group-hover:scale-110 transition-transform">
                  {getIcon(item.title)}
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold font-sora text-text-primary mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-text-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom decorative highlight */}
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-text-muted font-mono-jb group-hover:text-neon-cyan transition-colors">
                <Lightbulb size={14} className="text-signal-lime" />
                <span>MILESTONE ACHIVED</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
