import React, { useState } from 'react';

export type VisualAssetType =
  | 'hero_port'
  | 'minerals_copper'
  | 'minerals_coal'
  | 'agri_coffee'
  | 'agri_rice'
  | 'seafood_export'
  | 'trading_network'
  | 'company_surabaya'
  | 'company_hcmc'
  | 'sustainability_env'
  | 'project_partner';

interface VisualAssetProps {
  type: VisualAssetType;
  customSrc?: string;
  className?: string;
  aspect?: '16:9' | '4:3' | '3:2' | '21:9' | '1:1';
  title?: string;
  alt?: string;
}

// Curated high-resolution bright corporate photography with multi-source fallback
const photoMap: Record<VisualAssetType, { urls: string[]; fallbackAlt: string }> = {
  company_hcmc: {
    urls: [
      'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1200&q=85',
    ],
    fallbackAlt: 'Golden King Tower modern corporate commercial office skyscraper in Ho Chi Minh City, Vietnam',
  },
  company_surabaya: {
    urls: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1200&q=85',
    ],
    fallbackAlt: 'Pakuwon Centre modern commercial office tower in Surabaya, Indonesia',
  },
  hero_port: {
    urls: [
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=85',
    ],
    fallbackAlt: 'Major ocean bulk carrier container vessel navigating deep sea waters in clear daylight',
  },
  minerals_copper: {
    urls: [
      'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=85',
    ],
    fallbackAlt: 'High-purity refined copper sheets and industrial metal cathode ingots',
  },
  minerals_coal: {
    urls: [
      'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
    ],
    fallbackAlt: 'Bulk mineral resources and thermal energy coal handling facility',
  },
  agri_coffee: {
    urls: [
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85',
    ],
    fallbackAlt: 'Export grade raw green and roasted coffee beans from Vietnam Central Highlands',
  },
  agri_rice: {
    urls: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=85',
    ],
    fallbackAlt: 'Premium export Vietnamese fragrant jasmine rice grains and harvest',
  },
  seafood_export: {
    urls: [
      'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=1200&q=85',
    ],
    fallbackAlt: 'Fresh export quality Black Tiger prawns and seafood on crystalline ice',
  },
  trading_network: {
    urls: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f6?auto=format&fit=crop&w=1400&q=85',
    ],
    fallbackAlt: 'International cargo container logistics hub with gantry cranes',
  },
  sustainability_env: {
    urls: [
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=85',
    ],
    fallbackAlt: 'Clean blue ocean waters and environmental stewardship',
  },
  project_partner: {
    urls: [
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=85',
    ],
    fallbackAlt: 'International corporate B2B trading partnership and strategic alliance',
  },
};

export const VisualAsset: React.FC<VisualAssetProps> = ({
  type,
  customSrc,
  className = '',
  aspect = '16:9',
  title,
  alt,
}) => {
  const photo = photoMap[type] || photoMap.hero_port;
  const urls = customSrc ? [customSrc, ...photo.urls] : photo.urls;
  const [urlIndex, setUrlIndex] = useState(0);
  const [allFailed, setAllFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const aspectClass =
    aspect === '4:3'
      ? 'aspect-[4/3]'
      : aspect === '3:2'
      ? 'aspect-[3/2]'
      : aspect === '21:9'
      ? 'aspect-[21/9]'
      : aspect === '1:1'
      ? 'aspect-square'
      : 'aspect-[16/9]';

  const currentUrl = urls[urlIndex];

  const handleImageError = () => {
    if (urlIndex + 1 < urls.length) {
      setUrlIndex((prev) => prev + 1);
    } else {
      setAllFailed(true);
    }
  };

  return (
    <div
      className={`relative overflow-hidden w-full ${aspectClass} rounded-xl bg-slate-100 border border-slate-200 shadow-sm group ${className}`}
    >
      {/* 1. Real High-Resolution Photographic Image */}
      {!allFailed && currentUrl && (
        <img
          key={currentUrl}
          src={currentUrl}
          alt={alt || photo.fallbackAlt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={handleImageError}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* 2. Specialized Realistic Architectural / Industrial SVG Fallback */}
      {(!imgLoaded || allFailed) && (
        <div className="absolute inset-0 w-full h-full">
          {/* Detailed Office Tower Architecture for HCMC / Golden King Tower */}
          {(type === 'company_hcmc' || type === 'company_surabaya') ? (
            <svg
              viewBox="0 0 800 450"
              className="w-full h-full object-cover"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="45%" stopColor="#7dd3fc" />
                  <stop offset="80%" stopColor="#bae6fd" />
                  <stop offset="100%" stopColor="#f0f9ff" />
                </linearGradient>
                <linearGradient id="towerGlassGrad1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1e3a8a" />
                  <stop offset="35%" stopColor="#0284c7" />
                  <stop offset="70%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#bae6fd" />
                </linearGradient>
                <linearGradient id="towerGlassGrad2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="40%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>
                <linearGradient id="sunReflection" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Daylight Sky */}
              <rect width="800" height="450" fill="url(#skyGrad)" />
              {/* Soft clouds */}
              <ellipse cx="180" cy="90" rx="140" ry="30" fill="#ffffff" fillOpacity="0.4" />
              <ellipse cx="650" cy="70" rx="120" ry="25" fill="#ffffff" fillOpacity="0.4" />

              {/* Background City Skyline Silhouettes */}
              <polygon points="60,450 60,260 110,260 110,210 160,210 160,450" fill="#93c5fd" fillOpacity="0.4" />
              <polygon points="170,450 170,240 230,240 230,450" fill="#93c5fd" fillOpacity="0.35" />
              <polygon points="570,450 570,220 630,220 630,180 670,180 670,450" fill="#93c5fd" fillOpacity="0.4" />
              <polygon points="680,450 680,260 740,260 740,450" fill="#93c5fd" fillOpacity="0.3" />

              {/* Main Landmark Modern Glass Office Tower (Golden King / Pakuwon Centre) */}
              {/* Left Wing Facet */}
              <polygon points="270,450 270,90 380,40 380,450" fill="url(#towerGlassGrad2)" />
              {/* Center Main Glass Facade */}
              <polygon points="380,450 380,40 520,70 520,450" fill="url(#towerGlassGrad1)" />
              {/* Right Beveled Facet */}
              <polygon points="520,450 520,70 550,110 550,450" fill="#0369a1" />

              {/* Tower Spire / Architectural Crown */}
              <line x1="380" y1="40" x2="380" y2="10" stroke="#b8860b" strokeWidth="3" />
              <circle cx="380" cy="10" r="3" fill="#b8860b" />
              <polygon points="350,45 380,25 410,45 380,55" fill="#b8860b" fillOpacity="0.7" />

              {/* Glass Floor Plates & Architectural Mullions */}
              {[
                70, 95, 120, 145, 170, 195, 220, 245, 270, 295, 320, 345, 370, 395, 420
              ].map((y, idx) => (
                <g key={idx}>
                  <line x1="270" y1={y + 10} x2="380" y2={y - 8} stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1" />
                  <line x1="380" y1={y - 8} x2="520" y2={y + 6} stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.5" />
                  <line x1="520" y1={y + 6} x2="550" y2={y + 18} stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1" />
                </g>
              ))}

              {/* Vertical Glass Structural Ribs */}
              <line x1="310" y1="75" x2="310" y2="450" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1" />
              <line x1="350" y1="55" x2="350" y2="450" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1" />
              <line x1="420" y1="48" x2="420" y2="450" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
              <line x1="460" y1="56" x2="460" y2="450" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
              <line x1="495" y1="65" x2="495" y2="450" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1.2" />

              {/* Sunlight Glare Reflection Across Glass Facade */}
              <polygon points="380,120 480,140 440,280 380,240" fill="url(#sunReflection)" />

              {/* Ground Plaza & Modern Commercial Entrance */}
              <rect x="0" y="420" width="800" height="30" fill="#0f172a" />
              <polygon points="320,450 320,400 480,400 480,450" fill="#0284c7" fillOpacity="0.3" />
              {/* Grand Entrance Canopy */}
              <rect x="330" y="405" width="140" height="8" fill="#b8860b" />
              <line x1="350" y1="413" x2="350" y2="450" stroke="#b8860b" strokeWidth="2" />
              <line x1="450" y1="413" x2="450" y2="450" stroke="#b8860b" strokeWidth="2" />

              {/* Commercial Plaza Trees */}
              {[120, 180, 240, 580, 640, 700].map((x, i) => (
                <g key={i}>
                  <line x1={x} y1="420" x2={x} y2="445" stroke="#475569" strokeWidth="2" />
                  <ellipse cx={x} cy="410" rx="14" ry="22" fill="#059669" />
                  <ellipse cx={x + 3} cy="406" rx="10" ry="16" fill="#10b981" />
                </g>
              ))}

              {/* Corporate Tower Architectural Badge */}
              <rect x="20" y="20" width="180" height="30" rx="6" fill="#ffffff" fillOpacity="0.9" />
              <text x="32" y="40" fill="#0f172a" fontSize="11" fontWeight="700" fontFamily="sans-serif">
                {type === 'company_hcmc' ? 'GOLDEN KING TOWER' : 'PAKUWON CENTRE'}
              </text>
            </svg>
          ) : (
            /* Generic Clean Architectural SVG */
            <svg
              viewBox="0 0 800 450"
              className="w-full h-full object-cover"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="800" height="450" fill="#f1f5f9" />
              <path d="M 0 450 L 300 220 L 500 350 L 800 150 L 800 450 Z" fill="#e2e8f0" />
              <line x1="0" y1="450" x2="800" y2="450" stroke="#cbd5e1" strokeWidth="2" />
            </svg>
          )}
        </div>
      )}

      {/* Subtle Light Scrim for crisp text contrast when titles are overlaid */}
      {title && (
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent pointer-events-none flex items-end p-5">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#e5c07b] font-semibold block drop-shadow-sm">
              Kidrill Corporate Asset
            </span>
            <span className="text-sm sm:text-base font-serif-title font-semibold text-white drop-shadow-sm">
              {title}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
