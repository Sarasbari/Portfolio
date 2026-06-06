"use client";

import React from "react";
import SectionHeading from "./SectionHeading";
import { motion } from "framer-motion";
import { Database, BrainCircuit, Workflow, ShieldCheck, CreditCard, Rocket } from "lucide-react";

const focusAreas = [
  {
    icon: <Database className="text-neon-cyan" size={28} />,
    title: "RAG Pipelines",
    description:
      "Designing end-to-end Retrieval-Augmented Generation architectures with hybrid search (dense/sparse), document parsing, vector retrieval, and advanced reranking pipelines for factual correctness.",
    color: "from-neon-cyan/20 to-transparent",
    borderColor: "group-hover:border-neon-cyan/50",
  },
  {
    icon: <BrainCircuit className="text-electric-violet" size={28} />,
    title: "LLM Integrations",
    description:
      "Integrating state-of-the-art foundation models (OpenAI, Anthropic, Gemini, Groq) with customized system parameters, fine-tuned QLoRA models, and strict response schema validations using Pydantic.",
    color: "from-electric-violet/20 to-transparent",
    borderColor: "group-hover:border-electric-violet/50",
  },
  {
    icon: <Workflow className="text-signal-lime" size={28} />,
    title: "Agentic Workflows",
    description:
      "Structuring autonomous agent systems capable of execution cycles, loop feedback, tool utilization, and memory management for developer tasks, code audits, or complex automation.",
    color: "from-signal-lime/20 to-transparent",
    borderColor: "group-hover:border-signal-lime/50",
  },
  {
    icon: <ShieldCheck className="text-warm-orange" size={28} />,
    title: "Vector Databases",
    description:
      "Operating and optimizing vector indexing surfaces using databases like ChromaDB, pgvector (Supabase), and Pinecone to manage embedding storage, index retrieval speed, and metadata filtering.",
    color: "from-warm-orange/20 to-transparent",
    borderColor: "group-hover:border-warm-orange/50",
  },
  {
    icon: <CreditCard className="text-hot-pink" size={28} />,
    title: "Full-Stack SaaS",
    description:
      "Architecting complete web software with transaction-ready Razorpay/Stripe checkout, atomic locking mechanisms, async job queues (BullMQ + Redis), and solid auth states.",
    color: "from-hot-pink/20 to-transparent",
    borderColor: "group-hover:border-hot-pink/50",
  },
  {
    icon: <Rocket className="text-neon-cyan" size={28} />,
    title: "Production Deployment",
    description:
      "Configuring robust CD pipelines to scale next-generation builds on Vercel, Render, or Netlify, backed by optimized static generation, serverless endpoints, and system log audits.",
    color: "from-neon-cyan/20 to-transparent",
    borderColor: "group-hover:border-neon-cyan/50",
  },
];

export default function FocusAreas() {
  return (
    <section id="focus" className="py-20 bg-bg-deep relative">
      {/* Decorative blurred background grids */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-electric-violet/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading
          title="Technical Focus"
          subtitle="Areas of Expertise"
          gradient="orange-lime"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {focusAreas.map((area, idx) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-2xl bg-surface-ink border border-border-dark p-8 hover:translate-y-[-4px] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Corner Ambient Light Overlay */}
              <div
                className={`absolute top-0 left-0 w-32 h-32 bg-gradient-to-br ${area.color} rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                {/* Icon Badge */}
                <div className="p-4 w-fit rounded-xl bg-surface-elevated border border-border-dark mb-6 group-hover:scale-110 transition-transform duration-300">
                  {area.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold font-sora text-text-primary mb-3">
                  {area.title}
                </h3>

                {/* Description */}
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  {area.description}
                </p>
              </div>

              {/* Bottom Decorative Line */}
              <div className="w-full h-[2px] bg-border-dark mt-4 group-hover:bg-gradient-to-r group-hover:from-neon-cyan group-hover:to-electric-violet transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
