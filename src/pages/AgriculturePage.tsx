import React from 'react';
import { Language, NavigationPage, ProductItem } from '../types';
import { productsData, companiesData } from '../data/translations';
import { VisualAsset } from '../components/VisualAsset';
import { ShieldCheck, ArrowRight, Building2, FileText } from 'lucide-react';

interface AgriculturePageProps {
  language: Language;
  onNavigate: (page: NavigationPage) => void;
  onOpenInquiry: (product?: ProductItem) => void;
}

export const AgriculturePage: React.FC<AgriculturePageProps> = ({
  language,
  onNavigate,
  onOpenInquiry,
}) => {
  const agriProducts = productsData.filter((p) => p.category === 'agriculture');
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
          {language === 'en' ? 'Food & Agricultural Products' : '식품 및 농산물 수출'}
        </h1>
        <p className="text-lg text-slate-600 font-light leading-relaxed">
          {language === 'en'
            ? 'Connecting verified Vietnamese agricultural origin commodities—including premium export rice, Central Highlands coffee beans, and processed food staples—with international wholesalers, roasters, and food security agencies.'
            : '베트남 메콩 델타의 우수한 쌀, 중부 고원지대의 프리미엄 생두 및 가공 식품 원료를 전 세계 대형 유통업체 및 식음료 기업에 안정적으로 공급합니다.'}
        </p>

        {/* Spec Disclaimer Notice */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs text-slate-700 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-[#b8860b] shrink-0" />
          <span>
            {language === 'en'
              ? 'Phytosanitary documentation, crop grading, and export packaging specifications: Available upon request.'
              : '식물검역 인증, 등급 규격 및 포장 사양: 요청 시 제공 가능합니다.'}
          </span>
        </div>
      </section>

      {/* 2. Visual Marquee & Sourcing Feature with Photography */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <VisualAsset type="agri_rice" aspect="16:9" title="Vietnamese Mekong Delta Fragrant Rice Harvest" />
        </div>
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] text-[#b8860b] font-semibold">
            {language === 'en' ? 'Export Gateway' : '베트남 농산물 수출 게이트웨이'}
          </span>
          <h3 className="text-2xl font-serif-title font-semibold text-slate-900">
            {language === 'en' ? 'Traceability from Farm Cooperative to Marine Container' : '협동조합 산지 직결 및 전 과정 이력 관리'}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {language === 'en'
              ? 'Through Thunder Mark Vietnam Co., Ltd, Kidrill Group partners directly with accredited regional millers, sorting facilities, and farming cooperatives. We oversee post-harvest handling, moisture testing, and sealed ocean container loading to guarantee freshness and standard conformity.'
              : '썬더마크 베트남(Thunder Mark Vietnam)을 통해 현지 우수 가공 시설 및 협동조합과 직접 계약을 체결합니다. 수확 후 관리, 수분 제어, 엄격한 선별 과정을 거쳐 최상의 상태로 컨테이너에 적재합니다.'}
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenInquiry()}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0f172a] hover:bg-[#1e293b] rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <span>{language === 'en' ? 'Inquire Food Commodities' : '농산물 공급 견적 요청'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Product Listings */}
      <section className="space-y-8 border-t border-slate-200 pt-16">
        <h2 className="text-2xl sm:text-3xl font-serif-title font-semibold text-slate-900">
          {language === 'en' ? 'Agricultural & Food Commodities' : '취급 농산물 품목 포트폴리오'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {agriProducts.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl bg-white border border-slate-200 p-6 space-y-5 shadow-sm hover:shadow-md hover:border-[#b8860b]/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <VisualAsset
                  type={p.id === 'vietnamese-robusta-arabica-coffee' ? 'agri_coffee' : 'agri_rice'}
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
