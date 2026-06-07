"use client";

import React, { useEffect } from "react";

export default function Journey() {
  // Leaflet map initialization
  useEffect(() => {
    let mapInstance: any = null;
    let checkInterval: any = null;

    const initMap = () => {
      const L = (window as any).L;
      if (!L) return false;

      const mapContainer = document.getElementById("journey-map");
      if (!mapContainer || (mapContainer as any)._leaflet_id) return true; // Already initialized

      const initialView = { center: [19.53, 72.85], zoom: 9 };
      mapInstance = L.map("journey-map", {
        center: initialView.center,
        zoom: initialView.zoom,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      L.tileLayer("https://watercolormaps.collection.cooperhewitt.org/tile/watercolor/{z}/{x}/{y}.jpg", {
        maxZoom: 16,
        attribution: "© Stamen Design, © OpenStreetMap contributors",
      }).addTo(mapInstance);

      // Add custom home button control
      L.Control.Home = L.Control.extend({
        onAdd: function (map: any) {
          const container = L.DomUtil.create("div", "leaflet-bar leaflet-control leaflet-control-home");
          const link = L.DomUtil.create("a", "", container);
          link.href = "#";
          link.title = "Reset map view";
          link.innerHTML = '<i class="fas fa-home"></i>';

          L.DomEvent.on(link, "click", function (e: any) {
            e.preventDefault();
            map.setView(initialView.center, initialView.zoom);
          });

          return container;
        },
      });

      new L.Control.Home({ position: "topright" }).addTo(mapInstance);

      // Locations data representing Saras's milestones
      const locations = [
        {
          coords: [19.6967, 72.7655],
          country: "Palghar",
          companies: [
            {
              city: "Palghar, Maharashtra",
              company: "Home & Early Schooling",
              period: "2004 - 2022",
              role: "Palghar Resident",
            },
          ],
        },
        {
          coords: [19.3807, 72.8256],
          country: "Vasai",
          companies: [
            {
              city: "Vasai, Maharashtra",
              company: "VCET College (B.Tech IT)",
              period: "2022 - 2026",
              role: "AI & Full-Stack Engineering Student",
            },
            {
              city: "Vasai, Maharashtra",
              company: "VMPS Showcase Winner",
              period: "Jan 2025",
              role: "National Project Winner",
            },
          ],
        },
        {
          coords: [19.0760, 72.8777],
          country: "Mumbai",
          companies: [
            {
              city: "Mumbai Region",
              company: "Hackathons & Builds",
              period: "2023 - Present",
              role: "6 Hackathons Participated",
            },
          ],
        },
      ];

      const markersMap: Record<string, any> = {};

      locations.forEach((loc) => {
        const isCurrent = loc.country === "Vasai";
        const markerIcon = L.divIcon({
          className: isCurrent ? "neo-marker neo-marker-current" : "neo-marker",
          html: `
            <div class="neo-marker-label ${isCurrent ? "neo-marker-label-current" : ""}">${loc.country}</div>
            <div class="neo-marker-pin ${isCurrent ? "neo-marker-pin-current" : ""}"></div>
          `,
          iconSize: isCurrent ? [35, 35] : [30, 30],
          iconAnchor: isCurrent ? [17.5, 50] : [15, 45],
          popupAnchor: [0, isCurrent ? -50 : -45],
        });

        let popupContent = `<div class="map-popup"><div class="map-popup-country">${loc.country}</div>`;
        loc.companies.forEach((comp, idx) => {
          if (idx > 0) popupContent += `<div class="map-popup-divider"></div>`;
          popupContent += `
            <div class="map-popup-company">
              <strong>${comp.company}</strong>
              <span>${comp.role}</span>
              <small>${comp.city}</small>
              <small>${comp.period}</small>
            </div>
          `;
        });
        popupContent += `</div>`;

        const marker = L.marker(loc.coords, { icon: markerIcon }).addTo(mapInstance);
        marker.bindPopup(popupContent);
        markersMap[loc.country] = marker;
      });

      // Bind click handlers to timeline items
      const bindTimelineItems = () => {
        document.querySelectorAll(".timeline-item-flat").forEach((item) => {
          const clickHandler = () => {
            const country = item.getAttribute("data-country");
            if (country) {
              const marker = markersMap[country];
              if (marker) {
                mapInstance.setView(marker.getLatLng(), 11, {
                  animate: true,
                  duration: 1,
                });
                setTimeout(() => {
                  marker.openPopup();
                }, 500);
              }
            }
          };
          item.addEventListener("click", clickHandler);
          (item as any)._clickHandler = clickHandler;
        });
      };

      bindTimelineItems();
      return true;
    };

    if (!initMap()) {
      checkInterval = setInterval(() => {
        if (initMap()) {
          clearInterval(checkInterval);
        }
      }, 100);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      document.querySelectorAll(".timeline-item-flat").forEach((item) => {
        if ((item as any)._clickHandler) {
          item.removeEventListener("click", (item as any)._clickHandler);
        }
      });
    };
  }, []);

  // Book flip page scroll effect
  useEffect(() => {
    const journeyTimeline = document.querySelector(".journey-timeline") as HTMLElement;
    const journeyTimelineBack = document.querySelector(".journey-timeline-back") as HTMLElement;

    if (!journeyTimeline || !journeyTimelineBack) return;

    const handleScroll = () => {
      if (window.innerWidth < 769) {
        // Reset styles for mobile
        journeyTimeline.style.transform = "";
        journeyTimelineBack.style.transform = "";
        journeyTimeline.style.zIndex = "";
        journeyTimelineBack.style.zIndex = "";
        journeyTimeline.style.overflowY = "";
        return;
      }

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const rect = journeyTimeline.getBoundingClientRect();
      const elementTop = rect.top + scrollY;

      // Start page turn when element is halfway up the screen
      const triggerPoint = scrollY + windowHeight * 0.5;
      const pageRange = 200; // scroll distance for animation

      if (triggerPoint >= elementTop) {
        const progress = Math.min(
          1,
          Math.max(0, (scrollY - (elementTop - windowHeight * 0.5)) / pageRange)
        );
        const rotateY = 180 - 180 * progress;

        journeyTimeline.style.transform = `rotateY(${rotateY}deg)`;
        journeyTimelineBack.style.transform = `rotateY(${rotateY}deg)`;

        if (rotateY > 95) {
          // Closed map is visible
          journeyTimeline.style.zIndex = "1";
          journeyTimelineBack.style.zIndex = "100";
        } else {
          // Opened timeline is visible
          journeyTimeline.style.zIndex = "100";
          journeyTimelineBack.style.zIndex = "1";
        }

        if (progress >= 1) {
          journeyTimeline.style.overflowY = "auto";
        } else {
          journeyTimeline.style.overflowY = "hidden";
        }
      } else {
        journeyTimeline.style.transform = "rotateY(180deg)";
        journeyTimelineBack.style.transform = "rotateY(180deg)";
        journeyTimeline.style.zIndex = "1";
        journeyTimelineBack.style.zIndex = "100";
        journeyTimeline.style.overflowY = "hidden";
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="section journey-section" id="experience">
      <h2 className="section-title-center">My Journey</h2>
      <div className="journey-container">
        {/* Opened book timeline */}
        <div className="journey-timeline">
          <h3 className="timeline-header">Timeline Milestones</h3>
          <div className="timeline-list">
            <div className="timeline-item-flat" id="exp-1" data-country="Vasai">
              <div className="timeline-dot"></div>
              <div className="timeline-content-flat">
                <h4 className="timeline-title">VCET Vasai • B.Tech in IT</h4>
                <p className="timeline-date">2022 - 2026 (Expected)</p>
                <p className="timeline-description">
                  Pursuing B.Tech in Information Technology. Focusing heavily on production-ready AI systems, RAG architectures, and web application pipelines. CGPA: 8.02 / 10.0.
                </p>
                <p className="timeline-location">
                  <i className="fas fa-map-marker-alt"></i> Vasai, Maharashtra, India
                </p>
              </div>
            </div>
            
            <div className="timeline-item-flat" id="exp-2" data-country="Vasai">
              <div className="timeline-dot"></div>
              <div className="timeline-content-flat">
                <h4 className="timeline-title">VMPS Project Showcase Winner</h4>
                <p className="timeline-date">Jan 2025</p>
                <p className="timeline-description">
                  Won first place at the national-level project showcase, presenting a fully deployed, startup-ready sports turf booking SaaS with atomic slot locking and payment integration.
                </p>
                <p className="timeline-location">
                  <i className="fas fa-map-marker-alt"></i> Vasai, Maharashtra, India
                </p>
              </div>
            </div>

            <div className="timeline-item-flat" id="exp-3" data-country="Mumbai">
              <div className="timeline-dot"></div>
              <div className="timeline-content-flat">
                <h4 className="timeline-title">Hackathon Builder</h4>
                <p className="timeline-date">2023 - Present</p>
                <p className="timeline-description">
                  Participated in 6 hackathons, building end-to-end usable systems across blockchain, AI automation, and web application layers. Focused on shipping functional products rather than just mockups.
                </p>
                <p className="timeline-location">
                  <i className="fas fa-map-marker-alt"></i> Mumbai / Virtual, India
                </p>
              </div>
            </div>

            <div className="timeline-item-flat" id="exp-4" data-country="Palghar">
              <div className="timeline-dot"></div>
              <div className="timeline-content-flat">
                <h4 className="timeline-title">Home & Early Education</h4>
                <p className="timeline-date">Growing Up - 2022</p>
                <p className="timeline-description">
                  Raised and completed early schooling in Palghar. Developed a strong interest in technology and software engineering, leading to university studies in IT.
                </p>
                <p className="timeline-location">
                  <i className="fas fa-map-marker-alt"></i> Palghar, Maharashtra, India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Closed book map graphic */}
        <div className="journey-timeline-back">
          <svg className="treasure-map-svg" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="600" fill="#f4e7d7" />
            <g transform="translate(320, 80)">
              <circle cx="0" cy="0" r="35" fill="none" stroke="#8B4513" stroke-width="2" />
              <circle cx="0" cy="0" r="30" fill="none" stroke="#8B4513" stroke-width="1" />
              <polygon points="0,-30 5,-10 -5,-10" fill="#D2691E" />
              <polygon points="0,30 5,10 -5,10" fill="#8B4513" />
              <polygon points="30,0 10,5 10,-5" fill="#8B4513" />
              <polygon points="-30,0 -10,5 -10,-5" fill="#8B4513" />
              <text x="0" y="-40" text-anchor="middle" font-size="16" font-weight="bold" fill="#8B4513">N</text>
            </g>
            <path d="M 100,500 Q 80,350 150,250 T 250,150"
              stroke="#D2691E" stroke-width="3" fill="none"
              stroke-dasharray="8,8" stroke-linecap="round" />
            <circle cx="100" cy="500" r="8" fill="#8B4513" stroke="#654321" stroke-width="2" />
            <circle cx="150" cy="250" r="8" fill="#8B4513" stroke="#654321" stroke-width="2" />
            <g transform="translate(250, 150)">
              <circle cx="0" cy="0" r="25" fill="#FFD700" opacity="0.3" />
              <line x1="-15" y1="-15" x2="15" y2="15" stroke="#DC143C" stroke-width="4" stroke-linecap="round" />
              <line x1="15" y1="-15" x2="-15" y2="15" stroke="#DC143C" stroke-width="4" stroke-linecap="round" />
            </g>
            <g opacity="0.4">
              <polygon points="250,400 270,350 290,400" fill="#8B4513" />
              <polygon points="280,400 300,360 320,400" fill="#A0522D" />
            </g>
            <g opacity="0.3">
              <path d="M 40,300 Q 50,295 60,300 T 80,300" stroke="#4682B4" stroke-width="2" fill="none" />
              <path d="M 280,520 Q 290,515 300,520 T 320,520" stroke="#4682B4" stroke-width="2" fill="none" />
            </g>
            <rect x="10" y="10" width="380" height="580" fill="none"
              stroke="#8B4513" stroke-width="3" stroke-dasharray="10,5" />
          </svg>
        </div>

        {/* Map panel */}
        <div className="journey-map-container">
          <div id="journey-map"></div>
          <svg className="map-overlay-lines" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#000" stroke-width="2" opacity="0.8" />
              </pattern>
              <pattern id="scratches" width="200" height="200" patternUnits="userSpaceOnUse">
                <line x1="10" y1="20" x2="60" y2="25" stroke="#000" stroke-width="2" opacity="0.7" />
                <line x1="100" y1="50" x2="180" y2="48" stroke="#000" stroke-width="1.5" opacity="0.6" />
                <line x1="30" y1="120" x2="90" y2="115" stroke="#000" stroke-width="2" opacity="0.7" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#scratches)" />
          </svg>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/image/pirat.png" alt="Pirate Map Overlay" className="map-pirate-overlay" width="200" height="200" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
