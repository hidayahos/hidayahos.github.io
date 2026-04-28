"use client";

import { useEffect, useState, useRef } from "react";
import { Download, ShieldCheck, Copy, Check, ExternalLink, HardDrive, Cpu, Layers, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const downloads = [
  {
    edition: "XFCE Edition",
    recommended: true,
    filename: "HidayahOS-1.0-Nur-XFCE-amd64.iso",
    size: "1.1 GB",
    md5: "946d8d82894bfed1249d2d3a9b883572",
    sha256: "4142c57158fae01b8c040d7487b129a424dc272032a7f8f1b6db6372a351a802",
    url: "https://mega.nz/folder/k5QHmaQC#D8SyRFpiDIWjnVvVKup-aA",
    requirements: {
      ram: "2 GB",
      cpu: "64-bit Dual Core",
      storage: "2 GB (Live Mode)"
    }
  },
  {
    edition: "KDE Plasma Edition",
    recommended: false,
    filename: "HidayahOS-1.0-Nur-amd64.iso",
    size: "1.4 GB",
    md5: "Available on MEGA",
    sha256: "Available on MEGA",
    url: "https://mega.nz/folder/k5QHmaQC#D8SyRFpiDIWjnVvVKup-aA",
    requirements: {
      ram: "4 GB",
      cpu: "64-bit Dual Core",
      storage: "2 GB (Live Mode)"
    }
  }
];

export function DownloadSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <section id="download" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-12 h-px bg-foreground/30" />
            Get Hidayah OS
          </span>
          <h2 className="text-5xl lg:text-7xl font-display tracking-tight text-foreground">
            Download <span className="text-accent">Release.</span>
          </h2>

          <div className="mt-8 p-6 border border-yellow-500/20 bg-yellow-500/5 rounded-lg flex items-start gap-4 max-w-3xl">
            <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-yellow-500 font-display text-lg mb-1 uppercase tracking-wider">Live-Only Release</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Hidayah OS 1.0 (Nur) is currently distributed as a <span className="text-foreground font-bold">Live ISO only</span>. It does not include an installer for permanent disk installation. We are working on adding the Calamares installer in a future update.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {downloads.map((dl, idx) => (
            <div
              key={dl.edition}
              className={`relative p-8 lg:p-12 border transition-all duration-700 ${
                dl.recommended ? 'border-accent/30 bg-accent/[0.02]' : 'border-foreground/10 bg-card/30'
              } ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              {dl.recommended && (
                <Badge className="absolute top-6 right-6 bg-accent text-background font-mono">
                  RECOMMENDED
                </Badge>
              )}

              <div className="mb-8">
                <h3 className="text-3xl font-display text-foreground mb-2">{dl.edition}</h3>
                <div className="flex items-center gap-4 text-sm font-mono text-muted-foreground">
                  <span className="flex items-center gap-1 font-bold text-foreground/80"><HardDrive className="w-4 h-4" /> {dl.size}</span>
                  <span className="flex items-center gap-1"><Layers className="w-4 h-4" /> amd64</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8 text-[10px] md:text-xs">
                <div className="p-3 bg-background/50 border border-foreground/5 rounded-lg text-center">
                  <Cpu className="w-4 h-4 mx-auto text-accent mb-2" />
                  <span className="block uppercase text-muted-foreground font-mono mb-1">CPU</span>
                  <span className="font-bold truncate block">{dl.requirements.cpu}</span>
                </div>
                <div className="p-3 bg-background/50 border border-foreground/5 rounded-lg text-center">
                  <Layers className="w-4 h-4 mx-auto text-accent mb-2" />
                  <span className="block uppercase text-muted-foreground font-mono mb-1">RAM</span>
                  <span className="font-bold truncate block">{dl.requirements.ram}</span>
                </div>
                <div className="p-3 bg-background/50 border border-foreground/5 rounded-lg text-center">
                  <HardDrive className="w-4 h-4 mx-auto text-accent mb-2" />
                  <span className="block uppercase text-muted-foreground font-mono mb-1">Disk</span>
                  <span className="font-bold truncate block">{dl.requirements.storage}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="p-4 bg-black/20 border border-foreground/10 font-mono text-[11px] relative group overflow-hidden">
                  <span className="block text-accent uppercase text-[9px] mb-1 tracking-widest font-bold">SHA256 Checksum</span>
                  <div className="flex items-center justify-between gap-4">
                    <span className="truncate opacity-70">{dl.sha256}</span>
                    {dl.sha256.startsWith('41') && (
                      <button
                        onClick={() => copyToClipboard(dl.sha256)}
                        title="Copy SHA256"
                        className="hover:text-accent transition-colors shrink-0 p-1 bg-white/5 rounded"
                      >
                        {copiedHash === dl.sha256 ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    )}
                  </div>
                </div>
                <div className="p-4 bg-black/20 border border-foreground/10 font-mono text-[11px] relative group overflow-hidden">
                  <span className="block text-accent uppercase text-[9px] mb-1 tracking-widest font-bold">MD5 Checksum</span>
                  <div className="flex items-center justify-between gap-4">
                    <span className="truncate opacity-70">{dl.md5}</span>
                    {dl.md5.startsWith('94') && (
                      <button
                        onClick={() => copyToClipboard(dl.md5)}
                        title="Copy MD5"
                        className="hover:text-accent transition-colors shrink-0 p-1 bg-white/5 rounded"
                      >
                        {copiedHash === dl.md5 ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <a
                href={dl.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full h-14 text-lg font-display bg-foreground/10 border border-foreground/20 hover:bg-accent hover:border-accent hover:text-background transition-all group">
                  <Download className="w-5 h-5 mr-2 group-hover:-translate-y-1 transition-transform" />
                  Download from MEGA
                  <ExternalLink className="w-4 h-4 ml-2 opacity-50" />
                </Button>
              </a>
              <p className="text-center text-[10px] text-muted-foreground mt-4 font-mono truncate">
                Filename: {dl.filename}
              </p>
            </div>
          ))}
        </div>

        {/* Verification Instructions */}
        <div className={`p-8 lg:p-12 border border-accent/20 bg-accent/5 transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-accent/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-accent" />
            </div>
            <div className="w-full">
              <h3 className="text-2xl font-display text-foreground mb-4">Verify Your Download</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed max-w-2xl">
                Always verify the integrity of your ISO file before booting. Open your terminal and run the following command to check the SHA256 hash.
              </p>

              <div className="space-y-6">
                <div>
                  <span className="block text-[10px] font-mono text-accent uppercase mb-3 tracking-widest">Linux & macOS</span>
                  <div className="p-4 bg-black/40 border border-white/5 flex items-center justify-between group rounded">
                    <code className="text-accent text-sm sm:text-base font-mono break-all mr-4">sha256sum HidayahOS-1.0-Nur-XFCE-amd64.iso</code>
                    <button
                      onClick={() => copyToClipboard("sha256sum HidayahOS-1.0-Nur-XFCE-amd64.iso")}
                      className="shrink-0 p-2 bg-white/5 hover:bg-white/10 rounded transition-colors"
                    >
                      {copiedHash === "sha256sum HidayahOS-1.0-Nur-XFCE-amd64.iso" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-white/50" />}
                    </button>
                  </div>
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-accent uppercase mb-3 tracking-widest">Windows (PowerShell)</span>
                  <div className="p-4 bg-black/40 border border-white/5 flex items-center justify-between group rounded">
                    <code className="text-accent text-xs sm:text-sm font-mono break-all mr-4">Get-FileHash HidayahOS-1.0-Nur-XFCE-amd64.iso -Algorithm SHA256</code>
                    <button
                      onClick={() => copyToClipboard("Get-FileHash HidayahOS-1.0-Nur-XFCE-amd64.iso -Algorithm SHA256")}
                      className="shrink-0 p-2 bg-white/5 hover:bg-white/10 rounded transition-colors"
                    >
                      {copiedHash === "Get-FileHash HidayahOS-1.0-Nur-XFCE-amd64.iso -Algorithm SHA256" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-white/50" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
