import React from 'react';
import { Language, NavigationPage } from '../types';
import { copyData } from '../data/uiCopy';
import { VisualAsset } from '../components/VisualAsset';
import { ShieldCheck, Leaf, Users, Scale, FileText, HeartHandshake } from 'lucide-react';

interface SustainabilityPageProps {
  language: Language;
  onNavigate: (page: NavigationPage) => void;
  onOpenInquiry: () => void;
}

export const SustainabilityPage: React.FC<SustainabilityPageProps> = ({
  language,
  onNavigate,
  onOpenInquiry,
}) => {
  const t = copyData[language].sustainability;

  const pillars = [
    {
      title: t.topic1Title,
      desc: t.topic1Desc,
      icon: ShieldCheck,
    },
    {
      title: t.topic2Title,
      desc: t.topic2Desc,
      icon: Leaf,
    },
    {
      title: t.topic3Title,
      desc: t.topic3Desc,
      icon: HeartHandshake,
    },
    {
      title: t.topic4Title,
      desc: t.topic4Desc,
      icon: FileText,
    },
    {
      title: t.topic5Title,
      desc: t.topic5Desc,
      icon: Users,
    },
    {
      title: t.topic6Title,
      desc: t.topic6Desc,
      icon: Scale,
    },
  ];

  return (
    <div className="pt-28 pb-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white text-slate-900">
      {/* 1. Header & Formal Commitment Statement */}
      <section className="space-y-6 max-w-3xl">
        <span className="text-xs uppercase tracking-[0.25em] text-[#b8860b] font-semibold">
          {language === 'en' ? 'ESG & Governance' : '지속가능경영'}
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-title font-bold text-slate-900 leading-tight">
          {t.title}
        </h1>
        <p className="text-lg text-slate-600 font-light leading-relaxed">
          {t.subtitle}
        </p>

        {/* Careful Language Quote Banner */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 shadow-xs">
          <span className="text-xs font-mono uppercase text-[#b8860b] font-semibold tracking-wider block">
            {language === 'en' ? 'Core Corporate Commitment' : '그룹 공식 선언'}
          </span>
          <p className="text-xl sm:text-2xl font-serif-title italic text-slate-900 leading-relaxed">
            "{t.commitmentQuote}"
          </p>
        </div>
      </section>

      {/* 2. Visual Environmental Stewardship Feature with Photography */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <VisualAsset type="sustainability_env" aspect="16:9" title="Environmental Awareness & Marine Ecology" />
        </div>
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] text-[#b8860b] font-semibold">
            {language === 'en' ? 'Supply Chain Responsibility' : '책임 있는 공급망'}
          </span>
          <h3 className="text-2xl font-serif-title font-semibold text-slate-900">
            {language === 'en' ? 'Balanced Trade with Environmental Stewardship' : '지속가능한 무역과 환경적 책임의 조화'}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {language === 'en'
              ? 'Kidrill Group is dedicated to aligning resource transactions with emerging global environmental standards. We actively engage logistics partners to optimize fuel efficiency, minimize port turnaround delays, and safeguard coastal ecosystems.'
              : '키드릴 그룹은 자원 무역과 글로벌 환경 규범의 조화를 추구합니다. 선박 연료 효율 최적화, 항만 정체 최소화 및 연안 생태계 보존을 위해 물류 파트너들과 긴밀히 협력하고 있습니다.'}
          </p>
        </div>
      </section>

      {/* 3. Six Foundational Pillars Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pillars.map((p, i) => {
          const Icon = p.icon;
          return (
            <div
              key={i}
              className="p-8 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-[#b8860b]">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif-title font-semibold text-slate-900">
                {p.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {p.desc}
              </p>
            </div>
          );
        })}
      </section>

      {/* 4. International Standards Compliance Framework */}
      <section className="rounded-2xl bg-slate-50 border border-slate-200 p-8 sm:p-12 space-y-6 shadow-xs">
        <span className="text-xs uppercase tracking-[0.25em] text-[#b8860b] font-semibold">
          {language === 'en' ? 'Regulatory Integrity' : '국제 무역 규범 준수'}
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif-title font-semibold text-slate-900">
          {language === 'en'
            ? 'Continuous Sourcing Due Diligence'
            : '책임 있는 공급망 실사 및 지속적 개선'}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          {language === 'en'
            ? 'In cross-border bulk trading, integrity is measured by persistent compliance with maritime environmental codes, port safety guidelines, and statutory labor mandates. Kidrill Group requires all supplier counterparties to provide verified export manifests, origin documentation, and environmental permits prior to contract finalization.'
            : '국가 간 원자재 거래에서 신뢰는 해양 환경 규범, 항만 안전 지침 및 노동 법규에 대한 엄격한 준수로부터 시작됩니다. 키드릴 그룹은 계약 체결 전 모든 협력사에 대해 공인된 원산지 증명과 환경 인허가 검증을 의무화하고 있습니다.'}
        </p>
        <div className="pt-2">
          <button
            onClick={onOpenInquiry}
            className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#0f172a] hover:bg-[#1e293b] rounded-lg transition-all cursor-pointer shadow-xs"
          >
            {language === 'en' ? 'Inquire Compliance Framework' : '준법 경영 문의'}
          </button>
        </div>
      </section>
    </div>
  );
};
