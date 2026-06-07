"use client";

import React, { useEffect } from "react";

export default function EducationLanguages() {
  // Scroll-driven language stars reveal
  useEffect(() => {
    const languageItems = document.querySelectorAll(".language-item");
    const languageStarsData = new Map();

    languageItems.forEach((item) => {
      const stars = item.querySelectorAll(".language-stars .star");
      languageStarsData.set(item, {
        hasStarted: false,
        startScroll: 0,
        stars: stars,
        starDelay: 50,
      });
    });

    const updateLanguageStars = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      languageItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const data = languageStarsData.get(item);
        if (!data) return;

        const triggerPoint = scrollY + windowHeight * 0.8;

        if (!data.hasStarted && triggerPoint >= elementTop) {
          data.hasStarted = true;
          data.startScroll = scrollY;
        }

        if (data.hasStarted) {
          const scrollProgress = scrollY - data.startScroll;

          data.stars.forEach((star: any, index: number) => {
            const starTrigger = index * data.starDelay;
            if (scrollProgress >= starTrigger) {
              star.classList.add("visible");
            }
          });
        }
      });
    };

    window.addEventListener("scroll", updateLanguageStars);
    const timeout = setTimeout(updateLanguageStars, 100);

    return () => {
      window.removeEventListener("scroll", updateLanguageStars);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="section education-languages-section">
      <div className="education-languages-grid">
        <div className="education-column">
          <h2 className="section-title">EDUCATION</h2>
          <div className="card education-card">
            <div className="education-header">
              <div>
                <h3 className="education-title">B.Tech in Information Technology</h3>
                <p className="education-school">Vidyavardhini College of Engineering & Technology (VCET)</p>
              </div>
              <span className="badge">2022 - 2026</span>
            </div>
            <p className="education-location">
              <i className="fas fa-map-marker-alt"></i> Vasai, Maharashtra, India (Mumbai University)
            </p>
            <p className="text" style={{ marginTop: "1rem", fontFamily: "Space Mono, monospace", fontSize: "0.95rem" }}>
              CGPA: 8.02 / 10.0
            </p>
          </div>
        </div>
        
        <div className="languages-column">
          <h2 className="section-title">LANGUAGES</h2>
          <div className="card languages-card">
            <div className="language-item">
              <span className="language-name-inline">English</span>
              <div className="language-stars">
                <span className="star filled"></span>
                <span className="star filled"></span>
                <span className="star filled"></span>
              </div>
            </div>
            <div className="language-item">
              <span className="language-name-inline">Hindi</span>
              <div className="language-stars">
                <span className="star filled"></span>
                <span className="star filled"></span>
                <span className="star filled"></span>
              </div>
            </div>
            <div className="language-item">
              <span className="language-name-inline">Marathi</span>
              <div className="language-stars">
                <span className="star filled"></span>
                <span className="star filled"></span>
                <span className="star filled"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
