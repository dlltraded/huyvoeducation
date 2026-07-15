import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Calendar, ArrowLeft, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      const { data } = await supabase
        .from('news_posts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (data) setPost(data);
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex justify-center items-center">
        <Loader2 className="animate-spin text-brand-blue w-12 h-12" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold mb-4">Bài viết không tồn tại</h1>
        <Link to="/tin-tuc" className="text-brand-blue font-medium hover:underline flex items-center gap-2">
          <ArrowLeft size={20} /> Quay lại danh sách tin tức
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Huy Võ Education</title>
        <meta property="og:title" content={post.title} />
        {post.cover_image && <meta property="og:image" content={post.cover_image} />}
      </Helmet>

      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/tin-tuc" className="inline-flex items-center gap-2 text-brand-blue font-semibold hover:underline mb-8">
            <ArrowLeft size={18} /> Tin tức & Cập nhật
          </Link>

          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-2 text-gray-500 font-medium mb-10">
            <Calendar size={18} />
            Đăng ngày: {format(new Date(post.created_at), 'dd/MM/yyyy HH:mm')}
          </div>

          {post.cover_image && (
            <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-md">
              <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div 
            className="prose prose-lg prose-blue max-w-none prose-headings:font-heading prose-img:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>
    </>
  );
};
