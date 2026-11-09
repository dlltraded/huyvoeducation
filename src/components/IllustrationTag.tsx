import React from 'react';

/** Small corner label marking a photo as an illustration (studio shoot or AI-generated). */
export const IllustrationTag = ({ t, className = '' }: { t?: any; className?: string }) => (
  <span
    className={`pointer-events-none absolute z-20 rounded-full bg-black/45 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/90 ${className || 'bottom-3 right-3'}`}
  >
    {t ? t('Ảnh minh họa', 'Illustration') : 'Ảnh minh họa'}
  </span>
);
