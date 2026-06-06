"use client";

import React, { useState } from "react";
import { profile } from "@/data/profile";
import SectionHeading from "./SectionHeading";
import { Mail, Phone, MapPin, FileText, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setErrorMsg("Please provide a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      // Formspree submission (Defaulting to contact email in profile using a Formspree endpoint)
      // The user can replace the formspree endpoint ID 'xqnqeryy' or similar in the future.
      const response = await fetch("https://formspree.io/f/mldevwob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject || "Portfolio Contact Form Submission",
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Something went wrong. Please try emailing me directly.");
    }
  };

  return (
    <section id="contact" className="py-20 bg-surface-ink relative overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 bg-hot-pink/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading title="Contact Me" subtitle="Get in touch" gradient="cyan-violet" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left">
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold font-sora text-text-primary mb-4"
              >
                Let's discuss your next project
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-text-muted text-sm leading-relaxed mb-8"
              >
                Whether you need a production-grade RAG pipeline, LLM agents, a full-stack SaaS tool,
                or a developer to join your engineering team—I'd love to connect.
              </motion.p>
            </div>

            {/* Direct Details Buttons */}
            <div className="flex flex-col gap-4 mb-8">
              <motion.a
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                href={`mailto:${profile.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-surface-elevated border border-border-dark hover:border-neon-cyan/50 hover:shadow-cyan-violet transition-all group font-sora"
              >
                <div className="p-3 rounded-lg bg-bg-deep text-neon-cyan group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-text-muted font-bold font-mono-jb">EMAIL ME</p>
                  <p className="text-sm font-bold text-text-primary">{profile.email}</p>
                </div>
              </motion.a>

              <motion.a
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-surface-elevated border border-border-dark hover:border-signal-lime/50 transition-all group font-sora"
              >
                <div className="p-3 rounded-lg bg-bg-deep text-signal-lime group-hover:scale-110 transition-transform">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-text-muted font-bold font-mono-jb">CALL ME</p>
                  <p className="text-sm font-bold text-text-primary">{profile.phone}</p>
                </div>
              </motion.a>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-surface-elevated border border-border-dark group font-sora"
              >
                <div className="p-3 rounded-lg bg-bg-deep text-electric-violet">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-text-muted font-bold font-mono-jb">LOCATION</p>
                  <p className="text-sm font-bold text-text-primary">{profile.location}</p>
                </div>
              </motion.div>
            </div>

            {/* Resume and Social links */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={profile.resume}
                download
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-electric-violet text-bg-deep text-xs font-bold tracking-wide font-sora hover:opacity-95 transition-opacity"
              >
                <FileText size={16} />
                <span>DOWNLOAD RESUME</span>
              </a>

              <div className="flex gap-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-surface-elevated border border-border-dark text-text-muted hover:text-neon-cyan hover:border-neon-cyan/40 transition-all"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-surface-elevated border border-border-dark text-text-muted hover:text-electric-violet hover:border-electric-violet/40 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 p-6 md:p-8 rounded-2xl bg-surface-elevated border border-border-dark shadow-xl"
          >
            <h4 className="text-lg font-bold font-sora text-text-primary mb-6">
              Send a Message
            </h4>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col text-left">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-text-muted font-mono-jb mb-2">
                    Name <span className="text-hot-pink">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-bg-deep border border-border-dark text-sm text-text-primary focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
                  />
                </div>

                <div className="flex flex-col text-left">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-text-muted font-mono-jb mb-2">
                    Email <span className="text-hot-pink">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-bg-deep border border-border-dark text-sm text-text-primary focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col text-left">
                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-text-muted font-mono-jb mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Collaboration details..."
                  className="w-full px-4 py-3 rounded-xl bg-bg-deep border border-border-dark text-sm text-text-primary focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
                />
              </div>

              <div className="flex flex-col text-left">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-text-muted font-mono-jb mb-2">
                  Message <span className="text-hot-pink">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Hi Saras, I'd like to talk about..."
                  className="w-full px-4 py-3 rounded-xl bg-bg-deep border border-border-dark text-sm text-text-primary focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all resize-none"
                />
              </div>

              {/* Status Message */}
              {status === "success" && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-signal-lime/10 border border-signal-lime/20 text-signal-lime text-sm">
                  <CheckCircle size={18} />
                  <span>Your message has been sent successfully. I will get back to you soon!</span>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-hot-pink/10 border border-hot-pink/20 text-hot-pink text-sm">
                  <AlertCircle size={18} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-neon-cyan to-electric-violet text-bg-deep text-sm font-bold tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-electric-violet/20 hover:scale-[1.01]"
              >
                {status === "loading" ? (
                  <span>SENDING...</span>
                ) : (
                  <>
                    <span>SEND MESSAGE</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
