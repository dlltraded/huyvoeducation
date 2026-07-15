import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ContactWidgets } from '../components/ContactWidgets';

export const MainLayout = () => {
  const [lang, setLang] = useState<'vi'|'en'>('vi');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = (vi: string, en: string) => lang === 'vi' ? vi : en;

  return (
    <div className="font-sans text-gray-800 bg-gray-50 overflow-x-hidden">
      <Header 
        lang={lang} setLang={setLang} 
        isScrolled={isScrolled} 
        mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} 
        t={t} 
      />
      
      <main className="min-h-screen">
        {/* Pass t context using Outlet context */}
        <Outlet context={{ t, lang }} />
      </main>

      <Footer t={t} />
      
      <ContactWidgets />
    </div>
  );
};
