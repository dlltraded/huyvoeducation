import React from 'react';

const Logo = () => (
  <svg className="w-10 h-10" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M 20 75 Q 50 90 80 75" fill="none" stroke="#20B84D" strokeWidth="8" strokeLinecap="round"/>
    <path d="M 30 70 C 30 70, 20 40, 45 45" fill="none" stroke="#0A66C2" strokeWidth="8" strokeLinecap="round"/>
    <path d="M 70 70 C 70 70, 80 40, 55 45" fill="none" stroke="#FFC631" strokeWidth="8" strokeLinecap="round"/>
    <circle cx="50" cy="30" r="10" fill="#0A66C2"/>
  </svg>
);

export const Footer = ({ t }: any) => {
  return (
    <footer className="bg-brand-dark text-gray-300 py-16 border-t-[12px] border-brand-green">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-6 text-white">
            <Logo />
            <span className="font-heading font-bold text-2xl">Huy Võ Education</span>
          </div>
          <p className="text-lg font-heading font-semibold text-white mb-4">
            {t('Kết nối tri thức – Kiến tạo tương lai', 'Learn. Connect. Grow.')}
          </p>
          <p className="text-gray-400 max-w-md leading-relaxed">
            {t('Hệ sinh thái giáo dục sau giờ học uy tín, an toàn và hiện đại dành cho thế hệ trẻ. Nơi xây dựng nền tảng vững chắc cho công dân toàn cầu.', 'A trusted, safe, and modern after-school education ecosystem for the young generation. Building a solid foundation for global citizens.')}
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
            <li><a href="#" className="hover:text-brand-yellow transition-colors">Facebook Fanpage</a></li>
            <li><a href="#" className="hover:text-brand-yellow transition-colors">Zalo Official</a></li>
            <li><a href="#" className="hover:text-brand-yellow transition-colors">Youtube Channel</a></li>
          </ul>
        </div>
      </div>
      
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
