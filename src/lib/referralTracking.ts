// Captures where a visitor came from so it can be attached to their lead when
// they submit the registration form — either a specific referrer's code
// (?ref=CODE, printed on that person's QR code / shared link) or a generic
// marketing source (?src=LABEL, e.g. a poster or ad campaign QR code).
//
// Captured once per browser tab session (sessionStorage) so it survives
// in-site navigation (e.g. landing on /chuong-trinh/bong-da then clicking
// through to the homepage registration form) without leaking across
// unrelated future visits.

const REF_KEY = 'hve_ref_code';
const SRC_KEY = 'hve_src';

export const captureAttribution = () => {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref');
  const src = params.get('src') || params.get('utm_source');

  if (ref) sessionStorage.setItem(REF_KEY, ref.trim());
  if (src) sessionStorage.setItem(SRC_KEY, src.trim());
};

export const getStoredAttribution = () => {
  if (typeof window === 'undefined') return { ref: '', src: '' };
  return {
    ref: sessionStorage.getItem(REF_KEY) || '',
    src: sessionStorage.getItem(SRC_KEY) || '',
  };
};

// Builds a shareable QR-code image URL (via the free, keyless api.qrserver.com
// passthrough service — no extra npm dependency, works anywhere the browser
// has internet access) for a given target URL.
export const qrCodeImageUrl = (targetUrl: string, size = 240) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(targetUrl)}`;
