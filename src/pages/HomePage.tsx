import React, { useState, useEffect } from 'react';
import { Language, NavigationPage, ProductItem } from '../types';
import { copyData } from '../data/uiCopy';
import { productsData, newsArticlesData } from '../data/translations';
import { VisualAsset } from '../components/VisualAsset';
import { WorldTradeMap } from '../components/WorldTradeMap';
import coalRegeneratedImage from '../assets/images/regenerated_image_1790914636200.png';
import {
  ArrowRight,
  Globe,
  Building2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Anchor,
  Pickaxe,
  TrendingUp,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface HomePageProps {
  language: Language;
  onNavigate: (page: NavigationPage) => void;
  onOpenInquiry: (product?: ProductItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  language,
  onNavigate,
  onOpenInquiry,
}) => {
  const t = copyData[language];

  // Full-width Cinematic Hero Slider Slides
  const heroSlides = [
    {
      id: 'shipping',
      theme: 'MARITIME LOGISTICS & BULK FREIGHT',
      titlePrimary: 'GLOBAL RESOURCES.',
      titleSecondary: 'TRUSTED TRADE.',
      caption:
        language === 'en'
          ? 'Deep-sea bulk carrier vessels and container fleets moving essential energy, metals, and agricultural goods across verified international trade lanes.'
          : '동남아시아의 전략 자원과 식량 원자재를 전 세계 5대 대륙으로 안정적으로 수송하는 원양 해상 물류 네트워크.',
      imageUrl:
        'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2560&q=85',
      badge: 'INTERNATIONAL MARITIME CORRIDORS',
      metric: 'PANAMAX & CAPESIZE',
      metricLabel: 'Bulk Carrier Freight Logistics',
      cta: language === 'en' ? 'DISCOVER OUR BUSINESSES' : '사업 분야 둘러보기',
      targetPage: 'products' as const,
    },
    {
      id: 'mining',
      theme: 'MINERAL & METAL TRADING · PT PMA KIDRILL',
      titlePrimary: 'ENERGY & METALS.',
      titleSecondary: 'INDUSTRIAL POWER.',
      caption:
        language === 'en'
          ? 'Supplying high-calorific thermal coal, premium metallurgical grades, and high-purity copper cathodes to thermal power plants and smelters.'
          : '화력발전소와 주요 제련소를 위한 고열량 발전용 석탄, 제철용 코크스탄 및 고순도 전기동 공급.',
      imageUrl:
        'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=2560&q=85',
      badge: 'PT PMA KIDRILL METAL MINING · SURABAYA',
      metric: 'INDONESIA BASINS',
      metricLabel: 'Direct Mine Offtake & Quality Assay',
      cta: language === 'en' ? 'EXPLORE MINERAL TRADING' : '광물 부문 상세 보기',
      targetPage: 'minerals' as const,
    },
    {
      id: 'agri',
      theme: 'AGRICULTURAL & SEAFOOD EXPORT · THUNDER MARK',
      titlePrimary: 'ORIGIN COMMODITIES.',
      titleSecondary: 'GLOBAL EXPORTS.',
      caption:
        language === 'en'
          ? 'Connecting Vietnamese Mekong Delta fragrant rice, Central Highlands specialty coffee, and cold-chain seafood with institutional wholesalers worldwide.'
          : '베트남 메콩 델타 프리미엄 쌀, 중부 고원지대 생두 및 콜드체인 수산물을 글로벌 유통망에 직수출.',
      imageUrl:
        'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2560&q=85',
      badge: 'THUNDER MARK VIET NAM · HO CHI MINH CITY',
      metric: 'CERTIFIED EXPORT',
      metricLabel: 'Cold-Chain & HACCP Inspected',
      cta: language === 'en' ? 'EXPLORE AGRI & SEAFOOD' : '농수산 부문 상세 보기',
      targetPage: 'agriculture' as const,
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * -20; // Inverted subtle parallax
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setMouseOffset({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const currentHero = heroSlides[activeSlide];

  // Inline Contact form state
  const [contactName, setContactName] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactInterest, setContactInterest] = useState('minerals');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName.trim() && contactEmail.trim()) {
      setContactSubmitted(true);
    }
  };

  return (
    <div className="space-y-0 bg-white text-slate-900 overflow-hidden">
      {/* ========================================================
          1. CINEMATIC FULL-WIDTH HERO SECTION (Mitsubishi Corp Style)
         ======================================================== */}
      <section
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative w-full min-h-[640px] sm:min-h-[720px] lg:min-h-[820px] flex items-end overflow-hidden pt-28 pb-16 sm:pb-20"
      >
        {/* Full-Bleed Background Images with Ken Burns & Parallax */}
        {heroSlides.map((slide, idx) => {
          const isActive = activeSlide === idx;
          const kenBurnsClass =
            idx === 0
              ? 'animate-kenburns-1'
              : idx === 1
              ? 'animate-kenburns-2'
              : 'animate-kenburns-3';

          return (
            <div
              key={slide.id}
              className={`absolute -inset-4 sm:-inset-6 transition-opacity duration-1000 ease-in-out pointer-events-none ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{
                transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
                transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 1s ease-in-out',
              }}
            >
              <img
                src={slide.imageUrl}
                alt={slide.theme}
                className={`w-full h-full object-cover object-center ${
                  isActive ? kenBurnsClass : 'scale-105'
                }`}
              />
              {/* Cinematic Gradient Scrim: Deep dark at bottom and left, clear daylight at top */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-slate-900/15" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/35 to-transparent" />
            </div>
          );
        })}

        {/* Foreground Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Left Headline & Editorial Narrative */}
            <div className="lg:col-span-8 space-y-6">
              {/* Category Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-mono uppercase tracking-[0.2em]">
                <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
                <span>{currentHero.badge}</span>
              </div>

              {/* Massive Hero Typography */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-title font-bold text-white tracking-tight leading-[1.05] drop-shadow-md">
                <span>{currentHero.titlePrimary}</span>
                <br />
                <span className="text-[#eab308]">{currentHero.titleSecondary}</span>
              </h1>

              {/* Editorial Caption */}
              <p className="text-base sm:text-lg text-slate-200 font-light leading-relaxed max-w-2xl drop-shadow-sm">
                {currentHero.caption}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate(currentHero.targetPage)}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-[#eab308] hover:bg-[#facc15] rounded-lg transition-all shadow-lg shadow-black/20 cursor-pointer"
                >
                  <span>{currentHero.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-lg transition-all cursor-pointer"
                >
                  <span>{language === 'en' ? 'CONTACT TRADING DESK' : '무역 상담 문의'}</span>
                </button>
              </div>
            </div>

            {/* Right Metric Callout Box */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/15 text-white space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#eab308] block">
                  OPERATIONAL BENCHMARK
                </span>
                <div className="text-2xl font-serif-title font-bold text-white tracking-wide">
                  {currentHero.metric}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentHero.metricLabel}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Slide Controls & Thumbnail Indicators */}
          <div className="mt-12 pt-6 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 sm:pb-0">
              {heroSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlide(idx)}
                  className={`relative overflow-hidden flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-all cursor-pointer ${
                    activeSlide === idx
                      ? 'bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-xs font-mono font-semibold">0{idx + 1}</span>
                  <span className="text-xs font-medium uppercase tracking-wider whitespace-nowrap">
                    {slide.id === 'shipping'
                      ? 'Maritime Freight'
                      : slide.id === 'mining'
                      ? 'Minerals & Metals'
                      : 'Agri & Seafood'}
                  </span>
                  {activeSlide === idx && (
                    <span
                      key={`timer-${activeSlide}`}
                      className="absolute bottom-0 left-0 h-[2px] bg-[#eab308]"
                      style={{
                        animation: 'growWidth 7s linear forwards',
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() =>
                  setActiveSlide(
                    (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
                  )
                }
                className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setActiveSlide((prev) => (prev + 1) % heroSlides.length)
                }
                className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SIGNATURE NEWS TICKER STRIP (Mitsubishi Corp Homepage Style)
         ======================================================== */}
      <section className="bg-slate-100 border-b border-slate-200 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-[#0f172a] text-white font-semibold rounded font-mono uppercase tracking-wider text-[11px]">
              {language === 'en' ? 'BRIEFING' : '최신 소식'}
            </span>
            <span className="text-slate-500 font-mono hidden md:inline">2026.10</span>
            <span className="text-slate-800 font-medium line-clamp-1">
              {language === 'en'
                ? 'Kidrill Group expands structured mineral and agricultural supply channels connecting Southeast Asia with East Asia and Europe.'
                : '키드릴 그룹, 동남아시아 주요 광물 및 농수산 자원의 동아시아 및 유럽 공급 채널 확대.'}
            </span>
          </div>
          <button
            onClick={() => onNavigate('news')}
            className="inline-flex items-center gap-1.5 text-[#b8860b] hover:text-slate-900 font-semibold uppercase tracking-wider shrink-0 cursor-pointer text-[11px]"
          >
            <span>{language === 'en' ? 'All Updates' : '전체 보기'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* ========================================================
          2. EDITORIAL FEATURE: THE TWO OPERATING SUBSIDIARIES
             (Large visual spreads with Pakuwon Centre & Golden King)
         ======================================================== */}
      <section id="about" className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#b8860b] font-semibold">
            {language === 'en' ? 'Institutional Presence' : '그룹 운영 법인'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-title font-semibold text-slate-900 leading-tight">
            {language === 'en'
              ? 'Two Strategic Hubs. Unified Trade Governance.'
              : '인도네시아와 베트남을 잇는 통합 무역 거점'}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-light">
            {language === 'en'
              ? 'Kidrill Group operates through dedicated subsidiaries in Indonesia and Vietnam, pairing direct local asset access with international compliance standards.'
              : '키드릴 그룹은 인도네시아와 베트남 현지 법인을 통해 산지 직접 조달 능력과 국제 규격에 부합하는 엄격한 무역 프로세스를 실행합니다.'}
          </p>
        </div>

        {/* 2 Big Editorial Visual Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Subsidiary 1: PT PMA Kidrill Metal Mining (Surabaya) */}
          <div className="group rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="relative w-full aspect-[16/10] overflow-hidden">
              <VisualAsset
                type="company_surabaya"
                aspect="16:9"
                title="Pakuwon Centre, Surabaya · Indonesia"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white font-mono text-[11px] uppercase tracking-wider font-semibold border border-white/20">
                  SURABAYA · INDONESIA
                </span>
              </div>
            </div>

            <div className="p-8 sm:p-10 space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#b8860b] uppercase tracking-wider font-semibold">
                  <Pickaxe className="w-4 h-4" />
                  <span>SUBSIDIARY 01 · MINERALS & HEAVY METALS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif-title font-semibold text-slate-900">
                  PT PMA Kidrill Metal Mining
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Headquartered on the 23rd Floor of Pakuwon Centre, Surabaya. Specializes in mineral resource procurement, direct mine concessions, high-calorific thermal coal, and refined copper cathodes for utilities and global smelters.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium">Thermal Coal</span>
                  <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium">Copper Cathodes</span>
                  <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium">Non-Ferrous Metals</span>
                  <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium">Mine Logistics</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('minerals')}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#b8860b] hover:text-slate-900 cursor-pointer"
                >
                  <span>{language === 'en' ? 'Explore Minerals Portfolio' : '광물 부문 상세 보기'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenInquiry()}
                  className="text-xs text-slate-500 hover:text-slate-900 font-mono"
                >
                  Inquire Desk →
                </button>
              </div>
            </div>
          </div>

          {/* Subsidiary 2: Thunder Mark Viet Nam Co., Ltd (HCMC) */}
          <div className="group rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="relative w-full aspect-[16/10] overflow-hidden">
              <VisualAsset
                type="company_hcmc"
                aspect="16:9"
                title="Golden King Tower, Ho Chi Minh City · Vietnam"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white font-mono text-[11px] uppercase tracking-wider font-semibold border border-white/20">
                  HO CHI MINH CITY · VIETNAM
                </span>
              </div>
            </div>

            <div className="p-8 sm:p-10 space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#b8860b] uppercase tracking-wider font-semibold">
                  <Anchor className="w-4 h-4" />
                  <span>SUBSIDIARY 02 · AGRICULTURAL & SEAFOOD EXPORT</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif-title font-semibold text-slate-900">
                  Thunder Mark Viet Nam Co., Ltd
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Located at Golden King Tower, District 7, Ho Chi Minh City. Direct export trade connecting Vietnam’s premier agricultural regions and verified seafood packing plants with buyers across South Korea, China, Europe, and the United States.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium">Fragrant Rice</span>
                  <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium">Robusta & Arabica</span>
                  <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium">Frozen Tiger Shrimp</span>
                  <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium">Marine Catches</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('agriculture')}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#b8860b] hover:text-slate-900 cursor-pointer"
                >
                  <span>{language === 'en' ? 'Explore Agri & Seafood' : '농수산 부문 상세 보기'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenInquiry()}
                  className="text-xs text-slate-500 hover:text-slate-900 font-mono"
                >
                  Inquire Desk →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. CINEMATIC FULL-WIDTH PARALLAX BREAK: MARITIME BULK SHIPPING
             (Panoramic Visual + High-Impact Institutional Metrics)
         ======================================================== */}
      <section className="relative w-full py-28 sm:py-36 overflow-hidden bg-slate-950 text-white">
        {/* Full-bleed background panoramic image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2560&q=85"
            alt="International Maritime Port Terminal"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#eab308]">
              SUPPLY CHAIN INFRASTRUCTURE
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif-title font-semibold tracking-tight text-white leading-tight">
              {language === 'en'
                ? 'Engineering Cross-Border Supply Corridors'
                : '국제 무역 해상 운송 및 공급망 인프라'}
            </h2>
            <p className="text-base text-slate-300 font-light leading-relaxed">
              {language === 'en'
                ? 'By synchronizing origin railheads, ocean port loading terminals, and charter vessels, Kidrill Group delivers long-term physical resource reliability.'
                : '산지 적재항, 원양 용선 선박, 통관 및 목적항 하역까지 전 과정을 통합 관리하여 안정적인 장기 조달을 실현합니다.'}
            </p>
          </div>

          {/* 4 Crisp Key Performance Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-6 border-t border-white/15">
            <div className="space-y-1.5">
              <span className="text-3xl sm:text-4xl font-serif-title font-bold text-white block">
                02 <span className="text-[#eab308] text-xl font-sans">Hubs</span>
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                Surabaya & Ho Chi Minh
              </span>
            </div>

            <div className="space-y-1.5">
              <span className="text-3xl sm:text-4xl font-serif-title font-bold text-white block">
                05 <span className="text-[#eab308] text-xl font-sans">Markets</span>
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                KR · CN · EU · US · ASEAN
              </span>
            </div>

            <div className="space-y-1.5">
              <span className="text-3xl sm:text-4xl font-serif-title font-bold text-white block">
                FOB / CIF
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                Standard Incoterms Delivery
              </span>
            </div>

            <div className="space-y-1.5">
              <span className="text-3xl sm:text-4xl font-serif-title font-bold text-white block">
                100%
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                Quality Assay Verification
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. VISUAL EDITORIAL LOOKBOOK: CORE COMMODITIES
             (Replacing dense text with striking photography & specs)
         ======================================================== */}
      <section id="businesses" className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#b8860b] font-semibold">
              {language === 'en' ? 'Core Businesses' : '핵심 사업 포트폴리오'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif-title font-semibold text-slate-900 mt-2">
              {language === 'en' ? 'Structured Commodities' : '원자재 및 소비재 무역 부문'}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#0f172a] hover:bg-[#1e293b] px-6 py-3 rounded-lg transition-colors cursor-pointer self-start md:self-end"
          >
            <span>{language === 'en' ? 'Full Product Catalogue' : '전체 품목 카탈로그'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* SECTION A: MINERAL & METAL TRADING */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#b8860b]/15 text-[#b8860b] font-bold text-xs flex items-center justify-center font-mono">
                A
              </span>
              <h3 className="text-2xl font-serif-title font-semibold text-slate-900">
                {language === 'en' ? 'Section A: Mineral & Metal Trading' : 'Section A: 광물 및 금속 자원 무역'}
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500 hidden sm:inline">
              OPERATED BY PT PMA KIDRILL METAL MINING
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Coal Card with regenerated image */}
            <div className="group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="relative aspect-[16/10] overflow-hidden">
                <VisualAsset
                  type="minerals_coal"
                  customSrc={coalRegeneratedImage}
                  aspect="16:9"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-white font-mono text-[10px] uppercase font-semibold">
                    INDONESIA ORIGIN
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#b8860b] font-semibold">THERMAL & METALLURGICAL</span>
                  <span className="text-slate-400">Available upon request</span>
                </div>
                <h4 className="text-xl font-serif-title font-semibold text-slate-900">
                  {language === 'en' ? 'Coal (Thermal & Metallurgical)' : '발전용 및 제철용 원료탄'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Reliable calorific content, consistent volatile matter, and flexible Panamax vessel dispatch for sovereign power utilities and industrial boilers.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onOpenInquiry(productsData[0])}
                    className="text-xs font-semibold uppercase tracking-wider text-[#b8860b] hover:text-slate-900 cursor-pointer"
                  >
                    Request Specifications →
                  </button>
                  <span className="text-[11px] text-slate-500 font-mono">PT PMA Kidrill</span>
                </div>
              </div>
            </div>

            {/* Copper & Non-Ferrous Metals */}
            <div className="group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="relative aspect-[16/10] overflow-hidden">
                <VisualAsset
                  type="minerals_copper"
                  aspect="16:9"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-white font-mono text-[10px] uppercase font-semibold">
                    SOUTHEAST ASIA
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#b8860b] font-semibold">GRADE A · 99.99% PURITY</span>
                  <span className="text-slate-400">Available upon request</span>
                </div>
                <h4 className="text-xl font-serif-title font-semibold text-slate-900">
                  {language === 'en' ? 'Copper Cathodes & Base Metals' : '고순도 전기동 및 산업용 비철금속'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Refined electrolytic copper cathodes (LME Grade A benchmark), anodes, and raw concentrates for industrial cable and electronics manufacturers.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onOpenInquiry(productsData[1])}
                    className="text-xs font-semibold uppercase tracking-wider text-[#b8860b] hover:text-slate-900 cursor-pointer"
                  >
                    Request Specifications →
                  </button>
                  <span className="text-[11px] text-slate-500 font-mono">PT PMA Kidrill</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION B: AGRICULTURAL & SEAFOOD EXPORT */}
        <div className="space-y-8 pt-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#b8860b]/15 text-[#b8860b] font-bold text-xs flex items-center justify-center font-mono">
                B
              </span>
              <h3 className="text-2xl font-serif-title font-semibold text-slate-900">
                {language === 'en' ? 'Section B: Agricultural & Seafood Export' : 'Section B: 농산물 및 수산물 수출'}
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500 hidden sm:inline">
              OPERATED BY THUNDER MARK VIET NAM CO., LTD
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vietnamese Rice */}
            <div className="group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="relative aspect-[16/11] overflow-hidden">
                <VisualAsset type="agri_rice" aspect="16:9" className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-white font-mono text-[10px] uppercase font-semibold">
                    VIETNAM · MEKONG
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <span className="text-xs font-mono text-[#b8860b] font-semibold block">
                  JASMINE / 5% BROKEN
                </span>
                <h4 className="text-lg font-serif-title font-semibold text-slate-900">
                  {language === 'en' ? 'Premium Vietnamese Rice' : '베트남산 프리미엄 쌀'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Export-grade fragrant Jasmine and long grain white rice for national food security buyers and international wholesale distributors.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onOpenInquiry(productsData[3])}
                    className="text-xs font-semibold text-[#b8860b] hover:text-slate-900"
                  >
                    Request Specs →
                  </button>
                  <span className="text-[11px] text-slate-400 font-mono">Thunder Mark</span>
                </div>
              </div>
            </div>

            {/* Coffee Beans */}
            <div className="group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="relative aspect-[16/11] overflow-hidden">
                <VisualAsset type="agri_coffee" aspect="16:9" className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-white font-mono text-[10px] uppercase font-semibold">
                    CENTRAL HIGHLANDS
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <span className="text-xs font-mono text-[#b8860b] font-semibold block">
                  ROBUSTA & ARABICA
                </span>
                <h4 className="text-lg font-serif-title font-semibold text-slate-900">
                  {language === 'en' ? 'Commercial Coffee Beans' : '수출용 커피 원두'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Raw green coffee beans screened, graded, and prepared to international export moisture and density benchmarks for global roasters.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onOpenInquiry(productsData[4])}
                    className="text-xs font-semibold text-[#b8860b] hover:text-slate-900"
                  >
                    Request Specs →
                  </button>
                  <span className="text-[11px] text-slate-400 font-mono">Thunder Mark</span>
                </div>
              </div>
            </div>

            {/* Seafood */}
            <div className="group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="relative aspect-[16/11] overflow-hidden">
                <VisualAsset type="seafood_export" aspect="16:9" className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-white font-mono text-[10px] uppercase font-semibold">
                    IQF COLD-CHAIN
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <span className="text-xs font-mono text-[#b8860b] font-semibold block">
                  BLACK TIGER & SHRIMP
                </span>
                <h4 className="text-lg font-serif-title font-semibold text-slate-900">
                  {language === 'en' ? 'Frozen Shrimp & Seafood' : '냉동 새우 및 수산물'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Individually quick-frozen (IQF) Black Tiger and Vannamei shrimp, whitefish fillets, and pelagic catches processed in certified facilities.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onOpenInquiry(productsData[6])}
                    className="text-xs font-semibold text-[#b8860b] hover:text-slate-900"
                  >
                    Request Specs →
                  </button>
                  <span className="text-[11px] text-slate-400 font-mono">Thunder Mark</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. CINEMATIC FULL-WIDTH VISUAL FEATURE: ENVIRONMENTAL STEWARDSHIP
         ======================================================== */}
      <section className="relative w-full py-24 sm:py-32 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=2560&q=85"
            alt="Pristine Ocean and Sustainable Marine Environment"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#eab308]">
              ESG & RESPONSIBLE TRADE
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif-title font-semibold text-white">
              {language === 'en'
                ? 'Aligning Bulk Trade with Marine Environmental Codes'
                : '환경과 해양 생태계를 고려한 책임 있는 국제 무역'}
            </h3>
            <p className="text-sm text-slate-300 font-light leading-relaxed">
              {language === 'en'
                ? 'Kidrill Group is dedicated to verifiable origins, sustainable shipping routes, and adherence to international environmental benchmarks across all bulk cargo dispatches.'
                : '키드릴 그룹은 국제 해양 환경 규범을 엄격히 준수하며 지속가능한 운송 루트와 투명한 공급망 관리를 실천합니다.'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('sustainability')}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-[#eab308] hover:bg-[#facc15] rounded-lg transition-colors shrink-0 cursor-pointer"
          >
            <span>{language === 'en' ? 'View Sustainability Report' : 'ESG 지속가능경영 보고'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ========================================================
          6. GLOBAL NETWORK: INTERACTIVE MAP & TARGET AUDIENCE
         ======================================================== */}
      <section id="network" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#b8860b] font-semibold">
            {language === 'en' ? 'Global Scale & Corridors' : '글로벌 교역망'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-title font-semibold text-slate-900 leading-tight">
            {language === 'en'
              ? 'Connecting Southeast Asia with Global Industry'
              : '동남아시아 산지와 글로벌 5대 핵심 시장의 연결'}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-light">
            {language === 'en'
              ? 'We serve sovereign utilities, international metal conglomerates, and major food distributing chains across South Korea, China, Europe, the United States, and Southeast Asia.'
              : '한국, 중국, 유럽, 미국 및 동남아시아의 대형 화력발전소, 금속 제련소, 대규모 식품 도매 기업을 대상으로 안정적인 원자재 및 농수산물을 직공급합니다.'}
          </p>
        </div>

        {/* 3 Audience Segments */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-semibold text-[#b8860b] block uppercase font-mono">Client Vertical 01</span>
            <h5 className="text-base font-serif-title font-semibold text-slate-900">Thermal Power Plants</h5>
            <p className="text-xs text-slate-600 leading-relaxed">Long-term calorific supply agreements, vessel scheduling, and discharge oversight.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-semibold text-[#b8860b] block uppercase font-mono">Client Vertical 02</span>
            <h5 className="text-base font-serif-title font-semibold text-slate-900">Smelters & Metal Processors</h5>
            <p className="text-xs text-slate-600 leading-relaxed">Grade A copper cathodes, raw concentrates, and industrial base metals.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-semibold text-[#b8860b] block uppercase font-mono">Client Vertical 03</span>
            <h5 className="text-base font-serif-title font-semibold text-slate-900">Global Food Wholesalers</h5>
            <p className="text-xs text-slate-600 leading-relaxed">Direct containers of Vietnamese rice, coffee, and certified cold-chain shrimp.</p>
          </div>
        </div>

        {/* Interactive World Map */}
        <WorldTradeMap language={language} onSelectRegion={() => onNavigate('markets')} />
      </section>

      {/* ========================================================
          7. NEWS & BRIEFINGS (Clean Editorial Grid with Imagery)
         ======================================================== */}
      <section id="news" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 border-t border-slate-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#b8860b] font-semibold">
              {language === 'en' ? 'News & Editorial' : '언론 및 시장 정보'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-title font-semibold text-slate-900 mt-1">
              {language === 'en' ? 'Market Updates & Trade Briefings' : '최신 무역 및 자원 리포트'}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('news')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#b8860b] hover:text-slate-900 cursor-pointer"
          >
            <span>{language === 'en' ? 'View All News' : '전체 뉴스 보기'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsArticlesData.map((art, idx) => (
            <article
              key={art.id}
              className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <VisualAsset
                    type={idx === 0 ? 'minerals_coal' : idx === 1 ? 'agri_coffee' : 'trading_network'}
                    aspect="16:9"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 pt-0 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="text-[#b8860b] font-semibold">{art.category}</span>
                    <span>{art.date}</span>
                  </div>
                  <h4 className="text-base font-serif-title font-semibold text-slate-900 leading-snug">
                    {language === 'en' ? art.titleEn : art.titleKo}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {language === 'en' ? art.excerptEn : art.excerptKo}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400 text-[11px]">Editorial Briefing</span>
                <button
                  onClick={() => onNavigate('news')}
                  className="text-[#b8860b] hover:text-slate-900 font-semibold cursor-pointer"
                >
                  Read →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ========================================================
          8. CONTACT US: COMPLETE INFORMATION & RFQ FORM
         ======================================================== */}
      <section id="contact" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#b8860b] font-semibold">
              {language === 'en' ? 'Commercial Engagement' : '글로벌 무역 상담'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-title font-semibold text-slate-900 leading-tight">
              {language === 'en'
                ? 'Connect Directly with Our Trading Desks'
                : '키드릴 그룹 지역 무역 데스크와 직접 상담하십시오'}
            </h2>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              Surabaya & Ho Chi Minh City operations are available for B2B procurement terms, thermal coal contracts, and export seafood allotments.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Office Locations & Central Details */}
            <div className="lg:col-span-5 space-y-6">
              {/* Indonesia Office */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#b8860b] uppercase tracking-wider font-semibold">
                  <Building2 className="w-4 h-4" />
                  <span>INDONESIA OFFICE</span>
                </div>
                <h4 className="text-lg font-serif-title font-semibold text-slate-900">
                  PT PMA Kidrill Metal Mining
                </h4>
                <div className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                  <MapPin className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                  <span>
                    23rd FLOOR. PAKUWON CENTRE, JL EMBONG MALANG KEDUNGDORO, TEGALSARI KOTA SURABAYA JAWA TIMUR, INDONESIA
                  </span>
                </div>
              </div>

              {/* Vietnam Office */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#b8860b] uppercase tracking-wider font-semibold">
                  <Building2 className="w-4 h-4" />
                  <span>VIETNAM OFFICE</span>
                </div>
                <h4 className="text-lg font-serif-title font-semibold text-slate-900">
                  Thunder Mark Viet Nam Co., Ltd
                </h4>
                <div className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                  <MapPin className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                  <span>
                    Golden King Tower, Nguyen Luong Bang St., Tan Hung Ward, HCM City, Vietnam
                  </span>
                </div>
              </div>

              {/* Central Direct Communications */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <span className="text-xs uppercase font-semibold text-slate-900 font-mono tracking-wider block">
                  Central Communications Desk
                </span>
                <div className="flex items-center gap-3 text-slate-800 text-xs">
                  <Phone className="w-4 h-4 text-[#b8860b] shrink-0" />
                  <div>
                    <span className="text-slate-500 block text-[11px]">Phone / Mobile:</span>
                    <a href="tel:+6282264973015" className="font-semibold text-sm hover:text-[#b8860b]">
                      +62 822 64973015
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-800 text-xs">
                  <Mail className="w-4 h-4 text-[#b8860b] shrink-0" />
                  <div>
                    <span className="text-slate-500 block text-[11px]">Corporate Email:</span>
                    <a href="mailto:total@datmv.com" className="font-semibold text-sm hover:text-[#b8860b]">
                      total@datmv.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Clean Commercial Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-md">
                <h3 className="text-2xl font-serif-title font-semibold text-slate-900">
                  {language === 'en' ? 'Submit Commercial RFQ' : '상담 및 견적 문의'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-6">
                  Responses are dispatched within 24 business hours under strict B2B confidentiality.
                </p>

                {contactSubmitted ? (
                  <div className="py-10 text-center space-y-4">
                    <div className="inline-flex p-3 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-xl font-serif-title font-semibold text-slate-900">
                      Inquiry Transmitted Successfully
                    </h4>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      Thank you for contacting Kidrill Group. Your inquiry has been routed to our commercial trade desk.
                    </p>
                    <button
                      onClick={() => setContactSubmitted(false)}
                      className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#0f172a] rounded-lg mt-2 cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. David Vance"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#b8860b] focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactCompany}
                          onChange={(e) => setContactCompany(e.target.value)}
                          placeholder="e.g. Pacific Smelting Ltd"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#b8860b] focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Corporate Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="trade@company.com"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#b8860b] focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Phone / Mobile *
                        </label>
                        <input
                          type="tel"
                          required
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="+62 822 ..."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#b8860b] focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Commodity Category
                      </label>
                      <select
                        value={contactInterest}
                        onChange={(e) => setContactInterest(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#b8860b] focus:bg-white"
                      >
                        <option value="minerals">PT PMA Kidrill Metal Mining (Coal, Copper, Metals - Surabaya)</option>
                        <option value="agriculture">Thunder Mark Viet Nam (Rice, Coffee Beans - HCMC)</option>
                        <option value="seafood">Thunder Mark Viet Nam (Frozen Shrimp, Seafood - HCMC)</option>
                        <option value="partnership">Long-Term Offtake & Sourcing Alliance</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Inquiry Specifications & Target Delivery Terms
                      </label>
                      <textarea
                        rows={3}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Detail volume requirements, delivery terms (FOB/CIF), and target discharge port..."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#b8860b] focus:bg-white"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                      <span className="text-xs text-slate-500">
                        Email: total@datmv.com | Phone: +62 822 64973015
                      </span>
                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#0f172a] hover:bg-[#1e293b] rounded-lg transition-all shadow-md cursor-pointer"
                      >
                        <span>TRANSMIT RFQ</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
