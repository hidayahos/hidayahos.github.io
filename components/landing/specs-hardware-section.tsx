"use client";

import { useEffect, useState, useRef } from "react";
import { Cpu, Wifi, Laptop, CheckCircle2, Table as TableIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const hardwareSupport = [
  "Intel WiFi (iwlwifi firmware)",
  "Realtek NIC firmware",
  "Broadcom WiFi firmware",
  "Intel GPU (i915 firmware)",
  "AMD Graphics firmware",
  "BIOS + UEFI boot support",
  "Works on hardware from 2008 onwards",
];

const technicalSpecs = [
  { label: "Base", value: "Debian 12 Bookworm" },
  { label: "Kernel", value: "6.1.0-44-amd64" },
  { label: "Desktop", value: "KDE Plasma / XFCE" },
  { label: "Boot", value: "BIOS + UEFI" },
  { label: "Packages", value: "1650+" },
  { label: "ISO Size", value: "1.82GB (KDE) / 1.86GB (XFCE)" },
  { label: "License", value: "GPL-3.0" },
  { label: "Cost", value: "Free Forever" },
];

export function SpecsHardwareSection() {
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
    <section id="specs" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Hardware Support */}
          <div>
            <div className="mb-12">
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
                <span className="w-12 h-px bg-foreground/30" />
                Compatibility
              </span>
              <h2 className="text-5xl lg:text-7xl font-display tracking-tight text-foreground mb-6">
                Works On Your <span className="text-accent">Hardware.</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Extensive driver support included out of the box for laptops, desktops, and older machines.
              </p>
            </div>

            <div className="space-y-4">
              {hardwareSupport.map((item, idx) => (
                <div
                  key={item}
                  className={`flex items-center gap-4 p-4 border border-foreground/10 bg-card/30 transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  {idx === 0 || idx === 2 ? <Wifi className="w-5 h-5 text-accent" /> :
                   idx === 3 || idx === 4 ? <Cpu className="w-5 h-5 text-accent" /> :
                   idx === 5 ? <Laptop className="w-5 h-5 text-accent" /> :
                   <CheckCircle2 className="w-5 h-5 text-accent" />}
                  <span className="text-lg text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specs */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}>
            <div className="mb-12">
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
                <span className="w-12 h-px bg-foreground/30" />
                Specifications
              </span>
              <h2 className="text-5xl lg:text-7xl font-display tracking-tight text-foreground mb-6">
                Technical <span className="text-accent">Specs.</span>
              </h2>
            </div>

            <div className="border border-foreground/10 bg-card/20 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-foreground/10">
                    <TableHead className="font-mono text-accent text-xs uppercase tracking-widest p-6">Parameter</TableHead>
                    <TableHead className="font-mono text-accent text-xs uppercase tracking-widest p-6">Specification</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {technicalSpecs.map((spec) => (
                    <TableRow key={spec.label} className="hover:bg-accent/5 border-foreground/10 transition-colors">
                      <TableCell className="font-medium p-6 text-muted-foreground">{spec.label}</TableCell>
                      <TableCell className="p-6 text-foreground font-display text-lg">{spec.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
