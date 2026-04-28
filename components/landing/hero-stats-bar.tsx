"use client";

import { useEffect, useState, useRef } from "react";
import { Package, Shield, Moon, Monitor, EyeOff } from "lucide-react";

const stats = [
  { icon: Package, value: "1172/987", label: "Packages Included" },
  { icon: Shield, value: "6", label: "Shield Layers" },
  { icon: Moon, value: "4 Custom", label: "Islamic Apps" },
  { icon: Monitor, value: "2", label: "Desktop Flavors" },
  { icon: EyeOff, value: "0", label: "Telemetry" },
];

export function HeroStatsBar() {
  const [isVisible, setIsVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={barRef}
      className="relative z-20 w-full bg-background/80 backdrop-blur-md border-y border-foreground/10"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center md:items-start gap-2 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center gap-3">
                <stat.icon className="w-5 h-5 text-accent" />
                <span className="text-2xl lg:text-3xl font-display text-foreground">{stat.value}</span>
              </div>
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
