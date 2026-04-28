"use client";

import React from 'react';

export function IslamicGeometricBackground() {
  return (
    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full text-accent fill-none stroke-current"
        style={{ strokeWidth: '0.1' }}
      >
        <defs>
          <pattern
            id="islamic-pattern"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <g className="animate-pulse-slow">
              {/* Simple 8-point star geometric element */}
              <path
                d="M10,2 L12,8 L18,10 L12,12 L10,18 L8,12 L2,10 L8,8 Z"
                className="rotate-pattern"
                style={{ transformOrigin: '10px 10px' }}
              />
              <circle cx="10" cy="10" r="1.5" />
            </g>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#islamic-pattern)" />
      </svg>
      <style jsx>{`
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .rotate-pattern {
          animation: rotate-slow 20s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
