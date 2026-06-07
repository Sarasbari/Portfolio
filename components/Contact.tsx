"use client";

import React from "react";
import { profile } from "@/data/profile";

export default function Contact() {
  return (
    <section className="section" id="contact">
      <h2 className="section-title">GET IN TOUCH</h2>
      <div className="contact-container-compact">
        <p className="contact-intro">Let's build something amazing together</p>
        <div className="contact-grid">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <i className="fab fa-linkedin"></i>
            <span>LinkedIn</span>
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <i className="fab fa-github"></i>
            <span>GitHub</span>
          </a>
          <a
            href={`mailto:${profile.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <i className="fas fa-envelope"></i>
            <span>Email</span>
          </a>
        </div>
      </div>
    </section>
  );
}
