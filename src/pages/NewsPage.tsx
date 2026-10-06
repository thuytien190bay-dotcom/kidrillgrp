import React, { useState } from 'react';
import { Language, NavigationPage, NewsItem } from '../types';
import { copyData } from '../data/uiCopy';
import { newsArticlesData } from '../data/translations';
import { VisualAsset } from '../components/VisualAsset';
import { ArrowRight, X, Clock, Calendar, ShieldAlert } from 'lucide-react';

interface NewsPageProps {
  language: Language;
  onNavigate: (page: NavigationPage) => void;
  onOpenInquiry: () => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({
  language,
  onNavigate,
  onOpenInquiry,
}) => {
  const t = copyData[language].news;
  const [activeArticle, setActiveArticle] = useState<NewsItem | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = [
    'all',
    'Minerals & Metals',
    'Food & Agriculture',
    'International Trade',
    'Commodity Markets',
    'Company News',
  ];

  const filteredNews = newsArticlesData.filter((item) => {
    if (categoryFilter === 'all') return true;
    return item.category === categoryFilter;
  });

  return (
    <div className="pt-28 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white text-slate-900">
      {/* 1. Header */}
      <section className="space-y-6 max-w-3xl">
        <span className="text-xs uppercase tracking-[0.25em] text-[#b8860b] font-semibold">
          {language === 'en' ? 'Editorial & Intelligence' : '언론 및 시장 정보'}
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-title font-bold text-slate-900 leading-tight">
          {t.title}
        </h1>
        <p className="text-lg text-slate-600 font-light leading-relaxed">
          {t.subtitle}
        </p>

        {/* Sample Article Notice */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs text-slate-700 shadow-xs">
          <ShieldAlert className="w-4 h-4 text-[#b8860b] shrink-0" />
          <span>
            {language === 'en'
              ? 'Notice: Articles published below are editorial samples demonstrating corporate briefing formats and industry perspectives.'
              : '안내: 본 섹션의 기사는 그룹의 무역 분석 포맷과 시장 전망 형식을 보여주는 샘플 리포트(Sample Article)입니다.'}
          </span>
        </div>
      </section>

      {/* 2. Category Filters */}
      <section className="flex flex-wrap items-center gap-2 pb-6 border-b border-slate-200">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              categoryFilter === cat
                ? 'bg-[#0f172a] text-white font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200/70'
            }`}
          >
            {cat === 'all' ? t.filterAll : cat}
          </button>
        ))}
      </section>

      {/* 3. Articles Grid with Real Photography */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredNews.map((item, idx) => {
          const photoType =
            idx === 0
              ? 'minerals_coal'
              : idx === 1
              ? 'agri_coffee'
              : 'trading_network';

          return (
            <article
              key={item.id}
              className="rounded-2xl bg-white border border-slate-200 p-6 space-y-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <VisualAsset type={photoType} aspect="16:9" />

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="text-[#b8860b] font-semibold">
                    {language === 'en' ? item.category : item.categoryKo}
                  </span>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-medium">
                    {t.sampleNotice}
                  </span>
                </div>

                <h3 className="text-xl font-serif-title font-semibold text-slate-900 leading-snug">
                  {language === 'en' ? item.titleEn : item.titleKo}
                </h3>

                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#b8860b]" />
                    <span>{item.date}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.readTime}</span>
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'en' ? item.excerptEn : item.excerptKo}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => setActiveArticle(item)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#b8860b] hover:text-slate-900 cursor-pointer"
                >
                  <span>{t.readArticle}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {/* 4. Article Full Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-2xl text-slate-900">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Close Article"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <span className="text-[#b8860b] uppercase font-semibold">
                  {language === 'en' ? activeArticle.category : activeArticle.categoryKo}
                </span>
                <span>·</span>
                <span>{activeArticle.date}</span>
                <span>·</span>
                <span className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-medium">
                  {t.sampleNotice}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-slate-900">
                {language === 'en' ? activeArticle.titleEn : activeArticle.titleKo}
              </h2>

              <div className="space-y-4 text-sm text-slate-600 leading-relaxed pt-4 border-t border-slate-200">
                {(language === 'en' ? activeArticle.contentEn : activeArticle.contentKo).map(
                  (para, i) => (
                    <p key={i}>{para}</p>
                  )
                )}
              </div>

              <div className="pt-8 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Kidrill Group Corporate Communications Desk
                </span>
                <button
                  onClick={() => {
                    setActiveArticle(null);
                    onOpenInquiry();
                  }}
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#0f172a] hover:bg-[#1e293b] rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  {language === 'en' ? 'Contact Trade Desk' : '기사 관련 문의'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
