import React from 'react';
import { Language, NavigationPage } from '../types';
import { copyData } from '../data/uiCopy';
import { companiesData } from '../data/translations';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

interface FooterProps {
  language: Language;
  onNavigate: (page: NavigationPage) => void;
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onNavigate,
  onOpenInquiry,
}) => {
  const t = copyData[language].footer;
  const nav = copyData[language].nav;
  const business = copyData[language].businessAreas;

  return (
    <footer className="bg-[#060a10] border-t border-white/10 text-slate-400 text-sm">
      {/* Top CTA Strip */}
      <div className="border-b border-white/10 py-10 bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#c5a059] font-medium">
              {language === 'en' ? 'B2B Trade Engagement' : '글로벌 무역 상담'}
            </span>
            <h3 className="text-xl md:text-2xl font-serif-title font-semibold text-white mt-1">
              {language === 'en'
                ? 'Connect directly with our regional trading desks.'
                : '키드릴 그룹 지역 무역 데스크와 직접 상담하십시오.'}
            </h3>
          </div>
          <button
            onClick={onOpenInquiry}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-black bg-[#c5a059] hover:bg-[#dfba73] rounded-lg transition-all shadow-md shadow-[#c5a059]/10 shrink-0 cursor-pointer"
          >
            <span>{language === 'en' ? 'Request Commodity Offer' : '품목 견적 및 상담 요청'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-3.5 text-left cursor-pointer focus:outline-none group"
              aria-label="Kidrill Group Home"
            >
              <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 group-hover:bg-white/15 transition-all">
                <img
                  src="/logo.png"
                  alt="Kidrill Group Logo"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
              <div>
                <span className="font-brand font-bold text-lg text-white group-hover:text-[#c5a059] transition-colors block leading-tight">
                  KIDRILL GROUP
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a059] block mt-0.5">
                  Global Resources &amp; Trade
                </span>
              </div>
            </a>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm pt-2">
              {t.groupNotice}
            </p>
            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-[#c5a059] shrink-0" />
                <a href="mailto:total@datmv.com" className="hover:text-white transition-colors">
                  total@datmv.com
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-[#c5a059] shrink-0" />
                <a href="tel:+6282264973015" className="hover:text-white transition-colors">
                  +62 822 64973015
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              {t.navigation}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
                  {nav.home}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  {nav.about}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('companies')} className="hover:text-white transition-colors cursor-pointer">
                  {nav.companies}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-white transition-colors cursor-pointer">
                  {nav.products}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-white transition-colors cursor-pointer">
                  {nav.projects}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('markets')} className="hover:text-white transition-colors cursor-pointer">
                  {nav.markets}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sustainability')} className="hover:text-white transition-colors cursor-pointer">
                  {nav.sustainability}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('news')} className="hover:text-white transition-colors cursor-pointer">
                  {nav.news}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                  {nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Business Areas */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              {t.business}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('minerals')} className="hover:text-white transition-colors cursor-pointer text-left">
                  {business.area1Title}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('agriculture')} className="hover:text-white transition-colors cursor-pointer text-left">
                  {business.area2Title}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('seafood')} className="hover:text-white transition-colors cursor-pointer text-left">
                  {business.area3Title}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-white transition-colors cursor-pointer text-left">
                  {business.area4Title}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate Entities & Locations */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              {t.entities}
            </h4>
            
            {/* Entity 1 */}
            <div className="text-xs space-y-1">
              <span className="font-semibold text-slate-200 block">
                {companiesData.id.name}
              </span>
              <p className="text-[11px] text-slate-400">
                Pakuwon Centre 23rd Fl, Surabaya, Indonesia
              </p>
            </div>

            {/* Entity 2 */}
            <div className="text-xs space-y-1">
              <span className="font-semibold text-slate-200 block">
                {companiesData.vn.name}
              </span>
              <p className="text-[11px] text-slate-400">
                Golding King Tower, Ho Chi Minh City, Vietnam
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Hairline & Legal Notices */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {t.rights}
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">
              {t.privacy}
            </span>
            <span>·</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">
              {t.terms}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
