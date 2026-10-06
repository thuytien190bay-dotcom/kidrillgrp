import React, { useState } from 'react';
import { Language, NavigationPage, MarketRegion } from '../types';
import { copyData } from '../data/uiCopy';
import { marketRegionsData } from '../data/translations';
import { WorldTradeMap } from '../components/WorldTradeMap';
import { ArrowRight } from 'lucide-react';

interface MarketsPageProps {
  language: Language;
  onNavigate: (page: NavigationPage) => void;
  onOpenInquiry: () => void;
}

export const MarketsPage: React.FC<MarketsPageProps> = ({
  language,
  onNavigate,
  onOpenInquiry,
}) => {
  const t = copyData[language].markets;
  const [selectedRegion, setSelectedRegion] = useState<MarketRegion>(marketRegionsData[0]);

  return (
    <div className="pt-28 pb-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white text-slate-900">
      {/* 1. Header */}
      <section className="space-y-6 max-w-3xl">
        <span className="text-xs uppercase tracking-[0.25em] text-[#b8860b] font-semibold">
          {t.kicker}
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-title font-bold text-slate-900 leading-tight">
          {t.title}
        </h1>
        <p className="text-lg text-slate-600 font-light leading-relaxed">
          {t.subtitle}
        </p>
        <p className="text-sm text-slate-500 leading-relaxed">
          {t.focusStatement}
        </p>
      </section>

      {/* 2. Interactive World Map */}
      <section className="space-y-6">
        <WorldTradeMap
          language={language}
          onSelectRegion={(reg) => setSelectedRegion(reg)}
        />
      </section>

      {/* 3. Detailed Regional Grid */}
      <section className="space-y-8 border-t border-slate-200 pt-16">
        <div className="max-w-xl">
          <span className="text-xs uppercase tracking-[0.25em] text-[#b8860b] font-semibold">
            {language === 'en' ? 'Regional Profiles' : '권역별 무역 거점 프로필'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif-title font-semibold text-slate-900 mt-1">
            {language === 'en' ? 'Core Market Corridors' : '주요 진출 시장 분석'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketRegionsData.map((reg) => (
            <div
              key={reg.id}
              className={`p-6 rounded-2xl border transition-all space-y-4 flex flex-col justify-between ${
                selectedRegion.id === reg.id
                  ? 'bg-slate-50 border-[#b8860b] shadow-md'
                  : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span className="text-[#b8860b] uppercase tracking-wider font-semibold">
                    {language === 'en' ? reg.nameEn : reg.nameKo}
                  </span>
                  <span className="text-slate-400">CORRIDOR ACTIVE</span>
                </div>

                <h3 className="text-xl font-serif-title font-semibold text-slate-900">
                  {language === 'en' ? reg.roleEn : reg.roleKo}
                </h3>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">
                    {language === 'en' ? 'Traded Commodities:' : '취급 원자재 및 품목:'}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {(language === 'en' ? reg.commoditiesEn : reg.commoditiesKo).map((c, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 font-medium"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={onOpenInquiry}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#b8860b] hover:text-slate-900 cursor-pointer"
                >
                  <span>{language === 'en' ? 'Inquire for this Market' : '해당 권역 거래 상담'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
