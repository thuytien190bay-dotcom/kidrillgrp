import React, { useState, useEffect, useRef } from 'react';
import { Language, NavigationPage } from '../types';
import { copyData } from '../data/uiCopy';
import { companiesData } from '../data/translations';
import {
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  Building2,
  Globe2,
  Layers,
  ShieldCheck,
  FileText,
  Mail,
  Phone,
  ArrowRight,
} from 'lucide-react';

interface NavbarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  language: Language;
  onOpenInquiry: () => void;
}

type MegaMenuKey = 'about' | 'companies' | 'businesses' | 'network' | null;

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  language,
  onOpenInquiry,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaMenuKey>(null);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const t = copyData[language].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (key: MegaMenuKey) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setActiveMega(key);
  };

  const handleMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMega(null);
    }, 200);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-slate-200/90 ${
          scrolled ? 'shadow-sm py-3.5' : 'py-4 sm:py-5'
        }`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* ZONE 1: Official Brand Logo - Sculptural K Emblem */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
              setActiveMega(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer shrink-0"
            aria-label="Kidrill Group Home"
          >
            <img
              src="/logo.png"
              alt="Kidrill Group Logo"
              className={`w-auto object-contain transition-all duration-300 ${
                scrolled ? 'h-9 sm:h-10' : 'h-10 sm:h-11'
              }`}
            />
            <div className="flex flex-col">
              <span className="font-brand font-bold text-base sm:text-lg tracking-[0.14em] text-slate-900 group-hover:text-[#b8860b] transition-colors leading-none">
                KIDRILL
              </span>
              <span className="text-[9px] font-mono tracking-[0.22em] text-slate-500 uppercase leading-tight mt-1">
                GROUP
              </span>
            </div>
          </a>

          {/* ZONE 2: Clean Top Navigation with Structured Mega-Menu Trigger */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            <button
              onClick={() => {
                onNavigate('home');
                setActiveMega(null);
              }}
              className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                currentPage === 'home'
                  ? 'text-[#b8860b] border-b-2 border-[#b8860b] font-semibold'
                  : 'text-slate-700 hover:text-[#b8860b]'
              }`}
            >
              {t.home}
            </button>

            {/* About Mega Trigger */}
            <div
              className="relative py-1"
              onMouseEnter={() => handleMouseEnter('about')}
            >
              <button
                onClick={() => {
                  onNavigate('about');
                  setActiveMega(null);
                }}
                className={`flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                  currentPage === 'about'
                    ? 'text-[#b8860b] border-b-2 border-[#b8860b] font-semibold'
                    : 'text-slate-700 hover:text-[#b8860b]'
                }`}
              >
                <span>{t.about}</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
              </button>
            </div>

            {/* Companies Mega Trigger */}
            <div
              className="relative py-1"
              onMouseEnter={() => handleMouseEnter('companies')}
            >
              <button
                onClick={() => {
                  onNavigate('companies');
                  setActiveMega(null);
                }}
                className={`flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                  currentPage === 'companies'
                    ? 'text-[#b8860b] border-b-2 border-[#b8860b] font-semibold'
                    : 'text-slate-700 hover:text-[#b8860b]'
                }`}
              >
                <span>{t.companies}</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
              </button>
            </div>

            {/* Businesses (Products) Mega Trigger */}
            <div
              className="relative py-1"
              onMouseEnter={() => handleMouseEnter('businesses')}
            >
              <button
                onClick={() => {
                  onNavigate('products');
                  setActiveMega(null);
                }}
                className={`flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                  ['products', 'minerals', 'agriculture', 'seafood'].includes(currentPage)
                    ? 'text-[#b8860b] border-b-2 border-[#b8860b] font-semibold'
                    : 'text-slate-700 hover:text-[#b8860b]'
                }`}
              >
                <span>{language === 'en' ? 'Core Businesses' : '사업 분야'}</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
              </button>
            </div>

            {/* Global Network Mega Trigger */}
            <div
              className="relative py-1"
              onMouseEnter={() => handleMouseEnter('network')}
            >
              <button
                onClick={() => {
                  onNavigate('markets');
                  setActiveMega(null);
                }}
                className={`flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                  ['markets', 'projects'].includes(currentPage)
                    ? 'text-[#b8860b] border-b-2 border-[#b8860b] font-semibold'
                    : 'text-slate-700 hover:text-[#b8860b]'
                }`}
              >
                <span>{language === 'en' ? 'Global Network' : '글로벌 네트워크'}</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
              </button>
            </div>

            <button
              onClick={() => {
                onNavigate('sustainability');
                setActiveMega(null);
              }}
              className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                currentPage === 'sustainability'
                  ? 'text-[#b8860b] border-b-2 border-[#b8860b] font-semibold'
                  : 'text-slate-700 hover:text-[#b8860b]'
              }`}
            >
              {t.sustainability}
            </button>

            <button
              onClick={() => {
                onNavigate('news');
                setActiveMega(null);
              }}
              className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                currentPage === 'news'
                  ? 'text-[#b8860b] border-b-2 border-[#b8860b] font-semibold'
                  : 'text-slate-700 hover:text-[#b8860b]'
              }`}
            >
              {t.news}
            </button>

            <button
              onClick={() => {
                onNavigate('contact');
                setActiveMega(null);
              }}
              className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                currentPage === 'contact'
                  ? 'text-[#b8860b] border-b-2 border-[#b8860b] font-semibold'
                  : 'text-slate-700 hover:text-[#b8860b]'
              }`}
            >
              {t.contact}
            </button>
          </nav>

          {/* ZONE 3: Contact CTA & Navigation Controls */}
          <div className="flex items-center gap-3">
            {/* Primary Action Button */}
            <button
              onClick={onOpenInquiry}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#0f172a] hover:bg-[#1e293b] rounded-lg transition-all shadow-sm whitespace-nowrap cursor-pointer"
            >
              <span>{t.contact}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ========================================================
            STRUCTURED MEGA-MENU PANELS (Mitsubishi Corp Style)
           ======================================================== */}
        {activeMega && (
          <div
            className="hidden lg:block absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl animate-in fade-in slide-in-from-top-1 duration-200 z-50"
            onMouseEnter={() => {
              if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-7xl mx-auto px-8 py-8">
              {/* Mega-Menu: About Us */}
              {activeMega === 'about' && (
                <div className="grid grid-cols-4 gap-8">
                  <div className="space-y-3 border-r border-slate-100 pr-6">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#b8860b] font-semibold">
                      Corporate Philosophy
                    </span>
                    <h4 className="text-xl font-serif-title font-semibold text-slate-900">
                      {language === 'en' ? 'About Kidrill Group' : '키드릴 그룹 소개'}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {language === 'en'
                        ? 'An international trading group connecting Southeast Asian mineral resources and commodities with global markets.'
                        : '동남아시아의 풍부한 자원과 상품을 세계 시장과 연결하는 선도적 종합 무역 그룹입니다.'}
                    </p>
                    <button
                      onClick={() => {
                        onNavigate('about');
                        setActiveMega(null);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs text-[#b8860b] font-semibold hover:text-slate-900 pt-2"
                    >
                      <span>{language === 'en' ? 'Read Corporate Story' : '회사 소개 전문 보기'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-900 block pb-1 border-b border-slate-100">
                      {language === 'en' ? 'Core Governance' : '경영 원칙'}
                    </span>
                    <ul className="text-xs space-y-2 text-slate-600">
                      <li>
                        <button
                          onClick={() => {
                            onNavigate('about');
                            setActiveMega(null);
                          }}
                          className="hover:text-[#b8860b] transition-colors"
                        >
                          · {language === 'en' ? 'Vision & Mission Statements' : '그룹 비전 및 미션'}
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            onNavigate('about');
                            setActiveMega(null);
                          }}
                          className="hover:text-[#b8860b] transition-colors"
                        >
                          · {language === 'en' ? '6 Guiding Principles' : '6대 핵심 가치'}
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            onNavigate('sustainability');
                            setActiveMega(null);
                          }}
                          className="hover:text-[#b8860b] transition-colors"
                        >
                          · {language === 'en' ? 'Supply Chain Integrity' : '공급망 실사 및 윤리 규범'}
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-900 block pb-1 border-b border-slate-100">
                      {language === 'en' ? 'Operating Entities' : '운영 법인'}
                    </span>
                    <ul className="text-xs space-y-2 text-slate-600">
                      <li>
                        <button
                          onClick={() => {
                            onNavigate('companies');
                            setActiveMega(null);
                          }}
                          className="hover:text-[#b8860b] transition-colors font-medium text-slate-800"
                        >
                          PT PMA Kidrill Metal Mining
                        </button>
                        <span className="text-[11px] text-slate-500 block">Surabaya, Indonesia</span>
                      </li>
                      <li className="pt-1">
                        <button
                          onClick={() => {
                            onNavigate('companies');
                            setActiveMega(null);
                          }}
                          className="hover:text-[#b8860b] transition-colors font-medium text-slate-800"
                        >
                          Thunder Mark Viet Nam Co., Ltd
                        </button>
                        <span className="text-[11px] text-slate-500 block">Ho Chi Minh City, Vietnam</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-3">
                    <span className="text-xs font-semibold text-slate-900 block">
                      {language === 'en' ? 'Institutional Inquiries' : '본사 및 대표 연락처'}
                    </span>
                    <p className="text-xs text-slate-600">
                      Surabaya & Ho Chi Minh City commercial desks are available for B2B procurement terms.
                    </p>
                    <button
                      onClick={() => {
                        onOpenInquiry();
                        setActiveMega(null);
                      }}
                      className="w-full py-2 text-xs font-semibold text-white bg-[#0f172a] hover:bg-[#1e293b] rounded-lg text-center"
                    >
                      {language === 'en' ? 'Submit Inquiry' : '상담 문의'}
                    </button>
                  </div>
                </div>
              )}

              {/* Mega-Menu: Our Companies */}
              {activeMega === 'companies' && (
                <div className="grid grid-cols-3 gap-8">
                  {/* Entity 1 */}
                  <div
                    onClick={() => {
                      onNavigate('companies');
                      setActiveMega(null);
                    }}
                    className="p-5 rounded-xl border border-slate-200 hover:border-[#b8860b]/50 hover:shadow-md transition-all cursor-pointer bg-slate-50/50 space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                      <span className="text-[#b8860b] font-semibold uppercase">Subsidiary 01</span>
                      <span>Indonesia</span>
                    </div>
                    <h4 className="text-lg font-serif-title font-semibold text-slate-900">
                      PT PMA Kidrill Metal Mining
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      23rd Floor, Pakuwon Centre, Surabaya. Mineral commodity trading, coal, copper cathodes, and industrial metals.
                    </p>
                    <span className="text-xs text-[#b8860b] font-semibold inline-flex items-center gap-1 pt-1">
                      {language === 'en' ? 'View Corporate Profile' : '법인 프로필 보기'} →
                    </span>
                  </div>

                  {/* Entity 2 */}
                  <div
                    onClick={() => {
                      onNavigate('companies');
                      setActiveMega(null);
                    }}
                    className="p-5 rounded-xl border border-slate-200 hover:border-[#b8860b]/50 hover:shadow-md transition-all cursor-pointer bg-slate-50/50 space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                      <span className="text-[#b8860b] font-semibold uppercase">Subsidiary 02</span>
                      <span>Vietnam</span>
                    </div>
                    <h4 className="text-lg font-serif-title font-semibold text-slate-900">
                      Thunder Mark Viet Nam Co., Ltd
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Golden King Tower, Ho Chi Minh City. Export trading in agricultural staples, fragrant rice, coffee beans, and cold-chain seafood.
                    </p>
                    <span className="text-xs text-[#b8860b] font-semibold inline-flex items-center gap-1 pt-1">
                      {language === 'en' ? 'View Corporate Profile' : '법인 프로필 보기'} →
                    </span>
                  </div>

                  {/* Group Hub Architecture */}
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <span className="text-xs uppercase tracking-wider text-[#b8860b] font-semibold font-mono">
                      Unified Network
                    </span>
                    <h5 className="text-base font-serif-title font-semibold text-slate-900">
                      Two Companies. One Global Vision.
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Both companies operate with shared governance, transparent quality assay benchmarks, and unified logistics risk oversight.
                    </p>
                    <button
                      onClick={() => {
                        onNavigate('companies');
                        setActiveMega(null);
                      }}
                      className="text-xs text-slate-900 font-semibold underline"
                    >
                      {language === 'en' ? 'Compare Operating Capabilities' : '두 법인 종합 비교'}
                    </button>
                  </div>
                </div>
              )}

              {/* Mega-Menu: Core Businesses (Products & Services) */}
              {activeMega === 'businesses' && (
                <div className="grid grid-cols-4 gap-8">
                  {/* Section A: Mineral & Metal */}
                  <div className="space-y-3 border-r border-slate-100 pr-6">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#b8860b] font-semibold">
                      SECTION A · MINERALS & METALS
                    </span>
                    <h4 className="text-lg font-serif-title font-semibold text-slate-900">
                      PT PMA Kidrill Metal Mining
                    </h4>
                    <ul className="text-xs space-y-2 text-slate-600 pt-1">
                      <li>
                        <button
                          onClick={() => {
                            onNavigate('minerals');
                            setActiveMega(null);
                          }}
                          className="hover:text-[#b8860b] text-left"
                        >
                          · Coal (Thermal & Metallurgical)
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            onNavigate('minerals');
                            setActiveMega(null);
                          }}
                          className="hover:text-[#b8860b] text-left"
                        >
                          · Copper Cathodes & Anodes
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            onNavigate('minerals');
                            setActiveMega(null);
                          }}
                          className="hover:text-[#b8860b] text-left"
                        >
                          · Industrial Metals & Ores
                        </button>
                      </li>
                    </ul>
                    <button
                      onClick={() => {
                        onNavigate('minerals');
                        setActiveMega(null);
                      }}
                      className="text-xs text-[#b8860b] font-semibold pt-1 block"
                    >
                      {language === 'en' ? 'Explore Minerals Desk' : '광물 부문 바로가기'} →
                    </button>
                  </div>

                  {/* Section B: Agricultural */}
                  <div className="space-y-3 border-r border-slate-100 pr-6">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#b8860b] font-semibold">
                      SECTION B · FOOD & AGRICULTURE
                    </span>
                    <h4 className="text-lg font-serif-title font-semibold text-slate-900">
                      Thunder Mark Viet Nam
                    </h4>
                    <ul className="text-xs space-y-2 text-slate-600 pt-1">
                      <li>
                        <button
                          onClick={() => {
                            onNavigate('agriculture');
                            setActiveMega(null);
                          }}
                          className="hover:text-[#b8860b] text-left"
                        >
                          · Premium Vietnamese Rice (Jasmine/White)
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            onNavigate('agriculture');
                            setActiveMega(null);
                          }}
                          className="hover:text-[#b8860b] text-left"
                        >
                          · Commercial Coffee (Robusta/Arabica)
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            onNavigate('agriculture');
                            setActiveMega(null);
                          }}
                          className="hover:text-[#b8860b] text-left"
                        >
                          · Processed Agricultural Commodities
                        </button>
                      </li>
                    </ul>
                    <button
                      onClick={() => {
                        onNavigate('agriculture');
                        setActiveMega(null);
                      }}
                      className="text-xs text-[#b8860b] font-semibold pt-1 block"
                    >
                      {language === 'en' ? 'Explore Agri Desk' : '농산물 부문 바로가기'} →
                    </button>
                  </div>

                  {/* Section C: Seafood Export */}
                  <div className="space-y-3 border-r border-slate-100 pr-6">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#b8860b] font-semibold">
                      SECTION C · SEAFOOD EXPORT
                    </span>
                    <h4 className="text-lg font-serif-title font-semibold text-slate-900">
                      Thunder Mark Viet Nam
                    </h4>
                    <ul className="text-xs space-y-2 text-slate-600 pt-1">
                      <li>
                        <button
                          onClick={() => {
                            onNavigate('seafood');
                            setActiveMega(null);
                          }}
                          className="hover:text-[#b8860b] text-left"
                        >
                          · Frozen Shrimp (Black Tiger & Vannamei)
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            onNavigate('seafood');
                            setActiveMega(null);
                          }}
                          className="hover:text-[#b8860b] text-left"
                        >
                          · Processed Marine Fish Fillets
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            onNavigate('seafood');
                            setActiveMega(null);
                          }}
                          className="hover:text-[#b8860b] text-left"
                        >
                          · Cephalopods & Cold-Chain Logistics
                        </button>
                      </li>
                    </ul>
                    <button
                      onClick={() => {
                        onNavigate('seafood');
                        setActiveMega(null);
                      }}
                      className="text-xs text-[#b8860b] font-semibold pt-1 block"
                    >
                      {language === 'en' ? 'Explore Seafood Desk' : '수산물 부문 바로가기'} →
                    </button>
                  </div>

                  {/* Quick B2B Action */}
                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-3">
                    <span className="text-xs font-semibold text-slate-900 block">
                      {language === 'en' ? 'Full Product Catalogue' : '전체 품목 카탈로그'}
                    </span>
                    <p className="text-xs text-slate-600">
                      Detailed specifications, assays, and shipping schedules are available upon commercial request.
                    </p>
                    <button
                      onClick={() => {
                        onNavigate('products');
                        setActiveMega(null);
                      }}
                      className="w-full py-2 text-xs font-semibold text-white bg-[#0f172a] hover:bg-[#1e293b] rounded-lg text-center"
                    >
                      {language === 'en' ? 'View All Commodities' : '전체 품목 보기'}
                    </button>
                  </div>
                </div>
              )}

              {/* Mega-Menu: Global Network */}
              {activeMega === 'network' && (
                <div className="grid grid-cols-4 gap-8">
                  <div className="space-y-3 border-r border-slate-100 pr-6">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#b8860b] font-semibold">
                      Trade Corridors
                    </span>
                    <h4 className="text-lg font-serif-title font-semibold text-slate-900">
                      From Southeast Asia to the World
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Connecting regional resources with industrial consumers, thermal power plants, and food wholesalers across 5 major markets.
                    </p>
                    <button
                      onClick={() => {
                        onNavigate('markets');
                        setActiveMega(null);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs text-[#b8860b] font-semibold hover:text-slate-900 pt-2"
                    >
                      <span>{language === 'en' ? 'Open Interactive Map' : '무역 지도 보기'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-900 block pb-1 border-b border-slate-100">
                      Target Destination Markets
                    </span>
                    <ul className="text-xs space-y-2 text-slate-600">
                      <li>· South Korea (Energy & High-Purity Metals)</li>
                      <li>· China (Bulk Coal & Raw Concentrates)</li>
                      <li>· Europe (Traceable Agricultural Commodities)</li>
                      <li>· United States (Packaged Food & Minerals)</li>
                      <li>· Southeast Asia (Intra-Regional Trade)</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-900 block pb-1 border-b border-slate-100">
                      Key Client Verticals
                    </span>
                    <ul className="text-xs space-y-2 text-slate-600">
                      <li>· Thermal & Utility Power Plants</li>
                      <li>· Industrial Smelters & Metal Processors</li>
                      <li>· Food Wholesalers & Distributing Chains</li>
                      <li>· International Commodity Trading Houses</li>
                    </ul>
                  </div>

                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-3">
                    <span className="text-xs font-semibold text-slate-900 block">
                      Strategic Projects
                    </span>
                    <p className="text-xs text-slate-600">
                      Long-term physical supply corridors and off-take frameworks under mutual NDA.
                    </p>
                    <button
                      onClick={() => {
                        onNavigate('projects');
                        setActiveMega(null);
                      }}
                      className="w-full py-2 text-xs font-semibold text-white bg-[#0f172a] hover:bg-[#1e293b] rounded-lg text-center"
                    >
                      {language === 'en' ? 'View Strategic Projects' : '프로젝트 둘러보기'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-white/98 backdrop-blur-xl pt-24 pb-8 px-6 overflow-y-auto animate-in fade-in duration-200 border-b border-slate-200">
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className={`text-left text-lg font-medium py-2 border-b border-slate-100 ${
                currentPage === 'home' ? 'text-[#b8860b] font-semibold' : 'text-slate-800'
              }`}
            >
              {t.home}
            </button>

            <button
              onClick={() => {
                onNavigate('about');
                setMobileMenuOpen(false);
              }}
              className={`text-left text-lg font-medium py-2 border-b border-slate-100 ${
                currentPage === 'about' ? 'text-[#b8860b] font-semibold' : 'text-slate-800'
              }`}
            >
              {t.about}
            </button>

            <button
              onClick={() => {
                onNavigate('companies');
                setMobileMenuOpen(false);
              }}
              className={`text-left text-lg font-medium py-2 border-b border-slate-100 ${
                currentPage === 'companies' ? 'text-[#b8860b] font-semibold' : 'text-slate-800'
              }`}
            >
              {t.companies}
            </button>

            <div className="py-2 border-b border-slate-100 space-y-2">
              <button
                onClick={() => {
                  onNavigate('products');
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-lg font-medium block ${
                  currentPage === 'products' ? 'text-[#b8860b] font-semibold' : 'text-slate-800'
                }`}
              >
                {t.products}
              </button>
              <div className="pl-4 space-y-2 text-sm text-slate-500">
                <button
                  onClick={() => {
                    onNavigate('minerals');
                    setMobileMenuOpen(false);
                  }}
                  className="block text-left hover:text-[#b8860b]"
                >
                  · Section A: {t.minerals}
                </button>
                <button
                  onClick={() => {
                    onNavigate('agriculture');
                    setMobileMenuOpen(false);
                  }}
                  className="block text-left hover:text-[#b8860b]"
                >
                  · Section B: {t.agriculture}
                </button>
                <button
                  onClick={() => {
                    onNavigate('seafood');
                    setMobileMenuOpen(false);
                  }}
                  className="block text-left hover:text-[#b8860b]"
                >
                  · Section B: {t.seafood}
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                onNavigate('markets');
                setMobileMenuOpen(false);
              }}
              className={`text-left text-lg font-medium py-2 border-b border-slate-100 ${
                currentPage === 'markets' ? 'text-[#b8860b] font-semibold' : 'text-slate-800'
              }`}
            >
              {t.markets}
            </button>

            <button
              onClick={() => {
                onNavigate('projects');
                setMobileMenuOpen(false);
              }}
              className={`text-left text-lg font-medium py-2 border-b border-slate-100 ${
                currentPage === 'projects' ? 'text-[#b8860b] font-semibold' : 'text-slate-800'
              }`}
            >
              {t.projects}
            </button>

            <button
              onClick={() => {
                onNavigate('sustainability');
                setMobileMenuOpen(false);
              }}
              className={`text-left text-lg font-medium py-2 border-b border-slate-100 ${
                currentPage === 'sustainability' ? 'text-[#b8860b] font-semibold' : 'text-slate-800'
              }`}
            >
              {t.sustainability}
            </button>

            <button
              onClick={() => {
                onNavigate('news');
                setMobileMenuOpen(false);
              }}
              className={`text-left text-lg font-medium py-2 border-b border-slate-100 ${
                currentPage === 'news' ? 'text-[#b8860b] font-semibold' : 'text-slate-800'
              }`}
            >
              {t.news}
            </button>

            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className={`text-left text-lg font-medium py-2 border-b border-slate-100 ${
                currentPage === 'contact' ? 'text-[#b8860b] font-semibold' : 'text-slate-800'
              }`}
            >
              {t.contact}
            </button>

            <div className="pt-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-white bg-[#0f172a] rounded-lg"
              >
                {t.contact}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
