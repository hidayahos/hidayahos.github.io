"use client";

import { useEffect, useState, useRef } from "react";
import { Shield, Lock, ShieldAlert, Key, Fingerprint, EyeOff, CheckCircle2, AlertCircle, Cpu, Network, Globe } from "lucide-react";

const securityFeatures = [
  "Tor Daemon: Global SOCKS5 proxy (127.0.0.1:9050)",
  "Privacy Exit Nodes: US, DE, NL, CH, IS, SE, NO, FI",
  "UFW/GUFW: Default deny incoming, IPv6 enabled",
  "Firefox ESR: Hardened with Enhanced Tracking Protection",
  "Cryptsetup: LUKS full-disk encryption support",
  "Firejail application sandboxing",
  "AppArmor mandatory access control",
  "Zero telemetry — 100% data sovereignty",
  "No proprietary software included",
  "MAC address randomization on every boot",
  "auditd security auditing",
  "sysctl kernel hardening",
];

export function SecurityShowcaseSection() {
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
    <section id="security-showcase" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden bg-[#0a1f0a]/30">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Privacy & Security List */}
          <div>
            <div className="mb-12">
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
                <span className="w-12 h-px bg-foreground/30" />
                Hardening
              </span>
              <h2 className="text-5xl lg:text-7xl font-display tracking-tight text-foreground mb-6">
                Privacy & <span className="text-accent">Security.</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Professional-grade privacy. Hidayah OS is pre-configured with industry-standard security policies and anonymity tools.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {securityFeatures.map((feature, idx) => (
                <div
                  key={feature}
                  className={`flex items-center gap-3 p-4 border border-foreground/5 bg-background/20 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Guardian PIN Card */}
          <div className={`flex flex-col justify-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}>
            <div className="relative p-8 lg:p-12 border border-accent/30 bg-accent/5 overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShieldAlert className="w-32 h-32 text-accent" />
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-accent text-background flex items-center justify-center mb-8">
                  <Key className="w-8 h-8" />
                </div>

                <h3 className="text-4xl font-display text-foreground mb-6">Guardian PIN</h3>

                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <Fingerprint className="w-5 h-5 text-accent mt-1 shrink-0" />
                    <p className="text-lg text-muted-foreground">
                      bcrypt-encrypted PIN protects all core security settings.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                    <p className="text-lg text-muted-foreground">
                      Security lockout triggers after 5 failed attempts.
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 mb-10">
                  {[
                    "Required to disable any filtering rule",
                    "Required to change DNS settings",
                    "Configure during first boot",
                    "Kernel-level enforcement",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-muted-foreground font-mono text-sm">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-3 p-4 bg-background/50 border border-accent/20 rounded">
                  <EyeOff className="w-5 h-5 text-accent" />
                  <span className="text-xs font-mono uppercase tracking-widest text-accent">Status: Hardened</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
