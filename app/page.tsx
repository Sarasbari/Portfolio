"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import EducationLanguages from "@/components/EducationLanguages";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader after 1.2 seconds to match original transition
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    // Progress Bar Functionality
    const handleScroll = () => {
      const progressBarFill = document.querySelector(".progress-bar-fill") as HTMLElement;
      const checkpoints = document.querySelectorAll(".checkpoint");
      if (!progressBarFill) return;

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = documentHeight > 0 ? (scrolled / documentHeight) * 100 : 0;

      progressBarFill.style.width = `${progress}%`;

      // Update active checkpoint based on scroll position
      const sections = ["hero", "about", "experience", "skills", "contact"];
      let activeIndex = 0;

      sections.forEach((sectionId, index) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            activeIndex = index;
          }
        }
      });

      checkpoints.forEach((checkpoint, index) => {
        if (index <= activeIndex) {
          checkpoint.classList.add("active");
        } else {
          checkpoint.classList.remove("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial run

    // Intersection Observer for fade-in animations of sections and skill boxes
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -50px 0px",
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll(".section, .timeline-item, .skill-box");
    fadeElements.forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <div className={`loader-overlay ${!loading ? "hidden" : ""}`}>
        <div className="loader-shapes">
          <div className="loader-shape-svg loader-shape-1">
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="6" width="88" height="88" rx="8" fill="#66d9ef" stroke="#000" stroke-width="4"/>
              <rect x="3" y="3" width="88" height="88" rx="8" fill="#66d9ef" stroke="#000" stroke-width="4"/>
              <path d="M35 40 L20 50 L35 60" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M65 40 L80 50 L65 60" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="55" y1="35" x2="45" y2="65" stroke="#000" stroke-width="5" stroke-linecap="round"/>
            </svg>
          </div>
          <div className="loader-shape-svg loader-shape-2">
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="6" width="88" height="88" rx="8" fill="#ffd93d" stroke="#000" stroke-width="4"/>
              <rect x="3" y="3" width="88" height="88" rx="8" fill="#ffd93d" stroke="#000" stroke-width="4"/>
              <path d="M25 35 L40 50 L25 65" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="50" y1="65" x2="75" y2="65" stroke="#000" stroke-width="5" stroke-linecap="round"/>
            </svg>
          </div>
          <div className="loader-shape-svg loader-shape-3">
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="6" width="88" height="88" rx="8" fill="#a8e6cf" stroke="#000" stroke-width="4"/>
              <rect x="3" y="3" width="88" height="88" rx="8" fill="#a8e6cf" stroke="#000" stroke-width="4"/>
              <rect x="20" y="20" width="60" height="60" rx="3" fill="#ffd93d" stroke="#000" stroke-width="4"/>
              <rect x="30" y="20" width="40" height="20" fill="#66d9ef" stroke="#000" stroke-width="3"/>
              <rect x="35" y="55" width="30" height="15" rx="2" fill="#000"/>
              <circle cx="50" cy="35" r="3" fill="#000"/>
            </svg>
          </div>
        </div>
        <div className="loader-wrapper">
          <div className="loader-letter">S</div>
          <div className="loader-letter">B</div>
        </div>
        <div className="loader-progress-bar">
          <div className="loader-progress-fill"></div>
        </div>
      </div>

      <div className="page-wrapper">
        {/* Scroll Progress Bar */}
        <div className="progress-bar-container">
          <div className="progress-bar-fill"></div>
          <div className="progress-checkpoints">
            <div className="checkpoint" data-section="hero">
              <div className="checkpoint-dot"></div>
              <span className="checkpoint-label">Home</span>
            </div>
            <div className="checkpoint" data-section="about">
              <div className="checkpoint-dot"></div>
              <span className="checkpoint-label">About</span>
            </div>
            <div className="checkpoint" data-section="experience">
              <div className="checkpoint-dot"></div>
              <span className="checkpoint-label">Journey</span>
            </div>
            <div className="checkpoint" data-section="skills">
              <div className="checkpoint-dot"></div>
              <span className="checkpoint-label">Skills</span>
            </div>
            <div className="checkpoint" data-section="contact">
              <div className="checkpoint-dot"></div>
              <span className="checkpoint-label">Contact</span>
            </div>
          </div>
        </div>

        <Header />

        <main>
          <Hero />
          <About />
          <Journey />
          <Skills />
          <Projects />
          <EducationLanguages />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
