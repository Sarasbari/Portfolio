import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saras Gautam Bari | AI Engineer & Full-Stack Developer",
  description:
    "I build production-ready AI systems, RAG pipelines, LLM integrations, and full-stack web apps. Information Technology Engineering student at VCET.",
  keywords: [
    "Saras Gautam Bari",
    "Saras Bari",
    "AI Engineer",
    "Full-Stack Developer",
    "RAG pipelines",
    "Agentic AI",
    "Next.js Portfolio",
    "VCET IT Student",
    "Mumbai University",
  ],
  authors: [{ name: "Saras Gautam Bari" }],
  creator: "Saras Gautam Bari",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/Sarasbari",
    title: "Saras Gautam Bari | AI Engineer & Full-Stack Developer",
    description:
      "I build production-ready AI systems, RAG pipelines, LLM integrations, and full-stack web apps.",
    siteName: "Saras Gautam Bari Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saras Gautam Bari | AI Engineer & Full-Stack Developer",
    description:
      "I build production-ready AI systems, RAG pipelines, LLM integrations, and full-stack web apps.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="bg-bg-deep text-text-primary min-h-screen font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
