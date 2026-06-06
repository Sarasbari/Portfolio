"use client";

import React from "react";
import { Project } from "@/data/projects";
import { ExternalLink } from "lucide-react";
import { Github } from "./BrandIcons";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  idx: number;
}

export default function ProjectCard({ project, idx }: ProjectCardProps) {
  // Define category colors for chips
  const categoryColors: Record<string, string> = {
    "Agentic AI": "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/5",
    "Production SaaS": "text-electric-violet border-electric-violet/30 bg-electric-violet/5",
    "RAG System": "text-signal-lime border-signal-lime/30 bg-signal-lime/5",
    "AI Automation": "text-warm-orange border-warm-orange/30 bg-warm-orange/5",
    "Fine-Tuned LLM": "text-hot-pink border-hot-pink/30 bg-hot-pink/5",
    "Vision AI API": "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/5",
  };

  const currentCategoryClass =
    categoryColors[project.category] || "text-text-muted border-border-dark bg-surface-ink";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="group relative flex flex-col justify-between rounded-2xl bg-surface-ink border border-border-dark p-6 md:p-8 hover:translate-y-[-4px] hover:border-border-dark/80 hover:shadow-xl transition-all duration-300"
    >
      {/* Background card gradient aura on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-electric-violet/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        {/* Top bar with category chip */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-2.5 py-1 rounded-full border text-xs font-semibold tracking-wider font-mono-jb ${currentCategoryClass}`}>
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold font-sora text-text-primary group-hover:text-neon-cyan transition-colors mb-3">
          {project.title}
        </h3>

        {/* Highlight Quote/Alert */}
        <div className="mb-4 text-xs font-semibold py-1 px-3 border-l-2 border-electric-violet bg-surface-elevated/40 text-text-muted font-sora rounded-r-md">
          {project.highlight}
        </div>

        {/* Description */}
        <p className="text-text-muted text-sm leading-relaxed mb-6">
          {project.description}
        </p>
      </div>

      <div>
        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[11px] font-semibold text-text-muted bg-surface-elevated border border-border-dark/40 font-mono-jb"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions bar (conditional rendering) */}
        <div className="flex items-center gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold font-sora tracking-wide text-text-muted hover:text-neon-cyan transition-colors py-1.5"
            >
              <Github size={16} />
              <span>CODE</span>
            </a>
          )}

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold font-sora tracking-wide text-neon-cyan hover:text-gradient-cyan-violet transition-colors py-1.5 glow-cyan"
            >
              <ExternalLink size={16} />
              <span>LIVE DEMO</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
