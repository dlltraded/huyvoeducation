import { useEffect, useState } from 'react';
import { supabase } from './supabase';

// Shared across components so the count is fetched once per page load.
let cached: Promise<boolean> | null = null;

const fetchHasNews = () => {
  if (!cached) {
    cached = Promise.resolve(
      supabase
        .from('news_posts')
        .select('id')
        .eq('is_published', true)
        .limit(1)
    )
      .then(({ data, error }) => !error && Array.isArray(data) && data.length > 0)
      .catch(() => false);
  }
  return cached;
};

/** True once at least one published news post exists. Hides news links while the section is empty. */
export const useHasNews = () => {
  const [hasNews, setHasNews] = useState(false);
  useEffect(() => {
    let alive = true;
    fetchHasNews().then(v => { if (alive) setHasNews(v); });
    return () => { alive = false; };
  }, []);
  return hasNews;
};
