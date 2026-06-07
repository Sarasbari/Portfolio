"use client";

import React, { useEffect } from "react";
import { profile } from "@/data/profile";

export default function About() {
  // Scroll-driven text highlights animation
  useEffect(() => {
    const highlights = document.querySelectorAll(".highlight");
    const highlightData = new Map();

    highlights.forEach((highlight, index) => {
      const direction = index % 2 === 0 ? "left" : "right";
      highlight.setAttribute("data-direction", direction);
      highlightData.set(highlight, {
        hasStarted: false,
        startScroll: 0,
        duration: 100,
        direction: direction,
      });
    });

    const updateHighlights = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      highlights.forEach((highlight) => {
        const rect = highlight.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const data = highlightData.get(highlight);
        if (!data) return;

        // Start highlighting when element is near top of viewport
        const triggerPoint = scrollY + windowHeight * 0.8;

        if (!data.hasStarted && triggerPoint >= elementTop) {
          data.hasStarted = true;
          data.startScroll = scrollY;
        }

        if (data.hasStarted) {
          const progress = Math.min(
            100,
            Math.max(0, ((scrollY - data.startScroll) / data.duration) * 100)
          );
          (highlight as HTMLElement).style.setProperty("--highlight-progress", `${progress}%`);
        }

        // Reset when scrolling back up past element
        if (data.hasStarted && scrollY < data.startScroll - 50) {
          data.hasStarted = false;
          (highlight as HTMLElement).style.setProperty("--highlight-progress", "0%");
        }
      });
    };

    window.addEventListener("scroll", updateHighlights);
    // Initial run with a slight delay to let the page render
    const timeout = setTimeout(updateHighlights, 100);

    return () => {
      window.removeEventListener("scroll", updateHighlights);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="section" id="about">
      <h2 className="section-title">ABOUT</h2>
      <div className="card">
        <p className="text">
          I am an Information Technology Engineering student at Vidyavardhini College of Engineering and Technology, Vasai, focused on{" "}
          <span className="highlight highlight-yellow">production-grade AI and full-stack systems</span>.
          I specialize in building {" "}
          <span className="highlight highlight-pink">RAG pipelines, agentic AI workflows, and LLM-integrated platforms</span>,
          ensuring they are deployed and usable, not just demos.
        </p>
        <p className="text">
          My passion for building has driven me to participate in{" "}
          <span className="highlight highlight-cyan">6 hackathons</span>, where I engineered and shipped end-to-end applications under tight timelines.
          Additionally, I was recognized as the{" "}
          <span className="highlight highlight-green">VMPS Project Showcase Winner</span> at a national-level project expo after presenting our turf booking model to industry judges.
        </p>
        <p className="text">
          I bridge the gap between AI architectures (like hybrid search and vector databases) and production full-stack SaaS workflows, bringing a robust work ethic, problem-solving skills, and a deployment-first mindset.
        </p>
      </div>
    </section>
  );
}

