"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Check, FileText, ShieldCheck, HardDrive } from "lucide-react";

const systemRequirements = [
  { label: "Minimum RAM", value: "4GB" },
  { label: "Recommended RAM", value: "8GB" },
  { label: "Storage", value: "20GB minimum" },
  { label: "CPU", value: "64-bit x86_64" },
  { label: "GPU", value: "Intel / AMD / NVIDIA" },
];

export function PricingSection() {
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
    <section id="download" ref={sectionRef} className="relative py-32 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header - Dramatic offset */}
        <div className="grid lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8">
              <span className="w-12 h-px bg-foreground/30" />
              Installation
            </span>
            <h2 className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              Free. Forever.
              <br />
              <span className="text-accent">Open Source.</span>
            </h2>
          </div>
          
          <div className="lg:col-span-5 flex flex-col justify-end">
            <div className={`transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Hidayah OS is completely free and open source under the GPL-3.0 license. Download, install, and run your own OS aligned with your values.
              </p>
              <div className="flex flex-col gap-6">
                <a
                  href="https://mega.co.nz/#!o0omCQYb!YLCm-DmbXumGnUaXUheyvxldTwZk2HEul8BGFCEWd98"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-background font-display text-lg transition-all group"
                >
                  Download v1.0 (Nur)
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>

                <div className="space-y-3 font-mono text-xs text-muted-foreground bg-foreground/5 p-4 border border-foreground/10">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <span>SHA256: 2fe5bb6152bae474f2719ef6b2edf74b8b958d433fa9451fa7ecec714a3ea04d</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-accent" />
                    <span>Filename: hidayah-os-1.0-nur-amd64.iso</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-accent" />
                    <span>Size: 2.04 GB</span>
                  </div>
                </div>

                <div className="space-y-2 font-mono text-[10px] text-muted-foreground/60">
                  <p>Verify on Linux/Mac: <code className="text-accent/80">sha256sum hidayah-os-1.0-nur-amd64.iso</code></p>
                  <p>Verify on Windows: <code className="text-accent/80">certutil -hashfile hidayah-os-1.0-nur-amd64.iso SHA256</code></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Requirements Table */}
        <div className={`relative transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}>
          <div className="border border-foreground/10 overflow-hidden">
            <div className="bg-card/50 px-8 py-6 border-b border-foreground/10">
              <h3 className="text-2xl font-display">System Requirements</h3>
            </div>
            <div className="grid lg:grid-cols-5 divide-x divide-foreground/10">
              {systemRequirements.map((req) => (
                <div key={req.label} className="p-8">
                  <span className="text-sm text-muted-foreground font-mono block mb-3">
                    {req.label}
                  </span>
                  <span className="text-2xl font-display text-accent">
                    {req.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features list */}
        <div className={`mt-20 pt-12 border-t border-foreground/10 transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-display mb-6">What's Included</h3>
              <ul className="space-y-3">
                {[
                  "KDE Plasma with Emerald Luxe Theme",
                  "Islamic Shield (Content Filtering)",
                  "Athan Daemon with Prayer Integration",
                  "Hijri Calendar & Quran Ayah Display",
                  "Firejail Application Sandboxing",
                  "DoH Encryption & CleanBrowsing DNS",
                  "Guardian PIN Settings Lock",
                  "1650+ Pre-installed Packages",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-display mb-6">Core Values</h3>
              <ul className="space-y-3">
                {[
                  "Zero Telemetry - No data collection",
                  "100% Open Source - Audit the code",
                  "Islamic Principles - Built by Muslims",
                  "Privacy First - Your data is yours",
                  "No Proprietary Software - Freedom guaranteed",
                  "Community Driven - Crowdsourced development",
                  "GPL-3.0 Licensed - Libre forever",
                  "Transparent Security - Nothing to hide",
                ].map((value) => (
                  <li key={value} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Download info */}
        <div className={`mt-20 pt-12 border-t border-foreground/10 transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-display mb-4">Get Started in 3 Steps</h3>
            <p className="text-muted-foreground mb-8">
              Download the ISO, verify the checksum, write it to a USB, and boot. The Calamares installer will guide you through the rest.
            </p>
            <a 
              href="https://mega.co.nz/#!o0omCQYb!YLCm-DmbXumGnUaXUheyvxldTwZk2HEul8BGFCEWd98"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-mono underline underline-offset-4 transition-colors"
            >
              Download v1.0 (Nur)
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
