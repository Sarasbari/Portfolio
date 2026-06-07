"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import "@/app/terminal-styles.css";

// Interface definitions
interface TerminalLine {
  text: string;
  type: "command" | "output" | "error" | "info" | "success";
  html?: boolean;
}

interface TerminalPane {
  id: string;
  lines: TerminalLine[];
  currentInput: string;
  history: string[];
  historyIndex: number;
  isMatrix: boolean;
  isSnakeGame: boolean;
  snakeScore?: number;
}

type TerminalLayout =
  | { type: "pane"; id: string }
  | { type: "split"; direction: "horizontal" | "vertical"; children: TerminalLayout[] };

// Helper components for special canvas widgets
const TerminalMatrixRain = ({ onExit }: { onExit: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const matrixContainer = canvas.parentElement;
    canvas.width = matrixContainer?.offsetWidth || 400;
    canvas.height = 300;

    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -20);
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff00"; // default matrix green
      ctx.font = "15px monospace";

      for (let i = 0; i < drops.length; i++) {
        const char = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(char, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onExit();
      }
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKey);
    };
  }, [onExit]);

  return (
    <div className="matrix-container" id="matrix-container" style={{ position: "relative", zIndex: 10 }}>
      <canvas ref={canvasRef} id="matrix-canvas"></canvas>
      <div className="matrix-instructions">Type 'stop-matrix' or press ESC to exit</div>
    </div>
  );
};

const TerminalSnakeGame = ({
  onExit,
  onScoreUpdate,
}: {
  onExit: () => void;
  onScoreUpdate: (score: number) => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gridSize = 20;
    const canvasWidth = 400;
    const canvasHeight = 300;
    let snake = [
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 },
    ];
    let food = { x: 10, y: 10 };
    let direction = { x: 1, y: 0 };
    let nextDirection = { x: 1, y: 0 };
    let gameScore = 0;
    let isGamePaused = false;
    let isGameOver = false;
    let speed = 10; // frames per second

    const placeFood = () => {
      let valid = false;
      while (!valid) {
        food = {
          x: Math.floor(Math.random() * (canvasWidth / gridSize)),
          y: Math.floor(Math.random() * (canvasHeight / gridSize)),
        };
        valid = !snake.some((segment) => segment.x === food.x && segment.y === food.y);
      }
    };

    const drawGrid = () => {
      ctx.strokeStyle = "#111111";
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= canvasWidth; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
      }
      for (let y = 0; y <= canvasHeight; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();
      }
    };

    const drawSnake = () => {
      // Draw body segments
      ctx.fillStyle = "#00ff00";
      for (let i = 1; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize - 2, gridSize - 2);
      }
      // Draw head
      ctx.fillStyle = "#00aa00";
      ctx.fillRect(snake[0].x * gridSize, snake[0].y * gridSize, gridSize - 2, gridSize - 2);
    };

    const drawFood = () => {
      ctx.fillStyle = "#ff0000";
      ctx.beginPath();
      ctx.arc(
        food.x * gridSize + gridSize / 2,
        food.y * gridSize + gridSize / 2,
        gridSize * 0.4,
        0,
        Math.PI * 2
      );
      ctx.fill();
    };

    const moveSnake = () => {
      direction = nextDirection;
      const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y,
      };

      const cols = canvasWidth / gridSize;
      const rows = canvasHeight / gridSize;

      // Wrap around edges
      if (head.x < 0) head.x = cols - 1;
      if (head.x >= cols) head.x = 0;
      if (head.y < 0) head.y = rows - 1;
      if (head.y >= rows) head.y = 0;

      // Self-collision check
      if (snake.some((seg, idx) => idx > 0 && seg.x === head.x && seg.y === head.y)) {
        isGameOver = true;
        setGameOver(true);
        return;
      }

      snake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        gameScore += 10;
        setScore(gameScore);
        onScoreUpdate(gameScore);
        placeFood();
        if (speed < 20) speed += 0.5;
      } else {
        snake.pop();
      }
    };

    const update = () => {
      if (isGameOver || isGamePaused) return;
      moveSnake();
    };

    const render = () => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      drawGrid();
      drawSnake();
      drawFood();

      if (isGamePaused) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "20px monospace";
        ctx.textAlign = "center";
        ctx.fillText("PAUSED", canvasWidth / 2, canvasHeight / 2);
      }

      if (isGameOver) {
        ctx.fillStyle = "#ff0000";
        ctx.font = "20px monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvasWidth / 2, canvasHeight / 2 - 10);
        ctx.fillStyle = "#ffffff";
        ctx.font = "14px monospace";
        ctx.fillText("Press SPACE to restart", canvasWidth / 2, canvasHeight / 2 + 20);
      }
    };

    let lastTime = 0;
    const loop = (time: number) => {
      const delta = time - lastTime;
      const interval = 1000 / speed;
      if (delta >= interval) {
        update();
        render();
        lastTime = time;
      }
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);

    const handleKey = (e: KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "Escape", "p", "P"].includes(
          e.key
        )
      ) {
        e.preventDefault();
      }

      if (e.key === "ArrowUp" && direction.y !== 1) {
        nextDirection = { x: 0, y: -1 };
      } else if (e.key === "ArrowDown" && direction.y !== -1) {
        nextDirection = { x: 0, y: 1 };
      } else if (e.key === "ArrowLeft" && direction.x !== 1) {
        nextDirection = { x: -1, y: 0 };
      } else if (e.key === "ArrowRight" && direction.x !== -1) {
        nextDirection = { x: 1, y: 0 };
      } else if (e.key === "p" || e.key === "P") {
        isGamePaused = !isGamePaused;
        setIsPaused(isGamePaused);
      } else if (e.key === " " && isGameOver) {
        snake = [
          { x: 5, y: 5 },
          { x: 4, y: 5 },
          { x: 3, y: 5 },
        ];
        direction = { x: 1, y: 0 };
        nextDirection = { x: 1, y: 0 };
        gameScore = 0;
        setScore(0);
        onScoreUpdate(0);
        isGameOver = false;
        setGameOver(false);
        speed = 10;
        placeFood();
      } else if (e.key === "Escape") {
        onExit();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [onExit, onScoreUpdate]);

  return (
    <div className="game-container" id="snake-game-container" style={{ position: "relative", zIndex: 10 }}>
      <div className="game-instructions">
        <p>Snake Game: Use arrow keys to move.</p>
        <p>Press P to pause, SPACE to restart, ESC to exit.</p>
      </div>
      <div id="snake-game-score">Score: {score}</div>
      <div id="snake-game-canvas">
        <canvas ref={canvasRef} width={400} height={300}></canvas>
      </div>
    </div>
  );
};

// Recursive Pane Renderer Component
const PaneRenderer = ({
  node,
  activePaneId,
  setActivePaneId,
  panes,
  handleCommandSubmit,
  handleTabComplete,
  onExitGame,
  onExitMatrix,
  onUpdateSnakeScore,
  onUpdateInputText,
  onRightClick,
}: {
  node: TerminalLayout;
  activePaneId: string;
  setActivePaneId: (id: string) => void;
  panes: Record<string, TerminalPane>;
  handleCommandSubmit: (paneId: string, command: string) => void;
  handleTabComplete: (paneId: string, currentInput: string) => void;
  onExitGame: (paneId: string) => void;
  onExitMatrix: (paneId: string) => void;
  onUpdateSnakeScore: (paneId: string, score: number) => void;
  onUpdateInputText: (paneId: string, text: string) => void;
  onRightClick: (e: React.MouseEvent, paneId: string) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (node.type === "pane" && activePaneId === node.id) {
      const scrollable = containerRef.current?.querySelector(".terminal-output-wrapper");
      if (scrollable) {
        scrollable.scrollTop = scrollable.scrollHeight;
      }
    }
  }, [node, activePaneId, panes]);

  if (node.type === "pane") {
    const pane = panes[node.id];
    if (!pane) return null;
    const isActive = activePaneId === node.id;

    return (
      <div
        ref={containerRef}
        className={`terminal-content ${isActive ? "active-pane" : ""}`}
        onClick={() => setActivePaneId(node.id)}
        onContextMenu={(e) => onRightClick(e, node.id)}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          position: "relative",
          outline: isActive ? "1px solid var(--border-color)" : "none",
        }}
      >
        <div className="terminal-output-wrapper" style={{ flex: 1, overflowY: "auto", paddingBottom: "10px" }}>
          <div id={`output-${node.id}`} className="terminal-output">
            {pane.lines.map((line, idx) => (
              <div key={idx} className={line.type} style={{ whiteSpace: "pre-wrap" }}>
                {line.html ? (
                  <div dangerouslySetInnerHTML={{ __html: line.text }} />
                ) : (
                  line.text
                )}
              </div>
            ))}
          </div>

          {pane.isMatrix && <TerminalMatrixRain onExit={() => onExitMatrix(node.id)} />}

          {pane.isSnakeGame && (
            <TerminalSnakeGame
              onExit={() => onExitGame(node.id)}
              onScoreUpdate={(score) => onUpdateSnakeScore(node.id, score)}
            />
          )}
        </div>

        {!pane.isSnakeGame && !pane.isMatrix && (
          <div className="input-line" style={{ marginTop: "auto" }}>
            <span className="prompt">➜</span>
            <input
              type="text"
              className="command-input"
              value={pane.currentInput}
              onChange={(e) => onUpdateInputText(node.id, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCommandSubmit(node.id, pane.currentInput);
                } else if (e.key === "Tab") {
                  e.preventDefault();
                  handleTabComplete(node.id, pane.currentInput);
                }
              }}
              autoFocus={isActive}
            />
          </div>
        )}
      </div>
    );
  }

  const splitClass = node.direction === "horizontal" ? "split-h" : "split-v";
  return (
    <div
      className={`terminal-container ${splitClass}`}
      style={{
        display: "flex",
        flexDirection: node.direction === "horizontal" ? "row" : "column",
        width: "100%",
        height: "100%",
        flex: 1,
      }}
    >
      {node.children.map((child, index) => (
        <React.Fragment key={index}>
          <PaneRenderer
            node={child}
            activePaneId={activePaneId}
            setActivePaneId={setActivePaneId}
            panes={panes}
            handleCommandSubmit={handleCommandSubmit}
            handleTabComplete={handleTabComplete}
            onExitGame={onExitGame}
            onExitMatrix={onExitMatrix}
            onUpdateSnakeScore={onUpdateSnakeScore}
            onUpdateInputText={onUpdateInputText}
            onRightClick={onRightClick}
          />
          {index < node.children.length - 1 && (
            <div
              className={`resize-handle ${node.direction}`}
              style={{
                background: "var(--border-color)",
                cursor: node.direction === "horizontal" ? "col-resize" : "row-resize",
                width: node.direction === "horizontal" ? "4px" : "100%",
                height: node.direction === "horizontal" ? "100%" : "4px",
                position: "relative",
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// Main Terminal Page component
export default function TerminalPage() {
  const asciiArt = `███████╗ █████╗ ██████╗  █████╗ ███████╗     ██████╗  █████╗ ██████╗ ██╗
██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔════╝     ██╔══██╗██╔══██╗██╔══██╗██║
███████╗███████║██████╔╝███████║███████╗     ██████╔╝███████║██████╔╝██║
╚════██║██╔══██║██╔══██╗██╔══██║╚════██║     ██╔══██╗██╔══██║██╔══██╗██║
███████║██║  ██║██║  ██║██║  ██║███████║     ██████╔╝██║  ██║██║  ██║██║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝     ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝`;

  const divider = "──────────────────────────────────────────────────────────────────";

  const welcomeMessage = `
<span style="color: var(--text-color); font-weight: bold;">${asciiArt}</span>
<span style="color: var(--text-dim);">${divider}</span>
<span style="color: var(--text-bright);">              Saras Gautam Bari - Interactive Terminal Resume</span>
<span style="color: var(--text-dim);">         AI Engineer • Full-Stack Developer • Palghar, MH, India</span>
<span style="color: var(--text-dim);">${divider}</span>
Type <span style="color: var(--success-color);">'help'</span> to see available commands.
Press <span style="color: var(--success-color);">'tab'</span> to auto-complete commands.
Right-click to split terminal panes.
`;

  // State management
  const [layout, setLayout] = useState<TerminalLayout>({ type: "pane", id: "pane-1" });
  const [panes, setPanes] = useState<Record<string, TerminalPane>>({
    "pane-1": {
      id: "pane-1",
      lines: [{ text: welcomeMessage, type: "info", html: true }],
      currentInput: "",
      history: [],
      historyIndex: -1,
      isMatrix: false,
      isSnakeGame: false,
    },
  });
  const [activePaneId, setActivePaneId] = useState<string>("pane-1");
  const [currentTheme, setCurrentTheme] = useState<"default" | "dracula" | "solarized" | "nord">("default");
  const [activeModal, setActiveModal] = useState<"none" | "theme" | "projects" | "skills">("none");
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    targetPaneId: string;
  }>({
    visible: false,
    x: 0,
    y: 0,
    targetPaneId: "",
  });

  const commandList = [
    "help",
    "about",
    "experience",
    "journey",
    "education",
    "skills",
    "projects",
    "contact",
    "clear",
    "game",
    "matrix",
    "stop-matrix",
    "weather",
    "calc",
    "linkedin-cover",
    "pdf",
  ];

  // Close context menu on click elsewhere
  useEffect(() => {
    const closeMenu = () => {
      setContextMenu((prev) => ({ ...prev, visible: false }));
    };
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  // Split logic helpers
  const splitPaneInTree = (
    node: TerminalLayout,
    targetId: string,
    direction: "horizontal" | "vertical",
    newPaneId: string
  ): TerminalLayout => {
    if (node.type === "pane") {
      if (node.id === targetId) {
        return {
          type: "split",
          direction,
          children: [
            { type: "pane", id: targetId },
            { type: "pane", id: newPaneId },
          ],
        };
      }
      return node;
    }

    return {
      ...node,
      children: node.children.map((child) =>
        splitPaneInTree(child, targetId, direction, newPaneId)
      ),
    };
  };

  const closePaneInTree = (node: TerminalLayout, targetId: string): TerminalLayout | null => {
    if (node.type === "pane") {
      if (node.id === targetId) {
        return null;
      }
      return node;
    }

    const updatedChildren = node.children
      .map((child) => closePaneInTree(child, targetId))
      .filter((child): child is TerminalLayout => child !== null);

    if (updatedChildren.length === 0) return null;
    if (updatedChildren.length === 1) return updatedChildren[0];

    return {
      ...node,
      children: updatedChildren,
    };
  };

  const handleSplit = (direction: "horizontal" | "vertical") => {
    const targetId = contextMenu.targetPaneId || activePaneId;
    const newPaneId = `pane-${Date.now()}`;

    // Add new pane to state
    setPanes((prev) => ({
      ...prev,
      [newPaneId]: {
        id: newPaneId,
        lines: [{ text: welcomeMessage, type: "info", html: true }],
        currentInput: "",
        history: [],
        historyIndex: -1,
        isMatrix: false,
        isSnakeGame: false,
      },
    }));

    // Update layout tree
    setLayout((prev) => splitPaneInTree(prev, targetId, direction, newPaneId));
    setActivePaneId(newPaneId);
    setContextMenu((prev) => ({ ...prev, visible: false }));
  };

  const handleClosePane = () => {
    const targetId = contextMenu.targetPaneId || activePaneId;

    // Don't close if it is the last pane
    const paneCount = Object.keys(panes).length;
    if (paneCount <= 1) return;

    // Update layout tree
    const nextLayout = closePaneInTree(layout, targetId);
    if (nextLayout) {
      setLayout(nextLayout);
      // Remove pane from state
      setPanes((prev) => {
        const next = { ...prev };
        delete next[targetId];
        return next;
      });

      // Recalculate active pane if target was active
      if (activePaneId === targetId) {
        const remainingKeys = Object.keys(panes).filter((k) => k !== targetId);
        setActivePaneId(remainingKeys[0]);
      }
    }
    setContextMenu((prev) => ({ ...prev, visible: false }));
  };

  // Command handlers
  const handleCommandSubmit = (paneId: string, rawInput: string) => {
    const command = rawInput.trim();
    if (!command) return;

    const parts = command.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Update pane history
    setPanes((prev) => {
      const pane = prev[paneId];
      const nextHistory = [...pane.history, command];
      const nextLines = [...pane.lines, { text: `➜ ${command}`, type: "command" as const }];

      let isMatrix = pane.isMatrix;
      let isSnakeGame = pane.isSnakeGame;

      const outputLines: TerminalLine[] = [];

      switch (cmd) {
        case "clear":
          return {
            ...prev,
            [paneId]: {
              ...pane,
              lines: [{ text: welcomeMessage, type: "info", html: true }],
              currentInput: "",
              history: nextHistory,
              historyIndex: -1,
            }
          };
        case "help":
          outputLines.push({
            text: `
<span style="color: var(--text-bright); font-weight: bold;">🚀 Available Commands</span>

<span style="color: var(--prompt-color);"><b>Main Commands:</b></span>
• <b>help</b>           Show this help message
• <b>about</b>          Display my professional summary
• <b>skills</b>         View my technical expertise
• <b>experience</b>     Show my work history / journey
• <b>education</b>      View my educational background
• <b>contact</b>        Get my contact information
• <b>clear</b>          Clear the terminal screen

<span style="color: var(--prompt-color);"><b>Interactive Widgets:</b></span>
• <b>projects</b>       Open project showcase modal
• <b>skills-visual</b>  Open skills progress modal
• <b>game</b>           Play Snake mini-game
• <b>matrix</b>         Start Matrix digital rain effect
• <b>weather [city]</b>  Check weather for a location
• <b>calc [expr]</b>    Evaluate math expression
• <b>linkedin-cover</b> Generate a terminal branding preview
• <b>pdf</b>            Download resume as PDF
`,
            type: "info",
            html: true,
          });
          break;
        case "about":
          outputLines.push({
            text: `
<span style="color: var(--text-bright); font-weight: bold;">✨ About Me</span>
┌──────────────────────────────────────────────────────────────────┐
│ Saras Gautam Bari - AI Engineer & Full-Stack Developer           │
│ B.Tech IT Student at VCET specializing in production-grade AI    │
│ systems, RAG architectures, and web application pipelines.       │
└──────────────────────────────────────────────────────────────────┘
⚡ <b>Specialty:</b> Production AI, RAG pipelines, LLM agents, Full-Stack SaaS.
⚡ <b>Passion:</b> Turning complex algorithms and models into highly functional,
   deployed, user-friendly SaaS products.
⚡ <b>Strengths:</b> Technical leadership, national project competition winner,
   6 hackathons, and a rapid builder mindset.
`,
            type: "info",
            html: true,
          });
          break;
        case "skills":
          outputLines.push({
            text: `
<span style="color: var(--text-bright); font-weight: bold;">🛠️ Technical Skills</span>
<b>AI & Machine Learning:</b> LLM Integration, Claude API, Groq, Ollama, Prompt Engineering, Anomaly Detection
<b>RAG & Vector Search:</b> RAG Pipelines, LlamaIndex, ChromaDB, pgvector
<b>Languages:</b> Python, TypeScript, JavaScript, C++, Java
<b>Frontend Engineering:</b> React 18, Vite, Tailwind CSS, Framer Motion, Recharts, D3.js
<b>Backend Frameworks:</b> Node.js, Express.js, FastAPI, Supabase
<b>Databases & Cloud:</b> MongoDB, MySQL, Firebase, PostgreSQL
<b>Tools & DevOps:</b> Git, GitHub, Vercel, Netlify, Render, Razorpay, Docker
<b>Concepts & Workflows:</b> Agentic Workflows, System Design, RAG Architecture, API Design
`,
            type: "info",
            html: true,
          });
          break;
        case "experience":
        case "journey":
          outputLines.push({
            text: `
<span style="color: var(--text-bright); font-weight: bold;">💼 Journey & Milestones</span>

<span style="color: var(--success-color);"><b>VCET College, Vasai | B.Tech in IT</b></span>
<span style="color: var(--text-dim);">2022 - 2026 (Expected) | Vasai, Maharashtra</span>
• Pursuing Bachelor of Technology in Information Technology.
• Deployed production-ready AI systems, RAG architectures, and full-stack web projects.
• Maintained CGPA: 8.02 / 10.0.

<span style="color: var(--success-color);"><b>VMPS Project Showcase | National Winner</b></span>
<span style="color: var(--text-dim);">Jan 2025 | National Level competition</span>
• Won First Place at the project showcase, presenting a fully functional sports turf booking SaaS with atomic slot locking, payment integration, and owner workflows.

<span style="color: var(--success-color);"><b>Hackathon Competitor | Builder & Developer</b></span>
<span style="color: var(--text-dim);">2023 - Present | Various locations</span>
• Competed in 6 hackathons, building end-to-end usable systems across blockchain, AI automation, and web application layers. Focused on shipping functional products rather than just mockups.

<span style="color: var(--success-color);"><b>Home & Early Schooling | Palghar</b></span>
<span style="color: var(--text-dim);">2004 - 2022 | Palghar, Maharashtra</span>
• Raised and schooled in Palghar. Developed a strong passion for tech, hardware, and coding.
`,
            type: "info",
            html: true,
          });
          break;
        case "education":
          outputLines.push({
            text: `
<span style="color: var(--text-bright); font-weight: bold;">🎓 Education Background</span>
┌──────────────────────────────────────────────────────────────────┐
│ Bachelor of Technology (B.Tech) in Information Technology         │
└──────────────────────────────────────────────────────────────────┘
🏛️ <b>Institution:</b> Vidyavardhini's College of Engineering & Technology (VCET)
📅 <b>Duration:</b>    2022 - 2026 (Expected)
📍 <b>Location:</b>    Vasai, Maharashtra, India
⚡ <b>GPA:</b>         8.02 / 10.0
`,
            type: "info",
            html: true,
          });
          break;
        case "contact":
          outputLines.push({
            text: `
<span style="color: var(--text-bright); font-weight: bold;">📫 Contact Details</span>
┌──────────────────────────────────────────────────────────────────┐
│ Let's connect and build the future of AI together!               │
└──────────────────────────────────────────────────────────────────┘
✉ <b>Email:</b>    <a href="mailto:sarasbari07@gmail.com" style="color: var(--success-color);">sarasbari07@gmail.com</a>
📞 <b>Phone:</b>    +91 96992 05609
🌐 <b>LinkedIn:</b> <a href="https://www.linkedin.com/in/saras-bari-5b54b3278" target="_blank" style="color: var(--success-color);">linkedin.com/in/saras-bari-5b54b3278</a>
⚡ <b>GitHub:</b>   <a href="https://github.com/Sarasbari" target="_blank" style="color: var(--success-color);">github.com/Sarasbari</a>
`,
            type: "info",
            html: true,
          });
          break;
        case "projects":
          setActiveModal("projects");
          outputLines.push({ text: "Opening project showcase modal...", type: "success" });
          break;
        case "skills-visual":
          setActiveModal("skills");
          outputLines.push({ text: "Opening skills progress modal...", type: "success" });
          break;
        case "game":
          isSnakeGame = true;
          outputLines.push({ text: "Launching Snake game...", type: "success" });
          break;
        case "matrix":
          isMatrix = true;
          outputLines.push({ text: "Starting Matrix effect...", type: "success" });
          break;
        case "stop-matrix":
          isMatrix = false;
          outputLines.push({ text: "Matrix effect stopped.", type: "info" });
          break;
        case "weather":
          const city = args.join(" ") || "Vasai";
          const temp = Math.floor(Math.random() * 8) + 27; // 27-34
          const humidity = Math.floor(Math.random() * 15) + 65; // 65-80
          const condition = ["Partly Cloudy", "Sunny", "Rainy", "Thunderstorm"][
            Math.floor(Math.random() * 4)
          ];
          outputLines.push({
            text: `
<div class="weather-container">
  <div class="weather-header">
    <strong>⛅ Weather Report for ${city.toUpperCase()}</strong>
  </div>
  <div class="weather-body">
    <div class="weather-main">
      <span style="font-size: 1.6rem; color: var(--text-bright); font-weight: bold;">${temp}°C</span>
      <span>${condition}</span>
    </div>
    <div class="weather-details" style="font-size: 0.95rem;">
      <span>📍 Location: ${city}</span>
      <span>💧 Humidity: ${humidity}%</span>
      <span>💨 Wind Speed: ${Math.floor(Math.random() * 12) + 6} km/h</span>
    </div>
  </div>
</div>
`,
            type: "info",
            html: true,
          });
          break;
        case "calc":
          const expr = args.join("");
          if (!expr) {
            outputLines.push({ text: "Usage: calc [expression] (e.g. calc 2+2)", type: "error" });
          } else {
            try {
              const clean = expr.replace(/[^0-9+\-*/().\s]/g, "");
              // eslint-disable-next-line no-new-func
              const result = new Function(`return ${clean}`)();
              outputLines.push({
                text: `
<div class="calculation">
  <div class="calculation-expression">Expression: ${expr}</div>
  <div class="calculation-result">Result: ${result}</div>
</div>
`,
                type: "info",
                html: true,
              });
            } catch {
              outputLines.push({ text: "Error: Invalid mathematical expression", type: "error" });
            }
          }
          break;
        case "linkedin-cover":
          outputLines.push({
            text: `
<div class="linkedin-cover-container" style="width: 100%; max-width: 600px; height: 180px; background-color: #1e1e2e; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); padding: 15px; font-family: monospace; color: #f8f8f2; margin: 15px auto; box-shadow: 0 10px 30px rgba(0,0,0,0.4);">
  <div style="display: flex; gap: 6px; margin-bottom: 10px;">
    <div style="width: 10px; height: 10px; border-radius: 50%; background-color: #ff5f56;"></div>
    <div style="width: 10px; height: 10px; border-radius: 50%; background-color: #ffbd2e;"></div>
    <div style="width: 10px; height: 10px; border-radius: 50%; background-color: #27c93f;"></div>
    <span style="color: #6272a4; font-size: 10px; margin-left: 10px;">saras@bari: ~/cover</span>
  </div>
  <div style="color: #ff79c6; font-weight: bold; font-size: 18px; margin-bottom: 5px;">SARAS GAUTAM BARI</div>
  <div style="color: #50fa7b; font-size: 12px; margin-bottom: 10px;">&gt; AI Engineer &amp; Full-Stack Developer</div>
  <div style="color: #8be9fd; font-size: 10px; line-height: 1.4;">
    • Production AI &amp; RAG pipelines<br/>
    • Next.js, FastAPI, pgvector, LlamaIndex<br/>
    • National VMPS Project Winner 2025
  </div>
</div>
`,
            type: "info",
            html: true,
          });
          break;
        case "pdf":
          if (typeof window !== "undefined") {
            window.open(profile.resume, "_blank");
          }
          outputLines.push({ text: "Opening resume PDF in a new tab...", type: "success" });
          break;
        default:
          outputLines.push({
            text: `Command not found: ${cmd}. Type 'help' for available commands.`,
            type: "error",
          });
      }

      return {
        ...prev,
        [paneId]: {
          ...pane,
          lines: [...nextLines, ...outputLines],
          currentInput: "",
          history: nextHistory,
          historyIndex: -1,
          isMatrix,
          isSnakeGame,
        }
      };
    });
  };

  const handleTabComplete = (paneId: string, currentInput: string) => {
    const text = currentInput.trim().toLowerCase();
    if (!text) return;

    const matches = commandList.filter((cmd) => cmd.startsWith(text));
    if (matches.length === 1) {
      setPanes((prev) => ({
        ...prev,
        [paneId]: {
          ...prev[paneId],
          currentInput: matches[0],
        },
      }));
    } else if (matches.length > 1) {
      setPanes((prev) => {
        const pane = prev[paneId];
        return {
          ...prev,
          [paneId]: {
            ...pane,
            lines: [
              ...pane.lines,
              { text: `➜ ${pane.currentInput}`, type: "command" },
              { text: matches.join("      "), type: "info" },
            ],
          }
        };
      });
    }
  };

  const handleExitGame = (paneId: string) => {
    setPanes((prev) => ({
      ...prev,
      [paneId]: {
        ...prev[paneId],
        isSnakeGame: false,
        lines: [...prev[paneId].lines, { text: "Snake game exited.", type: "info" }],
      },
    }));
  };

  const handleExitMatrix = (paneId: string) => {
    setPanes((prev) => ({
      ...prev,
      [paneId]: {
        ...prev[paneId],
        isMatrix: false,
        lines: [...prev[paneId].lines, { text: "Matrix digital rain stopped.", type: "info" }],
      },
    }));
  };

  const handleUpdateSnakeScore = (paneId: string, score: number) => {
    setPanes((prev) => ({
      ...prev,
      [paneId]: {
        ...prev[paneId],
        snakeScore: score,
      },
    }));
  };

  const handleUpdateInputText = (paneId: string, text: string) => {
    setPanes((prev) => ({
      ...prev,
      [paneId]: {
        ...prev[paneId],
        currentInput: text,
      },
    }));
  };

  const handleRightClick = (e: React.MouseEvent, paneId: string) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      targetPaneId: paneId,
    });
  };

  return (
    <div className={`terminal-body-wrapper theme-${currentTheme}`}>
      <div className="terminal" style={{ display: "flex", flexDirection: "column" }}>
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="terminal-buttons">
            <Link href="/" className="close" title="Go Home" style={{ cursor: "pointer" }}></Link>
            <span className="minimize"></span>
            <span className="maximize"></span>
          </div>
          <div className="terminal-title">saras@bari: ~/resume</div>
          <div className="terminal-controls">
            <div className="theme-selector" onClick={() => setActiveModal("theme")}>
              <i className="fa-solid fa-palette" id="theme-toggle"></i>
            </div>
          </div>
        </div>

        {/* Panes Area */}
        <div style={{ flex: 1, overflow: "hidden", height: "calc(100% - 37px)" }}>
          <PaneRenderer
            node={layout}
            activePaneId={activePaneId}
            setActivePaneId={setActivePaneId}
            panes={panes}
            handleCommandSubmit={handleCommandSubmit}
            handleTabComplete={handleTabComplete}
            onExitGame={handleExitGame}
            onExitMatrix={handleExitMatrix}
            onUpdateSnakeScore={handleUpdateSnakeScore}
            onUpdateInputText={handleUpdateInputText}
            onRightClick={handleRightClick}
          />
        </div>

        {/* Footer shortcuts help */}
        <div className="terminal-footer">
          <Link href="/" className="resume-link">
            <i className="fas fa-file-alt"></i> View Visual Resume
          </Link>
          <span style={{ fontSize: "11px", color: "var(--text-dim)", fontFamily: "monospace" }}>
            Right-click inside pane to split horizontal/vertical.
          </span>
        </div>

        {/* Custom Context Menu */}
        {contextMenu.visible && (
          <div
            className="context-menu active"
            style={{
              top: contextMenu.y,
              left: contextMenu.x,
              display: "block",
              position: "fixed",
            }}
          >
            <div className="menu-item" onClick={() => handleSplit("horizontal")}>
              <i className="fas fa-columns"></i> Split Horizontally
            </div>
            <div className="menu-item" onClick={() => handleSplit("vertical")}>
              <i className="fas fa-server"></i> Split Vertically
            </div>
            <div className="menu-item" onClick={handleClosePane}>
              <i className="fas fa-times"></i> Close Split
            </div>
          </div>
        )}
      </div>

      {/* Theme Selection Modal */}
      {activeModal === "theme" && (
        <div className="modal active">
          <div className="modal-content">
            <span className="close-button" onClick={() => setActiveModal("none")}>
              &times;
            </span>
            <h2>Select Theme</h2>
            <div className="theme-options">
              <div
                className={`theme-option ${currentTheme === "default" ? "active" : ""}`}
                onClick={() => {
                  setCurrentTheme("default");
                  setActiveModal("none");
                }}
              >
                <div className="theme-preview default-theme"></div>
                <span>Default</span>
              </div>
              <div
                className={`theme-option ${currentTheme === "dracula" ? "active" : ""}`}
                onClick={() => {
                  setCurrentTheme("dracula");
                  setActiveModal("none");
                }}
              >
                <div className="theme-preview dracula-theme"></div>
                <span>Dracula</span>
              </div>
              <div
                className={`theme-option ${currentTheme === "solarized" ? "active" : ""}`}
                onClick={() => {
                  setCurrentTheme("solarized");
                  setActiveModal("none");
                }}
              >
                <div className="theme-preview solarized-theme"></div>
                <span>Solarized</span>
              </div>
              <div
                className={`theme-option ${currentTheme === "nord" ? "active" : ""}`}
                onClick={() => {
                  setCurrentTheme("nord");
                  setActiveModal("none");
                }}
              >
                <div className="theme-preview nord-theme"></div>
                <span>Nord</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Projects Showcase Modal */}
      {activeModal === "projects" && (
        <div className="modal active">
          <div className="modal-content projects-modal-content">
            <span className="close-button" onClick={() => setActiveModal("none")}>
              &times;
            </span>
            <h2>Saras Bari | Projects</h2>
            <div className="projects-container">
              {projects.map((project) => (
                <div className="project-card" key={project.title}>
                  <div className="project-details">
                    <h3 className="project-title" style={{ fontSize: "1.3rem" }}>
                      🚀 {project.title}
                    </h3>
                    <p
                      className="project-description"
                      style={{ fontSize: "0.95rem", lineHeight: "1.4" }}
                    >
                      {project.description}
                    </p>
                    <div className="project-tech">
                      {project.stack.map((tech) => (
                        <span className="tech-tag" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="project-links">
                      {project.live && (
                        <a
                          href={project.live}
                          className="project-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fas fa-external-link-alt"></i> Live Demo
                        </a>
                      )}
                      <a
                        href={project.github}
                        className="project-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-github"></i> Repository
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Skills Modal */}
      {activeModal === "skills" && (
        <div className="modal active">
          <div className="modal-content skills-modal-content">
            <span className="close-button" onClick={() => setActiveModal("none")}>
              &times;
            </span>
            <h2>Saras Bari | Skills Progress</h2>
            <div className="skills-container">
              {skills.map((category) => (
                <div className="skill-category" key={category.category}>
                  <h3 className="skill-category-title">
                    <i className={`${category.icon} mr-2`}></i> {category.category}
                  </h3>
                  <div className="skill-bars">
                    {category.items.map((item, idx) => {
                      // Generate matching mock levels for visual completeness
                      const level = 95 - (idx * 5) - (idx % 2 === 0 ? 3 : 0);
                      const finalLevel = Math.max(65, level);
                      return (
                        <div className="skill-item" key={item.name}>
                          <div className="skill-info">
                            <span className="skill-name">
                              <i className={item.icon} style={{ marginRight: "5px" }}></i>{" "}
                              {item.name}
                            </span>
                            <span className="skill-level">{finalLevel}%</span>
                          </div>
                          <div className="skill-progress">
                            <div
                              className="skill-progress-bar"
                              style={{ width: `${finalLevel}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
