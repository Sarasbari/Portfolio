"use client";

import React from "react";
import { skills } from "@/data/skills";

export default function Skills() {
  return (
    <section className="section" id="skills">
      <h2 className="section-title">SKILLS</h2>

      <div className="skills-grid-modern">
        {skills.map((cat, idx) => (
          <div
            key={cat.category}
            className={`skill-box${cat.isHighlight ? " highlight-box" : ""}`}
          >
            <div className="skill-box-header">
              <i className={`${cat.icon} skill-icon-large`}></i>
              <h3 className="skill-box-title">{cat.category}</h3>
            </div>
            <div className="tech-tags">
              {cat.items.map((item) => (
                <span key={item.name} className="tag">
                  <i className={item.icon}></i> {item.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
