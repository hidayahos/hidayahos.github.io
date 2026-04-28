"use client";

import { useEffect, useState, useRef } from "react";
import { Volume2, Calendar, BookOpen, Layout, Type, Bookmark, LogIn, Globe, MapPin, Download, Terminal, Sparkles } from "lucide-react";

const mainApps = [
  {
    icon: MapPin,
    title: "Hidayah Prayer Times",
    description: "Auto-detects location via IP (falls back to Makkah). Calculates 5 daily prayers using the Muslim World League (MWL) method. Features desktop notifications, Azan audio alerts, and real-time Conky dashboard updates.",
  },
  {
    icon: Download,
    title: "Hidayah Quran Reader",
    description: "4 surahs (Al-Fatiha, Al-Ikhlas, Al-Falaq, An-Nas) available OFFLINE out of the box. Automatically downloads all 114 surahs on first internet connection. Features Uthmani script and Sahih International translation with local caching.",
  },
  {
    icon: Terminal,
    title: "Hidayah Khal Wrapper",
    description: "Terminal-based Hijri/Gregorian calendar system. Displays dual calendars with custom Hidayah branding (Gold/Green). Accessible directly from the application menu for non-technical users.",
  },
  {
    icon: Sparkles,
    title: "Conky Desktop Widget",
    description: "An always-visible dashboard showing prayer times, Hijri date, system metrics, and 8 rotating inspirational Quran verses in elegant gold calligraphy style on a transparent background.",
  },
];

const sharedFeatures = [
  {
    icon: Type,
    title: "Premium Arabic Fonts",
    description: "Noto Kufi Arabic and Noto Sans Arabic pre-installed and configured for perfect legibility system-wide.",
  },
  {
    icon: Bookmark,
    title: "Islamic Bookmarks",
    description: "Quick access to Quran.com, IslamQA, and Sunnah.com pre-loaded in Firefox ESR bookmarks toolbar.",
  },
  {
    icon: LogIn,
    title: "Bismillah Login",
    description: "Custom SDDM and LightDM greeting screens featuring 'Bismillah' in beautiful Arabic script.",
  },
  {
    icon: Globe,
    title: "Native ar_SA Locale",
    description: "Full Arabic language support (ar_SA.UTF-8) included alongside en_US for a bilingual experience.",
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
    <section id="islamic-features" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-12 h-px bg-foreground/30" />
            Faith Integration
          </span>
          <h2 className="text-5xl lg:text-7xl font-display tracking-tight text-foreground">
            Islamic <span className="text-accent">Integration.</span>
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Custom-built tools designed to keep you connected to your faith, seamlessly integrated into your daily workflow.
          </p>
        </div>

        {/* Custom Apps Grid */}
        <div className="mb-20">
          <h3 className="text-sm font-mono text-accent uppercase tracking-widest mb-8 border-b border-accent/10 pb-4 inline-block">Four Custom Hidayah Apps</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {mainApps.map((app, idx) => (
              <div
                key={app.title}
                className={`p-8 border border-accent/20 bg-accent/5 hover:border-accent/40 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="w-14 h-14 bg-accent/10 flex items-center justify-center mb-6">
                  <app.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-2xl font-display mb-4 text-foreground">{app.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {app.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Shared Features Grid */}
        <div>
          <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-8 border-b border-foreground/10 pb-4 inline-block">System-wide Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sharedFeatures.map((feature, idx) => (
              <div
                key={feature.title}
                className={`p-6 border border-foreground/10 bg-card/30 hover:border-accent/30 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${idx * 50 + 400}ms` }}
              >
                <div className="w-10 h-10 bg-foreground/5 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-accent" />
                </div>
                <h4 className="text-lg font-display mb-2 text-foreground">{feature.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
