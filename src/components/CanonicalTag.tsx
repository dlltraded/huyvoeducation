import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

// The single source of truth for the site's canonical (SEO-preferred) domain.
// Leadership decided huyvoeducation.vn is the domain Google should index —
// huyvoeducation.com stays only as a 301 redirect (see vercel.json) so any
// existing .com backlinks/search results still land the visitor correctly,
// but Google is told via canonical + redirect to consolidate everything
// under .vn.
export const CANONICAL_ORIGIN = 'https://huyvoeducation.vn';

// Renders a <link rel="canonical"> (and matching og:url) pointing at the
// current path under the canonical domain, regardless of which domain the
// page is actually being viewed from. Mounted once in MainLayout so every
// route gets it automatically without per-page wiring.
export const CanonicalTag: React.FC = () => {
  const { pathname } = useLocation();
  // Normalize: strip trailing slash (except root) so "/chuong-trinh/" and
  // "/chuong-trinh" don't count as two different canonical URLs.
  const cleanPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const canonicalUrl = `${CANONICAL_ORIGIN}${cleanPath}`;

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:url" content={canonicalUrl} />
    </Helmet>
  );
};
