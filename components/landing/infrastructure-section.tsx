"use client";

import { useEffect, useState, useRef } from "react";

const regions = [
  { name: "North America", nodes: 12, status: "operational" },
  { name: "Europe", nodes: 8, status: "operational" },
  { name: "Asia Pacific", nodes: 6, status: "operational" },
  { name: "South America", nodes: 3, status: "operational" },
];

export function InfrastructureSection() {
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
    <section id="infra" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20">
          <span className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <span className="w-12 h-px bg-foreground/20" />
            Global reach
          </span>
          
          <h2 className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            Built in
            <br />
            <span className="text-accent">Karachi.</span>
          </h2>

          <p className={`mt-8 text-xl text-muted-foreground leading-relaxed max-w-2xl transition-all duration-1000 delay-100 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            For the Ummah worldwide. Hidayah OS is developed by Muslims for Muslims in 57 Muslim-majority countries across the globe.
          </p>
        </div>

        {/* Stats grid */}
        <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          {[
            { value: "57", label: "Muslim-majority countries" },
            { value: "1.8B", label: "Muslims worldwide" },
            { value: "1", label: "OS built for them" },
          ].map((stat, index) => (
            <div key={stat.label} className={`p-8 border border-foreground/10 transition-all duration-500 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
            >
              <span className="text-6xl font-display text-accent">{stat.value}</span>
              <p className="text-muted-foreground text-sm mt-4">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Info cards */}
        <div className={`mt-20 pt-12 border-t border-foreground/10 grid md:grid-cols-2 gap-8 transition-all duration-1000 delay-400 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          {[
            {
              title: "Community-Driven",
              description: "Hidayah OS is developed collaboratively by Muslims from around the world. Your voice matters."
            },
            {
              title: "Truly Open",
              description: "100% open source and auditable. No hidden code. No corporate interests. Just faith and freedom."
            }
          ].map((card) => (
            <div key={card.title} className="p-8 bg-card/50 border border-foreground/10">
              <h3 className="text-xl font-display mb-3 text-foreground">{card.title}</h3>
              <p className="text-muted-foreground">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
