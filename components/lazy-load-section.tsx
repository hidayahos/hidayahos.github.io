"use client";

import { useEffect, useRef, useState } from "react";

interface LazyLoadSectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}

export function LazyLoadSection({
  children,
  className = "",
  threshold = 0.1,
}: LazyLoadSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
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
        opacity: isVisible ? 1 : 0.3,
        transition: "opacity 0.3s ease-out",
      }}
    >
      {isVisible ? children : <div className="min-h-screen" />}
    </div>
  );
}
