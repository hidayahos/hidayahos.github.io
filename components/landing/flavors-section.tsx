"use client";

import { useEffect, useState, useRef } from "react";
import { Monitor, Cpu, Box, Check, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const flavors = [
  {
    name: "KDE Plasma Edition",
    badge: "RECOMMENDED",
    size: "1.82GB",
    desktop: "KDE Plasma full",
    theme: "Emerald Luxe (gold/dark green)",
    bestFor: "Beauty + modern hardware",
    includes: ["Full KDE apps", "Dolphin", "Spectacle", "KCalc", "Okular"],
    color: "accent",
  },
  {
    name: "XFCE Edition",
    badge: "MORE SOFTWARE",
    size: "1.86GB",
    desktop: "XFCE lightweight",
    bestFor: "Older hardware + more software",
    includes: ["More pre-installed software", "Lighter on RAM", "Thunar", "Mousepad", "Ristretto"],
    color: "foreground",
  },
];

export function FlavorsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section id="flavors" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden bg-card/50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-12 h-px bg-foreground/30" />
            Editions
          </span>
          <h2 className="text-5xl lg:text-7xl font-display tracking-tight text-foreground">
            Choose Your <span className="text-accent">Flavor.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {flavors.map((flavor, idx) => (
            <div
              key={flavor.name}
              className={`relative p-8 lg:p-12 border border-foreground/10 bg-background/50 hover:border-accent/30 transition-all duration-700 group ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <Badge className="bg-accent text-background mb-4 font-mono">
                    {flavor.badge}
                  </Badge>
                  <h3 className="text-3xl lg:text-4xl font-display">{flavor.name}</h3>
                </div>
                <div className="text-right font-mono text-sm text-muted-foreground">
                  <Box className="w-5 h-5 mb-1 ml-auto text-accent" />
                  {flavor.size}
                </div>
              </div>

              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <Monitor className="w-5 h-5 text-accent mt-1 shrink-0" />
                  <div>
                    <span className="block text-sm font-mono text-muted-foreground uppercase tracking-wider mb-1">Desktop Environment</span>
                    <p className="text-lg">{flavor.desktop}</p>
                  </div>
                </div>
                {flavor.theme && (
                  <div className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#0a1f0a] mt-1 shrink-0 border border-foreground/10" />
                    <div>
                      <span className="block text-sm font-mono text-muted-foreground uppercase tracking-wider mb-1">Visual Theme</span>
                      <p className="text-lg">{flavor.theme}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <Cpu className="w-5 h-5 text-accent mt-1 shrink-0" />
                  <div>
                    <span className="block text-sm font-mono text-muted-foreground uppercase tracking-wider mb-1">Best For</span>
                    <p className="text-lg">{flavor.bestFor}</p>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <span className="block text-sm font-mono text-muted-foreground uppercase tracking-wider mb-4">What's Included</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {flavor.includes.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="w-4 h-4 text-accent" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#download"
                className="inline-flex items-center justify-center w-full py-4 bg-foreground/5 border border-foreground/10 hover:border-accent hover:bg-accent/5 transition-all text-lg font-display group"
              >
                Download {flavor.name.split(' ')[0]}
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
