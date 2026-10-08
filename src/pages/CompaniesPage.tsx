import React from 'react';
import { Language, NavigationPage } from '../types';
import { copyData } from '../data/uiCopy';
import { companiesData } from '../data/translations';
import { VisualAsset } from '../components/VisualAsset';
import { MapPin, Globe, CheckCircle2, ArrowRight, Building2, ShieldCheck } from 'lucide-react';

interface CompaniesPageProps {
  language: Language;
  onNavigate: (page: NavigationPage) => void;
  onOpenInquiry: (interestEntity?: string) => void;
}

export const CompaniesPage: React.FC<CompaniesPageProps> = ({
  language,
  onNavigate,
  onOpenInquiry,
}) => {
  const t = copyData[language].twoCompanies;

  const idComp = companiesData.id;
  const vnComp = companiesData.vn;

  return (
    <div className="pt-28 pb-20 space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white text-slate-900">
      {/* 1. Page Header */}
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
      </section>

      {/* 2. Unified Network Architecture Statement */}
      <section className="p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs">
        <div className="space-y-2 max-w-3xl">
          <span className="text-xs uppercase tracking-[0.2em] text-[#b8860b] font-semibold">
            {language === 'en' ? 'Synergistic Corporate Framework' : '그룹 통합 무역 프레임워크'}
          </span>
          <h3 className="text-xl sm:text-2xl font-serif-title font-semibold text-slate-900">
            {language === 'en'
              ? 'Local Execution with Institutional Governance'
              : '현지 실행력과 글로벌 무역 거버넌스의 결합'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {language === 'en'
              ? 'PT PMA Kidrill Metal Mining and Thunder Mark Vietnam Co., Ltd operate as core pillars of Kidrill Group. While legally autonomous entities tailored to regional regulatory environments in Indonesia and Vietnam, both companies share unified credit underwriting, logistics risk management, and international buyer relationship standards.'
              : 'PT PMA Kidrill Metal Mining과 Thunder Mark Vietnam Co., Ltd는 키드릴 그룹의 핵심 기둥입니다. 각 국가의 법규와 상업 환경에 최적화된 독립 법인으로 운영되면서도, 그룹의 통일된 신용 관리, 해상 물류 리스크 통제 및 엄격한 품질 보증 시스템을 공유합니다.'}
          </p>
        </div>
        <div className="shrink-0">
          <button
            onClick={() => onOpenInquiry()}
            className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#0f172a] hover:bg-[#1e293b] rounded-lg transition-all cursor-pointer whitespace-nowrap shadow-xs"
          >
            {language === 'en' ? 'Direct Group Inquiry' : '그룹 대표 문의'}
          </button>
        </div>
      </section>

      {/* 3. COMPANY 01: PT PMA Kidrill Metal Mining */}
      <section className="border-t border-slate-200 pt-16 space-y-8">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#b8860b] uppercase tracking-wider font-semibold">
              <Building2 className="w-4 h-4" />
              <span>COMPANY 01 · INDONESIA</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif-title font-semibold text-slate-900">
              {idComp.name}
            </h2>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-start gap-2.5 text-slate-700">
                <MapPin className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{idComp.address}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700">
                <Globe className="w-4 h-4 text-[#b8860b] shrink-0" />
                <span>Surabaya, Jawa Timur, Indonesia</span>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {idComp.role}
            </p>

            {/* Business Scope */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-900">
                {language === 'en' ? 'Core Business & Commodity Scope:' : '주요 사업 및 취급 품목:'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {idComp.businessScope.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Markets */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-900">
                {language === 'en' ? 'Primary Destination Markets:' : '주요 수출 대상국:'}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {idComp.primaryMarkets.map((m, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 font-medium">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('minerals')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0f172a] hover:bg-[#1e293b] rounded-lg transition-all cursor-pointer"
              >
                <span>{language === 'en' ? 'View Mineral Portfolio' : '광물 품목 포트폴리오'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onOpenInquiry('minerals')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-all cursor-pointer"
              >
                <span>{language === 'en' ? 'Inquire PT PMA Kidrill' : '인도네시아 법인 문의'}</span>
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 space-y-4">
            <VisualAsset type="company_surabaya" aspect="4:3" title="Pakuwon Centre, Surabaya" />
            <VisualAsset type="minerals_copper" aspect="16:9" title="Copper & Refined Metal Cathodes" />
          </div>
        </div>
      </section>

      {/* 4. COMPANY 02: Thunder Mark Vietnam Co., Ltd */}
      <section className="border-t border-slate-200 pt-16 space-y-8">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#b8860b] uppercase tracking-wider font-semibold">
              <Building2 className="w-4 h-4" />
              <span>COMPANY 02 · VIETNAM</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif-title font-semibold text-slate-900">
              {vnComp.name}
            </h2>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="flex items-center gap-2.5 text-slate-700">
                <Globe className="w-4 h-4 text-[#b8860b] shrink-0" />
                <span>Ho Chi Minh City, Vietnam</span>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {vnComp.role}
            </p>

            {/* Business Scope */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-900">
                {language === 'en' ? 'Core Business & Commodity Scope:' : '주요 사업 및 취급 품목:'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {vnComp.businessScope.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Markets */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-900">
                {language === 'en' ? 'Primary Destination Markets:' : '주요 수출 대상국:'}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {vnComp.primaryMarkets.map((m, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 font-medium">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('agriculture')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0f172a] hover:bg-[#1e293b] rounded-lg transition-all cursor-pointer"
              >
                <span>{language === 'en' ? 'View Food & Agri Products' : '농산물 품목 둘러보기'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onOpenInquiry('agriculture')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-all cursor-pointer"
              >
                <span>{language === 'en' ? 'Inquire Thunder Mark' : '베트남 법인 문의'}</span>
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 space-y-4">
            <VisualAsset type="company_hcmc" aspect="4:3" title="Thunder Mark Vietnam Corporate Hub · Ho Chi Minh City" />
            <VisualAsset type="agri_rice" aspect="16:9" title="Vietnamese Agricultural Commodities" />
          </div>
        </div>
      </section>
    </div>
  );
};
