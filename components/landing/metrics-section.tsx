"use client";

import { useEffect, useState, useRef } from "react";

const metrics = [
  { 
    value: 1650, 
    suffix: "+", 
    prefix: "",
    label: "Open source packages",
    sublabel: "pre-installed and ready",
  },
  { 
    value: 7, 
    suffix: "", 
    prefix: "",
    label: "Islamic daemons",
    sublabel: "for prayer times and Quran",
  },
  { 
    value: 0, 
    suffix: "", 
    prefix: "",
    label: "Telemetry connections",
    sublabel: "privacy guaranteed",
  },
];

function AnimatedNumber({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const [isScrambling, setIsScrambling] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // skip animation on slow connections or data saver mode
    if (typeof navigator !== 'undefined' && (navigator as any).connection?.saveData) {
      setCount(end);
      setIsScrambling(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1800;  // reduced from 2500ms
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * end));
            setIsScrambling(progress < 0.7);  // reduced scramble duration
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }  // reduced from 0.5 for earlier trigger
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  const displayValue = count.toLocaleString();

  return (
    <div ref={ref} className="inline-flex items-baseline">
      <span className="text-muted-foreground mr-1">{prefix}</span>
      <span className="tabular-nums">
        {displayValue.split("").map((char, i) => (
          <span
            key={i}
            className={`inline-block transition-none ${
              isScrambling && char !== "," ? "blur-[0.5px]" : ""
            }`}
          >
            {char}
          </span>
        ))}
      </span>
      <span className="text-muted-foreground">{suffix}</span>
    </div>
  );
}

function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      ctx.clearRect(0, 0, width, height);
      const gridSize = 60;
      const time = timeRef.current;
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          const wave = Math.sin(x * 0.01 + y * 0.01 + time) * 0.5 + 0.5;
          const size = 1 + wave * 2;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
          ctx.fill();
        }
      }
      const pulseY = (time * 30) % height;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, pulseY);
      ctx.lineTo(width, pulseY);
      ctx.stroke();
      timeRef.current += 0.02;
      frameRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

function DotGraph({
  color = "white",
  height = 32,
  freq1 = 0.35,
  freq2 = 0.12,
  freqT = 0.7,
  speed = 0.025,
  baseline = 0.3,
  amplitude = 0.5,
}: {
  color?: string;
  height?: number;
  freq1?: number;
  freq2?: number;
  freqT?: number;
  speed?: number;
  baseline?: number;
  amplitude?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const timeRef = useRef(Math.random() * 100);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.offsetWidth || 300;
    const H = height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const render = () => {
      ctx.clearRect(0, 0, W, H);
      const t = timeRef.current;
      const cols = Math.floor(W / 8);

      for (let i = 0; i < cols; i++) {
        const raw = baseline + amplitude * Math.sin(i * freq1 + t) * Math.cos(i * freq2 + t * freqT);
        const v = Math.max(0, Math.min(1, raw));
        const dotY = H - 4 - v * (H - 8);
        const x = i * 8 + 4;
        const alpha = 0.15 + v * 0.55;
        const r = 1.5 + v * 1.2;

        ctx.beginPath();
        ctx.arc(x, dotY, r, 0, Math.PI * 2);
        ctx.fillStyle = color === "green"
          ? `rgba(236, 168, 214, ${alpha})`
          : `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      timeRef.current += speed;
      frameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(frameRef.current);
  }, [color, height, freq1, freq2, freqT, speed, baseline, amplitude]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: `${height}px`, display: "block" }}
    />
  );
}

export function MetricsSection() {
  const [time, setTime] = useState<Date | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

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
    <section ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      <style>{`
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(201, 168, 76, 0.4)); }
          50% { filter: drop-shadow(0 0 20px rgba(201, 168, 76, 0.8)); }
        }
        @keyframes blink {
          0%, 49%, 100% { opacity: 1; }
          50%, 99% { opacity: 0.5; }
        }
        .glowing-icon {
          animation: glow 3s ease-in-out infinite, blink 4s ease-in-out infinite;
        }
      `}</style>

      <GridBackground />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-20 lg:mb-32">
          <div className="lg:col-span-8 lg:col-start-1">
            <div className="flex items-center gap-4 mb-6">
              <span className="flex items-center gap-2 px-3 py-1 bg-[#eca8d6]/10 text-[#eca8d6] text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#eca8d6] animate-pulse" />
                LIVE
              </span>
              <span className="text-sm font-mono text-muted-foreground">
                {time ? `${time.toLocaleTimeString("en-GB")} UTC` : ""}
              </span>
            </div>

            <h2 className={`text-6xl md:text-7xl lg:text-[140px] font-display tracking-tight leading-[0.95] transition-all duration-1000 text-glow-intense float-slow ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              Privacy
              <br />
              <span className="text-white">in real-time.</span>
            </h2>
          </div>
          
          {/* Glowing OS Icon - Right side */}
          <div className={`hidden lg:flex lg:col-span-4 items-center justify-end transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}>
            <img
              src="/hidayah-os-icon.png"
              alt="Hidayah OS Icon"
              className="glowing-icon w-48 h-48 object-contain"
            />
          </div>
        </div>

        {/* Shield Status Card - Replace fake graph image */}
        <div className={`w-full mb-12 transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100 scale-in" : "opacity-0 scale-75"
        }`}>
          <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/30 rounded-xl p-8 lg:p-10 hover-lift hover-glow card-shine">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl lg:text-3xl font-display text-accent mb-2 float">Shield Status</h3>
                <p className="text-foreground/60">Real-time system protection metrics</p>
              </div>
              <div className="text-5xl animate-pulse">🛡️</div>
            </div>
            
            {/* Status Grid with animations */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Shield Status", value: "PROTECTED ✓", icon: "✓" },
                { label: "DNS", value: "CleanBrowsing Active", icon: "🌐" },
                { label: "nftables", value: "Loaded", icon: "🔥" },
                { label: "AppArmor", value: "Enforcing", icon: "🔒" },
                { label: "Firejail", value: "Active", icon: "⛓️" },
                { label: "Kernel", value: "Hardened", icon: "⚔️" },
                { label: "Telemetry", value: "Disabled", icon: "🚫" },
                { label: "Updates", value: "Current", icon: "✨" },
              ].map((item, idx) => (
                <div 
                  key={item.label}
                  className="bg-background/30 border border-foreground/10 rounded-lg p-4 hover-lift transition-all duration-500 fade-in-up"
                  style={{ animationDelay: `${idx * 75}ms` }}
                >
                  <div className="text-2xl mb-2 bounce-anim">{item.icon}</div>
                  <div className="text-xs text-muted-foreground font-mono mb-1">{item.label}</div>
                  <div className="text-sm font-medium text-accent pulse-glow">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics grid */}
        <div className="grid lg:grid-cols-3 gap-6 stagger-container">
          {/* Large metric */}
          <div className={`lg:col-span-1 bg-foreground/[0.02] border border-foreground/10 p-10 lg:p-14 transition-all duration-700 hover-lift hover-glow card-shine ${
            isVisible ? "opacity-100 translate-y-0 fade-in-up" : "opacity-0 translate-y-12"
          }`}
          style={{ animationDelay: '0ms' }}
          >
            <div className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight mb-4 whitespace-nowrap overflow-hidden float-slow">
              <AnimatedNumber end={metrics[0].value} suffix={metrics[0].suffix} prefix={metrics[0].prefix} />
            </div>
            <div className="mb-6 bounce-anim">
              <DotGraph color="white" height={36} freq1={0.28} freq2={0.09} freqT={0.5} speed={0.018} baseline={0.35} amplitude={0.55} />
            </div>
            <div className="text-lg text-foreground mb-2 fade-in-left" style={{ animationDelay: '200ms' }}>{metrics[0].label}</div>
            <div className="text-sm text-muted-foreground font-mono fade-in-right" style={{ animationDelay: '300ms' }}>{metrics[0].sublabel}</div>
          </div>

          {/* Metrics */}
          {metrics.slice(1).map((metric, index) => (
            <div
              key={metric.label}
              className={`bg-foreground/[0.02] border border-foreground/10 p-8 flex flex-col items-start justify-between gap-6 transition-all duration-700 hover-lift hover-glow card-shine ${
                isVisible ? "opacity-100 translate-y-0 fade-in-up" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms`, animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="w-full">
                <div className="text-sm text-muted-foreground font-mono mb-2 fade-in-left" style={{ animationDelay: `${(index + 1) * 100 + 100}ms` }}>{metric.sublabel}</div>
                <div className="text-base text-foreground mb-3 float-slow">{metric.label}</div>
                <div className="pulse-glow mb-4">
                  <DotGraph
                    color={index === 0 ? "green" : "white"}
                    height={24}
                    freq1={index === 0 ? 0.45 : 0.22}
                    freq2={index === 0 ? 0.18 : 0.07}
                    freqT={index === 0 ? 1.1 : 0.4}
                    speed={index === 0 ? 0.032 : 0.015}
                    baseline={index === 0 ? 0.4 : 0.25}
                    amplitude={index === 0 ? 0.45 : 0.6}
                  />
                </div>
              </div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-display tracking-tight w-full">
                <AnimatedNumber end={metric.value} suffix={metric.suffix} prefix={metric.prefix} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
