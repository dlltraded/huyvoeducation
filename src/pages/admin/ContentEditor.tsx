import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Loader2, Save } from 'lucide-react';

export const ContentEditor = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [homeHero, setHomeHero] = useState({
    title: '',
    subtitle: '',
    cta_text: ''
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('site_content')
      .select('content')
      .eq('section_key', 'home_hero')
      .single();
    
    if (!error && data?.content) {
      setHomeHero(data.content);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const { error } = await supabase
      .from('site_content')
      .upsert({ 
        section_key: 'home_hero', 
        content: homeHero,
        updated_at: new Date().toISOString()
      });

    if (!error) {
      alert('Đã lưu nội dung thành công!');
    } else {
      alert('Lỗi khi lưu nội dung: ' + error.message);
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-brand-blue w-8 h-8" /></div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-xl font-heading font-bold">Quản lý Nội dung Website</h3>
        <p className="text-gray-500 mt-1">Chỉnh sửa các đoạn văn bản hiển thị trên trang web.</p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSave} className="space-y-8">
          
          {/* Section: Home Hero */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-gray-800 border-b pb-2">Khu vực: Banner Trang chủ</h4>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tiêu đề chính (Title)</label>
              <input 
                required
                value={homeHero.title || ''}
                onChange={e => setHomeHero({...homeHero, title: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all font-heading font-bold"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Đoạn mô tả (Subtitle)</label>
              <textarea 
                required
                rows={3}
                value={homeHero.subtitle || ''}
                onChange={e => setHomeHero({...homeHero, subtitle: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Chữ trên nút bấm (Button Text)</label>
              <input 
                required
                value={homeHero.cta_text || ''}
                onChange={e => setHomeHero({...homeHero, cta_text: e.target.value})}
                className="w-1/2 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
              />
            </div>
          </div>

          {/* Nút Save */}
          <div className="pt-6">
            <button 
              type="submit" 
              disabled={saving}
              className="bg-brand-blue text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Lưu toàn bộ thay đổi
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
