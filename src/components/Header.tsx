import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo = () => (
  <svg className="w-10 h-10" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M 20 75 Q 50 90 80 75" fill="none" stroke="#20B84D" strokeWidth="8" strokeLinecap="round"/>
    <path d="M 30 70 C 30 70, 20 40, 45 45" fill="none" stroke="#0A66C2" strokeWidth="8" strokeLinecap="round"/>
    <path d="M 70 70 C 70 70, 80 40, 55 45" fill="none" stroke="#FFC631" strokeWidth="8" strokeLinecap="round"/>
    <circle cx="50" cy="30" r="10" fill="#0A66C2"/>
  </svg>
);

export const Header = ({ lang, setLang, isScrolled, mobileMenuOpen, setMobileMenuOpen, t }: any) => {
  const linkBase = `font-medium transition-all duration-300`;
  const linkScrolled = `text-gray-600 hover:text-brand-blue`;
  const linkTop = `text-gray-900 bg-white/40 backdrop-blur-md border border-white/40 px-4 py-1.5 rounded-full shadow-sm hover:bg-white/60 hover:border-white/60`;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <Logo />
          <span className={`font-heading font-bold text-xl ${isScrolled ? 'text-gray-900' : 'text-gray-900 drop-shadow-md bg-white/50 px-3 py-1 rounded-full backdrop-blur-md border border-white/30'}`}>
            Huy Võ Education
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-5">
          <Link to="/" className={`${linkBase} ${isScrolled ? linkScrolled : linkTop}`}>{t('Trang chủ', 'Home')}</Link>
          <Link to="/chuong-trinh/stem" className={`${linkBase} ${isScrolled ? linkScrolled : linkTop}`}>{t('STEM', 'STEM')}</Link>
          <Link to="/chuong-trinh/nghe-thuat" className={`${linkBase} ${isScrolled ? linkScrolled : linkTop}`}>{t('Nghệ thuật', 'Arts')}</Link>
          <Link to="/chuong-trinh/the-thao-boi-loi" className={`${linkBase} ${isScrolled ? linkScrolled : linkTop}`}>{t('Thể thao', 'Sports')}</Link>
          
          <button onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium transition-colors">
            <Globe size={16} />
            {lang.toUpperCase()}
          </button>
          
          <a href="#register" className="bg-brand-blue hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-heading font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all border border-blue-500">
            {t('Đăng ký tư vấn', 'Book Consult')}
          </a>
        </div>

        <button className="md:hidden text-gray-800 relative z-[60] bg-white/50 p-1 rounded-md backdrop-blur-md" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-gray-800">{t('Trang chủ', 'Home')}</Link>
              <Link to="/chuong-trinh/stem" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-gray-800">{t('STEM', 'STEM')}</Link>
              <Link to="/chuong-trinh/nghe-thuat" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-gray-800">{t('Nghệ thuật', 'Arts')}</Link>
              <Link to="/chuong-trinh/the-thao-boi-loi" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-gray-800">{t('Thể thao', 'Sports')}</Link>
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <button onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')} className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium">
                  <Globe size={18} />
                  {lang.toUpperCase()}
                </button>
                <a href="#register" onClick={() => setMobileMenuOpen(false)} className="bg-brand-blue text-white px-6 py-2 rounded-full font-heading font-semibold text-center">
                  {t('Đăng ký', 'Register')}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
