// Main JavaScript file for portfolio website
// Handles all interactive functionality, animations, and user interactions

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initNavigation();
  initScrollEffects();
  initAnimations();
  initCarousel();
  initContactForm();
  initProjectModals();
  initSkillBars();
  initStatCounters();
  initMobileMenu();
  initPageTransitions();
});

// Navigation functionality
function initNavigation() {
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav-link");

  // Add scroll effect to navigation
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      nav.style.background = "rgba(10, 10, 10, 0.98)";
      nav.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.3)";
    } else {
      nav.style.background = "rgba(10, 10, 10, 0.95)";
      nav.style.boxShadow = "none";
    }
  });

  // Highlight active nav link based on current page
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (
      linkPage === currentPage ||
      (currentPage === "" && linkPage === "index.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      navToggle.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        navToggle.classList.remove("active");
      });
    });
  }
}

// Scroll effects and animations
function initScrollEffects() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        // Trigger specific animations based on element class
        if (entry.target.classList.contains("feature-card")) {
          entry.target.style.animation = "fadeInUp 0.6s ease-out forwards";
        }
        if (entry.target.classList.contains("project-card")) {
          entry.target.style.animation = "fadeInUp 0.8s ease-out forwards";
        }
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  const animatedElements = document.querySelectorAll(
    ".feature-card, .project-card, .timeline-item, .education-card, .course-item"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// Initialize various animations
function initAnimations() {
  // Parallax effect for hero section
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    window.addEventListener("scroll", function () {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      const shapes = document.querySelectorAll(".shape");
      shapes.forEach((shape, index) => {
        const speed = 0.5 + index * 0.1;
        shape.style.transform = `translateY(${rate * speed}px)`;
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Education carousel functionality
function initCarousel() {
  const carousel = document.getElementById("educationTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const indicators = document.querySelectorAll(".indicator");
  const cards = document.querySelectorAll(".education-card");

  if (!carousel) return;

  let currentIndex = 0;
  const cardWidth = 350 + 32; // card width + gap
  const maxIndex = Math.max(
    0,
    cards.length - Math.floor(carousel.parentElement.offsetWidth / cardWidth)
  );

  function updateCarousel() {
    const translateX = -currentIndex * cardWidth;
    carousel.style.transform = `translateX(${translateX}px)`;

    // Update indicators
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = Math.min(currentIndex + 1, maxIndex);
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = Math.max(currentIndex - 1, 0);
    updateCarousel();
  }

  // Event listeners
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", function () {
      currentIndex = Math.min(index, maxIndex);
      updateCarousel();
    });
  });

  // Auto-play carousel
  let autoplayInterval = setInterval(function () {
    if (currentIndex >= maxIndex) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    updateCarousel();
  }, 5000);

  // Pause autoplay on hover
  carousel.addEventListener("mouseenter", function () {
    clearInterval(autoplayInterval);
  });

  carousel.addEventListener("mouseleave", function () {
    autoplayInterval = setInterval(function () {
      if (currentIndex >= maxIndex) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      updateCarousel();
    }, 5000);
  });

  // Handle card flip animations
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      this.classList.toggle("flipped");
    });
  });

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectSelect = document.getElementById("subject");
  const messageTextarea = document.getElementById("message");

  // Form validation
  function validateForm() {
    let isValid = true;

    // Clear previous errors
    document.querySelectorAll(".form-error").forEach((error) => {
      error.textContent = "";
    });

    // Name validation
    if (nameInput.value.trim().length < 2) {
      document.getElementById("nameError").textContent =
        "Name must be at least 2 characters long";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      document.getElementById("emailError").textContent =
        "Please enter a valid email address";
      isValid = false;
    }

    // Subject validation
    if (!subjectSelect.value) {
      document.getElementById("subjectError").textContent =
        "Please select a subject";
      isValid = false;
    }

    // Message validation
    if (messageTextarea.value.trim().length < 10) {
      document.getElementById("messageError").textContent =
        "Message must be at least 10 characters long";
      isValid = false;
    }

    return isValid;
  }

  // Real-time validation
  [nameInput, emailInput, subjectSelect, messageTextarea].forEach((input) => {
    if (input) {
      input.addEventListener("blur", validateForm);
      input.addEventListener("input", function () {
        // Clear error when user starts typing
        const errorElement = document.getElementById(this.id + "Error");
        if (errorElement) {
          errorElement.textContent = "";
        }
      });
    }
  });

  // Form submission
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Animate submit button
    const submitBtn = contactForm.querySelector(".form-submit");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(function () {
      // Reset form
      contactForm.reset();

      // Show success modal
      showSuccessModal();

      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Success modal functionality
function showSuccessModal() {
  const modal = document.getElementById("successModal");
  if (modal) {
    modal.style.display = "block";
    setTimeout(() => {
      modal.style.opacity = "1";
    }, 10);
  }
}

function closeSuccessModal() {
  const modal = document.getElementById("successModal");
  if (modal) {
    modal.style.opacity = "0";
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  }
}

// Project modal functionality
function initProjectModals() {
  const projectCards = document.querySelectorAll(".project-card");
  const modal = document.getElementById("projectModal");
  const modalClose = document.querySelector(".modal-close");

  if (!modal) return;

  const projectData = {
    ecommerce: {
      title: "E-commerce Platform",
      description:
        "A comprehensive e-commerce solution built with modern web technologies. Features include user authentication, product catalog with search and filtering, shopping cart functionality, secure payment processing with Stripe integration, order management system, and responsive design. The platform includes both customer-facing storefront and admin dashboard for inventory management.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "JWT", "Express.js"],
      liveLink: "#",
      githubLink: "#",
    },
    dashboard: {
      title: "Analytics Dashboard",
      description:
        "Interactive data visualization dashboard with real-time updates and beautiful charts. Built with Vue.js and D3.js, featuring dynamic charts, real-time data updates, customizable widgets, export functionality, and responsive design. Includes user authentication and role-based access control.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      tech: [
        "Vue.js",
        "D3.js",
        "Chart.js",
        "Python",
        "PostgreSQL",
        "WebSocket",
      ],
      liveLink: "#",
      githubLink: "#",
    },
    portfolio: {
      title: "Portfolio Website",
      description:
        "A creative portfolio website showcasing 3D animations and interactive elements. Features smooth page transitions, particle effects, scroll-triggered animations, and responsive design. Built with vanilla JavaScript and modern CSS techniques.",
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
      tech: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Three.js",
        "GSAP",
        "Intersection Observer",
      ],
      liveLink: "#",
      githubLink: "#",
    },
    mobile: {
      title: "Task Management App",
      description:
        "A progressive web application for task management with offline capabilities. Features include drag-and-drop functionality, real-time collaboration, push notifications, offline support, and cross-platform compatibility.",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      tech: [
        "React",
        "PWA",
        "Firebase",
        "Socket.io",
        "Service Worker",
        "IndexedDB",
      ],
      liveLink: "#",
      githubLink: "#",
    },
    ai: {
      title: "AI Content Generator",
      description:
        "An AI-powered content generation tool utilizing natural language processing. Features include text generation, content optimization, multiple output formats, and integration with OpenAI API for intelligent content creation.",
      image:
        "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&h=400&fit=crop",
      tech: ["Python", "Flask", "OpenAI", "TensorFlow", "NLP", "REST API"],
      liveLink: "#",
      githubLink: "#",
    },
    game: {
      title: "Interactive Web Game",
      description:
        "A multiplayer web-based game with real-time updates and leaderboards. Features include real-time multiplayer gameplay, leaderboard system, smooth animations using HTML5 Canvas, and WebSocket communication for instant updates.",
      image:
        "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&h=400&fit=crop",
      tech: [
        "HTML5 Canvas",
        "WebSocket",
        "Express",
        "Redis",
        "JavaScript",
        "Node.js",
      ],
      liveLink: "#",
      githubLink: "#",
    },
  };

  // Open modal when project card is clicked
  projectCards.forEach((card) => {
    card.addEventListener("click", function () {
      const projectId = this.getAttribute("data-project");
      const project = projectData[projectId];

      if (project) {
        document.getElementById("modalImage").src = project.image;
        document.getElementById("modalTitle").textContent = project.title;
        document.getElementById("modalDescription").textContent =
          project.description;
        document.getElementById("modalLiveLink").href = project.liveLink;
        document.getElementById("modalGithubLink").href = project.githubLink;

        // Update tech tags
        const modalTech = document.getElementById("modalTech");
        modalTech.innerHTML = "";
        project.tech.forEach((tech) => {
          const tag = document.createElement("span");
          tag.className = "tech-tag";
          tag.textContent = tech;
          modalTech.appendChild(tag);
        });

        modal.style.display = "block";
        setTimeout(() => {
          modal.style.opacity = "1";
        }, 10);
      }
    });
  });

  // Close modal functionality
  function closeModal() {
    modal.style.opacity = "0";
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  }

  modalClose.addEventListener("click", closeModal);

  // Close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal with escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });
}

// Skill bars animation
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-fill");

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillBar = entry.target;
          const width = skillBar.getAttribute("data-width");

          setTimeout(() => {
            skillBar.style.width = width + "%";
          }, 200);

          observer.unobserve(skillBar);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => {
    observer.observe(bar);
  });
}

// Animated counters for statistics
function initStatCounters() {
  const statNumbers = document.querySelectorAll(".stat-number");

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const target = parseInt(element.getAttribute("data-count"));

          animateCounter(element, target);
          observer.unobserve(element);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((number) => {
    observer.observe(number);
  });
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 40);
}

// Page transitions
function initPageTransitions() {
  // Add fade-in effect to body
  document.body.style.opacity = "0";

  window.addEventListener("load", function () {
    document.body.style.transition = "opacity 0.5s ease-in-out";
    document.body.style.opacity = "1";
  });

  // Handle page navigation with smooth transitions
  const links = document.querySelectorAll('a[href$=".html"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if it's the current page
      if (href === window.location.pathname.split("/").pop()) {
        e.preventDefault();
        return;
      }

      // Add transition effect
      e.preventDefault();
      document.body.style.opacity = "0";

      setTimeout(() => {
        window.location.href = href;
      }, 250);
    });
  });
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Handle window resize events
window.addEventListener(
  "resize",
  debounce(function () {
    // Recalculate carousel dimensions
    const carousel = document.getElementById("educationTrack");
    if (carousel) {
      initCarousel();
    }
  }, 250)
);

// Performance optimization
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    // Page is hidden, pause non-essential animations
    document.querySelectorAll(".shape").forEach((shape) => {
      shape.style.animationPlayState = "paused";
    });
  } else {
    // Page is visible, resume animations
    document.querySelectorAll(".shape").forEach((shape) => {
      shape.style.animationPlayState = "running";
    });
  }
});
