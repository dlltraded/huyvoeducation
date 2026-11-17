import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { PROGRAMS, type Program } from '../data/programs';
import { INSTRUCTORS, type Instructor } from '../data/instructors';

export type CatalogKind = 'programs' | 'instructors';
export type CatalogItem = (Program | Instructor) & { visible?: boolean; season?: string; sessionsEn?: string };
export const defaults = (kind: CatalogKind): CatalogItem[] => structuredClone(kind === 'programs' ? PROGRAMS : INSTRUCTORS);
export const catalogKey = (kind: CatalogKind) => `catalog_${kind}`;

export function needsTranslation(value: unknown): boolean {
  if (!value || typeof value !== 'object') return false;
  if ('vi' in value && 'en' in value) return typeof value.vi === 'string' && !!value.vi.trim() && !String(value.en || '').trim();
  if ('sessions' in value && typeof value.sessions === 'string' && value.sessions.trim() && !('sessionsEn' in value && value.sessionsEn)) return true;
  return Object.values(value).some(needsTranslation);
}

export async function loadCatalog(kind: CatalogKind) {
  const { data, error } = await supabase.from('site_content').select('content, updated_at').eq('section_key', catalogKey(kind)).maybeSingle();
  if (error) throw error;
  if (data && !Array.isArray(data.content?.items)) throw new Error('Dữ liệu danh mục không hợp lệ.');
  return { items: data ? data.content.items as CatalogItem[] : defaults(kind), version: data?.updated_at as string | undefined };
}

export function useCatalog(kind: CatalogKind) {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    loadCatalog(kind).then(result => { if (!cancelled) setItems(result.items.filter(item => item.visible !== false)); })
      .catch(() => { if (!cancelled) { setItems([]); setError(true); } })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [kind]);
  return { items, loading, error };
}

export async function translateCatalogItem(item: CatalogItem, missingOnly = false): Promise<CatalogItem> {
  const fields: Record<string, string> = {};
  const collect = (value: unknown, path: string) => {
    if (!value || typeof value !== 'object') return;
    if ('vi' in value && typeof value.vi === 'string') { if (value.vi.trim() && (!missingOnly || !('en' in value && value.en))) fields[path] = value.vi; return; }
    Object.entries(value).forEach(([key, child]) => collect(child, path ? `${path}.${key}` : key));
  };
  collect(item, '');
  if ('sessions' in item && item.sessions.trim() && (!missingOnly || !item.sessionsEn)) fields.sessionsEn = item.sessions;
  if (!Object.keys(fields).length) return structuredClone(item);
  const { data, error } = await supabase.functions.invoke('translate-catalog', { body: { fields } });
  if (error) throw new Error('Chưa dịch được. Vui lòng kiểm tra dịch vụ dịch hoặc nhập bản tiếng Anh thủ công.');
  if (!data?.fields || Object.keys(fields).some(key => typeof data.fields[key] !== 'string' || !data.fields[key].trim())) throw new Error('Bản dịch chưa đầy đủ. Vui lòng thử lại.');
  const result = structuredClone(item);
  for (const key of Object.keys(fields)) {
    if (key === 'sessionsEn') { result.sessionsEn = data.fields[key]; continue; }
    let target: any = result;
    for (const part of key.split('.')) target = target[part];
    target.en = data.fields[key];
  }
  return result;
}
