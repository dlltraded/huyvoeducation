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
}

const defaultSettings: SiteSettings = {
  phone: '0907828939',
  zaloUrl: 'https://zalo.me/0907828939',
  facebookUrl: '#',
  youtubeUrl: '#',
  mapIframe: '',
  footerDescVi: 'Hệ sinh thái giáo dục sau giờ học uy tín, an toàn và hiện đại dành cho thế hệ trẻ. Nơi xây dựng nền tảng vững chắc cho công dân toàn cầu.',
  footerDescEn: 'A trusted, safe, and modern after-school education ecosystem for the young generation. Building a solid foundation for global citizens.'
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
