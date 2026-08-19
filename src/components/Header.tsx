import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', vi: 'Trang chủ', en: 'Home' },
  { to: '/chuong-trinh', vi: 'Chương trình học', en: 'Programs' },
  { to: '/doi-ngu-giang-vien', vi: 'Giảng viên', en: 'Instructors' },
  { to: '/tin-tuc', vi: 'Tin tức', en: 'News' },
  { to: '/chinh-sach-bao-ve-tre-em', vi: 'An toàn', en: 'Safeguarding' },
];

export const Header = ({ lang, setLang, isScrolled, mobileMenuOpen, setMobileMenuOpen, t }: any) => {
  const { pathname } = useLocation();

  const isActive = (to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to));

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={`flex justify-between items-center rounded-2xl px-4 sm:px-5 transition-all duration-300 ${
            isScrolled
              ? 'bg-white/85 backdrop-blur-xl shadow-lg shadow-black/5 border border-white/60 py-2'
              : 'bg-white/60 backdrop-blur-lg border border-white/40 shadow-sm py-2.5'
          }`}
        >
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <img
              src="/favicon.svg"
              alt="Huy Võ Education"
              className="w-9 h-9 transition-transform duration-300 group-hover:rotate-6"
            />
            <span className="font-heading font-bold text-lg text-gray-900 whitespace-nowrap">
              Huy Võ <span className="text-brand-blue">Education</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1 mx-4">
            {NAV_ITEMS.map(item => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative px-3 py-2 text-sm font-semibold whitespace-nowrap rounded-full transition-colors duration-200 ${
                    active ? 'text-brand-blue' : 'text-gray-600 hover:text-brand-blue'
                  }`}
                >
                  {t(item.vi, item.en)}
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-brand-blue/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
              className="flex items-center gap-1.5 bg-gray-900/5 hover:bg-gray-900/10 text-gray-700 px-3 py-2 rounded-full text-xs font-bold transition-colors"
            >
              <Globe size={14} />
              {lang.toUpperCase()}
            </button>

            <a
              href="#register"
              className="flex items-center gap-1 bg-brand-blue hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-heading font-semibold text-sm shadow-md shadow-brand-blue/30 hover:shadow-lg hover:shadow-brand-blue/40 hover:-translate-y-0.5 transition-all"
            >
              {t('Đăng ký tư vấn', 'Book Consult')}
              <ChevronRight size={16} />
            </a>
          </div>

          <button
            className="lg:hidden text-gray-800 p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mx-4 mt-2 bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-1">
              {NAV_ITEMS.map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-semibold py-2.5 px-3 rounded-xl transition-colors ${
                    isActive(item.to) ? 'text-brand-blue bg-brand-blue/5' : 'text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  {t(item.vi, item.en)}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-gray-100 flex items-center gap-3">
                <button
                  onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
                  className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-full font-semibold text-sm"
                >
                  <Globe size={16} />
                  {lang.toUpperCase()}
                </button>
                <a
                  href="#register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center bg-brand-blue text-white px-6 py-2.5 rounded-full font-heading font-semibold shadow-md shadow-brand-blue/30"
                >
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
