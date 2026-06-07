import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, Caveat } from "next/font/google";
import "./neo-styles.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saras Gautam Bari | AI Engineer & Full-Stack Developer",
  description:
    "Information Technology Engineering student at VCET Vasai building production-grade AI and full-stack systems. Hands-on with LLM integrations, RAG architectures, agentic workflows, and deployed SaaS products.",
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
    "Neo-Brutalist Portfolio",
  ],
  authors: [{ name: "Saras Gautam Bari" }],
  creator: "Saras Gautam Bari",
  icons: {
    icon: "/favicon.svg",
  },
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
      className={`${spaceGrotesk.variable} ${spaceMono.variable} ${caveat.variable} scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&family=Caveat:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        <script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossOrigin=""
          defer
        ></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

