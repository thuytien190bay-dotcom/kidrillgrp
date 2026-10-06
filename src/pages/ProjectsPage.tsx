import React from 'react';
import { Language, NavigationPage } from '../types';
import { copyData } from '../data/uiCopy';
import { projectsData } from '../data/translations';
import { VisualAsset } from '../components/VisualAsset';
import { Lock, ArrowRight } from 'lucide-react';

interface ProjectsPageProps {
  language: Language;
  onNavigate: (page: NavigationPage) => void;
  onOpenInquiry: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  language,
  onNavigate,
  onOpenInquiry,
}) => {
  const t = copyData[language].projects;

  return (
    <div className="pt-28 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white text-slate-900">
      {/* 1. Header */}
      <section className="space-y-6 max-w-3xl">
        <span className="text-xs uppercase tracking-[0.25em] text-[#b8860b] font-semibold">
          {language === 'en' ? 'Strategic Initiatives' : '주요 프로젝트'}
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-title font-bold text-slate-900 leading-tight">
          {t.title}
        </h1>
        <p className="text-lg text-slate-600 font-light leading-relaxed">
          {t.subtitle}
        </p>

        {/* Confidentiality Notice */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-700 shadow-xs">
          <Lock className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
          <span className="leading-relaxed">{t.disclaimer}</span>
        </div>
      </section>

      {/* 2. Projects Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((proj) => (
          <div
            key={proj.id}
            className="rounded-2xl bg-white border border-slate-200 p-8 space-y-6 shadow-sm hover:shadow-md hover:border-[#b8860b]/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span className="text-[#b8860b] font-semibold">
                  {language === 'en' ? proj.typeEn : proj.typeKo}
                </span>
                <span>{proj.region}</span>
              </div>

              <h3 className="text-2xl font-serif-title font-semibold text-slate-900">
                {language === 'en' ? proj.titleEn : proj.titleKo}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                {language === 'en' ? proj.summaryEn : proj.summaryKo}
              </p>

              {/* Status Box: "PROJECT INFORMATION COMING SOON" */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-xs font-mono tracking-wider text-[#b8860b] font-semibold">
                  {language === 'en' ? proj.status : '프로젝트 정보 준비 중 (COMING SOON)'}
                </span>
                <Lock className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {language === 'en' ? 'Confidential NDA Protocol' : '비밀유지협약 기반 열람'}
              </span>
              <button
                onClick={onOpenInquiry}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#b8860b] hover:text-slate-900 cursor-pointer"
              >
                <span>{language === 'en' ? 'Request Joint Venture Brief' : '제휴 상담 요청'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* 3. Strategic Partnership Framework */}
      <section className="rounded-2xl bg-slate-50 border border-slate-200 p-8 sm:p-12 space-y-6 shadow-xs">
        <span className="text-xs uppercase tracking-[0.25em] text-[#b8860b] font-semibold">
          {language === 'en' ? 'Institutional Partnership Model' : '전략적 파트너십 프레임워크'}
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif-title font-semibold text-slate-900">
          {language === 'en'
            ? 'Co-Developing Long-Term Bulk Trade Channels'
            : '장기 벌크 무역 채널 및 오프테이크 공동 개발'}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          {language === 'en'
            ? 'Kidrill Group engages with sovereign energy utilities, international metal trading conglomerates, and institutional agricultural buyers. We facilitate structured offtake agreements, maritime freight pooling, and pre-export trade financing frameworks.'
            : '키드릴 그룹은 국영 에너지 기업, 글로벌 금속 무역 상사, 대형 식량 수입 기구와 협력하여 장기 구매(오프테이크) 계약 및 해상 운송 풀링 시스템을 개발합니다.'}
        </p>
        <div className="pt-2">
          <button
            onClick={onOpenInquiry}
            className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#0f172a] hover:bg-[#1e293b] rounded-lg transition-all cursor-pointer shadow-xs"
          >
            {language === 'en' ? 'Discuss Strategic Alliances' : '전략적 제휴 문의하기'}
          </button>
        </div>
      </section>
    </div>
  );
};
