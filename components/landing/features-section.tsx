"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    number: "01",
    title: "Islamic Shield",
    description: "CleanBrowsing DNS, nftables blocklist, and AppArmor profiles that block haram content at the kernel level. Protection built into your OS.",
    stats: { value: "∞", label: "Haram sites blocked" },
  },
  {
    number: "02",
    title: "Prayer Integration",
    description: "Athan daemon with real Islamic audio, Hijri calendar integration, daily Quran Ayah on your desktop, and beautiful Conky Islamic panels.",
    stats: { value: "5", label: "Daily prayers" },
  },
  {
    number: "03",
    title: "Sovereign Privacy",
    description: "Zero telemetry, Firejail sandboxing for all applications, DoH encryption, MAC address randomization, and full control over your data.",
    stats: { value: "0", label: "data sent home" },
  },
  {
    number: "04",
    title: "Beautiful Design",
    description: "KDE Plasma with Emerald Luxe theme, Islamic geometric patterns, perfect Arabic font support, and a desktop that feels like home.",
    stats: { value: "100%", label: "Open source" },
  },
];

// Floating dot particles visualization
function ParticleVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Intersection observer to pause animation when not visible
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    }, { threshold: 0 });
    observer.observe(canvas);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    // Generate stable particle positions
    const COUNT = 50;  // Reduced from 70 for better performance
    const particles = Array.from({ length: COUNT }, (_, i) => {
      const seed = i * 1.618;
      return {
        bx: ((seed * 127.1) % 1),
        by: ((seed * 311.7) % 1),
        phase: seed * Math.PI * 2,
        speed: 0.4 + (seed % 0.4),
        radius: 1.2 + (seed % 2.2),
      };
    });

    let time = 0;
    const render = () => {
      if (!isVisibleRef.current) {
        frameRef.current = requestAnimationFrame(render);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p) => {
        const flowX = Math.sin(time * p.speed * 0.4 + p.phase) * 38;
        const flowY = Math.cos(time * p.speed * 0.3 + p.phase * 0.7) * 24;

        const bx = p.bx * w;
        const by = p.by * h;
        const dx = p.bx - mx;
        const dy = p.by - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist * 2.8);

        const x = bx + flowX + influence * Math.cos(time + p.phase) * 36;
        const y = by + flowY + influence * Math.sin(time + p.phase) * 36;

        const pulse = Math.sin(time * p.speed + p.phase) * 0.5 + 0.5;
        const alpha = 0.08 + pulse * 0.18 + influence * 0.3;

        ctx.beginPath();
        ctx.arc(x, y, p.radius + pulse * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${alpha})`;
        ctx.fill();
      });

      time += 0.016;
      frameRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header - Full width with diagonal layout */}
        <div className="relative mb-24 lg:mb-32">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
                <span className="w-12 h-px bg-foreground/30" />
                Core Features
              </span>
              <h2
                className={`text-7xl md:text-8xl lg:text-[180px] font-display tracking-tight leading-[0.9] transition-all duration-1000 text-glow-intense float-slow ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Built for
                <br />
                <span className="text-white">Muslims.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-4">
              <p className={`text-xl text-muted-foreground leading-relaxed transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
                Built for Privacy. Aligned with Islamic values at every layer.
              </p>
            </div>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Large feature card */}
          <div 
            className={`lg:col-span-12 relative bg-card border border-foreground/10 min-h-[500px] overflow-hidden group transition-all duration-700 flex hover-lift hover-glow card-shine ${
              isVisible ? "opacity-100 translate-y-0 fade-in-up" : "opacity-0 translate-y-12"
            }`}
            onMouseEnter={() => setActiveFeature(0)}
            style={{ animationDelay: '100ms' }}
          >
            {/* Left: text content with floating animations */}
            <div className="relative flex-1 p-8 lg:p-12 bg-card">
              <ParticleVisualization />
              <div className="relative z-10">
                <span className="font-mono text-sm text-muted-foreground float">{features[0].number}</span>
                <h3 className="text-3xl lg:text-4xl font-display mt-4 mb-6 group-hover:translate-x-2 transition-transform duration-500 text-foreground float-slow">
                  {features[0].title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-md mb-8 fade-in-left" style={{ animationDelay: '300ms' }}>
                  {features[0].description}
                </p>
                <div className="bounce-anim">
                  <span className="text-5xl lg:text-6xl font-display text-accent">{features[0].stats.value}</span>
                  <span className="block text-sm text-muted-foreground font-mono mt-2 pulse-glow">{features[0].stats.label}</span>
                </div>
              </div>
            </div>

            {/* Right: geometric Islamic pattern with parallax */}
            <div className="hidden lg:block relative w-[42%] shrink-0 overflow-hidden bg-gradient-to-l from-accent/10 to-transparent flex items-center justify-center parallax-up">
              <svg className="w-3/4 h-3/4 opacity-40 float-slow" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="islamic-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="2" fill="currentColor" />
                    <path d="M20,10 L30,20 L20,30 L10,20 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
                  </pattern>
                </defs>
                <rect width="200" height="200" fill="url(#islamic-pattern)" opacity="0.6" />
              </svg>
              {/* Fade left edge into background */}
              <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
