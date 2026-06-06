export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "AI / ML",
    items: [
      "LLM Integration",
      "Groq",
      "Claude API",
      "Ollama",
      "RAG Pipelines",
      "LlamaIndex",
      "ChromaDB",
      "pgvector",
      "Prompt Engineering",
      "Agentic Workflows",
      "Anomaly Detection",
    ],
  },
  {
    category: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "C++", "Java"],
  },
  {
    category: "Frontend",
    items: [
      "React 18",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "Recharts",
      "D3.js",
    ],
  },
  {
    category: "Backend & Database",
    items: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "Firebase",
      "MongoDB",
      "MySQL",
      "Supabase",
    ],
  },
  {
    category: "Tools & Deployment",
    items: [
      "Git",
      "GitHub",
      "Vercel",
      "Netlify",
      "Render",
      "Razorpay",
      "Docker",
    ],
  },
];
