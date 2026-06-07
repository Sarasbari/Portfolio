export interface SkillItem {
  name: string;
  icon: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  isHighlight?: boolean;
  items: SkillItem[];
}

export const skills: SkillCategory[] = [
  {
    category: "AI & Machine Learning",
    icon: "fas fa-brain",
    items: [
      { name: "LLM Integration", icon: "fas fa-robot" },
      { name: "Claude API", icon: "fas fa-microchip" },
      { name: "Groq", icon: "fas fa-bolt" },
      { name: "Ollama", icon: "fas fa-server" },
      { name: "Prompt Engineering", icon: "fas fa-terminal" },
      { name: "Anomaly Detection", icon: "fas fa-search" },
    ],
  },
  {
    category: "RAG & Vector Search",
    icon: "fas fa-project-diagram",
    items: [
      { name: "RAG Pipelines", icon: "fas fa-filter" },
      { name: "LlamaIndex", icon: "fas fa-book" },
      { name: "ChromaDB", icon: "fas fa-database" },
      { name: "pgvector", icon: "fas fa-arrow-down-z-a" },
    ],
  },
  {
    category: "Languages",
    icon: "fas fa-code",
    items: [
      { name: "Python", icon: "fab fa-python" },
      { name: "TypeScript", icon: "fab fa-js" },
      { name: "JavaScript", icon: "fab fa-js-square" },
      { name: "C++", icon: "fas fa-file-code" },
      { name: "Java", icon: "fab fa-java" },
    ],
  },
  {
    category: "Frontend",
    icon: "fab fa-react",
    items: [
      { name: "React 18", icon: "fab fa-react" },
      { name: "Vite", icon: "fas fa-bolt" },
      { name: "Tailwind CSS", icon: "fab fa-css3-alt" },
      { name: "Framer Motion", icon: "fas fa-play" },
      { name: "Recharts", icon: "fas fa-chart-bar" },
      { name: "D3.js", icon: "fas fa-chart-pie" },
    ],
  },
  {
    category: "Backend Frameworks",
    icon: "fab fa-node-js",
    items: [
      { name: "Node.js", icon: "fab fa-node" },
      { name: "Express.js", icon: "fas fa-server" },
      { name: "FastAPI", icon: "fas fa-bolt" },
      { name: "Supabase", icon: "fas fa-cloud-upload-alt" },
    ],
  },
  {
    category: "Databases & Cloud",
    icon: "fas fa-database",
    items: [
      { name: "MongoDB", icon: "fas fa-leaf" },
      { name: "MySQL", icon: "fas fa-database" },
      { name: "Firebase", icon: "fas fa-fire" },
      { name: "PostgreSQL", icon: "fas fa-elephant" },
    ],
  },
  {
    category: "Tools & DevOps",
    icon: "fas fa-tools",
    isHighlight: true,
    items: [
      { name: "Git", icon: "fab fa-git-alt" },
      { name: "GitHub", icon: "fab fa-github" },
      { name: "Vercel", icon: "fas fa-upload" },
      { name: "Docker", icon: "fab fa-docker" },
      { name: "Razorpay", icon: "fas fa-credit-card" },
    ],
  },
  {
    category: "AI Workflows & Concepts",
    icon: "fas fa-sitemap",
    isHighlight: true,
    items: [
      { name: "Agentic Workflows", icon: "fas fa-network-wired" },
      { name: "System Design", icon: "fas fa-cubes" },
      { name: "RAG Architecture", icon: "fas fa-route" },
      { name: "API Design", icon: "fas fa-exchange-alt" },
    ],
  },
];
