"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`relative border border-foreground transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          onMouseMove={handleMouseMove}
        >
          {/* Spotlight effect */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,0.15), transparent 40%)`
            }}
          />
          
          <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left content */}
              <div className="flex-1">
                <h2 className="text-6xl md:text-7xl lg:text-[72px] font-display tracking-tight mb-8 leading-[0.95]">
                  Your OS,
                  <br />
                  <span className="text-accent">Your values.</span>
                </h2>

                <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-xl">
                  Join Muslims worldwide switching to Hidayah OS. Reclaim your privacy, align with your values, and join a thriving Islamic tech community.
                </p>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <a 
                    href="#download"
                  >
                    <Button
                      size="lg"
                      className="bg-accent hover:bg-accent/90 text-background px-8 h-14 text-base rounded-full group"
                    >
                      Download XFCE
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </a>
                  <a
                    href="#download"
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 px-8 text-base rounded-full border-accent/50 hover:bg-accent/5"
                    >
                      Download KDE
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </a>
                </div>

                <p className="text-sm text-muted-foreground mt-8 font-mono text-[10px] uppercase tracking-widest">
                  100% Free • Open Source • Privacy Hardened
                </p>
              </div>

              {/* Right placeholder - Islamic geometric pattern */}
              <div className="hidden lg:flex items-center justify-center w-[400px] h-[400px]">
                <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-40">
                  <defs>
                    <pattern id="geo" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                      <circle cx="50" cy="50" r="5" fill="currentColor" className="text-accent"/>
                      <path d="M50,20 L80,50 L50,80 L20,50 Z" stroke="currentColor" strokeWidth="1" fill="none" className="text-accent"/>
                      <path d="M50,35 L65,50 L50,65 L35,50 Z" stroke="currentColor" strokeWidth="1" fill="none" className="text-accent"/>
                    </pattern>
                  </defs>
                  <rect width="400" height="400" fill="url(#geo)"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-foreground/10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-foreground/10" />
        </div>
      </div>
    </section>
  );
}
