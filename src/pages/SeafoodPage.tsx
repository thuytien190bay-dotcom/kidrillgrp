import React from 'react';
import { Language, NavigationPage, ProductItem } from '../types';
import { productsData, companiesData } from '../data/translations';
import { VisualAsset } from '../components/VisualAsset';
import { ShieldCheck, ArrowRight, Building2, FileText } from 'lucide-react';

interface SeafoodPageProps {
  language: Language;
  onNavigate: (page: NavigationPage) => void;
  onOpenInquiry: (product?: ProductItem) => void;
}

export const SeafoodPage: React.FC<SeafoodPageProps> = ({
  language,
  onNavigate,
  onOpenInquiry,
}) => {
  const seafoodProducts = productsData.filter((p) => p.category === 'seafood');
  const comp = companiesData.vn;

  return (
    <div className="pt-28 pb-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white text-slate-900">
      {/* 1. Category Header */}
      <section className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#b8860b] uppercase tracking-wider font-semibold">
          <Building2 className="w-4 h-4" />
          <span>THUNDER MARK VIETNAM CO., LTD · HO CHI MINH CITY</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-title font-bold text-slate-900 leading-tight">
          {language === 'en' ? 'Seafood Export' : '수산물 수출'}
        </h1>
        <p className="text-lg text-slate-600 font-light leading-relaxed">
          {language === 'en'
            ? 'International sourcing and export of premium Vietnamese aquaculture and offshore marine catches, processed under rigorous temperature-controlled cold-chain standards for global importers and wholesale distributors.'
            : '엄격한 위생 기준과 콜드체인 관리 하에 가공된 베트남산 프리미엄 냉동 새우, 원양 어류 및 가공 수산물을 글로벌 수입 유통 기업에 수출합니다.'}
        </p>

        {/* Spec Disclaimer Notice */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs text-slate-700 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-[#b8860b] shrink-0" />
          <span>
            {language === 'en'
              ? 'Sanitary health certificates, processing formats (IQF/Block), and container loading terms: Available upon request.'
              : '위생 건강 증명서, 급속 냉동 규격(IQF/Block) 및 컨테이너 선적 조건: 요청 시 제공 가능합니다.'}
          </span>
        </div>
      </section>

      {/* 2. Visual Marquee & Cold-Chain Feature with Photography */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <VisualAsset type="seafood_export" aspect="16:9" title="Flash-Frozen Black Tiger & Marine Catches" />
        </div>
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] text-[#b8860b] font-semibold">
            {language === 'en' ? 'Cold-Chain Excellence' : '철저한 콜드체인 관리'}
          </span>
          <h3 className="text-2xl font-serif-title font-semibold text-slate-900">
            {language === 'en' ? 'Direct Coastal Sourcing & Temperature Integrity' : '연안 직결 소싱 및 선도 보존 시스템'}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {language === 'en'
              ? 'Through Thunder Mark Vietnam Co., Ltd, our seafood trade operations bridge accredited coastal packing houses with institutional buyers across East Asia, North America, and Europe. Reefer containers are monitored continuously to maintain target freezing points from port of origin to destination.'
              : '썬더마크 베트남을 통해 연안의 공인 가공 공장과 글로벌 주요 수입상을 직접 연결합니다. 원산지 항만 선적부터 최종 도착지까지 냉동 컨테이너의 온도를 철저히 모니터링하여 최상의 선도를 유지합니다.'}
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenInquiry()}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0f172a] hover:bg-[#1e293b] rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <span>{language === 'en' ? 'Request Seafood Price Matrix' : '수산물 견적 및 스펙 요청'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Product Listings */}
      <section className="space-y-8 border-t border-slate-200 pt-16">
        <h2 className="text-2xl sm:text-3xl font-serif-title font-semibold text-slate-900">
          {language === 'en' ? 'Export Seafood Products' : '수출 수산물 포트폴리오'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {seafoodProducts.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl bg-white border border-slate-200 p-6 space-y-5 shadow-sm hover:shadow-md hover:border-[#b8860b]/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <VisualAsset type="seafood_export" aspect="16:9" />
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
