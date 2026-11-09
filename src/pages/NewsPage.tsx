import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useOutletContext } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Calendar, ArrowRight, Loader2, Image as ImageIcon, Newspaper } from 'lucide-react';
import { format } from 'date-fns';

export const NewsPage = () => {
  const { t } = useOutletContext<any>() || { t: (vi: string) => vi };
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await supabase
        .from('news_posts')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      
      if (data) setPosts(data);
      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('Tin tức & hoạt động | Huy Võ Education', 'News & activities | Huy Võ Education')}</title>
        <meta name="description" content={t('Hoạt động CCA tại trường, field trip, khóa hè và tin tức mới nhất từ Huy Võ Education.', 'On-campus CCA, field trips, summer camps and the latest news from Huy Võ Education.')} />
      </Helmet>

      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-28 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-blue-dark to-brand-navy" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="uppercase tracking-widest text-xs font-bold text-brand-blue-soft mb-4">{t('Tin tức & hoạt động', 'News & activities')}</p>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-5">{t('Hoạt động của HVE', 'What HVE has been doing')}</h1>
          <p className="text-lg text-white/80 leading-relaxed">
            {t('CCA tại trường, field trip, khóa hè và những buổi tổng kết cùng nhà trường. Hình ảnh học sinh chỉ được đăng khi gia đình đồng ý.', 'On-campus CCA, field trips, summer camps and end-of-term reviews with schools. Student photos appear only with family consent.')}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 60" className="w-full h-10 md:h-14" preserveAspectRatio="none">
            <path d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,32 L1440,60 L0,60 Z" fill="#F9FAFB" />
          </svg>
        </div>
      </section>

      <section className="py-16 bg-gray-50 min-h-[40vh]">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-brand-blue w-10 h-10" />
            </div>
          ) : posts.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-16 px-8 bg-white rounded-3xl border border-gray-100">
              <div className="w-14 h-14 rounded-2xl bg-brand-blue-tint text-brand-blue flex items-center justify-center mx-auto mb-5"><Newspaper size={26} /></div>
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-2">{t('Bản tin đầu tiên đang được chuẩn bị', 'Our first update is on its way')}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{t('Trong lúc chờ, quý trường và phụ huynh có thể xem các dịch vụ và dự án HVE đang triển khai.', 'Meanwhile, schools and parents can browse the services and projects HVE is running.')}</p>
              <Link to="/dich-vu#ho-so" className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white font-heading font-semibold px-6 py-3 rounded-full transition-colors">
                {t('Xem dự án tiêu biểu', 'See featured projects')} <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <Link key={post.id} to={`/tin-tuc/${post.id}`} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col">
                  <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                    {post.cover_image ? (
                      <img 
                        src={post.cover_image}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ImageIcon size={48} />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-sm text-brand-blue font-semibold mb-3">
                      <Calendar size={16} />
                      {format(new Date(post.created_at), 'dd/MM/yyyy')}
                    </div>
                    <h3 className="text-xl font-heading font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-brand-blue transition-colors">
                      {post.title}
                    </h3>
                    <div className="mt-auto flex items-center gap-2 text-brand-blue font-medium">
                      {t('Xem chi tiết', 'Read more')} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
