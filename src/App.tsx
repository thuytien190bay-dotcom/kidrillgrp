import React, { useState, useEffect } from 'react';
import { Language, NavigationPage, ProductItem } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CompaniesPage } from './pages/CompaniesPage';
import { ProductsPage } from './pages/ProductsPage';
import { MineralsPage } from './pages/MineralsPage';
import { AgriculturePage } from './pages/AgriculturePage';
import { SeafoodPage } from './pages/SeafoodPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { MarketsPage } from './pages/MarketsPage';
import { SustainabilityPage } from './pages/SustainabilityPage';
import { NewsPage } from './pages/NewsPage';
import { ContactPage } from './pages/ContactPage';
import { GoogleDrivePortal } from './components/GoogleDrivePortal';

export default function App() {
  const language: Language = 'en';
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedProductForInquiry, setSelectedProductForInquiry] = useState<ProductItem | null>(null);

  // Sync with URL Hash for seamless back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as NavigationPage;
      const validPages: NavigationPage[] = [
        'home',
        'about',
        'companies',
        'products',
        'minerals',
        'agriculture',
        'seafood',
        'projects',
        'markets',
        'sustainability',
        'news',
        'contact',
        'drive',
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: NavigationPage) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInquiry = (product?: ProductItem) => {
    setSelectedProductForInquiry(product || null);
    setInquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between selection:bg-[#b8860b] selection:text-white">
      {/* 3-Zone Sticky Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        language={language}
        onOpenInquiry={() => handleOpenInquiry()}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage
            language={language}
            onNavigate={handleNavigate}
            onOpenInquiry={handleOpenInquiry}
          />
        )}
        {currentPage === 'about' && (
          <AboutPage
            language={language}
            onNavigate={handleNavigate}
            onOpenInquiry={() => handleOpenInquiry()}
          />
        )}
        {currentPage === 'companies' && (
          <CompaniesPage
            language={language}
            onNavigate={handleNavigate}
            onOpenInquiry={() => handleOpenInquiry()}
          />
        )}
        {currentPage === 'products' && (
          <ProductsPage
            language={language}
            onNavigate={handleNavigate}
            onOpenInquiry={handleOpenInquiry}
          />
        )}
        {currentPage === 'minerals' && (
          <MineralsPage
            language={language}
            onNavigate={handleNavigate}
            onOpenInquiry={handleOpenInquiry}
          />
        )}
        {currentPage === 'agriculture' && (
          <AgriculturePage
            language={language}
            onNavigate={handleNavigate}
            onOpenInquiry={handleOpenInquiry}
          />
        )}
        {currentPage === 'seafood' && (
          <SeafoodPage
            language={language}
            onNavigate={handleNavigate}
            onOpenInquiry={handleOpenInquiry}
          />
        )}
        {currentPage === 'projects' && (
          <ProjectsPage
            language={language}
            onNavigate={handleNavigate}
            onOpenInquiry={() => handleOpenInquiry()}
          />
        )}
        {currentPage === 'markets' && (
          <MarketsPage
            language={language}
            onNavigate={handleNavigate}
            onOpenInquiry={() => handleOpenInquiry()}
          />
        )}
        {currentPage === 'sustainability' && (
          <SustainabilityPage
            language={language}
            onNavigate={handleNavigate}
            onOpenInquiry={() => handleOpenInquiry()}
          />
        )}
        {currentPage === 'news' && (
          <NewsPage
            language={language}
            onNavigate={handleNavigate}
            onOpenInquiry={() => handleOpenInquiry()}
          />
        )}
        {currentPage === 'contact' && (
          <ContactPage
            language={language}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'drive' && (
          <div className="pt-20">
            <GoogleDrivePortal onClose={() => handleNavigate('home')} />
          </div>
        )}
      </main>

      {/* Global Corporate Footer */}
      <Footer
        language={language}
        onNavigate={handleNavigate}
        onOpenInquiry={() => handleOpenInquiry()}
      />

      {/* Interactive B2B Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        language={language}
        preselectedProduct={selectedProductForInquiry}
      />
    </div>
  );
}
