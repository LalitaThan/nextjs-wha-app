import React from 'react';
import { cn } from '@/lib/utils';

interface Flip7LogoProps {
  className?: string;
}

export const Flip7Logo = ({ className }: Flip7LogoProps) => {
  return (
    <div className={cn("relative flex items-center justify-center p-8", className)}>
      {/* Fan Cards Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[ -24, -12, 0, 12, 24 ].map((angle, i) => (
          <div 
            key={i}
            className="absolute w-24 h-36 bg-white border-2 border-gray-200 rounded-xl shadow-sm"
            style={{ 
              transform: `rotate(${angle}deg) translateX(${i * 4}px)`, 
              zIndex: 10 - Math.abs(angle),
              backgroundColor: [ '#3CC4BD', '#FFD23F', '#EF6C4A', '#5DADE2', '#FFFFFF'][i]
            }} 
          />
        ))}
      </div>

      {/* FLIP7 Text Group */}
      <div className="relative z-20 flex items-baseline gap-1 transform -rotate-3">
        {/* Cream Parallelogram Background */}
        <div className="absolute inset-0 bg-[var(--flip7-cream)] border-2 border-[var(--flip7-teal-dark)] skew-x-[-6deg] translate-x-2 translate-y-1" />
        
        <span className="relative text-6xl font-extrabold text-[var(--flip7-teal-dark)] tracking-wider drop-shadow-sm">
          FLIP
        </span>
        <span className="relative text-9xl font-extrabold text-[var(--flip7-gold)] rotate-6 drop-shadow-md">
          7
        </span>
      </div>

      {/* Ribbon Banner */}
      <div className="absolute bottom-0 z-30 flex items-center justify-center">
        <div className="relative bg-[var(--flip7-cream)] border-[3px] border-[var(--flip7-teal-dark)] py-1 px-8 text-lg font-extrabold text-[var(--flip7-teal-dark)] tracking-[8px] uppercase shadow-sm">
          SCORING APP
          {/* Ribbon Tails */}
          <div className="absolute -left-2 top-2 w-4 h-full bg-[var(--flip7-teal-dark)] -z-10 transform skew-y-2" />
          <div className="absolute -right-2 top-2 w-4 h-full bg-[var(--flip7-teal-dark)] -z-10 transform -skew-y-2" />
        </div>
      </div>
    </div>
  );
};
