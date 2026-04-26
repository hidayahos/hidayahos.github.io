"use client";

import { useEffect, useState, useRef } from "react";
import { Volume2, Calendar, BookOpen, Layout, Type, Bookmark, LogIn, Globe } from "lucide-react";

const islamicFeatures = [
  {
    icon: Volume2,
    title: "Athan Daemon",
    description: "Real Athan audio plays automatically at all 5 prayer times daily. No setup required.",
  },
  {
    icon: Calendar,
    title: "Hijri Calendar",
    description: "Correct Islamic date displayed on desktop at all times via daemon.",
  },
  {
    icon: BookOpen,
    title: "Daily Quran Ayah",
    description: "A new Quran verse displayed every day from SQLite database of 53 ayahs.",
  },
  {
    icon: Layout,
    title: "3 Conky Panels",
    description: "System stats, prayer times, and Quran ayah displayed elegantly on desktop.",
  },
  {
    icon: Type,
    title: "Arabic Font Support",
    description: "Noto Kufi Arabic + Noto Sans Arabic pre-installed and configured.",
  },
  {
    icon: Bookmark,
    title: "Islamic Bookmarks",
    description: "Quran.com, IslamQA, Sunnah.com pre-loaded in Firefox.",
  },
  {
    icon: LogIn,
    title: "Bismillah Login Screen",
    description: "Arabic Bismillah displayed on SDDM login screen.",
  },
  {
    icon: Globe,
    title: "Arabic Locale",
    description: "ar_SA.UTF-8 locale included alongside en_US.UTF-8.",
  },
];

export function IslamicFeaturesSection() {
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
    <section id="islamic-features" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-12 h-px bg-foreground/30" />
            Faith Integration
          </span>
          <h2 className="text-5xl lg:text-7xl font-display tracking-tight text-foreground">
            Islamic <span className="text-accent">Features.</span>
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
            A desktop experience designed to keep you connected to your faith throughout the day.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {islamicFeatures.map((feature, idx) => (
            <div
              key={feature.title}
              className={`p-8 border border-foreground/10 bg-card/30 hover:border-accent/30 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <div className="w-12 h-12 bg-accent/10 flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-display mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
