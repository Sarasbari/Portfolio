"use client";

import React, { useState } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";
import { motion, AnimatePresence } from "framer-motion";

type FilterTab = "All" | "AI & Agents" | "Full-Stack & SaaS";

export default function Projects() {
  const [activeTab, setActiveTab] = useState<FilterTab>("All");

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "All") return true;
    if (activeTab === "AI & Agents") {
      return [
        "Agentic AI",
        "RAG System",
        "AI Automation",
        "Fine-Tuned LLM",
        "Vision AI API",
      ].includes(project.category);
    }
    if (activeTab === "Full-Stack & SaaS") {
      return ["Production SaaS", "RAG System", "AI Automation"].includes(
        project.category
      );
    }
    return true;
  });

  const tabs: FilterTab[] = ["All", "AI & Agents", "Full-Stack & SaaS"];

  return (
    <section id="projects" className="py-20 bg-surface-ink relative">
      {/* Background visual detail */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-electric-violet/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading
          title="Featured Projects"
          subtitle="My Showcase"
          gradient="cyan-violet"
        />

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-bg-deep border border-border-dark p-1.5 rounded-full overflow-hidden relative shadow-inner">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold font-sora tracking-wide transition-colors duration-300 z-10 ${
                    isActive ? "text-bg-deep" : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-electric-violet rounded-full -z-10 shadow"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} idx={idx} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
