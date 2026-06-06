"use client";

import React, { useEffect, useRef } from "react";
import { profile } from "@/data/profile";
import { ArrowRight, Mail, Phone, FileText } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import { motion } from "framer-motion";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Node definition representing chunks or vectors in a RAG database
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }

    const colors = ["#22D3EE", "#A855F7", "#F472B6", "#A3E635"];
    const particles: Particle[] = [];
    const particleCount = Math.min(40, Math.floor((width * height) / 20000));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections first
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.15;
            ctx.strokeStyle = `rgba(42, 52, 72, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-mesh-grid"
    >
      {/* Background Interactive Neural Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Bio Text */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-ink border border-border-dark text-xs text-neon-cyan font-semibold tracking-wider font-mono-jb mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            <span>AVAILABLE FOR INTERNSHIPS & ROLES</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold font-sora tracking-tight leading-none mb-4"
          >
            Hi, I'm <br className="sm:hidden" />
            <span className="text-gradient-cyan-violet">{profile.name}</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-2xl font-bold font-sora text-text-muted mb-6"
          >
            {profile.role}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg text-text-muted max-w-xl mb-8 leading-relaxed"
          >
            {profile.tagline}
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <a
              href="#projects"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-neon-cyan to-electric-violet text-bg-deep font-bold tracking-wide shadow-lg hover:shadow-electric-violet/20 hover:scale-[1.02] transition-all"
            >
              <span>Explore Projects</span>
              <ArrowRight size={18} />
            </a>

            <a
              href="#contact"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface-ink border border-border-dark text-text-primary font-bold hover:bg-surface-elevated transition-all"
            >
              <span>Get In Touch</span>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center gap-6"
          >
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-neon-cyan transition-colors"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-electric-violet transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-text-muted hover:text-hot-pink transition-colors"
              aria-label="Email"
            >
              <Mail size={22} />
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s+/g, "")}`}
              className="text-text-muted hover:text-signal-lime transition-colors"
              aria-label="Phone"
            >
              <Phone size={22} />
            </a>
          </motion.div>
        </div>

        {/* Profile Image Column */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden group"
          >
            {/* Pulsing Gradient Orbit Ring */}
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-cyan via-electric-violet to-hot-pink rounded-3xl p-1 animate-pulse">
              <div className="absolute inset-1 bg-bg-deep rounded-3xl z-0" />
            </div>

            {/* Actual image */}
            <div className="absolute inset-2 rounded-2xl overflow-hidden z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-[1.01] group-hover:scale-105"
                onError={(e) => {
                  // Fallback: If image fails to load, render styled placeholder
                  e.currentTarget.style.display = "none";
                  const fallback = document.getElementById("profile-fallback");
                  if (fallback) fallback.style.display = "flex";
                }}
              />

              {/* Profile Image Fallback (Beautifully styled SVG) */}
              <div
                id="profile-fallback"
                className="hidden w-full h-full bg-surface-ink flex-col items-center justify-center text-center p-6 text-text-muted"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-neon-cyan to-electric-violet flex items-center justify-center text-bg-deep text-2xl font-bold font-sora mb-4">
                  SB
                </div>
                <h3 className="text-text-primary font-bold font-sora">{profile.name}</h3>
                <p className="text-xs font-mono-jb text-text-muted mt-1">{profile.role}</p>
              </div>
            </div>

            {/* Glowing blur behind the card */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-neon-cyan to-electric-violet rounded-3xl opacity-30 blur-2xl -z-10 group-hover:opacity-40 transition-opacity" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
