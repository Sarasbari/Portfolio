"use client";

import React, { useState, useEffect, useRef } from "react";
import { profile } from "@/data/profile";

export default function Hero() {
  const [greeting, setGreeting] = useState("Hi there! 👋");
  const [tilted, setTilted] = useState(false);
  const [fallen, setFallen] = useState(false);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const decoTerminalRef = useRef<HTMLDivElement>(null);

  // Scrambled Matrix Typing Effect
  useEffect(() => {
    const finalText = "Hi there! 👋";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let iterations = 0;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setGreeting(
          finalText
            .split("")
            .map((char, index) => {
              if (index < iterations) {
                return finalText[index];
              }
              if (char === " " || char === "👋") {
                return char;
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iterations >= finalText.length) {
          clearInterval(interval);
        }

        iterations += 1 / 3;
      }, 50);

      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  // Scroll Animations (Image Tilt and Falling Terminal SVG)
  useEffect(() => {
    const calculateFallDistance = () => {
      if (heroContentRef.current && decoTerminalRef.current) {
        const heroContentRect = heroContentRef.current.getBoundingClientRect();
        const heroContentBottom = heroContentRect.bottom;
        const terminalRect = decoTerminalRef.current.getBoundingClientRect();
        const terminalFall = Math.max(0, heroContentBottom - terminalRect.bottom - 50);
        decoTerminalRef.current.style.setProperty("--fall-distance", `${terminalFall}px`);
      }
    };

    calculateFallDistance();
    window.addEventListener("resize", calculateFallDistance);

    const handleScroll = () => {
      if (window.scrollY > 5) {
        setTilted(true);
        setFallen(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", calculateFallDistance);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-content" ref={heroContentRef}>
        <div className="hero-left">
          <p className="hero-greeting" id="hero-greeting">{greeting}</p>
          <h1 className="hero-name">I'm {profile.name}.</h1>
          <p className="hero-description">
            Based in {profile.location}, I'm an {profile.role}. I build production-ready AI systems, RAG pipelines, LLM integrations, and full-stack web apps. I'm passionate about agentic workflows, vector databases, and building deployed web products.
          </p>
          <div className="hero-social">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href={`mailto:${profile.email}`} className="social-btn" aria-label="Email">
              <i className="fas fa-envelope"></i>
            </a>
            <a href={`tel:${profile.phone.replace(/\s+/g, "")}`} className="social-btn" aria-label="Phone">
              <i className="fas fa-phone"></i>
            </a>
          </div>
          <div className="hero-cta-container">
            <a href={profile.resume} download className="btn-cta" style={{ background: "var(--cyan)" }}>
              <i className="fas fa-file-pdf"></i> Resume
            </a>
            <a href="#contact" className="btn-cta" onClick={handleScrollToContact}>
              Get in Touch!
            </a>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-image-wrapper">
            <div className="tape-sticker"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.photo}
              alt={profile.name}
              className={`hero-photo ${tilted ? "tilted" : ""}`}
              width="400"
              height="400"
              fetchPriority="high"
              onMouseEnter={() => setTilted(false)}
              onMouseLeave={() => {
                if (window.scrollY > 5) setTilted(true);
              }}
            />
            <div className="deco-code">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="6" width="88" height="88" rx="8" fill="#66d9ef" stroke="#000" stroke-width="4" />
                <rect x="3" y="3" width="88" height="88" rx="8" fill="#66d9ef" stroke="#000" stroke-width="4" />
                <path d="M35 40 L20 50 L35 60" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M65 40 L80 50 L65 60" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                <line x1="55" y1="35" x2="45" y2="65" stroke="#000" stroke-width="5" stroke-linecap="round" />
              </svg>
            </div>
            <div className={`deco-terminal ${fallen ? "falling" : ""}`} ref={decoTerminalRef}>
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="6" width="88" height="88" rx="8" fill="#ffd93d" stroke="#000" stroke-width="4" />
                <rect x="3" y="3" width="88" height="88" rx="8" fill="#ffd93d" stroke="#000" stroke-width="4" />
                <path d="M25 35 L40 50 L25 65" stroke="#000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                <line x1="50" y1="65" x2="75" y2="65" stroke="#000" stroke-width="5" stroke-linecap="round" />
              </svg>
            </div>
            <div className="deco-floppy">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="6" width="88" height="88" rx="8" fill="#a8e6cf" stroke="#000" stroke-width="4" />
                <rect x="3" y="3" width="88" height="88" rx="8" fill="#a8e6cf" stroke="#000" stroke-width="4" />
                <rect x="20" y="20" width="60" height="60" rx="3" fill="#ffd93d" stroke="#000" stroke-width="4" />
                <rect x="30" y="20" width="40" height="20" fill="#66d9ef" stroke="#000" stroke-width="3" />
                <rect x="35" y="55" width="30" height="15" rx="2" fill="#000" />
                <circle cx="50" cy="35" r="3" fill="#000" />
              </svg>
            </div>
            <div className="deco-label">AI Engineer</div>
          </div>
        </div>
      </div>
      <div className="tech-badges">
        <span className="tech-badge"><i className="fab fa-python"></i> Python</span>
        <span className="tech-badge"><i className="fab fa-react"></i> React</span>
        <span className="tech-badge"><i className="fab fa-js"></i> TypeScript</span>
        <span className="tech-badge"><i className="fas fa-brain"></i> FastAPI</span>
        <span className="tech-badge"><i className="fas fa-database"></i> ChromaDB</span>
        <span className="tech-badge"><i className="fab fa-docker"></i> Docker</span>
        <span className="tech-badge"><i className="fab fa-git"></i> Git</span>
        <span className="tech-badge"><i className="fas fa-cloud"></i> Vercel</span>
      </div>
    </section>
  );
}

