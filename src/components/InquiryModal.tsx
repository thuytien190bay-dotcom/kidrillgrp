import React, { useState, useEffect } from 'react';
import { Language, ProductItem } from '../types';
import { copyData } from '../data/uiCopy';
import { KidrillLogo } from './KidrillLogo';
import { X, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  preselectedProduct?: ProductItem | null;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  language,
  preselectedProduct,
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

  useEffect(() => {
    if (preselectedProduct) {
      setFormData((prev) => ({
        ...prev,
        product: language === 'en' ? preselectedProduct.nameEn : preselectedProduct.nameKo,
        businessInterest: preselectedProduct.category,
      }));
    }
  }, [preselectedProduct, language]);

  if (!isOpen) return null;

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
    if (!formData.message.trim()) newErrors.message = language === 'en' ? 'Please provide inquiry details' : '문의 내용을 기재해 주세요';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
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
    setIsSubmitted(false);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-2xl text-slate-900 p-6 md:p-10"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-slate-200 pb-6 mb-6">
          <KidrillLogo variant="light" size="sm" showTagline={false} />
          <h3 className="text-2xl md:text-3xl font-serif-title font-semibold text-slate-900 mt-3">
            {t.formTitle}
          </h3>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            {t.formSubtitle}
          </p>
        </div>

        {isSubmitted ? (
          <div className="py-10 text-center space-y-5">
            <div className="inline-flex p-4 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h4 className="text-2xl font-serif-title font-semibold text-slate-900">
              {t.successTitle}
            </h4>
            <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              {t.successMessage}
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-xs text-slate-600 text-left space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#b8860b]" />
                <span className="font-semibold text-slate-900">
                  {language === 'en' ? 'Direct Trade Desk Contact:' : '전담 무역 데스크 연락처:'}
                </span>
              </div>
              <p>Email: total@datmv.com</p>
              <p>Phone: +62 822 64973015</p>
              <p>Entities: PT PMA Kidrill Metal Mining & Thunder Mark Vietnam Co., Ltd</p>
            </div>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#0f172a] hover:bg-[#1e293b] rounded-lg transition-all shadow-xs"
              >
                {t.anotherInquiryBtn}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.nameLabel}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={language === 'en' ? 'e.g. David Vance' : '예: 홍길동 이사'}
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border ${
                    errors.name ? 'border-red-500' : 'border-slate-200'
                  } text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#b8860b] focus:bg-white transition-colors`}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.companyLabel}
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder={language === 'en' ? 'e.g. Pacific Smelting Ltd' : '예: 글로벌 상사(주)'}
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border ${
                    errors.company ? 'border-red-500' : 'border-slate-200'
                  } text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#b8860b] focus:bg-white transition-colors`}
                />
                {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.countryLabel}
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder={language === 'en' ? 'e.g. South Korea' : '예: 대한민국'}
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border ${
                    errors.country ? 'border-red-500' : 'border-slate-200'
                  } text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#b8860b] focus:bg-white transition-colors`}
                />
                {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.emailLabel}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="trade@company.com"
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border ${
                    errors.email ? 'border-red-500' : 'border-slate-200'
                  } text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#b8860b] focus:bg-white transition-colors`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.phoneLabel}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+82 10 1234 5678"
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border ${
                    errors.phone ? 'border-red-500' : 'border-slate-200'
                  } text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#b8860b] focus:bg-white transition-colors`}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.businessInterestLabel}
                </label>
                <select
                  value={formData.businessInterest}
                  onChange={(e) => setFormData({ ...formData, businessInterest: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#b8860b] focus:bg-white"
                >
                  <option value="minerals">{language === 'en' ? 'Minerals & Metals (PT PMA Kidrill)' : '광물 및 금속 (PT PMA Kidrill)'}</option>
                  <option value="agriculture">{language === 'en' ? 'Food & Agriculture (Thunder Mark Vietnam)' : '식품 및 농산물 (Thunder Mark Vietnam)'}</option>
                  <option value="seafood">{language === 'en' ? 'Seafood Export (Thunder Mark Vietnam)' : '수산물 수출 (Thunder Mark Vietnam)'}</option>
                  <option value="trading">{language === 'en' ? 'Cross-Border Trading Alliance' : '국제 무역 및 전략적 제휴'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.productLabel}
                </label>
                <input
                  type="text"
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  placeholder={language === 'en' ? 'e.g. Coal / Copper Cathodes / Rice / Shrimp' : '예: 석탄, 전기동, 쌀, 커피, 냉동 새우'}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#b8860b] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t.messageLabel}
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={
                  language === 'en'
                    ? 'Please detail required specifications, target monthly/annual volume, intended discharge port (CIF/FOB), and desired delivery timeline...'
                    : '요청 규격, 예상 월별/연간 수량, 희망 인도 조건(CIF/FOB), 목표 납기 등을 자유롭게 기재해 주십시오...'
                }
                className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border ${
                  errors.message ? 'border-red-500' : 'border-slate-200'
                } text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#b8860b] focus:bg-white transition-colors`}
              />
              {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-[#b8860b]" />
                <span>{language === 'en' ? 'Commercial confidentiality strictly respected.' : '기업 정보 및 거래 내용은 철저히 보호됩니다.'}</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#0f172a] hover:bg-[#1e293b] rounded-lg transition-all shadow-md"
              >
                <span>{t.submitBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
