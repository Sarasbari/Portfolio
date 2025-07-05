// Particle system for hero section background
// Creates animated particles with mouse interaction and smooth movement

class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    this.particleCount = 50;
    this.connectionDistance = 150;
    this.mouseRadius = 100;

    this.init();
    this.bindEvents();
    this.animate();
  }

  init() {
    this.resizeCanvas();
    this.createParticles();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];

    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        color: this.getRandomColor(),
      });
    }
  }

  getRandomColor() {
    const colors = [
      "rgba(0, 212, 255, ", // Primary blue
      "rgba(124, 58, 237, ", // Secondary purple
      "rgba(16, 185, 129, ", // Accent green
      "rgba(226, 232, 240, ", // Light gray
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  }

  bindEvents() {
    // Mouse move event
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    // Window resize event
    window.addEventListener("resize", () => {
      this.resizeCanvas();
      this.createParticles();
    });

    // Mouse enter/leave events
    this.canvas.addEventListener("mouseenter", () => {
      this.mouseActive = true;
    });

    this.canvas.addEventListener("mouseleave", () => {
      this.mouseActive = false;
    });
  }

  updateParticles() {
    this.particles.forEach((particle) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Mouse interaction
      if (this.mouseActive) {
        const dx = this.mouse.x - particle.x;
        const dy = this.mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.mouseRadius) {
          const force = (this.mouseRadius - distance) / this.mouseRadius;
          const angle = Math.atan2(dy, dx);

          particle.vx += Math.cos(angle) * force * 0.01;
          particle.vy += Math.sin(angle) * force * 0.01;
        }
      }

      // Boundary collision
      if (particle.x < 0 || particle.x > this.canvas.width) {
        particle.vx *= -1;
      }
      if (particle.y < 0 || particle.y > this.canvas.height) {
        particle.vy *= -1;
      }

      // Keep particles within bounds
      particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));

      // Add some randomness to prevent clustering
      particle.vx += (Math.random() - 0.5) * 0.002;
      particle.vy += (Math.random() - 0.5) * 0.002;

      // Limit velocity
      const maxVelocity = 2;
      particle.vx = Math.max(-maxVelocity, Math.min(maxVelocity, particle.vx));
      particle.vy = Math.max(-maxVelocity, Math.min(maxVelocity, particle.vy));

      // Apply friction
      particle.vx *= 0.99;
      particle.vy *= 0.99;
    });
  }

  drawParticles() {
    this.particles.forEach((particle) => {
      this.ctx.save();
      this.ctx.globalAlpha = particle.opacity;

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color + particle.opacity + ")";
      this.ctx.fill();

      // Add glow effect
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = particle.color + "0.5)";
      this.ctx.fill();

      this.ctx.restore();
    });
  }

  drawConnections() {
    this.ctx.save();

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const particleA = this.particles[i];
        const particleB = this.particles[j];

        const dx = particleA.x - particleB.x;
        const dy = particleA.y - particleB.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.connectionDistance) {
          const opacity = 1 - distance / this.connectionDistance;

          this.ctx.globalAlpha = opacity * 0.3;
          this.ctx.beginPath();
          this.ctx.moveTo(particleA.x, particleA.y);
          this.ctx.lineTo(particleB.x, particleB.y);
          this.ctx.strokeStyle = "rgba(0, 212, 255, " + opacity + ")";
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }

    this.ctx.restore();
  }

  drawMouseConnections() {
    if (!this.mouseActive) return;

    this.ctx.save();

    this.particles.forEach((particle) => {
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.mouseRadius) {
        const opacity = 1 - distance / this.mouseRadius;

        this.ctx.globalAlpha = opacity * 0.6;
        this.ctx.beginPath();
        this.ctx.moveTo(particle.x, particle.y);
        this.ctx.lineTo(this.mouse.x, this.mouse.y);
        this.ctx.strokeStyle = "rgba(124, 58, 237, " + opacity + ")";
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
      }
    });

    this.ctx.restore();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.updateParticles();
    this.drawConnections();
    this.drawParticles();
    this.drawMouseConnections();

    requestAnimationFrame(() => this.animate());
  }

  destroy() {
    // Clean up event listeners
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("resize", this.handleResize);

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

// Initialize particle system when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("particles-canvas");

  if (canvas) {
    // Initialize particle system
    const particleSystem = new ParticleSystem(canvas);

    // Handle page visibility changes
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        // Page is hidden, pause animations
        canvas.style.display = "none";
      } else {
        // Page is visible, resume animations
        canvas.style.display = "block";
      }
    });

    // Performance optimization for mobile devices
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      // Reduce particle count for mobile devices
      particleSystem.particleCount = 25;
      particleSystem.connectionDistance = 100;
      particleSystem.createParticles();
    }

    // Handle reduced motion preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      // Disable animations for users who prefer reduced motion
      canvas.style.display = "none";
    }
  }
});

// Additional particle effects for other pages
class FloatingShapes {
  constructor() {
    this.shapes = document.querySelectorAll(
      ".floating-elements .float-element"
    );
    this.init();
  }

  init() {
    this.shapes.forEach((shape, index) => {
      // Set random initial positions
      shape.style.left = Math.random() * 100 + "%";
      shape.style.top = Math.random() * 100 + "%";

      // Set random animation delays
      shape.style.animationDelay = index * 0.5 + "s";

      // Add random movement
      this.animateShape(shape);
    });
  }

  animateShape(shape) {
    const moveShape = () => {
      const currentLeft = parseFloat(shape.style.left) || 0;
      const currentTop = parseFloat(shape.style.top) || 0;

      const newLeft = currentLeft + (Math.random() - 0.5) * 2;
      const newTop = currentTop + (Math.random() - 0.5) * 2;

      // Keep shapes within bounds
      const boundedLeft = Math.max(0, Math.min(100, newLeft));
      const boundedTop = Math.max(0, Math.min(100, newTop));

      shape.style.left = boundedLeft + "%";
      shape.style.top = boundedTop + "%";

      // Continue animation
      setTimeout(moveShape, 2000 + Math.random() * 3000);
    };

    moveShape();
  }
}

// Initialize floating shapes on contact page
if (window.location.pathname.includes("contact")) {
  document.addEventListener("DOMContentLoaded", function () {
    new FloatingShapes();
  });
}

// Export for potential use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = { ParticleSystem, FloatingShapes };
}
