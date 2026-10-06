import React, { useState } from 'react';
import { Language, NavigationPage, ProductItem } from '../types';
import { copyData } from '../data/uiCopy';
import { productsData } from '../data/translations';
import { VisualAsset } from '../components/VisualAsset';
import { ShieldCheck, ArrowRight, FileText, Globe2, Building2 } from 'lucide-react';

interface ProductsPageProps {
  language: Language;
  onNavigate: (page: NavigationPage) => void;
  onOpenInquiry: (product?: ProductItem) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  language,
  onNavigate,
  onOpenInquiry,
}) => {
  const t = copyData[language].products;
  const [filter, setFilter] = useState<'all' | 'minerals' | 'agriculture' | 'seafood'>('all');

  const filteredProducts = productsData.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <div className="pt-28 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white text-slate-900">
      {/* 1. Header & Filter Bar */}
      <section className="space-y-6 max-w-3xl">
        <span className="text-xs uppercase tracking-[0.25em] text-[#b8860b] font-semibold">
          {language === 'en' ? 'Commodity Catalogue' : '취급 품목 안내'}
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-title font-bold text-slate-900 leading-tight">
          {t.title}
        </h1>
        <p className="text-lg text-slate-600 font-light leading-relaxed">
          {t.subtitle}
        </p>

        {/* Mandatory Information Notice */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs text-slate-700 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-[#b8860b] shrink-0" />
          <span>{t.specAvailableNotice}</span>
        </div>
      </section>

      {/* 2. Interactive Segmented Filter Tabs */}
      <section className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-xl">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              filter === 'all'
                ? 'bg-[#0f172a] text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            {t.filterAll}
          </button>
          <button
            onClick={() => setFilter('minerals')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              filter === 'minerals'
                ? 'bg-[#0f172a] text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            {t.filterMinerals}
          </button>
          <button
            onClick={() => setFilter('agriculture')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              filter === 'agriculture'
                ? 'bg-[#0f172a] text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            {t.filterAgri}
          </button>
          <button
            onClick={() => setFilter('seafood')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              filter === 'seafood'
                ? 'bg-[#0f172a] text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            {t.filterSeafood}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('minerals')}
            className="text-xs text-slate-600 hover:text-[#b8860b] font-medium transition-colors cursor-pointer"
          >
            {language === 'en' ? 'Minerals Section →' : '광물 부문 상세 →'}
          </button>
          <span className="text-slate-300">|</span>
          <button
            onClick={() => onNavigate('agriculture')}
            className="text-xs text-slate-600 hover:text-[#b8860b] font-medium transition-colors cursor-pointer"
          >
            {language === 'en' ? 'Agriculture Section →' : '농산물 부문 상세 →'}
          </button>
          <span className="text-slate-300">|</span>
          <button
            onClick={() => onNavigate('seafood')}
            className="text-xs text-slate-600 hover:text-[#b8860b] font-medium transition-colors cursor-pointer"
          >
            {language === 'en' ? 'Seafood Section →' : '수산물 부문 상세 →'}
          </button>
        </div>
      </section>

      {/* 3. Product Cards Grid with Bright Photography */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((prod) => {
          const assetType =
            prod.id === 'thermal-coking-coal'
              ? 'minerals_coal'
              : prod.id === 'copper-cathode-concentrate'
              ? 'minerals_copper'
              : prod.id === 'vietnamese-fragrant-rice'
              ? 'agri_rice'
              : prod.id === 'vietnamese-robusta-arabica-coffee'
              ? 'agri_coffee'
              : prod.category === 'seafood'
              ? 'seafood_export'
              : 'trading_network';

          return (
            <div
              key={prod.id}
              className="rounded-2xl bg-white border border-slate-200 p-6 space-y-6 shadow-sm hover:shadow-md hover:border-[#b8860b]/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <VisualAsset type={assetType} aspect="16:9" />

                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Globe2 className="w-3.5 h-3.5 text-[#b8860b]" />
                    <span>{prod.origin}</span>
                  </div>
                  <span className="text-[#b8860b] font-semibold">
                    {prod.specStatus}
                  </span>
                </div>

                <h3 className="text-xl font-serif-title font-semibold text-slate-900">
                  {language === 'en' ? prod.nameEn : prod.nameKo}
                </h3>

                <p className="text-xs text-[#b8860b] font-medium">
                  {language === 'en' ? prod.taglineEn : prod.taglineKo}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'en' ? prod.descriptionEn : prod.descriptionKo}
                </p>

                {/* Applications list */}
                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">
                    {t.applicationsLabel}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {prod.applications.map((app, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-medium"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Operating Entity Tag */}
                <div className="pt-2 flex items-center gap-1.5 text-[11px] text-slate-500">
                  <Building2 className="w-3 h-3 text-[#b8860b]" />
                  <span>{prod.handlingEntity}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => onOpenInquiry(prod)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#0f172a] hover:bg-[#1e293b] rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{t.requestBtn}</span>
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
