import { Language } from '../types';

export interface UICopy {
  nav: {
    home: string;
    about: string;
    companies: string;
    business: string;
    products: string;
    minerals: string;
    agriculture: string;
    seafood: string;
    projects: string;
    markets: string;
    sustainability: string;
    news: string;
    contact: string;
    inquireBtn: string;
  };
  hero: {
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    exploreBtn: string;
    contactBtn: string;
    statement: string;
    presenceTag: string;
  };
  overview: {
    title: string;
    kicker: string;
    lead: string;
    description: string;
    stat1Label: string;
    stat1Value: string;
    stat2Label: string;
    stat2Value: string;
    stat3Label: string;
    stat3Value: string;
  };
  globalPresence: {
    title: string;
    subtitle: string;
    description: string;
    strategicHubs: string;
    hub1Title: string;
    hub1City: string;
    hub2Title: string;
    hub2City: string;
  };
  businessAreas: {
    title: string;
    subtitle: string;
    learnMore: string;
    area1Title: string;
    area1Desc: string;
    area1Items: string[];
    area2Title: string;
    area2Desc: string;
    area2Items: string[];
    area3Title: string;
    area3Desc: string;
    area3Items: string[];
    area4Title: string;
    area4Desc: string;
    area4Items: string[];
  };
  twoCompanies: {
    title: string;
    kicker: string;
    subtitle: string;
    viewProfile: string;
    company1Sub: string;
    company2Sub: string;
  };
  products: {
    title: string;
    subtitle: string;
    filterAll: string;
    filterMinerals: string;
    filterAgri: string;
    filterSeafood: string;
    requestBtn: string;
    specAvailableNotice: string;
    originLabel: string;
    applicationsLabel: string;
    handlingLabel: string;
  };
  projects: {
    title: string;
    subtitle: string;
    comingSoonNotice: string;
    disclaimer: string;
  };
  markets: {
    title: string;
    kicker: string;
    subtitle: string;
    keyDestinations: string;
    focusStatement: string;
  };
  about: {
    title: string;
    subtitle: string;
    storyTitle: string;
    storyParagraph1: string;
    storyParagraph2: string;
    visionTitle: string;
    visionText: string;
    missionTitle: string;
    missionText: string;
    valuesTitle: string;
    valuesSubtitle: string;
    networkTitle: string;
    networkText: string;
  };
  sustainability: {
    title: string;
    subtitle: string;
    commitmentQuote: string;
    topic1Title: string;
    topic1Desc: string;
    topic2Title: string;
    topic2Desc: string;
    topic3Title: string;
    topic3Desc: string;
    topic4Title: string;
    topic4Desc: string;
    topic5Title: string;
    topic5Desc: string;
    topic6Title: string;
    topic6Desc: string;
  };
  news: {
    title: string;
    subtitle: string;
    sampleNotice: string;
    readArticle: string;
    filterAll: string;
  };
  contact: {
    title: string;
    subtitle: string;
    company1Name: string;
    company2Name: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    companyLabel: string;
    countryLabel: string;
    emailLabel: string;
    phoneLabel: string;
    businessInterestLabel: string;
    productLabel: string;
    messageLabel: string;
    submitBtn: string;
    successTitle: string;
    successMessage: string;
    anotherInquiryBtn: string;
  };
  footer: {
    tagline: string;
    groupNotice: string;
    navigation: string;
    business: string;
    entities: string;
    contactHead: string;
    rights: string;
    privacy: string;
    terms: string;
  };
}

export const copyData: Record<string, UICopy> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      companies: 'Our Companies',
      business: 'Business Areas',
      products: 'Products',
      minerals: 'Minerals & Metals',
      agriculture: 'Food & Agriculture',
      seafood: 'Seafood',
      projects: 'Projects',
      markets: 'Global Markets',
      sustainability: 'Sustainability',
      news: 'News & Insights',
      contact: 'Contact',
      inquireBtn: 'B2B Inquiry',
    },
    hero: {
      titleLine1: 'GLOBAL RESOURCES.',
      titleLine2: 'TRUSTED TRADE.',
      subtitle: 'Kidrill Group connects mineral resources, commodities and high-quality products with trusted buyers across international markets.',
      exploreBtn: 'EXPLORE OUR BUSINESS',
      contactBtn: 'CONTACT US',
      statement: 'Global resources. Trusted trade. Long-term partnerships.',
      presenceTag: 'Operating across Indonesia, Vietnam & Global Corridors',
    },
    overview: {
      title: 'Institutional Trade Architecture',
      kicker: 'About Kidrill Group',
      lead: 'Bridging high-integrity Southeast Asian supply basins with major industrial, energy, and commercial buyers across the world.',
      description: 'Kidrill Group operates as a cross-border resources and commodity trading enterprise. With strategic operational hubs in Surabaya, Indonesia and Ho Chi Minh City, Vietnam, the Group delivers structured B2B trade execution across mineral commodities, energy, refined metals, agricultural staples, and premium seafood exports.',
      stat1Label: 'Core Operating Hubs',
      stat1Value: 'Indonesia & Vietnam',
      stat2Label: 'Operating Standard',
      stat2Value: 'Strict B2B Due Diligence',
      stat3Label: 'Primary Target Corridors',
      stat3Value: 'East Asia, Europe & Americas',
    },
    globalPresence: {
      title: 'Connecting Southeast Asia to Global Markets',
      subtitle: 'An international footprint engineered for dependable cross-border commodity flow.',
      description: 'From mineral basins in Indonesia and agricultural basins in Vietnam to heavy industrial ports in South Korea, China, Europe, and the United States, our trade network is built upon direct sourcing, verified provenance, and deep maritime coordination.',
      strategicHubs: 'Strategic Group Hubs',
      hub1Title: 'Mineral & Energy Operations Hub',
      hub1City: 'Surabaya, Indonesia',
      hub2Title: 'Commodity Export & Sourcing Gateway',
      hub2City: 'Ho Chi Minh City, Vietnam',
    },
    businessAreas: {
      title: 'Core Business Areas',
      subtitle: 'Structured trade solutions across four foundational international commodity sectors.',
      learnMore: 'Explore Category',
      area1Title: 'Minerals & Metals',
      area1Desc: 'International sourcing and trading of mineral resources, metals and commodities.',
      area1Items: ['Thermal & Metallurgical Coal', 'High-Purity Copper Cathodes', 'Base & Industrial Metals', 'Mineral Resources & Ores'],
      area2Title: 'Food & Agriculture',
      area2Desc: 'Connecting quality agricultural and food products from Vietnam with international buyers.',
      area2Items: ['Vietnamese Fragrant & White Rice', 'Highland Robusta & Arabica Coffee', 'Processed Agricultural Staples', 'B2B Food Ingredients'],
      area3Title: 'Seafood',
      area3Desc: 'International sourcing and export of Vietnamese seafood products to global markets.',
      area3Items: ['Frozen Black Tiger & Vannamei Shrimp', 'Export Processed Fish Fillets', 'Cephalopods & Pelagic Marine Products', 'Controlled Cold-Chain Logistics'],
      area4Title: 'International Trading',
      area4Desc: 'Cross-border B2B sourcing, trading and supply solutions across Asia and global markets.',
      area4Items: ['Bulk Maritime Logistics Oversight', 'Structured Trade Financing Support', 'B2B Supply Chain Risk Mitigation', 'End-to-End Contract Assurance'],
    },
    twoCompanies: {
      title: 'Two Companies. One Global Vision.',
      kicker: 'Group Entities',
      subtitle: 'Two specialized operating corporations working seamlessly within the unified Kidrill Group trade architecture.',
      viewProfile: 'View Corporate Profile',
      company1Sub: 'Surabaya, Indonesia · Mineral & Energy Commodity Division',
      company2Sub: 'Ho Chi Minh City, Vietnam · Agricultural, Seafood & Sourcing Division',
    },
    products: {
      title: 'Products & Commodities',
      subtitle: 'Commercial commodity overview across mineral resources, grains, coffee, and certified cold-chain marine products.',
      filterAll: 'All Categories',
      filterMinerals: 'Minerals & Metals',
      filterAgri: 'Food & Agriculture',
      filterSeafood: 'Seafood Export',
      requestBtn: 'REQUEST PRODUCT INFORMATION',
      specAvailableNotice: 'Detailed specifications, lab assays, and commercial terms: Available upon request.',
      originLabel: 'Origin',
      applicationsLabel: 'Primary Applications',
      handlingLabel: 'Operating Entity',
    },
    projects: {
      title: 'Strategic Projects & Alliances',
      subtitle: 'Long-term resource supply corridors, trade joint ventures, and structured export initiatives.',
      comingSoonNotice: 'PROJECT INFORMATION COMING SOON',
      disclaimer: 'In strict compliance with partner confidentiality and international B2B protocols, detailed project volumes and contract parameters are shared only under mutual non-disclosure agreements.',
    },
    markets: {
      title: 'From Southeast Asia to the World',
      kicker: 'Global Markets',
      subtitle: 'Our network connects suppliers and buyers across key international markets, with a focus on long-term B2B relationships.',
      keyDestinations: 'Key Destination Markets',
      focusStatement: 'We actively partner with energy utilities, metal processors, state trading entities, and wholesale distributors in Southeast Asia, China, South Korea, Europe, and the United States.',
    },
    about: {
      title: 'Building Long-Term Value Through International Trade',
      subtitle: 'A disciplined trading group anchored in Southeast Asia with international perspective and institutional standards.',
      storyTitle: 'Our Story & Philosophy',
      storyParagraph1: 'Kidrill Group was formed with a clear imperative: to bridge Southeast Asia’s rich natural resources and agricultural bounty with the exacting standards of the world’s major industrial consumers and food wholesalers. Unlike transactional intermediaries, we operate with a long-term enterprise horizon inspired by international trading corporations.',
      storyParagraph2: 'Through PT PMA Kidrill Metal Mining in Indonesia and Thunder Mark Vietnam Co., Ltd in Vietnam, we combine localized ground insight with rigorous commercial governance. We believe that enduring value in global trade is founded on honoring delivery schedules, transparent quality grading, and unyielding contract fidelity.',
      visionTitle: 'Our Vision',
      visionText: 'To build a trusted international trading group connecting Southeast Asian resources and products with global markets.',
      missionTitle: 'Our Mission',
      missionText: 'To create reliable, transparent and long-term partnerships between suppliers and buyers through professional international trade.',
      valuesTitle: 'Our Guiding Principles',
      valuesSubtitle: 'The institutional values governing every cross-border shipment, charter, and commercial alliance.',
      networkTitle: 'International Trading Network',
      networkText: 'Our physical presence in Surabaya and Ho Chi Minh City provides continuous oversight over concession sourcing, processing facilities, river barge transshipment, and deep-water ocean loading. This ensures our global buyers receive verified commodities with complete compliance documentation.',
    },
    sustainability: {
      title: 'Corporate Responsibility & Sourcing Integrity',
      subtitle: 'Embedding environmental awareness, social stewardship, and ethical governance throughout our supply chains.',
      commitmentQuote: 'We are committed to continuously improving responsible sourcing and sustainable business practices.',
      topic1Title: 'Responsible Sourcing',
      topic1Desc: 'Rigorous vetting of mineral concessions, farm cooperatives, and aquaculture facilities to ensure compliance with regional labor, environmental, and statutory mandates.',
      topic2Title: 'Environmental Awareness',
      topic2Desc: 'Proactive engagement with logistics providers to optimize maritime routing, minimize waste in bulk handling, and advocate for progressive emissions reductions.',
      topic3Title: 'Long-Term Partnerships',
      topic3Desc: 'Cultivating multi-year commercial relationships that encourage joint investments in quality enhancement, worker safety, and community resilience.',
      topic4Title: 'Supply Chain Transparency',
      topic4Desc: 'Implementing end-to-end documentation from mine basin or farm gate to export manifest, providing buyers with verifiable traceability.',
      topic5Title: 'Community Responsibility',
      topic5Desc: 'Respecting the communities adjacent to extraction and agricultural hubs by supporting fair economic terms and local employment dignity.',
      topic6Title: 'International Standards',
      topic6Desc: 'Aligning operational procedures with international maritime law, WTO trade guidelines, and food safety standards to protect all stakeholders.',
    },
    news: {
      title: 'News & Insights',
      subtitle: 'Corporate perspectives, market analyses, and editorial commentary on international commodity flows.',
      sampleNotice: 'Sample Article',
      readArticle: 'Read Full Briefing',
      filterAll: 'All Insights',
    },
    contact: {
      title: "Let's Build Global Trade Together.",
      subtitle: 'Engage our trading desks in Surabaya and Ho Chi Minh City for structured inquiries, long-term supply agreements, or strategic trading alliances.',
      company1Name: 'PT PMA Kidrill Metal Mining (Indonesia)',
      company2Name: 'Thunder Mark Vietnam Co., Ltd (Vietnam)',
      formTitle: 'Submit a Commercial Inquiry',
      formSubtitle: 'Please provide detailed commodity specifications and requirements. Our trade desk will respond promptly.',
      nameLabel: 'Full Name / Contact Person *',
      companyLabel: 'Company / Organization *',
      countryLabel: 'Country / Domicile *',
      emailLabel: 'Corporate Email *',
      phoneLabel: 'Telephone / Mobile Number *',
      businessInterestLabel: 'Business Interest *',
      productLabel: 'Target Product or Commodity *',
      messageLabel: 'Inquiry Specifications & Estimated Volume *',
      submitBtn: 'SEND INQUIRY',
      successTitle: 'Inquiry Transmitted Successfully',
      successMessage: 'Thank you for contacting Kidrill Group. Your inquiry has been routed to our commercial desk. A trade representative will review your specifications and contact your organization.',
      anotherInquiryBtn: 'Send Another Inquiry',
    },
    footer: {
      tagline: 'Global Resources. Trusted Trade.',
      groupNotice: 'Kidrill Group is an international resources and commodity trading enterprise operating PT PMA Kidrill Metal Mining (Indonesia) and Thunder Mark Vietnam Co., Ltd (Vietnam).',
      navigation: 'Site Navigation',
      business: 'Business Sectors',
      entities: 'Group Entities',
      contactHead: 'Corporate Inquiries',
      rights: 'Kidrill Group. All rights reserved.',
      privacy: 'Confidentiality Policy',
      terms: 'Terms of International Trade',
    },
  },
  ko: {
    nav: {
      home: '홈',
      about: '회사 소개',
      companies: '그룹사 소개',
      business: '사업 분야',
      products: '취급 품목',
      minerals: '광물 및 금속',
      agriculture: '식품 및 농산물',
      seafood: '수산물',
      projects: '프로젝트',
      markets: '글로벌 시장',
      sustainability: '지속가능경영',
      news: '뉴스 & 인사이트',
      contact: '문의하기',
      inquireBtn: 'B2B 상담 문의',
    },
    hero: {
      titleLine1: '글로벌 자원.',
      titleLine2: '신뢰의 무역.',
      subtitle: '키드릴 그룹은 동남아시아의 풍부한 광물 자원과 고품질 농수산 상품을 전 세계 신뢰할 수 있는 글로벌 바이어와 연결합니다.',
      exploreBtn: '사업 분야 둘러보기',
      contactBtn: '상담 및 문의',
      statement: '글로벌 자원. 신뢰할 수 있는 무역. 장기적 파트너십.',
      presenceTag: '인도네시아 및 베트남 거점 기반 글로벌 공급망 운영',
    },
    overview: {
      title: '글로벌 무역 거점 및 실행 역량',
      kicker: '키드릴 그룹 개요',
      lead: '동남아시아의 신뢰할 수 있는 원자재 생산지와 전 세계 주요 산업, 에너지, 유통 기업을 잇는 종합 무역 그룹입니다.',
      description: '키드릴 그룹(Kidrill Group)은 광물 자원, 비철금속, 농산물, 프리미엄 수산물 수출을 아우르는 국제 무역 및 자원 기업입니다. 인도네시아 수라바야와 베트남 호치민시의 전략적 사업 거점을 통해 체계적이고 신뢰성 높은 B2B 무역 실행력을 제공합니다.',
      stat1Label: '핵심 운영 거점',
      stat1Value: '인도네시아 및 베트남',
      stat2Label: '무역 운영 원칙',
      stat2Value: '엄격한 B2B 사전 검증 및 계약 이행',
      stat3Label: '주요 수출 대상국',
      stat3Value: '동아시아, 유럽 및 북미 시장',
    },
    globalPresence: {
      title: '동남아시아에서 글로벌 시장으로',
      subtitle: '안정적인 국가 간 원자재 공급을 위해 설계된 국제 비즈니스 네트워크입니다.',
      description: '인도네시아의 풍부한 광물 자원과 베트남의 전략 농수산 산지에서 시작하여, 한국, 중국, 유럽, 미국의 주요 산업 항만에 이르기까지 당사의 무역망은 철저한 현지 소싱과 해상 물류 조율을 바탕으로 운영됩니다.',
      strategicHubs: '그룹 핵심 전략 거점',
      hub1Title: '광물 및 에너지 자원 사업 거점',
      hub1City: '인도네시아 수라바야',
      hub2Title: '농수산 상품 수출 및 소싱 게이트웨이',
      hub2City: '베트남 호치민시',
    },
    businessAreas: {
      title: '핵심 사업 분야',
      subtitle: '국제 무역을 선도하는 4대 전략적 사업 포트폴리오를 운영합니다.',
      learnMore: '분야 상세 보기',
      area1Title: '광물 및 금속 (Minerals & Metals)',
      area1Desc: '광물 자원, 금속 및 산업용 원자재의 글로벌 소싱 및 국제 거래를 수행합니다.',
      area1Items: ['연료용 및 제철용 석탄', '고순도 전기동 및 비철금속', '산업용 광물 및 정광', '광산 연계 무역 솔루션'],
      area2Title: '식품 및 농산물 (Food & Agriculture)',
      area2Desc: '베트남의 우수한 농산물과 식품 원료를 글로벌 바이어와 연결합니다.',
      area2Items: ['베트남산 프리미엄 자스민 및 백미', '중부 고원지대 로부스타 생두', '가공 농산 원료 및 식자재', '대량 식량 안보 곡물 공급'],
      area3Title: '수산물 수출 (Seafood)',
      area3Desc: '베트남 연안의 고품질 냉동 수산물을 전 세계 식음료 시장에 공급합니다.',
      area3Items: ['급속 냉동 블랙타이거 및 흰다리새우', '수출용 가공 생선 필렛', '원양 어종 및 두족류 가공품', '철저한 콜드체인 위생 관리'],
      area4Title: '국제 종합 무역 (International Trading)',
      area4Desc: '아시아 및 글로벌 시장을 아우르는 국가 간 B2B 소싱, 무역 및 물류 솔루션을 제공합니다.',
      area4Items: ['벌크 해상 물류 및 선적 관리', '체계적인 무역 금융 지원', '공급망 리스크 사전 관리', '투명한 계약 이행 및 품질 보증'],
    },
    twoCompanies: {
      title: '두 개의 전문 기업. 하나의 글로벌 비전.',
      kicker: '그룹사 소개',
      subtitle: '키드릴 그룹의 통일된 비전 아래 각 분야별 전문성을 갖춘 두 개의 법인이 시너지를 창출합니다.',
      viewProfile: '법인 정보 보기',
      company1Sub: '인도네시아 수라바야 · 광물 자원 및 원자재 무역 법인',
      company2Sub: '베트남 호치민시 · 농산물, 수산물 및 소비재 수출 법인',
    },
    products: {
      title: '취급 품목 안내',
      subtitle: '광물, 비철금속, 곡물, 커피 및 인증된 콜드체인 수산물 포트폴리오를 제공합니다.',
      filterAll: '전체 품목',
      filterMinerals: '광물 및 금속',
      filterAgri: '식품 및 농산물',
      filterSeafood: '수산물 수출',
      requestBtn: '품목 상세 정보 요청',
      specAvailableNotice: '상세 스펙, 시험 성적서 및 계약 조건: 요청 시 제공 가능합니다.',
      originLabel: '원산지',
      applicationsLabel: '주요 활용 분야',
      handlingLabel: '담당 그룹사',
    },
    projects: {
      title: '주요 프로젝트 및 전략적 제휴',
      subtitle: '장기 자원 공급 회랑, 무역 합작 사업 및 체계적인 글로벌 수출 프로젝트입니다.',
      comingSoonNotice: '프로젝트 정보 준비 중 (COMING SOON)',
      disclaimer: '국제 B2B 무역 규범 및 파트너사 비밀유지협약에 따라 구체적인 계약 물량 및 세부 프로젝트 조건은 상호 비밀유지협약(NDA) 체결 후 제공됩니다.',
    },
    markets: {
      title: '동남아시아에서 세계 주요 시장으로',
      kicker: '글로벌 시장',
      subtitle: '당사의 네트워크는 신뢰할 수 있는 장기 B2B 파트너십을 바탕으로 핵심 국제 시장을 연결합니다.',
      keyDestinations: '주요 거래 대상 지역',
      focusStatement: '동남아시아 역내를 비롯하여 한국, 중국, 유럽, 미국의 대형 발전사, 금속 제련 기업, 식품 수입 도매상과 긴밀한 무역 관계를 구축하고 있습니다.',
    },
    about: {
      title: '국제 무역을 통한 지속가능한 가치 창출',
      subtitle: '동남아시아의 풍부한 자원 기반과 글로벌 선진 무역 규율을 결합한 국제 종합 무역 그룹입니다.',
      storyTitle: '그룹 소개 및 비즈니스 철학',
      storyParagraph1: '키드릴 그룹은 동남아시아의 풍부한 천연자원과 농수산 경쟁력을 전 세계 주요 산업 수요처와 식음료 유통망의 까다로운 기준에 맞추어 공급하기 위해 출범하였습니다. 당사는 단기적 중개 차익을 쫓는 유통업체가 아닌, 선진 글로벌 종합상사의 장기적이고 체계적인 파트너십 철학을 지향합니다.',
      storyParagraph2: '인도네시아의 PT PMA Kidrill Metal Mining과 베트남의 Thunder Mark Vietnam Co., Ltd를 통하여 현지 산지의 깊은 네트워크와 글로벌 계약 집행력을 융합하였습니다. 국제 무역에서 가장 중요한 가치는 철저한 선적 기일 준수와 투명한 품질 관리, 그리고 흔들림 없는 계약 신뢰에 있음을 굳게 믿고 있습니다.',
      visionTitle: '그룹 비전',
      visionText: '동남아시아의 자원과 우수한 상품을 세계 시장과 연결하는 가장 신뢰받는 국제 무역 그룹을 구축합니다.',
      missionTitle: '그룹 미션',
      missionText: '전문적인 국제 무역 역량을 바탕으로 공급자와 바이어 간의 투명하고 안정적이며 지속가능한 장기 파트너십을 창출합니다.',
      valuesTitle: '6대 핵심 가치',
      valuesSubtitle: '모든 국제 선적, 용선 계약 및 상업적 협상에서 엄격히 준수되는 원칙입니다.',
      networkTitle: '글로벌 무역 인프라',
      networkText: '수라바야와 호치민시에 상주하는 전문 인력을 통해 광산 및 농수산 생산지, 가공 공장, 바지선 환적 및 대형 원양 선적에 이르는 전 과정을 철저히 모니터링합니다. 이를 통해 전 세계 바이어에게 규격에 완벽히 부합하는 원자재를 안전하게 인도합니다.',
    },
    sustainability: {
      title: '지속가능경영 및 책임 있는 조달',
      subtitle: '환경 보호 인식, 사회적 책임, 그리고 투명한 지배구조를 공급망 전반에 걸쳐 실천합니다.',
      commitmentQuote: '우리는 책임 있는 원자재 조달과 지속가능한 비즈니스 관행을 지속적으로 발전시켜 나갈 것을 약속합니다.',
      topic1Title: '책임 있는 조달 (Responsible Sourcing)',
      topic1Desc: '광산, 농업 협동조합, 양식 시설의 환경 법규 및 노동 기준 준수 여부를 사전에 철저히 검증합니다.',
      topic2Title: '환경 보호 인식 (Environmental Awareness)',
      topic2Desc: '해상 운송 선박의 최적화 운항을 지원하고 벌크 하역 과정에서의 환경 영향을 최소화하기 위해 노력합니다.',
      topic3Title: '장기적 파트너십 (Long-term Partnerships)',
      topic3Desc: '단기 이익을 넘어 품질 개선, 안전 설비 투자, 지역사회 상생을 함께 도모하는 장기적 관계를 구축합니다.',
      topic4Title: '공급망 투명성 (Supply Chain Transparency)',
      topic4Desc: '생산지부터 수출 선적 서류까지 전 단계에 걸친 투명한 문서화를 통해 바이어에게 신뢰할 수 있는 이력을 제공합니다.',
      topic5Title: '지역사회 기여 (Community Responsibility)',
      topic5Desc: '생산 거점 인근 지역사회의 권익을 존중하고 공정한 경제적 보상과 현지 고용 확대를 지지합니다.',
      topic6Title: '국제 기준 준수 (International Standards)',
      topic6Desc: '국제해사기구(IMO) 환경 규제, WTO 무역 규범, 국제 식품 안전 기준을 엄격히 준수합니다.',
    },
    news: {
      title: '뉴스 및 인사이트',
      subtitle: '글로벌 원자재 동향, 그룹 소식 및 국제 무역에 관한 심층 분석 리포트를 제공합니다.',
      sampleNotice: '샘플 기사 (Sample Article)',
      readArticle: '리포트 전문 읽기',
      filterAll: '전체 보기',
    },
    contact: {
      title: '글로벌 무역의 미래를 함께 열어갑니다.',
      subtitle: '장기 공급 계약, 대량 원자재 조달 또는 전략적 무역 제휴를 위해 수라바야 및 호치민 지사에 문의해 주시기 바랍니다.',
      company1Name: 'PT PMA Kidrill Metal Mining (인도네시아)',
      company2Name: 'Thunder Mark Vietnam Co., Ltd (베트남)',
      formTitle: '비즈니스 상담 및 견적 요청',
      formSubtitle: '요청하시는 품목 규격과 예상 수량을 기재해 주시면 담당 무역 데스크에서 신속히 검토 후 연락드리겠습니다.',
      nameLabel: '성함 / 직책 *',
      companyLabel: '회사명 / 기관명 *',
      countryLabel: '국가 / 사업장 소재지 *',
      emailLabel: '회사 공식 이메일 *',
      phoneLabel: '연락처 (전화번호) *',
      businessInterestLabel: '관심 사업 분야 *',
      productLabel: '대상 품목 및 원자재 *',
      messageLabel: '문의 내용 및 요청 규격 / 수량 *',
      submitBtn: '문의 사항 제출하기',
      successTitle: '상담 요청이 정상적으로 접수되었습니다.',
      successMessage: '키드릴 그룹에 문의해 주셔서 대단히 감사합니다. 접수된 내용은 전담 무역 데스크로 전달되었으며, 담당자가 검토 후 기재해 주신 연락처로 신속히 회신드리겠습니다.',
      anotherInquiryBtn: '새로운 문의 작성하기',
    },
    footer: {
      tagline: 'Global Resources. Trusted Trade.',
      groupNotice: '키드릴 그룹은 인도네시아 PT PMA Kidrill Metal Mining 및 베트남 Thunder Mark Vietnam Co., Ltd를 산하에 둔 국제 자원 및 종합 무역 기업입니다.',
      navigation: '사이트 바로가기',
      business: '사업 분야',
      entities: '그룹 법인 안내',
      contactHead: '본사 및 대표 연락처',
      rights: 'Kidrill Group. All rights reserved.',
      privacy: '비밀유지 및 정보보호 방침',
      terms: '국제 무역 거래 약관',
    },
  },
};
