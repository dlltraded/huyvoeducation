import React from 'react';

/**
 * Horizontal logo lockup per HVE Brand Guidelines §09: symbol left, text block
 * left-aligned, symbol height ≈ 1.4× the text block. Never rotated or recoloured
 * outside the approved versions: 'color' on light grounds, 'reversed' on Night Navy.
 */
export const BrandLockup = ({
  variant = 'color',
  showSlogan = true,
  compactOnLg = false,
  className = '',
}: {
  compactOnLg?: boolean;
  variant?: 'color' | 'reversed';
  showSlogan?: boolean;
  className?: string;
}) => {
  const reversed = variant === 'reversed';
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={reversed ? '/brand/hve-symbol-reversed.svg' : '/brand/hve-symbol.svg'}
        alt=""
        aria-hidden="true"
        className={showSlogan ? 'h-11 w-auto' : 'h-9 w-auto'}
      />
      <span className="flex flex-col leading-none">
        <span className={`font-heading font-bold text-[1.05rem] tracking-tight whitespace-nowrap ${reversed ? 'text-white' : 'text-brand-dark'}`}>
          Huy Võ <span className={reversed ? 'text-brand-blue-soft' : 'text-brand-blue'}>Education</span>
        </span>
        {showSlogan && (
          <span className={`font-heading font-semibold text-[0.7rem] mt-1 whitespace-nowrap ${compactOnLg ? 'lg:hidden xl:block' : ''} ${reversed ? 'text-brand-blue-soft' : 'text-brand-blue'}`}>
            Learn. Connect. Grow.
          </span>
        )}
      </span>
    </span>
  );
};
