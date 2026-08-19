import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, Phone } from 'lucide-react';

export const NotFound: React.FC = () => {
  const { t } = useOutletContext<any>() || { t: (vi: string) => vi };

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 pt-32 pb-20 bg-gray-50">
      <Helmet>
        <title>{t('Không tìm thấy trang | Huy Võ Education', 'Page Not Found | Huy Võ Education')}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="max-w-lg mx-auto text-center">
        <p className="text-8xl font-heading font-bold text-brand-blue/20 mb-2">404</p>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-4">
          {t('Ối, không tìm thấy trang này', "Oops, we couldn't find that page")}
        </h1>
        <p className="text-gray-500 mb-10">
          {t(
            'Trang anh/chị đang tìm có thể đã bị di chuyển hoặc không còn tồn tại. Ba mẹ thử quay về trang chủ hoặc liên hệ trực tiếp với Huy Võ Education nhé.',
            'The page you are looking for may have been moved or no longer exists. Try heading back to the homepage, or reach out to us directly.'
          )}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 bg-brand-blue hover:bg-blue-700 text-white font-heading font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <Home size={18} /> {t('Về trang chủ', 'Back to homepage')}
          </Link>
          <a
            href="tel:0907828939"
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 font-heading font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all"
          >
            <Phone size={18} /> 0907 828 939
          </a>
        </div>
      </div>
    </section>
  );
};
