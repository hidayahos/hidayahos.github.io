"use client";

import { useEffect, useState, useRef } from "react";
import { ShieldCheck, Lock, Globe, Server, UserCheck, Search } from "lucide-react";

const shieldLayers = [
  {
    title: "Layer 1 — CleanBrowsing Islamic DNS",
    description: "Blocks 10M+ haram domains at DNS level. Primary: 185.228.168.10 | Fallback: 185.228.169.10. DNS over TLS + DNSSEC enabled.",
    icon: Globe,
  },
  {
    title: "Layer 2 — nftables Islamic Blocklist",
    description: "578 specific haram/gambling/alcohol domains. Blocked at kernel level — below application layer.",
    icon: Server,
  },
  {
    title: "Layer 3 — DNS Hijack Prevention",
    description: "Forces ALL DNS through CleanBrowsing. Even VPN cannot bypass this layer.",
    icon: Lock,
  },
  {
    title: "Layer 4 — Firefox AppArmor Profile",
    description: "39 deny rules — prevents browser tampering. Cannot disable security settings without Guardian PIN.",
    icon: ShieldCheck,
  },
  {
    title: "Layer 5 — Firejail Browser Sandbox",
    description: "Firefox runs in isolated container. WebRTC disabled — no IP leaks possible.",
    icon: UserCheck,
  },
  {
    title: "Layer 6 — SafeSearch Enforcement",
    description: "Google, Bing, YouTube, DuckDuckGo SafeSearch locked via Firefox policies.",
    icon: Search,
  },
];

export function IslamicShieldSection() {
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
    <section id="islamic-shield" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-20 text-center">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-12 h-px bg-foreground/30" />
            Active Protection
          </span>
          <h2 className="text-5xl lg:text-7xl font-display tracking-tight text-foreground mb-6">
            6-Layer <span className="text-accent">Islamic Shield.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hidayah OS implements a multi-layered security stack to ensure your browsing remains clean and private.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line connecting layers */}
          <div className={`absolute left-8 top-0 bottom-0 w-px bg-accent/20 hidden md:block transition-all duration-1000 ${isVisible ? "scale-y-100" : "scale-y-0"}`} />

          <div className="space-y-8">
            {shieldLayers.map((layer, idx) => (
              <div
                key={layer.title}
                className={`relative flex items-start gap-8 p-8 border border-foreground/10 bg-card/30 hover:bg-accent/5 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="relative z-10 w-16 h-16 bg-background border border-accent flex items-center justify-center shrink-0">
                  <layer.icon className="w-8 h-8 text-accent" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-background text-[10px] font-bold flex items-center justify-center rounded-full">
                    {idx + 1}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-display text-foreground">{layer.title}</h3>
                    <div className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-mono rounded border border-green-500/20">
                      ACTIVE
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {layer.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
