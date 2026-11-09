import React from 'react';
import { formatPhone, telHref } from '../lib/phone';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle, ArrowUpRight, Share2, Video } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useHasNews } from '../lib/useHasNews';
import { BrandLockup } from './BrandLockup';

// A bare platform homepage (e.g. "https://facebook.com") is a placeholder, not a real page.
const isRealSocialUrl = (url?: string) =>
  !!url && url !== '#' && !/^https?:\/\/(www\.)?(facebook|youtube)\.com\/?$/i.test(url.trim());

export const Footer = ({ t }: any) => {
  const { settings } = useSettings();
  const hasNews = useHasNews();

  return (
    <footer className="bg-brand-navy text-white/70">
      <div className="brand-rule" aria-hidden="true" />
      {/* Top CTA strip */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10">
        <div>
          <p className="text-white font-heading font-bold text-xl md:text-2xl">
            {t('Sẵn sàng đồng hành cùng con bạn?', 'Ready to join Huy Võ Education?')}
          </p>
          <p className="text-white/60 mt-1">
            {t('Đăng ký tư vấn miễn phí ngay hôm nay.', 'Register for a free consultation today.')}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <a
            href="/#lien-he"
            className="inline-flex items-center gap-2 bg-white hover:bg-brand-blue-tint text-brand-navy font-heading font-bold px-6 py-3 rounded-full transition-colors"
          >
            {t('Liên hệ HVE', 'Contact HVE')} <ArrowUpRight size={18} />
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
          <div className="mb-6">
            <BrandLockup variant="reversed" />
          </div>
          <p className="text-white/60 leading-relaxed mb-6 whitespace-pre-wrap">
            {t(settings.footerDescVi, settings.footerDescEn)}
          </p>

          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-brand-yellow shrink-0 mt-0.5" />
              <span>{settings.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-brand-yellow shrink-0" />
              <a href={telHref(settings.phone)} className="hover:text-white transition-colors">{formatPhone(settings.phone)}</a>
            </li>
            {settings.email && (
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-yellow shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">{settings.email}</a>
              </li>
            )}
          </ul>

          <div className="flex items-center gap-3 mt-6">
            {isRealSocialUrl(settings.facebookUrl) && (
              <a href={settings.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-yellow hover:text-brand-dark flex items-center justify-center transition-colors">
                <Share2 size={16} />
              </a>
            )}
            {settings.zaloUrl && (
              <a href={settings.zaloUrl} target="_blank" rel="noreferrer" aria-label="Zalo" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-yellow hover:text-brand-dark flex items-center justify-center transition-colors">
                <MessageCircle size={16} />
              </a>
            )}
            {isRealSocialUrl(settings.youtubeUrl) && (
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
            <li><a href="/about.html" className="hover:text-white transition-colors">{t('Giới thiệu công ty', 'About us')}</a></li>
            {hasNews && (
              <li><Link to="/tin-tuc" className="hover:text-white transition-colors">{t('Tin tức & sự kiện', 'News & events')}</Link></li>
            )}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-white font-heading font-bold text-base mb-5">{t('Cộng đồng', 'Community')}</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/doi-ngu-giang-vien" className="hover:text-white transition-colors">{t('Đội ngũ giảng viên', 'Instructors')}</Link></li>
            <li><Link to="/chinh-sach-bao-ve-tre-em" className="hover:text-white transition-colors">{t('Bảo vệ trẻ em', 'Safeguarding')}</Link></li>
            <li><Link to="/tuyen-dung" className="hover:text-white transition-colors">{t('Tuyển dụng', 'Careers')}</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-white font-heading font-bold text-base mb-5">{t('Liên kết nhanh', 'Quick Links')}</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/chuong-trinh" className="hover:text-white transition-colors">{t('Lĩnh vực hoạt động', 'Activity areas')}</Link></li>
            <li><a href="/#about" className="hover:text-white transition-colors">{t('Triết lý giáo dục', 'Our Philosophy')}</a></li>
            <li><a href="/#nha-truong" className="hover:text-white transition-colors">{t('Dành cho nhà trường', 'For schools')}</a></li>
            <li><a href="/#lien-he" className="hover:text-white transition-colors">{t('Liên hệ', 'Contact')}</a></li>
          </ul>
        </div>
      </div>

      {/* Map */}
      {settings.mapIframe && (
        <div className="max-w-7xl mx-auto px-6 pb-14">
          <div
            className="rounded-xl overflow-hidden shadow-2xl h-72 md:h-80 border border-white/10 [&_iframe]:w-full [&_iframe]:h-full"
            dangerouslySetInnerHTML={{ __html: settings.mapIframe }}
          />
        </div>
      )}

      {/* Legal Entity Information Block */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4 border-t border-white/10 text-sm text-white/60 space-y-2">
        <p className="font-heading font-semibold text-white/80 tracking-wide uppercase text-xs md:text-sm">
          {t('Thông tin doanh nghiệp', 'Company Information')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-xs md:text-sm">
          <div className="space-y-1.5">
            <p>
              <span className="text-white/80 font-medium">{t('Tên pháp lý:', 'Legal Name:')}</span>{' '}
              CÔNG TY TNHH HUẤN LUYỆN VÀ ĐÀO TẠO HUY VÕ
            </p>
            <p>
              <span className="text-white/80 font-medium">{t('Tên tiếng Anh:', 'English Name:')}</span>{' '}
              Huy Vo Training and Education Co., Ltd.
            </p>
            <p>
              <span className="text-white/80 font-medium">{t('Mã số doanh nghiệp / MST:', 'Business Code / Tax ID:')}</span>{' '}
              <span className="text-white font-mono">3604060494</span>
            </p>
          </div>
          <div className="space-y-1.5">
            <p>
              <span className="text-white/80 font-medium">{t('Trụ sở chính:', 'Head Office:')}</span>{' '}
              70/2A đường số 7, Xã Bình Minh, Thành phố Đồng Nai, Việt Nam
            </p>
            <p>
              <span className="text-white/80 font-medium">{t('Email:', 'Email:')}</span>{' '}
              <a href="mailto:info@huyvoeducation.vn" className="text-white/80 hover:text-white transition-colors underline decoration-white/30">info@huyvoeducation.vn</a>
              <span className="mx-2 text-white/20">|</span>
              <span className="text-white/80 font-medium">{t('Điện thoại:', 'Hotline:')}</span>{' '}
              <a href={telHref(settings.phone)} className="text-white/80 hover:text-white transition-colors underline decoration-white/30">{formatPhone(settings.phone)}</a>
            </p>
          </div>
        </div>
        <p className="pt-2 text-xs md:text-sm">
          <span className="text-white/80 font-medium">{t('Giấy phép kinh doanh lữ hành nội địa:', 'Domestic tour operator licence:')}</span>{' '}
          75-0079/2026/SVHTTDL-GP LHNĐ{' '}
          <span className="text-white/60">{t('(Sở VHTTDL TP. Đồng Nai cấp ngày 10/9/2026)', '(issued by Đồng Nai Dept. of Culture, Sports and Tourism on 10/9/2026)')}</span>
          <span className="mx-2 text-white/20">|</span>
          {t('Thành viên hệ sinh thái Hiệp Phát Group', 'A member of the Hiệp Phát Group ecosystem')}
        </p>
        <p className="pt-2 text-xs text-white/50">
          {t(
            'Hình ảnh trẻ em trên website là ảnh minh họa, chụp tại studio hoặc dựng bằng AI, không phải hình ảnh học sinh của HVE. Ảnh đội ngũ giảng viên là ảnh thật, đăng với sự đồng ý của giảng viên.',
            "Images of children on this website are illustrations, shot in a studio or generated by AI, and do not depict HVE students. Instructor photos are real and published with each instructor's consent."
          )}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 border-t border-white/10 text-sm text-white/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2026 Công ty TNHH Huấn luyện và Đào tạo Huy Võ (Huy Võ Education). All rights reserved.</p>
        <div className="flex gap-6">
          <a href="/about.html" className="hover:text-white transition-colors">{t('Giới thiệu công ty', 'About Us')}</a>
          <a href="/chinh-sach-bao-ve-tre-em" className="hover:text-white transition-colors">{t('Bảo vệ trẻ em', 'Safeguarding')}</a>
        </div>
      </div>
    </footer>
  );
};
