"use client";

import { useEffect, useState, useRef } from "react";
import { Shield, Lock, Eye, KeyRound } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "Kernel-level filtering",
    description: "nftables rules operate below the VPN layer. Haram websites blocked before they reach your browser.",
  },
  {
    icon: Lock,
    title: "Encrypted DNS",
    description: "DoH via Quad9 + CleanBrowsing. All DNS queries encrypted. No ISP tracking of your browsing.",
  },
  {
    icon: KeyRound,
    title: "App Sandboxing",
    description: "Firejail wraps all browsers and applications. Each app runs in an isolated container.",
  },
  {
    icon: Eye,
    title: "Guardian PIN",
    description: "bcrypt-protected settings lock. Only you can modify OS security policies. Built-in parental control.",
  },
];

export function SecuritySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % securityFeatures.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="security" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20">
          <span className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <span className="w-12 h-px bg-foreground/20" />
            Security
          </span>
          
          {/* Title */}
          <h2 className={`text-7xl md:text-8xl lg:text-[180px] font-display tracking-tight leading-[0.9] mb-12 transition-all duration-1000 text-glow-intense float-slow ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            Autonomous
            <br />
            <span className="text-white">protection.</span>
          </h2>
          
          {/* Description */}
          <div className={`transition-all duration-1000 delay-100 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Your privacy is protected at every layer. From kernel to GUI, Hidayah OS is built to shield you from surveillance and haram content.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Large visual card */}
          <div className={`lg:col-span-7 relative p-8 lg:p-12 border border-foreground/10 min-h-[400px] overflow-hidden transition-all duration-700 flex flex-col justify-between ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <div className="relative z-10">
              <span className="font-mono text-sm text-muted-foreground">Shield Status</span>
              <div className="mt-8">
                <span className="text-7xl lg:text-8xl font-display text-accent">✓</span>
                <span className="block text-foreground mt-4 text-lg font-display">Protected</span>
                <span className="block text-muted-foreground text-sm">All security layers active</span>
              </div>
            </div>

            {/* Islamic geometric pattern */}
            <svg className="absolute bottom-0 right-0 w-40 h-40 opacity-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="geo-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                  <circle cx="25" cy="25" r="3" fill="currentColor" />
                  <path d="M25,10 L40,25 L25,40 L10,25 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
                </pattern>
              </defs>
              <rect width="200" height="200" fill="url(#geo-pattern)" />
            </svg>
          </div>

          {/* Feature cards stack */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {securityFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`p-6 border transition-all duration-500 cursor-default ${
                  activeFeature === index 
                    ? "border-accent bg-accent/5" 
                    : "border-foreground/10"
                } ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
                style={{ transitionDelay: `${index * 80}ms` }}
                onClick={() => setActiveFeature(index)}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 w-10 h-10 flex items-center justify-center border transition-colors ${
                    activeFeature === index 
                      ? "border-accent bg-accent text-background" 
                      : "border-foreground/20"
                  }`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
