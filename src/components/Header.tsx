import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronRight, ChevronDown, PhoneCall } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';

// Per leadership: only the Nhà Văn Hoá logo stays alongside our own — the two
// organizations co-train together, so only that partnership is shown here.
const PARTNER_LOGOS = [
  { src: '/partners/nha-van-hoa-dong-nai.png', alt: 'Nhà Văn Hoá Thanh Thiếu Nhi Thành Phố Đồng Nai' },
];

const INFO_DROPDOWN = [
  { to: '/tin-tuc', vi: 'Tin Tức', en: 'News' },
  { to: '/tin-tuc', vi: 'Sự kiện', en: 'Events' },
  { to: '/tin-tuc', vi: 'Thông báo', en: 'Announcements' },
  { to: '/tin-tuc', vi: 'Blog', en: 'Blog' },
];

const NAV_ITEMS = [
  { to: '/', vi: 'Trang chủ', en: 'Home' },
  { to: '/chuong-trinh', vi: 'Chương trình học', en: 'Programs' },
  { to: '/doi-ngu-giang-vien', vi: 'Giảng viên', en: 'Instructors' },
  { to: '/tin-tuc', vi: 'Thông tin', en: 'Information', children: INFO_DROPDOWN },
  { to: '/chinh-sach-bao-ve-tre-em', vi: 'An toàn', en: 'Safeguarding' },
  { to: '/tuyen-dung', vi: 'Tuyển dụng', en: 'Careers' },
];

export const Header = ({ lang, setLang, isScrolled, mobileMenuOpen, setMobileMenuOpen, t }: any) => {
  const { pathname } = useLocation();
  const { settings } = useSettings();
  const phoneNumber = settings?.phone || '0907828939';
  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileInfoOpen, setMobileInfoOpen] = useState(false);

  const isActive = (to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to));

  return (
    <nav className="fixed top-0 w-full z-50">
      <div className={`transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className={`flex justify-between items-center rounded-2xl px-4 sm:px-5 transition-all duration-300 ${
              isScrolled
                ? 'bg-white/85 backdrop-blur-xl shadow-lg shadow-black/5 border border-white/60 py-2'
                : 'bg-white/60 backdrop-blur-lg border border-white/40 shadow-sm py-2.5'
            }`}
          >
            <div className="flex items-center gap-3 shrink-0">
              <Link to="/" className="flex items-center gap-2 group">
                <img
                  src="/favicon.svg"
                  alt="Huy Võ Education"
                  className="w-9 h-9 transition-transform duration-300 group-hover:rotate-6"
                />
                <span className="inline lg:hidden font-heading font-bold text-lg text-gray-900 whitespace-nowrap">
                  Huy Võ <span className="text-brand-blue">Education</span>
                </span>
              </Link>

              {/* Partner / accreditation badges — same trust cue used on our partner Nhà Văn Hoá's own site */}
              <div className="hidden md:flex items-center gap-1.5 pl-2.5 border-l border-gray-300/60">
                {PARTNER_LOGOS.map(logo => (
                  <img
                    key={logo.src}
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.alt}
                    className="w-6 h-6 rounded-full object-contain bg-white shadow-sm ring-1 ring-black/5"
                  />
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-0.5 mx-2">
              {NAV_ITEMS.map(item => {
                const active = isActive(item.to);
                if (item.children) {
                  return (
                    <div
                      key={item.to}
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(true)}
                      onMouseLeave={() => setOpenDropdown(false)}
                    >
                      <Link
                        to={item.to}
                        className={`relative flex items-center gap-1 px-2.5 py-2 text-sm font-semibold whitespace-nowrap rounded-full transition-colors duration-200 ${
                          active ? 'text-brand-blue' : 'text-gray-600 hover:text-brand-blue'
                        }`}
                      >
                        {t(item.vi, item.en)}
                        <ChevronDown size={14} className={`transition-transform ${openDropdown ? 'rotate-180' : ''}`} />
                        {active && (
                          <motion.span
                            layoutId="nav-active-pill"
                            className="absolute inset-0 -z-10 rounded-full bg-brand-blue/10"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                      </Link>
                      <AnimatePresence>
                        {openDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-64"
                          >
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-3 grid grid-cols-2 gap-1">
                              {item.children.map(sub => (
                                <Link
                                  key={sub.vi}
                                  to={sub.to}
                                  className="px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-brand-blue transition-colors"
                                >
                                  {t(sub.vi, sub.en)}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`relative px-2.5 py-2 text-sm font-semibold whitespace-nowrap rounded-full transition-colors duration-200 ${
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

            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <a
                href={`tel:${phoneNumber}`}
                title={phoneNumber}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900/5 hover:bg-brand-blue/10 text-gray-600 hover:text-brand-blue transition-colors"
                aria-label="Gọi ngay"
              >
                <PhoneCall size={14} />
              </a>
              <button
                onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
                className="flex items-center gap-1.5 bg-gray-900/5 hover:bg-gray-900/10 text-gray-700 px-2.5 py-2 rounded-full text-xs font-bold transition-colors"
              >
                <Globe size={14} />
                {lang.toUpperCase()}
              </button>
              <Link
                to="/#register"
                className="flex items-center gap-1 bg-brand-blue hover:bg-blue-700 text-white px-4 py-2.5 rounded-full font-heading font-semibold text-sm shadow-md shadow-brand-blue/30 hover:shadow-lg hover:shadow-brand-blue/40 hover:-translate-y-0.5 transition-all"
              >
                {t('Đăng Ký Đào Tạo', 'Enroll Now')}
                <ChevronRight size={16} />
              </Link>
            </div>

            {/* Mobile: hotline stays one tap away */}
            <a
              href={`tel:${phoneNumber}`}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full bg-brand-blue/10 text-brand-blue mr-1"
              aria-label="Gọi ngay"
            >
              <PhoneCall size={16} />
            </a>

            <button
              className="lg:hidden text-gray-800 p-2 -mr-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
                item.children ? (
                  <div key={item.to}>
                    <button
                      onClick={() => setMobileInfoOpen(!mobileInfoOpen)}
                      className={`w-full flex items-center justify-between text-base font-semibold py-2.5 px-3 rounded-xl transition-colors ${
                        isActive(item.to) ? 'text-brand-blue bg-brand-blue/5' : 'text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      {t(item.vi, item.en)}
                      <ChevronDown size={16} className={`transition-transform ${mobileInfoOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {mobileInfoOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-3"
                        >
                          {item.children.map(sub => (
                            <Link
                              key={sub.vi}
                              to={sub.to}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block text-sm font-medium text-gray-600 hover:text-brand-blue py-2 px-3"
                            >
                              {t(sub.vi, sub.en)}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
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
                )
              ))}

              {/* Partner badges, mobile */}
              <div className="flex items-center gap-2 pt-3 mt-2 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide mr-1">
                  {t('Đối tác', 'Partner')}
                </span>
                {PARTNER_LOGOS.map(logo => (
                  <img key={logo.src} src={logo.src} alt={logo.alt} title={logo.alt} className="w-7 h-7 rounded-full object-contain bg-white shadow-sm ring-1 ring-black/5" />
                ))}
              </div>

              <div className="pt-4 mt-2 border-t border-gray-100 flex items-center gap-3">
                <button
                  onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
                  className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-full font-semibold text-sm"
                >
                  <Globe size={16} />
                  {lang.toUpperCase()}
                </button>
                <Link
                  to="/#register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center bg-brand-blue text-white px-6 py-2.5 rounded-full font-heading font-semibold shadow-md shadow-brand-blue/30"
                >
                  {t('Đăng Ký Đào Tạo', 'Enroll Now')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
