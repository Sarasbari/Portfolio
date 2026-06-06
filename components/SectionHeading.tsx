import React from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  gradient?: "cyan-violet" | "violet-pink" | "orange-lime";
}

export default function SectionHeading({
  title,
  subtitle,
  gradient = "cyan-violet",
}: SectionHeadingProps) {
  const gradientClass =
    gradient === "cyan-violet"
      ? "text-gradient-cyan-violet"
      : gradient === "violet-pink"
      ? "text-gradient-violet-pink"
      : "text-gradient-orange-lime";

  const dotColor =
    gradient === "cyan-violet"
      ? "bg-neon-cyan"
      : gradient === "violet-pink"
      ? "bg-hot-pink"
      : "bg-signal-lime";

  return (
    <div className="mb-12 flex flex-col items-center text-center">
      {subtitle && (
        <span className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-2 font-mono-jb">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-sora flex items-center gap-1">
        <span className={gradientClass}>{title}</span>
        <span className={`h-2.5 w-2.5 rounded-full ${dotColor} inline-block animate-pulse`} />
      </h2>
      <div className="mt-4 h-1 w-20 rounded bg-gradient-to-r from-neon-cyan via-electric-violet to-hot-pink opacity-80" />
    </div>
  );
}
