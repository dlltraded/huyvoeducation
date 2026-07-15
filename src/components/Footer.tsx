import React from 'react';
import { useSettings } from '../contexts/SettingsContext';

export const Footer = ({ t }: any) => {
  const { settings } = useSettings();
  return (
    <footer className="bg-brand-dark text-gray-300 py-16 border-t-[12px] border-brand-green">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-6 text-white">
            <img src="/favicon.svg" alt="Huy Võ Education" className="w-10 h-10" />
            <span className="font-heading font-bold text-2xl">Huy Võ Education</span>
          </div>
          <p className="text-lg font-heading font-semibold text-white mb-4">
            {t('Kết nối tri thức – Kiến tạo tương lai', 'Learn. Connect. Grow.')}
          </p>
          <p className="text-gray-400 max-w-md leading-relaxed whitespace-pre-wrap">
            {t(settings.footerDescVi, settings.footerDescEn)}
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-heading font-bold text-lg mb-6">{t('Khám phá', 'Explore')}</h4>
          <ul className="space-y-4">
            <li><a href="/chuong-trinh/stem" className="hover:text-brand-yellow transition-colors">STEM</a></li>
            <li><a href="/chuong-trinh/nghe-thuat" className="hover:text-brand-yellow transition-colors">{t('Nghệ thuật', 'Arts')}</a></li>
            <li><a href="/chuong-trinh/the-thao-boi-loi" className="hover:text-brand-yellow transition-colors">{t('Thể thao', 'Sports')}</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-heading font-bold text-lg mb-6">{t('Kết nối', 'Connect')}</h4>
          <ul className="space-y-4">
            <li><a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="hover:text-brand-yellow transition-colors">Facebook Fanpage</a></li>
            <li><a href={settings.zaloUrl} target="_blank" rel="noreferrer" className="hover:text-brand-yellow transition-colors">Zalo Official</a></li>
            <li><a href={settings.youtubeUrl} target="_blank" rel="noreferrer" className="hover:text-brand-yellow transition-colors">Youtube Channel</a></li>
          </ul>
        </div>
      </div>

      {settings.mapIframe && (
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="rounded-xl overflow-hidden shadow-2xl h-80 border-4 border-brand-green/20" dangerouslySetInnerHTML={{ __html: settings.mapIframe }} />
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2026 Huy Võ Education. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">{t('Chính sách bảo mật', 'Privacy Policy')}</a>
          <a href="#" className="hover:text-white transition-colors">{t('Điều khoản', 'Terms of Service')}</a>
        </div>
      </div>
    </footer>
  );
};
