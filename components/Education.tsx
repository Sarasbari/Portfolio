"use client";

import React from "react";
import SectionHeading from "./SectionHeading";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, Star, Building2 } from "lucide-react";

export default function Education() {
  const educationDetail = {
    degree: "B.Tech in Information Technology",
    institution: "Vidyavardhini College of Engineering and Technology (VCET)",
    university: "Mumbai University",
    duration: "2022 - 2026 (Expected)",
    score: "CGPA: 8.02 / 10.0",
    highlights: [
      "Specialization in production-grade AI applications, Full-Stack development, and Cloud pipelines",
      "VMPS Project Showcase Winner (presented sports turf SaaS model to corporate jury)",
      "Actively building RAG agents, LLM toolchains, and queue-based automation solutions",
    ],
  };

  return (
    <section id="education" className="py-20 bg-surface-ink relative">
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-electric-violet/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading title="Education" subtitle="Academic Background" gradient="violet-pink" />

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative p-6 md:p-8 rounded-2xl bg-surface-elevated border border-border-dark shadow-xl overflow-hidden group"
          >
            {/* Ambient hover light */}
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <GraduationCap className="text-neon-cyan" size={24} />
                  <span className="text-xs font-semibold uppercase tracking-widest text-neon-cyan font-mono-jb">
                    UNDERGRADUATE DEGREE
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-sora text-text-primary group-hover:text-gradient-cyan-violet transition-all mb-1">
                  {educationDetail.degree}
                </h3>
                <div className="flex items-center gap-2 text-text-muted text-sm font-medium mb-3">
                  <Building2 size={16} />
                  <span>
                    {educationDetail.institution}, {educationDetail.university}
                  </span>
                </div>
              </div>

              <div className="flex flex-col md:items-end gap-2 text-xs sm:text-sm font-mono-jb shrink-0">
                <div className="flex items-center gap-2 text-text-muted">
                  <Calendar size={14} />
                  <span>{educationDetail.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-signal-lime font-bold bg-signal-lime/5 px-2.5 py-1 rounded border border-signal-lime/20">
                  <Star size={14} />
                  <span>{educationDetail.score}</span>
                </div>
              </div>
            </div>

            <div className="h-[1px] w-full bg-border-dark mb-6" />

            <div className="relative z-10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted font-mono-jb mb-4">
                KEY FOCUS & OUTCOMES
              </h4>
              <ul className="space-y-3.5">
                {educationDetail.highlights.map((highlight, index) => (
                  <li key={index} className="flex gap-3 text-text-muted text-sm leading-relaxed">
                    <span className="text-neon-cyan select-none text-base mt-0.5">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
