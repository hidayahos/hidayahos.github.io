"use client";

import { useEffect, useState, useRef } from "react";

// Pre-installed applications on Hidayah OS
const apps = [
  { name: "Firefox ESR", category: "Browser" },
  { name: "LibreOffice", category: "Office" },
  { name: "VLC", category: "Media" },
  { name: "Thunderbird", category: "Email" },
  { name: "KDE Connect", category: "Sync" },
  { name: "Ark", category: "Archive" },
  { name: "Dolphin", category: "File Manager" },
  { name: "Spectacle", category: "Screenshots" },
  { name: "KCalc", category: "Calculator" },
  { name: "Okular", category: "PDF Reader" },
  { name: "Quran Reader", category: "Islamic" },
  { name: "Tasbih Counter", category: "Islamic" },
];

export function IntegrationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
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

  const categories = Array.from(new Set(apps.map(app => app.category)));
  const filteredApps = activeCategory ? apps.filter(app => app.category === activeCategory) : apps;

  return (
    <section
      id="integrations"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-card/30"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20 fade-in-up">
          <span className={`inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 fade-in-left ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ animationDelay: '0ms' }}
          >
            <span className="w-12 h-px bg-foreground/30 line-reveal" style={{ animationDelay: '100ms' }} />
            Pre-installed
          </span>

          <h2 className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] transition-all duration-1000 text-glow-intense float-slow ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ animationDelay: '100ms' }}
          >
            Everything
            <br />
            <span className="text-white">included.</span>
          </h2>

          <p className={`mt-8 text-xl text-muted-foreground leading-relaxed max-w-2xl transition-all duration-1000 delay-100 fade-in-right ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ animationDelay: '200ms' }}
          >
            No need to hunt for software. Hidayah OS comes with 1650+ carefully selected packages, all vetted for privacy and Islamic values.
          </p>
        </div>

        {/* Filter pills */}
        <div className={`flex flex-wrap gap-3 mb-12 transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 font-mono text-sm transition-all hover-lift bounce-anim ${
              activeCategory === null
                ? "bg-accent text-background pulse-glow"
                : "border border-foreground/20 text-foreground hover:border-accent hover:text-accent hover-glow"
            }`}
          >
            All Apps
          </button>
          {categories.map((category, idx) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 font-mono text-sm transition-all hover-lift fade-in-up ${
                activeCategory === category
                  ? "bg-accent text-background pulse-glow"
                  : "border border-foreground/20 text-foreground hover:border-accent hover:text-accent hover-glow"
              }`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Apps grid with staggered animations */}
        <div className={`grid md:grid-cols-3 lg:grid-cols-4 gap-4 transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          {filteredApps.map((app, index) => (
            <div
              key={app.name}
              className={`p-6 border border-foreground/10 hover:border-accent/50 hover:bg-accent/5 transition-all duration-500 cursor-default hover-lift hover-glow card-shine fade-in-up ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 30}ms`, animationDelay: `${index * 30}ms` }}
            >
              <h3 className="font-display text-lg mb-2 text-foreground float">{app.name}</h3>
              <span className="text-xs font-mono text-accent bounce-anim">{app.category}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className={`mt-20 pt-12 border-t border-foreground/10 grid md:grid-cols-3 gap-8 transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 fade-in-up" : "opacity-0 scale-95"
        }`}>
          {[
            { value: "1650+", label: "packages included" },
            { value: "0", label: "proprietary software" },
            { value: "100%", label: "open source" },
          ].map((stat, idx) => (
            <div key={stat.label} className="hover-lift transition-all duration-500 fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
              <span className="text-5xl font-display text-accent pulse-glow float-slow">{stat.value}</span>
              <p className="text-muted-foreground text-sm mt-2 fade-in-left" style={{ animationDelay: `${idx * 100 + 100}ms` }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
