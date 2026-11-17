import { useEffect, useRef, useState } from 'react';
import { catalogKey, defaults, loadCatalog, translateCatalogItem, translateCatalogItems, type CatalogItem, type CatalogKind } from '../../lib/catalog';
import { CATEGORIES } from '../../data/programs';
import { supabase } from '../../lib/supabase';
import { CatalogImageUpload } from '../../components/editor/CatalogImageUpload';

const labels: Record<string, string> = {
  slug: 'Đường dẫn (không dấu)', name: 'Tên', icon: 'Biểu tượng', img: 'Đường dẫn ảnh', photo: 'Đường dẫn ảnh chân dung',
  tagline: 'Giới thiệu ngắn', ageGroups: 'Độ tuổi', sessions: 'Thời lượng tiếng Việt', sessionsEn: 'Thời lượng tiếng Anh',
  summary: 'Giới thiệu', highlights: 'Điểm nổi bật', specializationTag: 'Bộ môn', title: 'Chức danh', yearOfBirth: 'Năm sinh',
  experience: 'Kinh nghiệm', learners: 'Độ tuổi học viên', classSize: 'Sĩ số lớp', currentPractice: 'Đơn vị công tác', achievements: 'Thành tích',
};
const inputClass = 'w-full rounded-lg border border-gray-300 px-3 py-2 bg-white text-gray-900';

export function CatalogManager({ kind }: { kind: CatalogKind }) {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [version, setVersion] = useState<string>();
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState('');
  const [failed, setFailed] = useState(false);
  const [autoTranslate, setAutoTranslate] = useState(true);
  const editorRef = useRef<HTMLDivElement>(null);
  const focusNewName = useRef(false);
  const item = items[selected];
  useEffect(() => {
    if (!focusNewName.current || !item) return;
    focusNewName.current = false;
    const nameInput = editorRef.current?.querySelector<HTMLInputElement | HTMLTextAreaElement>('[data-catalog-name]');
    nameInput?.scrollIntoView({ block: 'center' });
    nameInput?.focus({ preventScroll: true });
  }, [selected, items.length, item]);
  useEffect(() => {
    let cancelled = false;
    setLoading(true); setDirty(false); setSelected(0); setMessage(''); setFailed(false);
    loadCatalog(kind).then(data => { if (!cancelled) { setItems(data.items); setVersion(data.version); } })
      .catch(() => { if (!cancelled) { setMessage('Không tải được dữ liệu. Hãy tải lại trang trước khi chỉnh sửa.'); setFailed(true); } })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [kind]);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirty) event.preventDefault(); };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  const update = (next: CatalogItem) => { setItems(items.map((value, i) => i === selected ? next : value)); setDirty(true); setMessage(''); };
  const field = (key: string, value: unknown) => {
    const set = (next: unknown) => update({ ...item, [key]: next } as CatalogItem);
    const label = key === 'name' ? (kind === 'instructors' ? 'Tên giảng viên' : 'Tên môn học') : labels[key] || key;
    if (key === 'img' || key === 'photo') return <CatalogImageUpload key={`${selected}-${key}`} value={typeof value === 'string' ? value : ''} kind={kind} onChange={set} onBusyChange={setBusy} />;
    if (Array.isArray(value)) return <div key={key} className="space-y-3"><h3 className="font-semibold">{labels[key]}</h3>{value.map((pair, index) => <div key={index} className="grid sm:grid-cols-2 gap-2"><textarea aria-label={`${labels[key]} ${index + 1} tiếng Việt`} className={inputClass} placeholder="Tiếng Việt" value={pair.vi} onChange={e => set(value.map((p, i) => i === index ? { ...p, vi: e.target.value, en: '' } : p))} /><textarea aria-label={`${labels[key]} ${index + 1} tiếng Anh`} className={inputClass} placeholder="English" value={pair.en} onChange={e => set(value.map((p, i) => i === index ? { ...p, en: e.target.value } : p))} /><button type="button" className="text-red-600 text-left" onClick={() => set(value.filter((_, i) => i !== index))}>Bỏ dòng</button></div>)}<button type="button" className="text-brand-blue" onClick={() => set([...value, { vi: '', en: '' }])}>+ Thêm dòng</button></div>;
    if (value && typeof value === 'object' && 'vi' in value) {
      const pair = value as { vi: string; en: string };
      return <fieldset key={key} className="space-y-2"><legend className="font-semibold">{label}</legend><div className="grid sm:grid-cols-2 gap-3"><label>Tiếng Việt<textarea data-catalog-name={key === 'name' ? '' : undefined} className={inputClass} value={pair.vi} onChange={e => set({ vi: e.target.value, en: '' })} /></label><label>English<textarea className={inputClass} value={pair.en} onChange={e => set({ ...pair, en: e.target.value })} /></label></div></fieldset>;
    }
    if (key === 'category') return <label key={key} className="block">Nhóm môn học<select className={inputClass} value={String(value)} onChange={e => set(e.target.value)}>{Object.entries(CATEGORIES).map(([id, label]) => <option key={id} value={id}>{label.vi}</option>)}</select></label>;
    return <label key={key} className="block">{label}<input data-catalog-name={key === 'name' ? '' : undefined} className={inputClass} type={key === 'yearOfBirth' ? 'number' : 'text'} value={value == null ? '' : String(value)} onChange={e => {
      if (key === 'sessions') update({ ...item, sessions: e.target.value, sessionsEn: '' } as CatalogItem);
      else set(key === 'yearOfBirth' ? Number(e.target.value) : e.target.value);
    }} /></label>;
  };
  const removeSelected = () => {
    if (!item) return;
    const name = typeof item.name === 'string' ? item.name : item.name?.vi;
    if (!window.confirm(`Xoá ${kind === 'instructors' ? 'giảng viên' : 'môn học'} “${name || 'Chưa đặt tên'}” khỏi danh sách? Website chỉ cập nhật sau khi bấm “Lưu danh sách”.`)) return;
    const remaining = items.filter((_, index) => index !== selected);
    setItems(remaining);
    setSelected(Math.max(0, Math.min(selected, remaining.length - 1)));
    setDirty(true);
    setMessage('Đã bỏ mục khỏi danh sách đang sửa. Bấm “Lưu danh sách” để xác nhận xoá trên website.');
  };
  const save = async () => {
    setMessage('');
    if (kind === 'programs' && items.some(i => ['stem', 'nghe-thuat', 'the-thao-boi-loi'].includes(i.slug))) { setMessage('Đường dẫn này dành cho trang tổng quan. Vui lòng dùng đường dẫn khác cho môn học.'); return; }
    if (items.some(i => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(i.slug)) || new Set(items.map(i => i.slug)).size !== items.length) { setMessage('Đường dẫn cần không dấu, không trùng nhau và chỉ dùng chữ thường, số, dấu gạch ngang.'); return; }
    if (items.some(i => typeof i.name === 'string' ? !i.name.trim() : !i.name.vi.trim())) { setMessage('Vui lòng nhập tên cho mọi mục.'); return; }
    setBusy(true);
    try {
      const savedItems = autoTranslate ? await translateCatalogItems(items, true) : items;
      const updated_at = new Date().toISOString();
      const payload = { section_key: catalogKey(kind), content: { items: savedItems }, updated_at };
      const query = version
        ? supabase.from('site_content').update(payload).eq('section_key', catalogKey(kind)).eq('updated_at', version)
        : supabase.from('site_content').insert(payload);
      const { data, error } = await query.select('updated_at');
      if (error) throw error;
      if (!data?.length) throw new Error('Dữ liệu vừa được thay đổi ở phiên khác. Hãy tải lại trang.');
      setItems(savedItems); setVersion(data[0].updated_at); setDirty(false); setMessage('Đã lưu. Website sẽ hiển thị danh sách mới khi mở lại trang.');
    } catch (error) { setMessage(`Chưa lưu được: ${error instanceof Error ? error.message : 'Kiểm tra quyền quản trị hoặc tải lại trang.'}`); }
    finally { setBusy(false); }
  };
  if (loading) return <p>Đang tải danh mục…</p>;
  return <div className="max-w-6xl space-y-5">
    <div><h1 className="text-2xl font-bold">{kind === 'programs' ? 'Môn học' : 'Giảng viên'}</h1><p className="text-gray-600 mt-2">Cập nhật theo mùa, thay ảnh và ẩn các mục tạm ngưng. Nhãn mùa dùng để ghi chú trong admin.</p></div>
    {message && <p role="status" className="rounded-xl bg-amber-50 p-4 text-amber-900">{message}</p>}
    {!failed && <><label className="flex gap-2 items-center"><input type="checkbox" checked={autoTranslate} disabled={busy} onChange={e => setAutoTranslate(e.target.checked)} />Tự dịch các phần tiếng Anh còn thiếu khi lưu (giữ bản đã chỉnh tay)</label><div className="flex flex-wrap gap-3"><button disabled={busy} className="bg-brand-blue text-white rounded-lg px-4 py-2 disabled:opacity-50" onClick={save}>{busy ? 'Đang xử lý…' : 'Lưu danh sách'}</button><button disabled={busy} className="border rounded-lg px-4 py-2" onClick={() => {
      const next: any = defaults(kind)[0];
      Object.keys(next).forEach(key => { const value = next[key]; if (typeof value === 'string') next[key] = ''; else if (Array.isArray(value)) next[key] = []; else if (value && typeof value === 'object') next[key] = { vi: '', en: '' }; });
      next.slug = `moi-${Date.now()}`; next.visible = false; if (kind === 'programs') { next.category = 'sports'; next.sessionsEn = ''; } else next.yearOfBirth = 0;
      focusNewName.current = true;
      setItems([...items, next]); setSelected(items.length); setDirty(true); setMessage('');
    }}>+ Thêm {kind === 'programs' ? 'môn học' : 'giảng viên'}</button>{dirty && <span className="self-center text-amber-700">Có thay đổi chưa lưu</span>}</div>
    <fieldset disabled={busy} className="grid lg:grid-cols-[260px_1fr] gap-5 min-w-0"><div className="space-y-2">{items.map((entry, index) => <button type="button" key={index} className={`block text-left w-full p-3 rounded-lg border ${selected === index ? 'bg-blue-50 border-blue-400' : 'bg-white'}`} onClick={() => setSelected(index)}>{typeof entry.name === 'string' ? entry.name || '(Chưa đặt tên)' : entry.name.vi || '(Chưa đặt tên)'}<span className="block text-xs text-gray-500">{entry.visible === false ? 'Đang ẩn' : 'Đang hiển thị'}{entry.season ? ` · ${entry.season}` : ''}</span></button>)}</div>
    {!items.length && <p className="rounded-xl border bg-white p-6 text-gray-600">Danh sách đang trống. Bấm “Thêm {kind === 'instructors' ? 'giảng viên' : 'môn học'}” để tạo mục mới.</p>}
    {item && <div ref={editorRef} className="bg-white rounded-xl border p-4 md:p-6 space-y-5 min-w-0">
    {field('name', item.name ?? (kind === 'instructors' ? '' : { vi: '', en: '' }))}
    <div className="flex flex-wrap gap-3"><label className="flex gap-2 items-center"><input type="checkbox" checked={item.visible !== false} onChange={e => update({ ...item, visible: e.target.checked })} />Hiển thị trên website</label><button type="button" disabled={selected === 0} onClick={() => { const next = [...items]; [next[selected - 1], next[selected]] = [next[selected], next[selected - 1]]; setItems(next); setSelected(selected - 1); setDirty(true); }}>↑ Lên</button><button type="button" disabled={selected === items.length - 1} onClick={() => { const next = [...items]; [next[selected + 1], next[selected]] = [next[selected], next[selected + 1]]; setItems(next); setSelected(selected + 1); setDirty(true); }}>↓ Xuống</button><button type="button" className="rounded-lg border border-red-200 px-3 py-2 text-red-700 hover:bg-red-50" onClick={removeSelected}>Xoá {kind === 'instructors' ? 'giảng viên' : 'môn học'}</button></div>
    <label className="block">Mùa / học kỳ<input className={inputClass} placeholder="Ví dụ: Hè 2027" value={item.season || ''} onChange={e => update({ ...item, season: e.target.value })} /></label>
    <button type="button" className="rounded-lg bg-blue-50 text-brand-blue border border-blue-200 px-4 py-2" onClick={async () => { if (!window.confirm('Dịch lại các trường tiếng Anh của mục này? Bản dịch hiện có sẽ được thay thế.')) return; setBusy(true); setMessage(''); try { update(await translateCatalogItem(item)); setMessage('Đã dịch. Vui lòng xem lại bản tiếng Anh rồi lưu danh sách.'); } catch (error) { setMessage((error as Error).message); } finally { setBusy(false); } }}>Dịch sang tiếng Anh</button>
    <p className="text-sm text-gray-500">Khi sửa nội dung tiếng Việt, bản tiếng Anh tương ứng sẽ được xoá để tránh giữ bản dịch cũ. Có thể dịch lại hoặc nhập thủ công.</p>
    {Object.entries({ ...item, ...('sessions' in item ? { sessionsEn: item.sessionsEn || '' } : {}) }).filter(([key]) => !['name', 'visible', 'season'].includes(key)).map(([key, value]) => field(key, value))}
    </div>}</fieldset></>}
  </div>;
}
