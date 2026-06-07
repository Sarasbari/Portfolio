"use client";

import React from "react";
import { projects } from "@/data/projects";

export default function Projects() {
  const getProjectBgColor = (idx: number) => {
    // Neo-brutalist vibrant palette
    const bgs = ["var(--cyan)", "var(--yellow)", "var(--pink)", "var(--accent)"];
    return bgs[idx % bgs.length];
  };

  const getProjectMonogram = (title: string) => {
    switch (title.toLowerCase()) {
      case "sensei":
        return "👨‍🏫";
      case "alivehub":
        return "🏟️";
      case "ragify-ai":
        return "🧠";
      case "minuteforge":
        return "⏱️";
      case "text-to-sql-ai":
        return "💾";
      case "snap-to-json":
        return "📷";
      default:
        return "🚀";
    }
  };

  return (
    <section className="section section-compact" id="projects">
      <div className="creator-showcase">
        <p className="creator-label">Creator of</p>
        <div className="creator-projects-grid">
          {projects.map((project, idx) => (
            <div key={project.title} className="creator-item">
              <a
                href={project.live || project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="creator-project"
                style={{ backgroundColor: getProjectBgColor(idx) }}
              >
                <span className="creator-name" style={{ fontSize: "1.8rem" }}>
                  {getProjectMonogram(project.title)} {project.title}
                </span>
              </a>
              <p className="creator-tagline">{project.description}</p>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="creator-github"
              >
                <i className="fab fa-github"></i> Check it out
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
