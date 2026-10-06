import React, { useState } from 'react';
import { marketRegionsData } from '../data/translations';
import { Language, MarketRegion } from '../types';

interface WorldTradeMapProps {
  language: Language;
  onSelectRegion?: (region: MarketRegion) => void;
}

export const WorldTradeMap: React.FC<WorldTradeMapProps> = ({
  language,
  onSelectRegion,
}) => {
  const [activeRegionId, setActiveRegionId] = useState<string>('indonesia');

  const activeRegion = marketRegionsData.find((r) => r.id === activeRegionId) || marketRegionsData[0];

  const tradeCorridors = [
    { from: { x: 770, y: 315 }, to: { x: 805, y: 200 }, label: 'Indonesia → South Korea (Coal/Metals)' },
    { from: { x: 770, y: 315 }, to: { x: 745, y: 215 }, label: 'Indonesia → China (Bulk Minerals)' },
    { from: { x: 770, y: 315 }, to: { x: 505, y: 170 }, label: 'Indonesia → Europe (Copper/Cathodes)' },
    { from: { x: 755, y: 280 }, to: { x: 805, y: 200 }, label: 'Vietnam → South Korea (Seafood/Coffee)' },
    { from: { x: 755, y: 280 }, to: { x: 230, y: 195 }, label: 'Vietnam → United States (Grains/Seafood)' },
    { from: { x: 755, y: 280 }, to: { x: 505, y: 170 }, label: 'Vietnam → Europe (Agricultural Goods)' },
  ];

  return (
    <div className="relative w-full rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden shadow-sm p-6 md:p-10">
      {/* Background Matrix & Subtle Latitude Grids */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Header Info Bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#b8860b] font-semibold">
            {language === 'en' ? 'Global Trade Network' : '글로벌 무역 회랑'}
          </span>
          <h4 className="text-xl md:text-2xl font-serif-title font-semibold text-slate-900 mt-1">
            {language === 'en' ? 'Cross-Border Logistics & Marine Corridors' : '국제 해상 물류 및 전략 교역로'}
          </h4>
        </div>

        {/* Region Pills as functional selector buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl shadow-xs">
          {marketRegionsData.map((reg) => (
            <button
              key={reg.id}
              onClick={() => {
                setActiveRegionId(reg.id);
                if (onSelectRegion) onSelectRegion(reg);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeRegionId === reg.id
                  ? 'bg-[#0f172a] text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {language === 'en' ? reg.nameEn : reg.nameKo}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Map Container */}
      <div className="relative w-full aspect-[2/1] my-4 overflow-hidden">
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="corridorGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b8860b" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#b8860b" stopOpacity="0.9" />
            </linearGradient>

            <filter id="glowLight" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Latitude & Longitude Latice Lines */}
          <line x1="0" y1="125" x2="1000" y2="125" stroke="rgba(148, 163, 184, 0.25)" strokeDasharray="3 6" />
          <line x1="0" y1="250" x2="1000" y2="250" stroke="rgba(148, 163, 184, 0.35)" strokeDasharray="4 4" />
          <line x1="0" y1="375" x2="1000" y2="375" stroke="rgba(148, 163, 184, 0.25)" strokeDasharray="3 6" />
          
          <line x1="250" y1="0" x2="250" y2="500" stroke="rgba(148, 163, 184, 0.25)" strokeDasharray="3 6" />
          <line x1="500" y1="0" x2="500" y2="500" stroke="rgba(148, 163, 184, 0.3)" strokeDasharray="3 6" />
          <line x1="750" y1="0" x2="750" y2="500" stroke="rgba(148, 163, 184, 0.25)" strokeDasharray="3 6" />

          {/* Minimalist Architectural Continents Outlines */}
          {/* North America */}
          <path
            d="M 120 110 C 140 90, 200 80, 260 90 C 290 120, 270 170, 260 210 C 240 230, 210 240, 180 230 C 150 200, 130 160, 120 110 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1.2"
          />
          {/* South America */}
          <path
            d="M 260 260 C 285 270, 310 320, 290 390 C 265 420, 240 380, 235 330 C 235 290, 245 270, 260 260 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1.2"
          />
          {/* Europe */}
          <path
            d="M 460 130 C 510 110, 545 130, 550 170 C 520 190, 480 195, 460 175 C 445 155, 450 140, 460 130 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1.2"
          />
          {/* Africa */}
          <path
            d="M 470 205 C 530 200, 560 250, 550 330 C 525 385, 480 370, 460 310 C 445 260, 450 220, 470 205 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1.2"
          />
          {/* Asia / Eurasia */}
          <path
            d="M 560 125 C 670 90, 830 110, 840 180 C 850 220, 810 260, 770 270 C 730 270, 700 240, 660 220 C 600 200, 565 170, 560 125 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1.2"
          />
          {/* Southeast Asia Archipelago & Indochina */}
          <path
            d="M 725 240 C 765 240, 775 275, 760 300 C 740 310, 720 280, 725 240 Z"
            fill="#cbd5e1"
            stroke="#b8860b"
            strokeWidth="1.5"
          />
          {/* Indonesia Island Chain */}
          <path
            d="M 720 325 C 750 320, 810 325, 830 335 C 800 350, 740 345, 720 325 Z"
            fill="#cbd5e1"
            stroke="#b8860b"
            strokeWidth="2"
          />
          {/* Australia */}
          <path
            d="M 790 360 C 850 350, 880 390, 860 435 C 810 445, 780 415, 790 360 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1.2"
          />

          {/* Trade Route Arcs */}
          {tradeCorridors.map((c, idx) => {
            const midX = (c.from.x + c.to.x) / 2;
            const midY = Math.min(c.from.y, c.to.y) - 45;
            const d = `M ${c.from.x} ${c.from.y} Q ${midX} ${midY} ${c.to.x} ${c.to.y}`;
            return (
              <g key={idx}>
                <path
                  d={d}
                  fill="none"
                  stroke="url(#corridorGradLight)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="opacity-80"
                />
              </g>
            );
          })}

          {/* Regional Network Nodes */}
          {/* Indonesia Hub (PT PMA Kidrill Metal Mining - Surabaya) */}
          <g 
            className="cursor-pointer group" 
            onClick={() => setActiveRegionId('indonesia')}
          >
            <circle cx="770" cy="315" r="14" fill="#b8860b" fillOpacity="0.25" className="animate-ping" />
            <circle cx="770" cy="315" r="7" fill="#b8860b" stroke="#ffffff" strokeWidth="2" filter="url(#glowLight)" />
            <text x="785" y="320" fill="#0f172a" fontSize="11" fontWeight="700" letterSpacing="0.03em">
              Surabaya, ID
            </text>
          </g>

          {/* Vietnam Hub (Thunder Mark Vietnam Co., Ltd - HCMC) */}
          <g 
            className="cursor-pointer group" 
            onClick={() => setActiveRegionId('vietnam')}
          >
            <circle cx="755" cy="275" r="12" fill="#0284c7" fillOpacity="0.25" className="animate-ping" style={{ animationDelay: '500ms' }} />
            <circle cx="755" cy="275" r="6.5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" filter="url(#glowLight)" />
            <text x="770" y="278" fill="#0f172a" fontSize="11" fontWeight="700" letterSpacing="0.03em">
              Ho Chi Minh City, VN
            </text>
          </g>

          {/* China Node */}
          <g className="cursor-pointer group" onClick={() => setActiveRegionId('china')}>
            <circle cx="745" cy="215" r="5" fill="#475569" stroke="#ffffff" strokeWidth="1.5" />
            <text x="705" y="205" fill="#334155" fontSize="10" fontWeight="600">
              China
            </text>
          </g>

          {/* South Korea Node */}
          <g className="cursor-pointer group" onClick={() => setActiveRegionId('south-korea')}>
            <circle cx="805" cy="195" r="5.5" fill="#b8860b" stroke="#ffffff" strokeWidth="1.5" />
            <text x="818" y="198" fill="#0f172a" fontSize="10" fontWeight="700">
              South Korea
            </text>
          </g>

          {/* Europe Node */}
          <g className="cursor-pointer group" onClick={() => setActiveRegionId('europe')}>
            <circle cx="505" cy="165" r="5.5" fill="#475569" stroke="#ffffff" strokeWidth="1.5" />
            <text x="465" y="155" fill="#334155" fontSize="10" fontWeight="600">
              Europe
            </text>
          </g>

          {/* United States Node */}
          <g className="cursor-pointer group" onClick={() => setActiveRegionId('united-states')}>
            <circle cx="230" cy="190" r="5.5" fill="#475569" stroke="#ffffff" strokeWidth="1.5" />
            <text x="210" y="175" fill="#334155" fontSize="10" fontWeight="600">
              United States
            </text>
          </g>

          {/* Southeast Asia Regional Node */}
          <g className="cursor-pointer group" onClick={() => setActiveRegionId('southeast-asia')}>
            <circle cx="735" cy="295" r="4.5" fill="#64748b" stroke="#ffffff" strokeWidth="1" />
          </g>
        </svg>
      </div>

      {/* Selected Market Card Detail Footer */}
      <div className="relative z-10 mt-2 p-5 rounded-xl bg-white border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#b8860b]">
            <span className="font-semibold">{language === 'en' ? 'SELECTED REGIONAL CORRIDOR' : '선택된 무역 권역'}</span>
            <span>·</span>
            <span className="text-slate-600 font-sans">{language === 'en' ? activeRegion.roleEn : activeRegion.roleKo}</span>
          </div>
          <h5 className="text-lg font-serif-title font-bold text-slate-900 mt-1">
            {language === 'en' ? activeRegion.nameEn : activeRegion.nameKo}
          </h5>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">
            {language === 'en' ? 'Key Traded Commodities:' : '주요 교역 품목:'}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {(language === 'en' ? activeRegion.commoditiesEn : activeRegion.commoditiesKo).map((c, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-800 font-medium"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
