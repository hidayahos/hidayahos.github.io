"use client";

import { useEffect, useState, useRef } from "react";
import { IslamicGeometricBackground } from "./islamic-geometric-background";

const words = ["Privacy", "Security", "Freedom", "Stability", "Purpose"];

const STAGGER = 30;
const DURATION = 400;
const GRADIENT_HOLD = 1200;

function BlurWord({ word, trigger }: { word: string; trigger: number }) {
  const letters = word.split("");
  const [letterStates, setLetterStates] = useState<{ opacity: number; blur: number }[]>(
    letters.map(() => ({ opacity: 0, blur: 20 }))
  );
  const [showGradient, setShowGradient] = useState(true);
  const framesRef = useRef<number[]>([]);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // skip animation on slow connections
    if (typeof navigator !== 'undefined' && (navigator as any).connection?.saveData) {
      setLetterStates(letters.map(() => ({ opacity: 1, blur: 0 })));
      setShowGradient(false);
      return;
    }

    // reset
    framesRef.current.forEach(cancelAnimationFrame);
    timersRef.current.forEach(clearTimeout);
    framesRef.current = [];
    timersRef.current = [];

    setLetterStates(letters.map(() => ({ opacity: 0, blur: 20 })));
    setShowGradient(true);

    // stagger each letter
    letters.forEach((_, i) => {
      const t = setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setLetterStates(prev => {
            const next = [...prev];
            next[i] = { opacity: eased, blur: 20 * (1 - eased) };
            return next;
          });
          if (progress < 1) {
            const id = requestAnimationFrame(tick);
            framesRef.current.push(id);
          }
        };
        const id = requestAnimationFrame(tick);
        framesRef.current.push(id);
      }, i * STAGGER);
      timersRef.current.push(t);
    });

    // remove gradient once all letters are settled
    const gt = setTimeout(() => setShowGradient(false), GRADIENT_HOLD);
    timersRef.current.push(gt);

    return () => {
      framesRef.current.forEach(cancelAnimationFrame);
      timersRef.current.forEach(clearTimeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  // gradient colours cycling across letter positions - updated to gold/cream tones
  const gradientColors = ["#c9a84c", "#a89968", "#8a7a50", "#f5f0e8", "#c9a84c"];

  return (
    <>
      {letters.map((char, i) => {
        const colorIndex = (i / Math.max(letters.length - 1, 1)) * (gradientColors.length - 1);
        const lower = Math.floor(colorIndex);
        const upper = Math.min(lower + 1, gradientColors.length - 1);
        const t = colorIndex - lower;

        // lerp hex colours
        const hex2rgb = (hex: string) => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return [r, g, b];
        };
        const [r1, g1, b1] = hex2rgb(gradientColors[lower]);
        const [r2, g2, b2] = hex2rgb(gradientColors[upper]);
        const r = Math.round(r1 + (r2 - r1) * t);
        const g = Math.round(g1 + (g2 - g1) * t);
        const b = Math.round(b1 + (b2 - b1) * t);

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: letterStates[i]?.opacity ?? 0,
              filter: `blur(${letterStates[i]?.blur ?? 20}px)`,
              color: showGradient ? `rgb(${r},${g},${b})` : "white",
              transition: "color 0.4s ease",
            }}
          >
            {char}
          </span>
        );
      })}
    </>
  );
}

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden bg-background">
      {/* Background video — mosque animation with mobile optimization */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{
          filter: "brightness(0.5) saturate(1.2)",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          willChange: "transform",
        }}
        loading="eager"
        preload="auto"
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Crect fill='%230a1f0a' width='1200' height='800'/%3E%3C/svg%3E"
      >
        <source
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vecteezy_3d-mosque-inside-animation_27665198-dGuHA8FN7Inb7qGxIuLsRNLoe1TaZ8.mp4"
          type="video/mp4"
        />
      </video>

      {/* Islamic geometric pattern overlay */}
      <IslamicGeometricBackground />

      {/* Dark overlay on video for better text contrast */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/60 via-black/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

      {/* Subtle grid lines */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10"
            style={{
              top: `${12.5 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-foreground/10"
            style={{
              left: `${8.33 * (i + 1)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
        <div className="lg:max-w-[55%]">
        {/* Eyebrow */}
        <div 
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-foreground/60">
            <span className="w-8 h-px bg-foreground/30" />
            Privacy-Hardened Islamic Linux Distribution
          </span>
        </div>
        
        {/* Arabic Bismillah with OS Icon */}
        <div className="mb-6 flex items-center justify-between gap-4 lg:gap-12">
          {/* Bismillah Text */}
          <div
            className={`text-left text-[clamp(3rem,7vw,5.5rem)] font-display leading-[1.1] tracking-tight text-accent transition-all duration-1000 flex-shrink ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ fontFamily: 'var(--font-scheherazade)', fontWeight: 700 }}
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </div>
          
          {/* OS Logo with enhanced flickering glow - positioned far right */}
          <div 
            className={`flex-shrink-0 ml-auto transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-75"
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="icon-flicker p-2">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hidayah_os_512x512-v9gWXJBnLgqgAD9CIEOpoaxmm0rbnA.png"
                alt="Hidayah OS Logo — Islamic Linux Distribution" fetchPriority="high"
                className="w-32 h-32 lg:w-44 lg:h-44 xl:w-52 xl:h-52 object-contain filter drop-shadow-[0_0_20px_rgba(201,168,76,0.4)]"
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* Main headline */}
        <div className="mb-12">
          <h1
            className={`text-left text-[clamp(2.5rem,5vw,4rem)] font-display leading-[1.2] tracking-tight text-foreground transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block">Hidayah OS — Privacy-Hardened Islamic Linux</span>
            <span className="block whitespace-nowrap">
              Your OS is{" "}
              <span className="relative inline-block">
                <BlurWord word={words[wordIndex]} trigger={wordIndex} />
              </span>
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <p 
          className={`text-lg text-foreground/80 leading-relaxed max-w-2xl transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          The Nur 1.0 Release — Beautiful, Stable, and Purposed
        </p>
        </div>
      </div>
      
      {/* Stats — Updated for Hidayah OS */}
      <div 
        className={`absolute bottom-12 left-0 right-0 px-6 lg:px-12 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-start gap-10 lg:gap-20">
          {[
            { value: "1.0 (Nur)", label: "Current Version" },
            { value: "1172/987", label: "Packages Included" },
            { value: "4", label: "Islamic Apps" },
          ].map((stat, idx) => (
            <div key={stat.label} className="flex flex-col gap-2 fade-in-up hover-lift" style={{ animationDelay: `${idx * 100}ms` }}>
              <span className="text-3xl lg:text-4xl font-display text-glow-white float">{stat.value}</span>
              <span className="text-xs text-white/70 leading-tight fade-in-left" style={{ animationDelay: `${idx * 100 + 100}ms` }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
