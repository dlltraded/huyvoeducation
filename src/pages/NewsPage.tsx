import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Calendar, ArrowRight, Loader2, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';

export const NewsPage = () => {
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
        <title>Tin tức & Cập nhật | Huy Võ Education</title>
        <meta name="description" content="Cập nhật những tin tức, sự kiện và thông báo mới nhất từ Huy Võ Education." />
      </Helmet>

      <section className="pt-32 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              Tin tức & Cập nhật
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những thông tin mới nhất về các chương trình học, sự kiện ngoại khóa và hoạt động nổi bật tại hệ sinh thái giáo dục của chúng tôi.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-brand-blue w-10 h-10" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-lg">Hiện chưa có bài viết nào được đăng tải.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <Link key={post.id} to={`/tin-tuc/${post.id}`} className="group bg-white rounded-3xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col">
                  <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                    {post.cover_image ? (
                      <img 
                        src={post.cover_image} 
                        alt={post.title}
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
                      Xem chi tiết <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
