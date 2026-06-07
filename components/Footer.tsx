"use client";

import React from "react";
import Link from "next/link";
import { profile } from "@/data/profile";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-compact">
        <div className="footer-main">
          <div className="footer-brand-compact">
            <strong>{profile.name.toUpperCase()}</strong>
            <span>{profile.role}</span>
          </div>
          <div className="footer-nav-compact">
            <a href="#hero">Home</a>
            <a href="#about">About</a>
            <a href="#journey">Journey</a>
            <a href="#skills">Skills</a>
          </div>
          <div className="footer-social-compact">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" title="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href={`mailto:${profile.email}`} title="Email">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
        <div className="footer-bottom-compact">
          <span>© {currentYear} {profile.name}</span>
          <Link href="/terminal" className="footer-terminal-link-compact">
            <i className="fas fa-terminal"></i> Terminal
          </Link>
        </div>
      </div>
    </footer>
  );
}
