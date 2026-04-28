"use client";

import { ArrowUpRight, Github, Twitter, MessageSquare } from "lucide-react";
import { useEffect, useRef } from "react";

const footerLinks = {
  Project: [
    { name: "Features", href: "#features" },
    { name: "Editions", href: "#flavors" },
    { name: "Security", href: "#security-showcase" },
    { name: "Download", href: "#download" },
  ],
  Resources: [
    { name: "Documentation", href: "https://github.com/hidayahos/hidayah-os/wiki" },
    { name: "Issue Tracker", href: "https://github.com/hidayahos/hidayah-os/issues" },
    { name: "Source Code", href: "https://github.com/hidayahos" },
    { name: "Build Summary", href: "#download" },
  ],
  Community: [
    { name: "Discord", href: "https://discord.gg/hwjFEXwtBq" },
    { name: "Forum", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "Contact", href: "#contact-form" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "https://github.com/hidayahos/hidayah-os/blob/main/LICENSE" },
    { name: "GPL-3.0 License", href: "https://github.com/hidayahos/hidayah-os/blob/main/LICENSE" },
    { name: "Terms of Use", href: "https://github.com/hidayahos/hidayah-os/blob/main/LICENSE" },
  ],
};

const socialLinks = [
  { name: "GitHub", href: "https://github.com/hidayahos", icon: Github },
  { name: "Discord", href: "https://discord.gg/hwjFEXwtBq", icon: MessageSquare },
  { name: "Twitter", href: "#", icon: Twitter },
];

export function FooterSection() {
  return (
    <footer className="relative bg-black pt-20">
      {/* Footer content — black background, white text with animations */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Arabic Bismillah Center */}
        <div className="text-center mb-20 fade-in-up">
          <div className="text-4xl md:text-6xl text-accent font-display mb-4" style={{ fontFamily: 'var(--font-scheherazade)' }}>
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </div>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-[0.3em]">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>

        {/* Main Footer with scroll animations */}
        <div className="py-16 lg:py-20 border-t border-white/5">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column with fade-in-up animation */}
            <div className="col-span-2 fade-in-up" style={{ animationDelay: '0ms' }}>
              <a href="#" className="inline-flex items-center gap-2 mb-6 hover-lift">
                <span className="text-3xl font-display text-accent">Hidayah OS</span>
              </a>

              <p className="text-foreground/50 leading-relaxed mb-8 max-w-xs text-sm fade-in-left" style={{ animationDelay: '100ms' }}>
                The Nur 1.0 Release. A privacy-hardened Islamic Linux distribution designed for the global Muslim community.
              </p>

              {/* Social Icons */}
              <div className="flex gap-4">
                {socialLinks.map((link, idx) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all group"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns with stagger animation */}
            {Object.entries(footerLinks).map(([title, links], colIdx) => (
              <div key={title} className="fade-in-up" style={{ animationDelay: `${(colIdx + 2) * 100}ms` }}>
                <h3 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link, idx) => (
                    <li key={link.name} className="fade-in-left" style={{ animationDelay: `${colIdx * 100 + idx * 50}ms` }}>
                      <a
                        href={link.href}
                        className="text-sm text-white/50 hover:text-white transition-all inline-flex items-center gap-2 hover-lift group"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar with animations */}
        <div className="py-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 fade-in-up" style={{ animationDelay: '600ms' }}>
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-sm text-foreground/30">
              &copy; 2026 Hidayah OS Project. Open Source under GPL-3.0.
            </p>
            <p className="text-[10px] font-mono text-accent/50 uppercase tracking-widest">
              Made with faith and code
            </p>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-sm text-foreground/30 hover-glow pulse-glow">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Shield Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
