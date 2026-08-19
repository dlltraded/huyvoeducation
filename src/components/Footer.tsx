import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle, ArrowUpRight, Share2, Video } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

export const Footer = ({ t }: any) => {
  const { settings } = useSettings();

  return (
    <footer className="bg-brand-dark text-gray-300 border-t-[12px] border-brand-green">
      {/* Top CTA strip */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10">
        <div>
          <p className="text-white font-heading font-bold text-xl md:text-2xl">
            {t('Sẵn sàng đồng hành cùng con bạn?', 'Ready to join Huy Võ Education?')}
          </p>
          <p className="text-gray-400 mt-1">
            {t('Đăng ký tư vấn miễn phí ngay hôm nay.', 'Register for a free consultation today.')}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <a
            href="/#register"
            className="inline-flex items-center gap-2 bg-brand-yellow hover:bg-yellow-400 text-brand-dark font-heading font-bold px-6 py-3 rounded-full transition-colors"
          >
            {t('Đăng Ký Đào Tạo', 'Enquire Now')} <ArrowUpRight size={18} />
          </a>
          {settings.zaloUrl && (
            <a
              href={settings.zaloUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-heading font-bold px-6 py-3 rounded-full transition-colors"
            >
              {t('Chat Zalo', 'Chat on Zalo')}
            </a>
          )}
        </div>
      </div>

      {/* Main columns */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-12 gap-10">
        {/* Brand + contact block */}
        <div className="md:col-span-4">
          <div className="flex items-center gap-3 mb-5 text-white">
            <img src="/favicon.svg" alt="Huy Võ Education" className="w-10 h-10" />
            <span className="font-heading font-bold text-2xl">Huy Võ Education</span>
          </div>
          <p className="text-gray-400 leading-relaxed mb-6 whitespace-pre-wrap">
            {t(settings.footerDescVi, settings.footerDescEn)}
          </p>

          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-brand-yellow shrink-0 mt-0.5" />
              <span>{settings.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-brand-yellow shrink-0" />
              <a href={`tel:${settings.phone}`} className="hover:text-white transition-colors">{settings.phone}</a>
            </li>
            {settings.email && (
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-yellow shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">{settings.email}</a>
              </li>
            )}
          </ul>

          <div className="flex items-center gap-3 mt-6">
            {settings.facebookUrl && settings.facebookUrl !== '#' && (
              <a href={settings.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-yellow hover:text-brand-dark flex items-center justify-center transition-colors">
                <Share2 size={16} />
              </a>
            )}
            {settings.zaloUrl && (
              <a href={settings.zaloUrl} target="_blank" rel="noreferrer" aria-label="Zalo" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-yellow hover:text-brand-dark flex items-center justify-center transition-colors">
                <MessageCircle size={16} />
              </a>
            )}
            {settings.youtubeUrl && settings.youtubeUrl !== '#' && (
              <a href={settings.youtubeUrl} target="_blank" rel="noreferrer" aria-label="Youtube" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-yellow hover:text-brand-dark flex items-center justify-center transition-colors">
                <Video size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Link columns */}
        <div className="md:col-span-2">
          <h4 className="text-white font-heading font-bold text-base mb-5">{t('Thông tin', 'Information')}</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/tin-tuc" className="hover:text-brand-yellow transition-colors">{t('Tin Tức', 'News')}</Link></li>
            <li><Link to="/tin-tuc" className="hover:text-brand-yellow transition-colors">{t('Sự kiện', 'Events')}</Link></li>
            <li><Link to="/tin-tuc" className="hover:text-brand-yellow transition-colors">{t('Thông báo', 'Announcements')}</Link></li>
            <li><Link to="/tin-tuc" className="hover:text-brand-yellow transition-colors">{t('Blog', 'Blog')}</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-white font-heading font-bold text-base mb-5">{t('Cộng đồng', 'Community')}</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/doi-ngu-giang-vien" className="hover:text-brand-yellow transition-colors">{t('Đội ngũ giảng viên', 'Instructors')}</Link></li>
            <li><Link to="/chinh-sach-bao-ve-tre-em" className="hover:text-brand-yellow transition-colors">{t('Bảo vệ trẻ em', 'Safeguarding')}</Link></li>
            <li><Link to="/tuyen-dung" className="hover:text-brand-yellow transition-colors">{t('Tuyển dụng', 'Careers')}</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-white font-heading font-bold text-base mb-5">{t('Liên kết nhanh', 'Quick Links')}</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/chuong-trinh" className="hover:text-brand-yellow transition-colors">{t('Chương trình học', 'Programs')}</Link></li>
            <li><a href="/#philosophy" className="hover:text-brand-yellow transition-colors">{t('Triết lý giáo dục', 'Our Philosophy')}</a></li>
            <li><a href="/#register" className="hover:text-brand-yellow transition-colors">{t('Đăng ký', 'Register')}</a></li>
            {settings.taxCode && (
              <li className="text-gray-500 pt-2 border-t border-white/10">
                {t('MST', 'Tax code')}: {settings.taxCode}
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Map */}
      {settings.mapIframe && (
        <div className="max-w-7xl mx-auto px-6 pb-14">
          <div
            className="rounded-xl overflow-hidden shadow-2xl h-72 md:h-80 border-4 border-brand-green/20 [&_iframe]:w-full [&_iframe]:h-full"
            dangerouslySetInnerHTML={{ __html: settings.mapIframe }}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-6 border-t border-white/10 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2026 Huy Võ Education. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">{t('Chính sách bảo mật', 'Privacy Policy')}</a>
          <a href="#" className="hover:text-white transition-colors">{t('Điều khoản', 'Terms of Service')}</a>
        </div>
      </div>
    </footer>
  );
};
