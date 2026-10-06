import React from 'react';

interface KidrillLogoProps {
  variant?: 'light' | 'dark' | 'monochrome';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const KidrillLogo: React.FC<KidrillLogoProps> = ({
  variant = 'light',
  showTagline = false,
  size = 'md',
  className = '',
}) => {
  // Size metrics
  const symbolSize = size === 'sm' ? 28 : size === 'lg' ? 44 : 34;
  const titleSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-xl' : 'text-lg';
  const taglineSize = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs' : 'text-[10px]';

  // Palette handling:
  // variant='light' means used on LIGHT (white) background -> dark text
  // variant='dark' means used on DARK background -> white text
  const isLightBg = variant === 'light';
  const primaryTextColor = isLightBg ? 'text-slate-900' : 'text-white';
  const tagColor = isLightBg ? 'text-slate-500' : 'text-slate-400';
  const goldAccent = '#b8860b'; // Refined corporate gold

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* Precision Geometric K Emblem */}
      <div 
        className="relative flex items-center justify-center shrink-0" 
        style={{ width: symbolSize, height: symbolSize }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="kidrillGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4af37" />
              <stop offset="60%" stopColor="#b8860b" />
              <stop offset="100%" stopColor="#8c6200" />
            </linearGradient>
          </defs>

          {/* Left Vertical Foundation Pillar */}
          <path
            d="M 14 10 L 32 10 L 32 90 L 14 90 Z"
            fill="url(#kidrillGoldGrad)"
          />

          {/* Upper Diagonal Wing */}
          <path
            d="M 40 46 L 76 10 L 92 10 L 53 49 Z"
            fill={isLightBg ? '#0f172a' : '#ffffff'}
          />

          {/* Lower Diagonal Wing */}
          <path
            d="M 44 45 L 88 90 L 72 90 L 36 54 Z"
            fill="url(#kidrillGoldGrad)"
          />

          {/* Precision Connection Node */}
          <polygon
            points="34,44 48,30 48,58 34,44"
            fill={goldAccent}
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Typography Wordmark */}
      <div className="flex flex-col justify-center leading-none">
        <span 
          className={`font-semibold tracking-[0.2em] font-sans ${primaryTextColor} ${titleSize} transition-colors`}
          style={{ letterSpacing: '0.18em' }}
        >
          KIDRILL <span className="font-light tracking-[0.22em] opacity-90">GROUP</span>
        </span>
        {showTagline && (
          <span 
            className={`font-medium tracking-[0.26em] uppercase mt-1 ${tagColor} ${taglineSize}`}
            style={{ letterSpacing: '0.24em' }}
          >
            GLOBAL RESOURCES. TRUSTED TRADE.
          </span>
        )}
      </div>
    </div>
  );
};
