export interface Project {
  title: string;
  category: string;
  description: string;
  stack: string[];
  github: string;
  live: string;
  highlight: string;
}

export const projects: Project[] = [
  {
    title: "Sensei",
    category: "Agentic AI",
    description:
      "Agentic AI code review platform that mines GitHub PR history to build per-engineer Review DNA using RAG and personalized feedback loops.",
    stack: ["Python", "FastAPI", "ChromaDB", "Groq", "React"],
    github: "https://github.com/Sarasbari/Sensei",
    live: "",
    highlight: "Personalized code review intelligence from historical PR patterns",
  },
  {
    title: "aLiveHub",
    category: "Production SaaS",
    description:
      "Production SaaS for sports turf booking with atomic slot locking, real owner workflows, payment integration, and deployed booking experience.",
    stack: [
      "React",
      "TypeScript",
      "Firebase",
      "Razorpay",
      "BullMQ",
      "Upstash Redis",
      "Vercel",
    ],
    github: "https://github.com/Sarasbari/Turf-Booking-Saas-Model",
    live: "https://alivehub.vercel.app",
    highlight: "Atomic slot locking and payment-ready sports booking system",
  },
  {
    title: "Ragify-AI",
    category: "RAG System",
    description:
      "End-to-end RAG system with hybrid search, reranking, vector retrieval, model integrations, and a full React frontend.",
    stack: [
      "FastAPI",
      "pgvector",
      "Supabase",
      "Gemini",
      "Groq",
      "Cohere",
      "React",
      "Render",
      "Vercel",
    ],
    github: "https://github.com/Sarasbari/RAGify-AI",
    live: "",
    highlight: "Hybrid retrieval and reranking for production-style RAG",
  },
  {
    title: "MinuteForge",
    category: "AI Automation",
    description:
      "Async meeting transcription and summarisation service with queue-based processing and Notion integration.",
    stack: [
      "Node.js",
      "Express",
      "AssemblyAI",
      "Groq",
      "BullMQ",
      "Upstash Redis",
      "Notion API",
    ],
    github: "https://github.com/Sarasbari/minuteforge-ai",
    live: "",
    highlight: "Async transcription pipeline with Notion-ready summaries",
  },
  {
    title: "text-to-sql-ai",
    category: "Fine-Tuned LLM",
    description:
      "Fine-tuned LLM that converts natural language questions into accurate SQL using QLoRA and SQLCoder.",
    stack: [
      "Python",
      "QLoRA",
      "defog/sqlcoder-7b-2",
      "Hugging Face",
      "PEFT",
      "PyTorch",
    ],
    github: "https://github.com/Sarasbari/Text-to-SQL-AI",
    live: "https://text-to-sql-ai.vercel.app",
    highlight: "Natural language to SQL with fine-tuned model workflow",
  },
  {
    title: "snap-to-json",
    category: "Vision AI API",
    description:
      "Invoice and document extraction API that converts visual inputs into validated structured JSON output.",
    stack: ["FastAPI", "Gemini Vision", "Pydantic v2", "Python"],
    github: "https://github.com/Sarasbari/snap-to-json",
    live: "",
    highlight: "Structured extraction API for invoices and documents",
  },
];
