import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '../../lib/supabase';

/** Latest three published posts on the home page. Renders nothing until a post exists. */
export const LatestNewsSection = ({ t }: { t: any }) => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from('news_posts')
      .select('id,title,cover_image,created_at')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => setPosts(data || []));
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <p className="uppercase tracking-widest text-xs font-bold text-brand-blue mb-3">{t('Tin tức & hoạt động', 'News & activities')}</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">{t('Hoạt động gần đây', 'Recent activities')}</h2>
          </div>
          <Link to="/tin-tuc" className="hidden sm:inline-flex items-center gap-2 font-heading font-semibold text-brand-blue hover:gap-3 transition-all shrink-0">
            {t('Xem tất cả', 'View all')} <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map(post => (
            <Link key={post.id} to={`/tin-tuc/${post.id}`} className="group rounded-2xl border border-gray-100 overflow-hidden bg-white hover:shadow-xl hover:shadow-brand-blue/5 transition-all">
              <div className="aspect-[16/10] bg-gray-100 overflow-hidden">
                {post.cover_image ? (
                  <img src={post.cover_image} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300"><ImageIcon size={40} /></div>
                )}
              </div>
              <div className="p-6">
                <p className="flex items-center gap-2 text-sm text-gray-500 mb-2"><Calendar size={15} /> {format(new Date(post.created_at), 'dd/MM/yyyy')}</p>
                <h3 className="font-heading font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-brand-blue transition-colors">{post.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
