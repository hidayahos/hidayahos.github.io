"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    quote: "Finally an OS that doesn't require me to configure everything myself for Islamic use. It just works.",
    author: "Ubaid",
    role: "Founder",
    company: "Debian Project",
    metric: { value: "∞", label: "Islamic vision" },
  },
  {
    quote: "The Athan daemon and Quran Ayah on my desktop made this feel like home. Beautiful and functional.",
    author: "Ibtisam",
    role: "Medical Student",
    company: "KDE Community",
    metric: { value: "100%", label: "Prayer reminders" },
  },
  {
    quote: "Content filtering at kernel level is something I've wanted for years. This is the real deal.",
    author: "Bazeem",
    role: "AI Expert",
    company: "F-Droid",
    metric: { value: "∞", label: "Haram sites blocked" },
  },
  {
    quote: "Zero telemetry, beautiful KDE Plasma theme, and Islamic values baked in. This is what privacy looks like.",
    author: "Awais",
    role: "MBBS Doctor",
    company: "GNU Project",
    metric: { value: "0", label: "Data sent home" },
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
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
      setDirection("right");
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index: number) => {
    setDirection(index > activeIndex ? "right" : "left");
    setActiveIndex(index);
  };

  const goPrev = () => {
    setDirection("left");
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goNext = () => {
    setDirection("right");
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40 bg-foreground text-background overflow-hidden">
      {/* ASCII background pattern with parallax effect */}
      <div className="absolute inset-0 font-mono text-[10px] text-background/[0.02] leading-tight overflow-hidden whitespace-pre select-none parallax-down">
        {Array.from({ length: 60 }, (_, i) => 
          Array.from({ length: 100 }, () => 
            Math.random() > 0.7 ? '"' : ' '
          ).join("")
        ).join("\n")}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header with scroll animation */}
        <div className="flex items-center justify-between mb-20">
          <div className="fade-in-left" style={{ animationDelay: '0ms' }}>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-background/40 mb-4">
              <span className="w-12 h-px bg-background/20" />
              Testimonials
            </span>
            <h2 className={`text-5xl md:text-6xl lg:text-7xl font-display transition-all duration-1000 text-glow-intense float-slow ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              Trusted by Muslims
              <span className="text-background/40"> worldwide.</span>
            </h2>
          </div>
          
          {/* Navigation arrows with hover effects */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={goPrev}
              className="p-4 border border-background/20 hover:bg-background/10 transition-all duration-300 hover:scale-110 hover-lift"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              className="p-4 border border-background/20 hover:bg-background/10 transition-all duration-300 hover:scale-110 hover-lift"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main content - Split layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Quote side */}
          <div className="lg:col-span-7 relative">
            {/* Large quote mark */}
            <span className="absolute -left-4 -top-8 text-[200px] font-display text-background/5 leading-none select-none">
              &ldquo;
            </span>
            
            <div className="relative">
              <blockquote 
                key={activeIndex}
                className="text-3xl lg:text-4xl xl:text-5xl font-display leading-[1.2] tracking-tight animate-fadeSlideIn"
              >
                {activeTestimonial.quote}
              </blockquote>

              {/* Author */}
              <div className="mt-12 flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-background/10 flex items-center justify-center">
                  <span className="font-display text-xl">
                    {activeTestimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-lg font-medium">{activeTestimonial.author}</p>
                  <p className="text-background/60">
                    {activeTestimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Metric cards side */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-6">
            {/* Active metric - Large */}
            <div 
              key={`metric-${activeIndex}`}
              className="p-10 border border-background/20 bg-background/5 animate-fadeSlideIn"
            >
              <span className="text-7xl lg:text-8xl font-display block mb-4">
                {activeTestimonial.metric.value}
              </span>
              <span className="text-lg text-background/60">
                {activeTestimonial.metric.label}
              </span>
            </div>

            {/* Progress indicators with stagger animation */}
            <div className="flex gap-2 mb-6">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className="flex-1 h-1 bg-background/10 overflow-hidden cursor-pointer hover:bg-background/20 transition-colors"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div 
                    className={`h-full bg-background transition-all duration-300 hover-glow ${
                      idx === activeIndex ? "w-full" : idx < activeIndex ? "w-full opacity-50" : "w-0"
                    }`}
                    style={idx === activeIndex ? { animation: "progress 8s linear forwards" } : {}}
                  />
                </button>
              ))}
            </div>

            {/* Company list with staggered hover effects */}
            <div className="mt-4 pt-6 border-t border-background/10">
              <span className="text-xs font-mono text-background/30 uppercase tracking-widest block mb-4 fade-in-left" style={{ animationDelay: '200ms' }}>
                Featured companies
              </span>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "Debian Project", url: "https://www.debian.org" },
                  { name: "KDE Community", url: "https://www.kde.org" },
                  { name: "F-Droid", url: "https://f-droid.org" },
                  { name: "GNU Project", url: "https://www.gnu.org" },
                ].map((company, idx) => (
                  <a
                    key={company.name}
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 text-sm border transition-all hover-lift card-shine ${
                      idx === activeIndex 
                        ? "border-background/40 text-background pulse-glow" 
                        : "border-background/10 text-background/40 hover:border-background/30 hover:text-background/60"
                    }`}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    {company.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeSlideIn {
          animation: fadeSlideIn 0.5s ease-out forwards;
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
