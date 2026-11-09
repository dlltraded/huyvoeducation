import React from 'react';

/**
 * Corner label marking a photo as an illustration (studio shoot or AI-generated),
 * with a short note that this follows HVE's child protection policy.
 */
export const IllustrationTag = ({ t, className = '' }: { t?: any; className?: string }) => {
  const tr = t || ((vi: string) => vi);
  return (
    <span
      className={`pointer-events-none absolute z-20 max-w-[calc(100%-1.5rem)] rounded-xl bg-black/50 backdrop-blur-sm px-2.5 py-1.5 text-right leading-tight text-white ${className || 'bottom-3 right-3'}`}
    >
      <span className="block text-[10px] font-semibold tracking-wide">{tr('Ảnh minh họa', 'Illustration')}</span>
      <span className="block text-[9px] text-white/80">
        {tr('Tuân thủ chính sách bảo vệ trẻ em', 'In line with our child protection policy')}
      </span>
    </span>
  );
};
