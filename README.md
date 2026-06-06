# Saras Gautam Bari - Portfolio Website

A premium, modern, animated, and responsive portfolio website designed for **Saras Gautam Bari** as an **AI Engineer + Full-Stack Developer**.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first configuration)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: Custom optimized brand SVG icons + [Lucide React](https://lucide.dev/)

---

## 🛠️ Data-Driven Architecture

All content is managed through local TypeScript data configuration files. To modify any website text or links, update the following files:

- `data/profile.ts`: Contains name, role, email, phone, location, links, bio summary, and resume path.
- `data/projects.ts`: Project details (Sensei, aLiveHub, Ragify-AI, MinuteForge, text-to-sql-ai, snap-to-json).
- `data/skills.ts`: Categorized skill chips (AI/ML, Languages, Frontend, Backend & DB, Tools & Deployment).
- `data/achievements.ts`: Milestone listings (VMPS Winner, Hackathons, DSA Practice).

---

## 📸 Media & Attachments

- **Profile Picture**: Placed at `public/images/sarasbari.jpeg`. A beautiful placeholder avatar is generated for you. Simply replace it with your real picture keeping the same filename.
- **Resume**: Placed at `public/resume.pdf`. A placeholder text file is created for you. Replace it with your actual resume PDF to enable direct downloads.

---

## ⚙️ Getting Started

First, install the dependencies and run the development server:

```bash
# Install packages
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📦 Production & Deployment

To run a production compilation:

```bash
npm run build
```

This app compiles with strict TypeScript typing, static page generation, and zero warnings. It is deploy-ready for [Vercel](https://vercel.com).
- Push this repo to GitHub.
- Import the repo into Vercel.
- The default settings (Next.js build) will build and deploy the site instantly.
