"use client";

import React from "react";
import { profile } from "@/data/profile";
import SectionHeading from "./SectionHeading";
import { motion } from "framer-motion";
import { GraduationCap, Award, Zap, Code2 } from "lucide-react";

export default function About() {
  const stats = [
    {
      icon: <GraduationCap className="text-neon-cyan" size={24} />,
      label: "Education",
      value: "B.Tech IT (Expected 2026)",
      detail: "VCET, Mumbai University",
    },
    {
      icon: <Award className="text-electric-violet" size={24} />,
      label: "Achievements",
      value: "VMPS Showcase Winner",
      detail: "National Level Project Expo",
    },
    {
      icon: <Code2 className="text-signal-lime" size={24} />,
      label: "Hackathons",
      value: "6 Participated",
      detail: "End-to-end deployed systems",
    },
    {
      icon: <Zap className="text-warm-orange" size={24} />,
      label: "DSA Stats",
      value: "350+ Solved",
      detail: "LeetCode & GFG Practice",
    },
  ];

  return (
    <section id="about" className="py-20 bg-surface-ink relative overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-electric-violet/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading title="About Me" subtitle="My Profile" gradient="violet-pink" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Summary / Bio Column */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-extrabold font-sora text-text-primary mb-6"
            >
              Engineering production-grade AI & full-stack systems.
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-text-muted text-base leading-relaxed mb-6"
            >
              {profile.summary}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-text-muted text-base leading-relaxed"
            >
              Currently studying Information Technology Engineering at{" "}
              <strong className="text-text-primary">
                Vidyavardhini College of Engineering and Technology (VCET)
              </strong>
              . I specialize in bridging the gap between cutting-edge AI research (like hybrid RAG
              retrieval and LLM agent chains) and production Web SaaS platforms with robust
              payment systems, atomic state controls, and queue processing.
            </motion.p>
          </div>

          {/* Quick Stats Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-surface-elevated border border-border-dark hover:border-border-dark/80 hover:translate-y-[-2px] transition-all group shadow-md"
              >
                <div className="p-3 w-fit rounded-xl bg-bg-deep mb-4 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted font-mono-jb mb-1">
                  {stat.label}
                </h4>
                <p className="text-text-primary font-bold font-sora text-base leading-tight mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-text-muted font-medium leading-normal">
                  {stat.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
