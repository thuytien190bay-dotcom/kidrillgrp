import React from 'react';
import { Language, NavigationPage } from '../types';
import { copyData } from '../data/uiCopy';
import { VisualAsset } from '../components/VisualAsset';
import { Shield, Eye, Target, Compass, Award, CheckCircle, ArrowRight, Handshake } from 'lucide-react';

interface AboutPageProps {
  language: Language;
  onNavigate: (page: NavigationPage) => void;
  onOpenInquiry: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  language,
  onNavigate,
  onOpenInquiry,
}) => {
  const t = copyData[language].about;

  const values = [
    {
      titleEn: 'Integrity',
      titleKo: '정직과 원칙 (Integrity)',
      descEn: 'Uncompromising transparency in assays, contract fulfillment, and international regulatory compliance.',
      descKo: '품질 검증, 계약 이행 및 국제 무역 법규 준수에 있어 타협 없는 투명성을 고수합니다.',
      icon: Shield,
    },
    {
      titleEn: 'Reliability',
      titleKo: '공급의 확실성 (Reliability)',
      descEn: 'Securing physical commodities at the source and guaranteeing delivery schedules through seasoned logistics oversight.',
      descKo: '산지 직접 조달과 숙련된 해상 물류 관리를 통해 정시 선적과 공급의 영속성을 보장합니다.',
      icon: Award,
    },
    {
      titleEn: 'Partnership',
      titleKo: '상생의 파트너십 (Partnership)',
      descEn: 'Aligning with reputable producers and discerning global buyers for multi-year commercial resilience.',
      descKo: '우수한 생산자와 글로벌 핵심 바이어 간의 다년간 지속 가능한 상생 무역 모델을 구축합니다.',
      icon: Handshake,
    },
    {
      titleEn: 'Professionalism',
      titleKo: '무역 전문성 (Professionalism)',
      descEn: 'Meticulous execution of trade finance, international maritime charters, and cross-border documentation.',
      descKo: '무역 금융, 원양 용선 계약 및 수출입 통관에 이르는 정밀하고 전문적인 무역 실무를 수행합니다.',
      icon: Target,
    },
    {
      titleEn: 'Global Perspective',
      titleKo: '글로벌 통찰력 (Global Perspective)',
      descEn: 'Connecting localized Southeast Asian resource realities with macroscopic international market dynamics.',
      descKo: '동남아시아 현지 생산지의 실물 역량과 전 세계 거시 원자재 시장의 흐름을 유기적으로 연결합니다.',
      icon: Compass,
    },
    {
      titleEn: 'Long-Term Value',
      titleKo: '지속가능한 가치 (Long-Term Value)',
      descEn: 'Prioritizing stable recurring trade flows over transient spot arbitrage to protect stakeholder interests.',
      descKo: '단기 차익보다 예측 가능하고 안정적인 반복 거래를 우선시하여 모든 이해관계자의 가치를 보호합니다.',
      icon: Eye,
    },
  ];

  return (
    <div className="pt-28 pb-20 space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white text-slate-900">
      {/* 1. Header Banner */}
      <section className="space-y-6 max-w-3xl">
        <span className="text-xs uppercase tracking-[0.25em] text-[#b8860b] font-semibold">
          {language === 'en' ? 'Corporate Profile' : '그룹 소개'}
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-title font-bold text-slate-900 leading-tight">
          {t.title}
        </h1>
        <p className="text-lg text-slate-600 font-light leading-relaxed">
          {t.subtitle}
        </p>
      </section>

      {/* 2. Our Story & Philosophy with Photography */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-slate-200 pt-16">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[#b8860b] font-mono font-semibold">
            01 / PHILOSOPHY
          </span>
          <h2 className="text-3xl font-serif-title font-semibold text-slate-900">
            {t.storyTitle}
          </h2>
          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>{t.storyParagraph1}</p>
            <p>{t.storyParagraph2}</p>
          </div>
        </div>

        <div className="lg:col-span-6">
          <VisualAsset
            type="project_partner"
            aspect="4:3"
            title={language === 'en' ? 'Cross-Border Trading Governance' : '글로벌 무역 거버넌스'}
          />
        </div>
      </section>

      {/* 3. Vision & Mission Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Vision */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-8 sm:p-10 space-y-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-[#b8860b]/10 border border-[#b8860b]/30 flex items-center justify-center text-[#b8860b]">
            <Eye className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#b8860b] font-semibold block">
            {t.visionTitle}
          </span>
          <p className="text-xl sm:text-2xl font-serif-title text-slate-900 italic leading-relaxed">
            "{t.visionText}"
          </p>
        </div>

        {/* Mission */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-8 sm:p-10 space-y-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-[#b8860b]/10 border border-[#b8860b]/30 flex items-center justify-center text-[#b8860b]">
            <Target className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#b8860b] font-semibold block">
            {t.missionTitle}
          </span>
          <p className="text-xl sm:text-2xl font-serif-title text-slate-900 italic leading-relaxed">
            "{t.missionText}"
          </p>
        </div>
      </section>

      {/* 4. Guiding Values */}
      <section className="space-y-10 border-t border-slate-200 pt-16">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#b8860b] font-semibold">
            {language === 'en' ? 'Institutional Ethos' : '경영 원칙'}
          </span>
          <h2 className="text-3xl font-serif-title font-semibold text-slate-900">
            {t.valuesTitle}
          </h2>
          <p className="text-sm text-slate-600">
            {t.valuesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-xl bg-white border border-slate-200 space-y-3 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-[#b8860b]">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-serif-title font-semibold text-slate-900">
                  {language === 'en' ? v.titleEn : v.titleKo}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'en' ? v.descEn : v.descKo}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Business Network Statement */}
      <section className="rounded-2xl bg-slate-50 border border-slate-200 p-8 sm:p-12 space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono text-[#b8860b] uppercase tracking-wider font-semibold">
          <CheckCircle className="w-4 h-4" />
          <span>{t.networkTitle}</span>
        </div>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-4xl">
          {t.networkText}
        </p>
        <div className="pt-4 flex flex-wrap gap-4">
          <button
            onClick={() => onNavigate('companies')}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#0f172a] hover:bg-[#1e293b] rounded-lg transition-all cursor-pointer"
          >
            <span>{language === 'en' ? 'Explore Operating Companies' : '그룹 법인 안내'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onOpenInquiry}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-all cursor-pointer"
          >
            <span>{language === 'en' ? 'Initiate B2B Inquiry' : 'B2B 상담 요청'}</span>
          </button>
        </div>
      </section>
    </div>
  );
};
