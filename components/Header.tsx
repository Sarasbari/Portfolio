"use client";

import React, { useState, useEffect } from "react";

export default function Header() {
  const [theme, setTheme] = useState("light");
  const [lastScroll, setLastScroll] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    // Theme initialization
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.setAttribute("data-theme", savedTheme);

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      // Smart hide/show navbar
      if (currentScroll > lastScroll && currentScroll > 100) {
        setHidden(true);
      } else if (currentScroll < lastScroll) {
        setHidden(false);
      }
      setLastScroll(currentScroll);

      // Active section calculation
      const sections = ["hero", "about", "experience", "skills", "contact"];
      let currentSection = "hero";
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = sectionId;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const section = document.querySelector(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className={`navbar ${hidden ? "navbar-hidden" : ""}`}>
      <div className="nav-content">
        <a href="#hero" className="nav-brand" onClick={(e) => scrollToSection(e, "#hero")}>SB</a>
        <div className="nav-right">
          <a
            href="#hero"
            className={`nav-link ${activeSection === "hero" ? "active" : ""}`}
            onClick={(e) => scrollToSection(e, "#hero")}
          >
            Home
          </a>
          <a
            href="#about"
            className={`nav-link ${activeSection === "about" ? "active" : ""}`}
            onClick={(e) => scrollToSection(e, "#about")}
          >
            About
          </a>
          <a
            href="#experience"
            className={`nav-link ${activeSection === "experience" ? "active" : ""}`}
            onClick={(e) => scrollToSection(e, "#experience")}
          >
            Journey
          </a>
          <a
            href="#skills"
            className={`nav-link ${activeSection === "skills" ? "active" : ""}`}
            onClick={(e) => scrollToSection(e, "#skills")}
          >
            Skills
          </a>
          
          {/* Featured Deployed Projects */}
          <a href="https://alivehub.vercel.app" target="_blank" rel="noopener noreferrer" className="nav-lazyfire" title="aLiveHub - Turf Booking SaaS">
            <span className="nav-lazyfire-text">🏟️ aLiveHub</span>
          </a>
          <a href="https://text-to-sql-ai.vercel.app" target="_blank" rel="noopener noreferrer" className="nav-lazyfire" title="Text-to-SQL AI">
            <span className="nav-lazyfire-text">🤖 Text-to-SQL</span>
          </a>

          <a href="#contact" className="nav-cta" onClick={(e) => scrollToSection(e, "#contact")}>Get in Touch!</a>
          <button id="theme-toggle" className="theme-toggle-nav" aria-label="Toggle theme" onClick={toggleTheme}>
            <i className={`fas ${theme === "dark" ? "fa-sun" : "fa-moon"}`}></i>
          </button>
        </div>
      </div>
    </nav>
  );
}

