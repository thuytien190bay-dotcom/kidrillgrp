import React, { useState } from 'react';
import { Language, NavigationPage } from '../types';
import { copyData } from '../data/uiCopy';
import { companiesData } from '../data/translations';
import { KidrillLogo } from '../components/KidrillLogo';
import { Mail, Phone, MapPin, Building2, ShieldCheck, CheckCircle, ArrowRight } from 'lucide-react';

interface ContactPageProps {
  language: Language;
  onNavigate: (page: NavigationPage) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  language,
  onNavigate,
}) => {
  const t = copyData[language].contact;

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    phone: '',
    businessInterest: 'minerals',
    product: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = language === 'en' ? 'Full name is required' : '성함을 입력해 주세요';
    if (!formData.company.trim()) newErrors.company = language === 'en' ? 'Company is required' : '회사명을 입력해 주세요';
    if (!formData.country.trim()) newErrors.country = language === 'en' ? 'Country is required' : '국가를 입력해 주세요';
    if (!formData.email.trim()) {
      newErrors.email = language === 'en' ? 'Corporate email is required' : '이메일을 입력해 주세요';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = language === 'en' ? 'Valid email format required' : '올바른 이메일 형식이 아닙니다';
    }
    if (!formData.phone.trim()) newErrors.phone = language === 'en' ? 'Phone number is required' : '연락처를 입력해 주세요';
    if (!formData.message.trim()) newErrors.message = language === 'en' ? 'Please provide inquiry specifications' : '문의 내용을 기재해 주세요';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="pt-28 pb-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white text-slate-900">
      {/* 1. Page Header */}
      <section className="space-y-6 max-w-3xl">
        <span className="text-xs uppercase tracking-[0.25em] text-[#b8860b] font-semibold">
          {language === 'en' ? 'Commercial Engagement' : '글로벌 무역 상담'}
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-title font-bold text-slate-900 leading-tight">
          {t.title}
        </h1>
        <p className="text-lg text-slate-600 font-light leading-relaxed">
          {t.subtitle}
        </p>
      </section>

      {/* 2. Group Corporate Entities & Form Split Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Corporate Offices & Group Contact Directory */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-6 shadow-xs">
            <KidrillLogo variant="light" size="md" showTagline={true} />
            <p className="text-xs text-slate-600 leading-relaxed pt-2">
              {language === 'en'
                ? 'Kidrill Group maintains dedicated commercial operations in Surabaya, Indonesia for mineral resources, and Ho Chi Minh City, Vietnam for agricultural commodities and seafood exports.'
                : '키드릴 그룹은 광물 자원을 총괄하는 인도네시아 수라바야 법인과 농수산물 수출을 담당하는 베트남 호치민 법인을 통해 상시 무역 창구를 운영하고 있습니다.'}
            </p>

            <div className="pt-4 border-t border-slate-200 space-y-4">
              <div className="flex items-center gap-3 text-slate-800">
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#b8860b] shrink-0 shadow-xs">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 block font-mono">
                    {language === 'en' ? 'Central Commercial Line' : '그룹 대표 전화'}
                  </span>
                  <a href="tel:+6282264973015" className="text-sm font-semibold hover:text-[#b8860b] transition-colors">
                    +62 822 64973015
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-800">
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#b8860b] shrink-0 shadow-xs">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 block font-mono">
                    {language === 'en' ? 'Commercial Trade Desk' : '공식 이메일'}
                  </span>
                  <a href="mailto:total@datmv.com" className="text-sm font-semibold hover:text-[#b8860b] transition-colors">
                    total@datmv.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Office 01: Surabaya */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-mono text-[#b8860b] uppercase tracking-wider font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              <span>INDONESIA OPERATION</span>
            </div>
            <h3 className="text-lg font-serif-title font-semibold text-slate-900">
              {companiesData.id.name}
            </h3>
            <div className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
              <MapPin className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
              <span>{companiesData.id.address}</span>
            </div>
          </div>

          {/* Office 02: Ho Chi Minh City */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-mono text-[#b8860b] uppercase tracking-wider font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              <span>VIETNAM OPERATION</span>
            </div>
            <h3 className="text-lg font-serif-title font-semibold text-slate-900">
              {companiesData.vn.name}
            </h3>
            <div className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
              <MapPin className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
              <span>{companiesData.vn.address}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Commercial Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-md">
            <div className="mb-6">
              <h3 className="text-2xl font-serif-title font-semibold text-slate-900">
                {t.formTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t.formSubtitle}
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-5">
                <div className="inline-flex p-4 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h4 className="text-2xl font-serif-title font-semibold text-slate-900">
                  {t.successTitle}
                </h4>
                <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                  {t.successMessage}
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        company: '',
                        country: '',
                        email: '',
                        phone: '',
                        businessInterest: 'minerals',
                        product: '',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#0f172a] hover:bg-[#1e293b] rounded-lg transition-all shadow-xs"
                  >
                    {t.anotherInquiryBtn}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.nameLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={language === 'en' ? 'e.g. Marcus Vance' : '성함 / 담당자'}
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border ${
                        errors.name ? 'border-red-500' : 'border-slate-200'
                      } text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#b8860b] focus:bg-white`}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.companyLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={language === 'en' ? 'e.g. Apex Metals Corp' : '회사명'}
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border ${
                        errors.company ? 'border-red-500' : 'border-slate-200'
                      } text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#b8860b] focus:bg-white`}
                    />
                    {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.countryLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder={language === 'en' ? 'e.g. South Korea' : '국가'}
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border ${
                        errors.country ? 'border-red-500' : 'border-slate-200'
                      } text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#b8860b] focus:bg-white`}
                    />
                    {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.emailLabel}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="trade@company.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border ${
                        errors.email ? 'border-red-500' : 'border-slate-200'
                      } text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#b8860b] focus:bg-white`}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+62 822 ..."
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border ${
                        errors.phone ? 'border-red-500' : 'border-slate-200'
                      } text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#b8860b] focus:bg-white`}
                    />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.businessInterestLabel}
                    </label>
                    <select
                      value={formData.businessInterest}
                      onChange={(e) => setFormData({ ...formData, businessInterest: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#b8860b] focus:bg-white"
                    >
                      <option value="minerals">{language === 'en' ? 'Minerals & Metals (Surabaya)' : '광물 및 금속 (수라바야)'}</option>
                      <option value="agriculture">{language === 'en' ? 'Food & Agriculture (HCMC)' : '식품 및 농산물 (호치민)'}</option>
                      <option value="seafood">{language === 'en' ? 'Seafood Export (HCMC)' : '수산물 수출 (호치민)'}</option>
                      <option value="trading">{language === 'en' ? 'Cross-Border Trading Alliance' : '국제 무역 및 제휴'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.productLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      placeholder={language === 'en' ? 'Coal, Copper, Rice, Shrimp, etc.' : '석탄, 구리, 쌀, 새우 등'}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#b8860b] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.messageLabel}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      language === 'en'
                        ? 'Detail volume requirements, target delivery terms (FOB/CIF), discharge port, and technical specifications...'
                        : '요청 수량, 인도 조건, 도착항 및 세부 규격 사항을 기재해 주십시오...'
                    }
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border ${
                      errors.message ? 'border-red-500' : 'border-slate-200'
                    } text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#b8860b] focus:bg-white`}
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-[#b8860b]" />
                    <span>{language === 'en' ? 'B2B confidentiality strictly preserved.' : '철저한 비밀유지 프로토콜 준수'}</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#0f172a] hover:bg-[#1e293b] rounded-lg transition-all shadow-md cursor-pointer"
                  >
                    <span>{t.submitBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
