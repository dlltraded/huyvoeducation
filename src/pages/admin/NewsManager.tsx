import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Pencil, Trash2, Loader2, Save, X, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';

type NewsPost = {
  id: string;
  title: string;
  content: string;
  cover_image: string | null;
  is_published: boolean;
  created_at: string;
};

export const NewsManager = () => {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<NewsPost>>({});
  const [saving, setSaving] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('news_posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setPosts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const postData = {
      title: currentPost.title,
      content: currentPost.content,
      cover_image: currentPost.cover_image,
      is_published: currentPost.is_published ?? true,
    };

    if (currentPost.id) {
      await supabase.from('news_posts').update(postData).eq('id', currentPost.id);
    } else {
      await supabase.from('news_posts').insert([postData]);
    }

    await fetchPosts();
    setIsEditing(false);
    setSaving(false);
    setCurrentPost({});
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      await supabase.from('news_posts').delete().eq('id', id);
      fetchPosts();
    }
  };

  if (loading && !isEditing) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-brand-blue w-8 h-8" /></div>;
  }

  if (isEditing) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-heading font-bold">{currentPost.id ? 'Sửa bài viết' : 'Thêm bài viết mới'}</h3>
          <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tiêu đề bài viết</label>
            <input 
              required
              value={currentPost.title || ''}
              onChange={e => setCurrentPost({...currentPost, title: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Link ảnh bìa (URL)</label>
            <div className="flex gap-4 items-center">
              <input 
                value={currentPost.cover_image || ''}
                onChange={e => setCurrentPost({...currentPost, cover_image: e.target.value})}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                placeholder="https://..."
              />
              {currentPost.cover_image && (
                <img src={currentPost.cover_image} alt="Cover preview" className="w-12 h-12 rounded object-cover border" />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nội dung (Hỗ trợ HTML)</label>
            <textarea 
              required
              rows={15}
              value={currentPost.content || ''}
              onChange={e => setCurrentPost({...currentPost, content: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all font-mono text-sm"
              placeholder="<p>Nhập nội dung ở đây...</p>"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={currentPost.is_published ?? true}
                onChange={e => setCurrentPost({...currentPost, is_published: e.target.checked})}
                className="w-5 h-5 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
              />
              <span className="font-medium text-gray-700">Xuất bản (Hiển thị cho khách)</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            <button 
              type="button" 
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-medium transition-colors"
            >
              Hủy
            </button>
            <button 
              type="submit" 
              disabled={saving}
              className="px-6 py-2 bg-brand-blue text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Lưu bài viết
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-xl font-heading font-bold">Danh sách Tin tức</h3>
        <button 
          onClick={() => {
            setCurrentPost({ is_published: true });
            setIsEditing(true);
          }}
          className="flex items-center gap-2 bg-brand-green text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
        >
          <Plus size={20} />
          Thêm bài mới
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 font-semibold text-sm">
            <tr>
              <th className="p-4">Ảnh</th>
              <th className="p-4 w-1/2">Tiêu đề</th>
              <th className="p-4">Ngày đăng</th>
              <th className="p-4">Trạng thái</th>
              <th className="p-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  Chưa có bài viết nào.
                </td>
              </tr>
            ) : (
              posts.map(post => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    {post.cover_image ? (
                      <img src={post.cover_image} alt="" className="w-16 h-12 object-cover rounded-md bg-gray-200" />
                    ) : (
                      <div className="w-16 h-12 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                        <ImageIcon size={20} />
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-medium text-gray-900">{post.title}</td>
                  <td className="p-4 text-gray-500 text-sm">
                    {format(new Date(post.created_at), 'dd/MM/yyyy HH:mm')}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${post.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {post.is_published ? 'Đã xuất bản' : 'Bản nháp'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => {
                          setCurrentPost(post);
                          setIsEditing(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Sửa"
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
