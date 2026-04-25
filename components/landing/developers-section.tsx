"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const features = [
  { 
    title: "Fully Open Source", 
    description: "Audit every line of code. GPL-3.0 licensed. Nothing proprietary."
  },
  { 
    title: "Easy to Contribute", 
    description: "Documentation, GitHub issues, and an active community ready to help."
  },
  { 
    title: "Modular Design", 
    description: "Components are independent. Modify, fork, or extend with ease."
  },
  { 
    title: "Active Development", 
    description: "New features released regularly. Your contributions welcome."
  },
];

export function DevelopersSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLSection>(null);

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
    <section id="developers" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">

      {/* All text content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header — Full width */}
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Contributing
          </span>
          <h2 className="text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9]">
            Build with us.
            <br />
            <span className="text-accent">For the Ummah.</span>
          </h2>
        </div>

        {/* Description + Features */}
        <div
          className={`max-w-full transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl">
            Hidayah OS is built by the community, for the community. Whether you're a developer, designer, or just passionate about privacy and Islamic values, there's a way for you to contribute.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`p-6 border border-foreground/10 transition-all duration-500 hover:border-accent/50 hover:bg-accent/5 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 50 + 200}ms` }}
              >
                <h3 className="font-display text-lg mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className={`mt-16 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <a 
              href="https://github.com/hidayahos/hidayah-os"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-background font-display text-lg transition-all group"
            >
              Contribute on GitHub
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <p className="text-sm text-muted-foreground mt-4">
              Join our Discord community for guidance and collaboration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
