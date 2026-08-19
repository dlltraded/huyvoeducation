import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface SiteSettings {
  phone: string;
  zaloUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  mapIframe: string;
  footerDescVi: string;
  footerDescEn: string;
  address: string;
  email: string;
  taxCode: string;
}

const defaultSettings: SiteSettings = {
  phone: '0907828939',
  zaloUrl: 'https://zalo.me/0907828939',
  facebookUrl: '#',
  youtubeUrl: '#',
  mapIframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.2305385131417!2d106.81722649999999!3d10.945950400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d94d5990b4e3%3A0x161560d2b38e323b!2zTmjDoCB0aGnhur91IG5oaSB04buJbmggxJDhu5NuZyBOYWk!5e0!3m2!1svi!2s!4v1787130501195!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>',
  footerDescVi: 'Hệ sinh thái giáo dục sau giờ học uy tín, an toàn và hiện đại dành cho thế hệ trẻ. Nơi xây dựng nền tảng vững chắc cho công dân toàn cầu.',
  footerDescEn: 'A trusted, safe, and modern after-school education ecosystem for the young generation. Building a solid foundation for global citizens.',
  address: 'Nhà Văn Hoá Thiếu Nhi Thành Phố Đồng Nai - 03 Cách Mạng Tháng 8, Trấn Biên, Đồng Nai',
  email: 'info@huyvoeducation.com',
  taxCode: '3604060494'
};

interface SettingsContextType {
  settings: SiteSettings;
  loading: boolean;
  refreshSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  loading: true,
  refreshSettings: async () => {}
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('global_settings')
      .select('settings')
      .eq('id', 'site_settings')
      .single();
    
    if (data && data.settings) {
      setSettings({ ...defaultSettings, ...data.settings });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
