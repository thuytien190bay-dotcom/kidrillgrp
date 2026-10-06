import React from 'react';
import { Language, NavigationPage, ProductItem } from '../types';
import { productsData, companiesData } from '../data/translations';
import { VisualAsset } from '../components/VisualAsset';
import { ShieldCheck, ArrowRight, Building2, FileText } from 'lucide-react';

interface MineralsPageProps {
  language: Language;
  onNavigate: (page: NavigationPage) => void;
  onOpenInquiry: (product?: ProductItem) => void;
}

export const MineralsPage: React.FC<MineralsPageProps> = ({
  language,
  onNavigate,
  onOpenInquiry,
}) => {
  const mineralProducts = productsData.filter((p) => p.category === 'minerals');
  const comp = companiesData.id;

  return (
    <div className="pt-28 pb-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white text-slate-900">
      {/* 1. Category Header */}
      <section className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#b8860b] uppercase tracking-wider font-semibold">
          <Building2 className="w-4 h-4" />
          <span>PT PMA KIDRILL METAL MINING · SURABAYA</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-title font-bold text-slate-900 leading-tight">
          {language === 'en' ? 'Minerals & Metals' : '광물 및 금속 자원'}
        </h1>
        <p className="text-lg text-slate-600 font-light leading-relaxed">
          {language === 'en'
            ? 'International sourcing and physical trading of coal, high-purity copper cathodes, base metals, and mining commodities connecting Indonesian concessions to global industrial smelters and energy utilities.'
            : '인도네시아 주요 광산과 글로벌 제련소 및 발전소를 연결하는 연료탄, 고순도 전기동 및 산업용 비철금속의 국제 실물 무역을 수행합니다.'}
        </p>

        {/* Spec Disclaimer Notice */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs text-slate-700 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-[#b8860b] shrink-0" />
          <span>
            {language === 'en'
              ? 'Technical assays, calorific specifications, and vessel loading schedules: Available upon request.'
              : '광물 분석 시험성적서, 발열량 규격 및 선적 일정: 요청 시 제공 가능합니다.'}
          </span>
        </div>
      </section>

      {/* 2. Visual Marquee & Logistics Feature with Photography */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <VisualAsset type="minerals_copper" aspect="16:9" title="Refined Copper Anodes & Cathode Plates" />
        </div>
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] text-[#b8860b] font-semibold">
            {language === 'en' ? 'Operating Philosophy' : '광물 무역 원칙'}
          </span>
          <h3 className="text-2xl font-serif-title font-semibold text-slate-900">
            {language === 'en' ? 'Direct Concession Sourcing & Port Verification' : '광산 직접 소싱 및 선적항 품질 검증'}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {language === 'en'
              ? 'Our mineral trade desk in Surabaya manages physical commodity flows from origin concessions through river barging, anchorage transshipment, and ocean vessel loading. We coordinate with international independent inspection agencies to verify specifications prior to vessel departure.'
              : '수라바야 무역 데스크는 광산 현장 조달부터 바지선 환적, 본선 적재에 이르는 전 과정을 철저히 모니터링합니다. 선적 전 국제 공인 검사기관의 품질 검증을 거쳐 규격에 부합하는 원자재만을 안정적으로 인도합니다.'}
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenInquiry()}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0f172a] hover:bg-[#1e293b] rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <span>{language === 'en' ? 'Request Commodity Quote' : '원자재 견적 요청'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Product Listings */}
      <section className="space-y-8 border-t border-slate-200 pt-16">
        <h2 className="text-2xl sm:text-3xl font-serif-title font-semibold text-slate-900">
          {language === 'en' ? 'Key Mineral Commodities' : '취급 광물 및 금속 품목'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mineralProducts.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl bg-white border border-slate-200 p-6 space-y-5 shadow-sm hover:shadow-md hover:border-[#b8860b]/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <VisualAsset
                  type={p.id === 'thermal-coking-coal' ? 'minerals_coal' : 'minerals_copper'}
                  aspect="16:9"
                />
                <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>{p.origin}</span>
                  <span className="text-[#b8860b] font-semibold">{p.specStatus}</span>
                </div>
                <h3 className="text-xl font-serif-title font-semibold text-slate-900">
                  {language === 'en' ? p.nameEn : p.nameKo}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'en' ? p.descriptionEn : p.descriptionKo}
                </p>
                <div className="pt-2 border-t border-slate-100 space-y-1">
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">
                    {language === 'en' ? 'Target Applications:' : '주요 활용 분야:'}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {p.applications.map((app, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenInquiry(p)}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#0f172a] hover:bg-[#1e293b] rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'REQUEST PRODUCT INFORMATION' : '품목 상세 정보 요청'}</span>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
