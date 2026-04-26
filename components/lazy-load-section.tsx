"use client";

import { useEffect, useRef, useState } from "react";

interface LazyLoadSectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}

/**
 * LazyLoadSection
 *
 * Optimized for SEO and Performance.
 * Uses IntersectionObserver to trigger animations/high-priority effects,
 * but ensures content is present in the DOM for SEO (SSG).
 *
 * We use 'content-visibility: auto' for modern browser performance benefits
 * while keeping the content accessible to search engines.
 */
export function LazyLoadSection({
  children,
  className = "",
  threshold = 0.1,
}: LazyLoadSectionProps) {
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, just show it
    if (!("IntersectionObserver" in window)) {
      setHasBeenVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeenVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        // Start loading slightly before it enters the viewport
        rootMargin: "200px 0px"
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: hasBeenVisible ? 1 : 0.4,
        transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        // SEO: Keep content in DOM but use modern CSS for rendering optimization
        // @ts-ignore - contentVisibility is a newer CSS property
        contentVisibility: hasBeenVisible ? "visible" : "auto",
        containIntrinsicSize: "0 500px",
      }}
    >
      {/*
        We always render children for SEO (so they are in the static HTML).
        The 'content-visibility' property handles the performance optimization
        by skipping rendering of off-screen elements.
      */}
      {children}
    </div>
  );
}
