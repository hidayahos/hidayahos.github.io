"use client";

import { useEffect, useState, useRef } from "react";
import { Monitor, Cpu, Box, Check, ArrowRight, Info, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const flavors = [
  {
    id: "xfce",
    name: "XFCE Edition",
    badge: "RECOMMENDED",
    size: "975 MB",
    packages: "987",
    desktop: "XFCE 4.18",
    bestFor: "Daily drivers, older hardware, and users who want more software out of the box",
    includes: [
      "Whisker Menu launcher",
      "LightDM branded greeter",
      "Adwaita-dark theme",
      "More user apps (987 total)",
      "Lighter on RAM (2GB min)",
      "Classic performance",
      "Comprehensive toolkit",
      "300MB smaller ISO"
    ],
    highlight: true,
  },
  {
    id: "kde",
    name: "KDE Plasma Edition",
    badge: "MODERN & POLISHED",
    size: "1.5 GB",
    packages: "1,172",
    desktop: "KDE Plasma 5.27",
    bestFor: "Users who want a modern, visually polished desktop with animations",
    includes: [
      "Custom SDDM login theme",
      "KSplash loading screen",
      "HidayahNur.colors scheme",
      "KDE System Monitor",
      "Kate text editor",
      "Breeze GTK/Qt theme",
      "Firefox ESR",
      "Tor Browser Launcher"
    ],
    highlight: false,
  },
];

const xfceExtraSoftware = [
  { cat: "Office", apps: ["LibreOffice Writer", "LibreOffice Calc", "LibreOffice Impress", "LibreOffice Draw"] },
  { cat: "Graphics", apps: ["GIMP 2.10", "Ristretto"] },
  { cat: "Multimedia", apps: ["VLC 3.0", "Parole", "Pavucontrol"] },
  { cat: "Internet", apps: ["Transmission-GTK", "Gigolo"] },
  { cat: "System", apps: ["GParted", "GNOME Disks", "Baobab", "Synaptic", "Seahorse", "Cryptsetup"] },
  { cat: "Utility", apps: ["Evince", "File Roller", "Xarchiver", "Mousepad", "Menulibre", "Catfish", "htop", "Neofetch"] },
  { cat: "Hardware", apps: ["Blueman", "CUPS", "system-config-printer"] },
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
          <div className="mt-8 p-4 border border-accent/20 bg-accent/5 rounded-lg flex items-start gap-4 max-w-2xl">
            <Info className="w-6 h-6 text-accent shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-accent font-bold">Important:</span> Hidayah OS is currently a <span className="text-foreground font-semibold uppercase tracking-wider">Live-only experience</span>. It does not yet include a permanent system installer.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {flavors.map((flavor, idx) => (
            <div
              key={flavor.id}
              className={`relative p-8 lg:p-12 border transition-all duration-700 group ${
                flavor.highlight
                  ? "border-accent/40 bg-accent/[0.03] ring-1 ring-accent/20"
                  : "border-foreground/10 bg-background/50"
              } ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <Badge className={`font-mono mb-4 ${flavor.highlight ? 'bg-accent text-background' : 'bg-foreground/10 text-foreground'}`}>
                    {flavor.badge}
                  </Badge>
                  <h3 className="text-3xl lg:text-4xl font-display">{flavor.name}</h3>
                </div>
                <div className="text-right font-mono text-sm text-muted-foreground">
                  <Box className="w-5 h-5 mb-1 ml-auto text-accent" />
                  <div className="text-foreground font-bold">{flavor.size}</div>
                  <div className="text-[10px] uppercase opacity-50">{flavor.packages} Packages</div>
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
                <div className="flex items-start gap-4">
                  <Cpu className="w-5 h-5 text-accent mt-1 shrink-0" />
                  <div>
                    <span className="block text-sm font-mono text-muted-foreground uppercase tracking-wider mb-1">Best For</span>
                    <p className="text-lg text-foreground/90">{flavor.bestFor}</p>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <span className="block text-sm font-mono text-muted-foreground uppercase tracking-wider mb-4">Key Highlights</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                  {flavor.includes.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Check className="w-4 h-4 text-accent shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#download"
                className={`inline-flex items-center justify-center w-full py-4 transition-all text-lg font-display group ${
                  flavor.highlight
                    ? "bg-accent text-background hover:bg-accent/90"
                    : "bg-foreground/5 border border-foreground/10 hover:border-accent hover:bg-accent/5"
                }`}
              >
                Get {flavor.name.split(' ')[0]} Edition
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>

        {/* XFCE Extra Software Grid */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="p-8 lg:p-12 border border-accent/20 bg-background/30 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-full">
                  <Plus className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-3xl lg:text-4xl font-display text-accent">XFCE Exclusive Apps</h3>
              </div>

              <p className="text-muted-foreground mb-12 max-w-3xl text-lg leading-relaxed">
                The XFCE edition is our <span className="text-foreground font-semibold">Recommended Download</span> because it ships with essential applications that KDE lacks, making it a complete workstation right out of the box while remaining lightweight.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                {xfceExtraSoftware.map((item) => (
                  <div key={item.cat}>
                    <h4 className="text-xs font-mono text-accent uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                      {item.cat}
                    </h4>
                    <ul className="space-y-2">
                      {item.apps.map(app => (
                        <li key={app} className="text-sm text-foreground/70 flex items-center gap-2">
                          <div className="w-1 h-1 bg-foreground/20 rounded-full" />
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
