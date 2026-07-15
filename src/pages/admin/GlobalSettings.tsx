import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Loader2, Link2, Map, PhoneCall, AlignLeft } from 'lucide-react';
import type { SiteSettings } from '../../contexts/SettingsContext';

export const GlobalSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<SiteSettings>({
    phone: '',
    zaloUrl: '',
    facebookUrl: '',
    youtubeUrl: '',
    mapIframe: '',
    footerDescVi: '',
    footerDescEn: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('global_settings')
      .select('settings')
      .eq('id', 'site_settings')
      .single();
    
    if (data && data.settings) {
      setFormData({
        ...formData,
        ...data.settings
      });
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from('global_settings')
      .upsert({
        id: 'site_settings',
        settings: formData,
        updated_at: new Date().toISOString()
      });

    setSaving(false);
    if (error) {
      alert('Lỗi khi lưu cài đặt: ' + error.message);
    } else {
      alert('Đã lưu cấu hình chung thành công! Làm mới trang web để thấy thay đổi.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Cài đặt chung</h2>
            <p className="text-sm text-gray-500 mt-1">Quản lý thông tin liên hệ, mạng xã hội và chân trang</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-brand-blue hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Lưu thay đổi
          </button>
        </div>

        <div className="p-8 space-y-10">
          
          {/* Liên hệ */}
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-700 mb-4 pb-2 border-b border-gray-100">
              <PhoneCall size={20} className="text-brand-blue" /> Thông tin liên hệ
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại Hotline</label>
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                  placeholder="Ví dụ: 090 123 4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Link Zalo (Chat trực tiếp)</label>
                <input 
                  type="text" 
                  name="zaloUrl"
                  value={formData.zaloUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                  placeholder="Ví dụ: https://zalo.me/0901234567"
                />
              </div>
            </div>
          </section>

          {/* Mạng xã hội */}
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-700 mb-4 pb-2 border-b border-gray-100">
              <Link2 size={20} className="text-brand-blue" /> Mạng xã hội
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Facebook Fanpage URL</label>
                <input 
                  type="text" 
                  name="facebookUrl"
                  value={formData.facebookUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Youtube Channel URL</label>
                <input 
                  type="text" 
                  name="youtubeUrl"
                  value={formData.youtubeUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>
          </section>

          {/* Bản đồ */}
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-700 mb-4 pb-2 border-b border-gray-100">
              <Map size={20} className="text-brand-blue" /> Google Maps
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mã nhúng Iframe (HTML)</label>
              <textarea 
                name="mapIframe"
                value={formData.mapIframe}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all font-mono text-sm"
                placeholder='<iframe src="https://www.google.com/maps/embed?pb=..." ...></iframe>'
              />
              <p className="text-xs text-gray-500 mt-2">Vào Google Maps &gt; Chia sẻ &gt; Nhúng bản đồ &gt; Copy HTML dán vào đây.</p>
            </div>
          </section>

          {/* Chân trang */}
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-700 mb-4 pb-2 border-b border-gray-100">
              <AlignLeft size={20} className="text-brand-blue" /> Nội dung Chân trang (Footer)
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả ngắn gọn (Tiếng Việt)</label>
                <textarea 
                  name="footerDescVi"
                  value={formData.footerDescVi}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả ngắn gọn (Tiếng Anh)</label>
                <textarea 
                  name="footerDescEn"
                  value={formData.footerDescEn}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                />
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
