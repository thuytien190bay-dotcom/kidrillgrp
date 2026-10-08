export type Language = 'en';

export type NavigationPage = 
  | 'home'
  | 'about'
  | 'companies'
  | 'products'
  | 'minerals'
  | 'agriculture'
  | 'seafood'
  | 'projects'
  | 'markets'
  | 'news'
  | 'sustainability'
  | 'contact'
  | 'drive';

export interface CompanyLocation {
  id: string;
  name: string;
  legalName: string;
  city: string;
  country: string;
  address: string;
  businessScope: string[];
  primaryMarkets: string[];
  role: string;
}

export interface ProductItem {
  id: string;
  category: 'minerals' | 'agriculture' | 'seafood';
  nameEn: string;
  nameKo: string;
  taglineEn: string;
  taglineKo: string;
  descriptionEn: string;
  descriptionKo: string;
  origin: string;
  specStatus: 'Available upon request.' | '요청 시 제공 가능';
  applications: string[];
  handlingEntity: 'PT PMA Kidrill Metal Mining' | 'Thunder Mark Viet Nam Co., Ltd' | 'Kidrill Group';
}

export interface NewsItem {
  id: string;
  category: 'Company News' | 'Market Insights' | 'Minerals & Metals' | 'Commodity Markets' | 'Food & Agriculture' | 'International Trade';
  categoryKo: string;
  titleEn: string;
  titleKo: string;
  date: string;
  readTime: string;
  excerptEn: string;
  excerptKo: string;
  contentEn: string[];
  contentKo: string[];
  isSample: true;
}

export interface ProjectItem {
  id: string;
  titleEn: string;
  titleKo: string;
  typeEn: string;
  typeKo: string;
  region: string;
  status: 'PROJECT INFORMATION COMING SOON' | '프로젝트 정보 준비 중';
  summaryEn: string;
  summaryKo: string;
}

export interface MarketRegion {
  id: string;
  nameEn: string;
  nameKo: string;
  roleEn: string;
  roleKo: string;
  commoditiesEn: string[];
  commoditiesKo: string[];
  coordinates: { x: number; y: number };
  highlight: boolean;
}
