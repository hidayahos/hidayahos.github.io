"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Download",
    subtitle: "the ISO",
    description: "Get the latest Hidayah OS ISO from GitHub Releases. Verify the SHA256 checksum to ensure integrity and authenticity.",
    code: `# Download Hidayah OS v1.0
$ wget https://github.com/hidayahos/hidayah-os/\
  releases/download/v1.0/hidayah-os-1.0.iso

# Verify SHA256
$ sha256sum hidayah-os-1.0.iso
$ cat SHA256SUMS | grep hidayah-os-1.0.iso`,
  },
  {
    number: "02",
    title: "Install",
    subtitle: "to your device",
    description: "Boot from USB using the Calamares installer. It guides you through setup including Guardian PIN configuration for settings protection.",
    code: `# Write to USB (Linux/Mac)
$ sudo dd if=hidayah-os-1.0.iso of=/dev/sdX \
  bs=4M status=progress

# Write to USB (Windows)
$ Rufus: Select ISO > Select Device > Write

# Boot and follow Calamares installer`,
  },
  {
    number: "03",
    title: "Align",
    subtitle: "your values",
    description: "Your OS is now configured for Islamic values out of the box. Privacy is protected. Haram content is filtered. Prayer times are integrated.",
    code: `$ systemctl status hidayah-shield
> Athan Daemon: ACTIVE
> CleanBrowsing DNS: ACTIVE
> nftables Islamic rules: LOADED
> AppArmor: ENFORCING
> Status: PROTECTED ✓`,
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#0f2d0f] text-foreground overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/[0.02] blur-[100px] pointer-events-none parallax-down" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header with scroll animation */}
        <div className="mb-16 lg:mb-24 fade-in-up" style={{ animationDelay: '0ms' }}>
          <div className="relative mb-0 lg:mb-0 grid lg:grid-cols-2 gap-4 lg:gap-12 items-end">
            {/* Titre colonne gauche */}
            <div className="overflow-hidden pb-0 lg:pb-32">
              <div className={`transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}>
                <span className="inline-flex items-center gap-3 text-sm font-mono text-foreground/40 mb-8">
                  <span className="w-12 h-px bg-foreground/20" />
                  Installation
                </span>
              </div>
              
              <h2 className={`text-6xl md:text-7xl lg:text-[180px] font-display tracking-tight leading-[0.85] transition-all duration-1000 delay-100 float-slow ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
              }`}>
                <span className="block text-glow-intense">Download.</span>
                <span className="block text-glow-intense">Install.</span>
                <span className="block text-glow-intense">Align.</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Horizontal Steps Layout */}
        <div className="grid lg:grid-cols-3 gap-4 mt-12">
          {steps.map((step, index) => (
            <button
              key={step.number}
              type="button"
              onClick={() => setActiveStep(index)}
              className={`relative text-left p-8 lg:p-12 border transition-all duration-500 ${
                activeStep === index 
                  ? "bg-[#1a3a1a] border-foreground/60" 
                  : "bg-[#0f2d0f] border-foreground/25 hover:border-foreground/50"
              }`}
            >
              {/* Step number with animated line */}
              <div className="flex items-center gap-4 mb-8">
                <span className={`text-4xl font-display transition-colors duration-300 ${
                  activeStep === index ? "text-accent" : "text-foreground/20"
                }`}>
                  {step.number}
                </span>
                <div className="flex-1 h-px bg-foreground/10 overflow-hidden">
                  {activeStep === index && (
                    <div className="h-full bg-accent/50 animate-progress" />
                  )}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-3xl lg:text-4xl font-display mb-2 text-foreground">
                {step.title}
              </h3>
              <span className="text-xl text-foreground/40 font-display block mb-6">
                {step.subtitle}
              </span>

              {/* Description */}
              <p className={`text-foreground/60 leading-relaxed transition-opacity duration-300 ${
                activeStep === index ? "opacity-100" : "opacity-60"
              }`}>
                {step.description}
              </p>

              {/* Active indicator */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-accent transition-transform duration-500 origin-left ${
                activeStep === index ? "scale-x-100" : "scale-x-0"
              }`} />
            </button>
          ))}
        </div>

        {/* Code Preview - Large terminal with animations */}
        <div className={`mt-12 p-8 lg:p-12 bg-[#000000] border border-foreground/10 font-mono text-sm text-accent overflow-x-auto transition-all duration-500 hover-lift hover-glow scale-in ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ animationDelay: '400ms' }}
        >
          <pre className="whitespace-pre-wrap break-words">{steps[activeStep].code}</pre>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 6s linear forwards;
        }
      `}</style>
    </section>
  );
}
