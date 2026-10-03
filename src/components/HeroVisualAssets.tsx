/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// Sathi Bolus Ornate 3D Logo Lockup matching the reference
export const SathiBolusLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* 3D "Sathi" Calligraphy Script with Gold Glow & Heart Accent */}
      <div className="relative flex items-center justify-center">
        {/* Drop shadow layer */}
        <span
          className="font-script text-5xl sm:text-6xl lg:text-7xl font-bold tracking-wide absolute top-1 left-0.5 text-stone-900/20 blur-[2px] pointer-events-none"
          aria-hidden="true"
        >
          Sathi
        </span>
        {/* Golden outer glow rim */}
        <span
          className="font-script text-5xl sm:text-6xl lg:text-7xl font-bold tracking-wide absolute text-amber-200 select-none scale-[1.03] pointer-events-none"
          style={{
            textShadow: '0 0 12px rgba(251, 191, 36, 0.8), 0 2px 4px rgba(180, 83, 9, 0.9)',
          }}
          aria-hidden="true"
        >
          Sathi
        </span>
        {/* Hot pink primary face with 3D gradient */}
        <span
          className="relative font-script text-5xl sm:text-6xl lg:text-7xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-rose-500 via-pink-600 to-rose-700"
          style={{
            filter: 'drop-shadow(0 2px 3px rgba(136, 19, 55, 0.6))',
          }}
        >
          Sathi
        </span>

        {/* Heart dot over the 'i' */}
        <div className="absolute right-0.5 -top-1 sm:-top-2 lg:-top-3 text-rose-600 animate-pulse">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-rose-600 drop-shadow-[0_1px_2px_rgba(251,191,36,0.8)]" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>

      {/* "BOLUS" in Antique Gold Metallic Serif */}
      <div className="relative -mt-1 sm:-mt-2 flex items-center gap-2">
        <span className="h-[1px] w-4 sm:w-6 bg-gradient-to-r from-transparent to-amber-600" />
        <span
          className="font-cinzel text-xs sm:text-sm lg:text-base font-extrabold tracking-[0.28em] text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-400 to-amber-800 uppercase"
          style={{
            filter: 'drop-shadow(0 1px 1px rgba(255, 255, 255, 0.9))',
          }}
        >
          BOUS
        </span>
        <span className="h-[1px] w-4 sm:w-6 bg-gradient-to-l from-transparent to-amber-600" />
      </div>

      {/* Stylized Pink & Gold Blooming Lotus Motif */}
      <div className="mt-1 flex items-center justify-center">
        <svg className="w-8 h-4 sm:w-10 sm:h-5" viewBox="0 0 40 20" fill="none">
          {/* Golden base scroll */}
          <path
            d="M8 15 C14 18, 26 18, 32 15 C26 13, 14 13, 8 15 Z"
            fill="url(#goldGradient)"
          />
          {/* Outer pink petals */}
          <path
            d="M13 14 C10 10, 11 5, 15 3 C16 7, 16 11, 15 14 Z"
            fill="#e11d48"
            opacity="0.9"
          />
          <path
            d="M27 14 C30 10, 29 5, 25 3 C24 7, 24 11, 25 14 Z"
            fill="#e11d48"
            opacity="0.9"
          />
          {/* Inner petals */}
          <path
            d="M16 14 C15 9, 17 4, 19 2 C20 6, 20 10, 18 14 Z"
            fill="#f43f5e"
          />
          <path
            d="M24 14 C25 9, 23 4, 21 2 C20 6, 20 10, 22 14 Z"
            fill="#f43f5e"
          />
          {/* Center crown petal */}
          <path
            d="M20 1 C21.5 6, 21.5 10, 20 14 C18.5 10, 18.5 6, 20 1 Z"
            fill="#fb7185"
          />
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b45309" />
              <stop offset="50%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

// Ornate Golden Antique Frame Component with delicate decorative rim & woman silhouette line-art
export const AntiqueGoldFrame: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer Golden Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/25 via-pink-400/20 to-amber-200/30 blur-xl pointer-events-none" />

      {/* Ornate Layer 1: Outer metallic ring */}
      <div className="relative w-full h-full rounded-full p-[5px] sm:p-[7px] bg-gradient-to-tr from-amber-700 via-amber-200 to-amber-800 shadow-[0_12px_35px_rgba(180,83,9,0.25)] flex items-center justify-center">
        
        {/* Ornate Layer 2: Beveled middle ring with decorative groove */}
        <div className="w-full h-full rounded-full p-[3px] bg-gradient-to-bl from-amber-300 via-amber-600 to-amber-200 flex items-center justify-center">
          
          {/* Inner Canvas: Soft blush ivory portal */}
          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#FFF9F6] via-[#FAF1ED] to-[#FCEAEF] overflow-hidden border-[3px] border-amber-100/90 shadow-inner">
            
            {/* Subtle inner radial vignette */}
            <div className="absolute inset-0 bg-radial from-transparent via-rose-100/30 to-amber-100/40 pointer-events-none" />

            {/* Subtle botanical line-art / woman profile silhouette on the right rim */}
            <div className="absolute right-1 top-1/4 w-28 h-48 opacity-25 pointer-events-none transform -scale-x-100">
              <svg viewBox="0 0 100 200" fill="none" stroke="currentColor" className="text-amber-800 w-full h-full">
                <path
                  d="M30,20 Q60,30 50,60 Q45,75 55,90 Q65,105 50,130 Q40,150 45,180"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M50,60 Q70,62 75,70 Q70,80 55,90"
                  strokeWidth="1.2"
                />
                <circle cx="50" cy="55" r="2" fill="currentColor" />
              </svg>
            </div>

            {/* Content inside frame */}
            {children}
          </div>

        </div>
      </div>

      {/* Golden Foliage / Leaf Sprigs on top-right of the frame */}
      <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-20 h-20 sm:w-28 sm:h-28 pointer-events-none animate-gentle-sway">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_4px_8px_rgba(180,83,9,0.3)]">
          {/* Golden stem */}
          <path d="M10,80 Q50,50 85,15" stroke="url(#goldLeafGrad)" strokeWidth="2.5" strokeLinecap="round" />
          {/* Golden leaves */}
          <path d="M40,55 C35,45 42,32 55,38 C60,48 50,58 40,55 Z" fill="url(#goldLeafGrad)" />
          <path d="M60,40 C65,30 78,25 80,38 C75,48 65,46 60,40 Z" fill="url(#goldLeafGrad)" />
          <path d="M75,25 C75,12 88,10 92,20 C88,30 78,32 75,25 Z" fill="url(#goldLeafGrad)" />
          <path d="M25,65 C15,60 18,48 28,52 C32,60 28,68 25,65 Z" fill="url(#goldLeafGrad)" />
          <defs>
            <linearGradient id="goldLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#d97706" />
              <stop offset="80%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom Golden scroll flourish */}
      <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-16 h-16 pointer-events-none opacity-85">
        <svg viewBox="0 0 80 80" fill="none" className="w-full h-full drop-shadow-[0_2px_4px_rgba(180,83,9,0.25)]">
          <path d="M70,10 Q40,30 20,60 C15,68 8,62 12,50 C18,35 35,30 50,20" stroke="url(#goldLeafGrad)" strokeWidth="2" strokeLinecap="round" />
          <path d="M25,50 C20,40 12,42 16,52 C20,58 26,55 25,50 Z" fill="url(#goldLeafGrad)" />
        </svg>
      </div>
    </div>
  );
};

// Realistic Floating Rose Petal Vector
export const FloatingPetal: React.FC<{
  className?: string;
  size?: number;
  rotation?: number;
  delay?: string;
}> = ({ className = '', size = 24, rotation = 0 }) => {
  return (
    <div
      className={`absolute pointer-events-none select-none ${className}`}
      style={{
        width: `${size}px`,
        height: `${size * 1.3}px`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <svg viewBox="0 0 30 40" fill="none" className="w-full h-full drop-shadow-[0_2px_4px_rgba(190,24,93,0.2)]">
        <path
          d="M15,2 C25,8 29,22 25,32 C20,38 10,38 5,32 C1,22 5,8 15,2 Z"
          fill="url(#petalGradient)"
        />
        {/* Petal inner vein highlight */}
        <path
          d="M15,6 Q16,20 15,34"
          stroke="#fda4af"
          strokeWidth="0.75"
          opacity="0.6"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="petalGradient" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="45%" stopColor="#ec4899" />
            <stop offset="85%" stopColor="#db2777" />
            <stop offset="100%" stopColor="#be185d" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
