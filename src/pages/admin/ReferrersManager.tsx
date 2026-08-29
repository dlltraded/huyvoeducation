import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Loader2, Plus, Trash2, Copy, Check, QrCode, X, Users2, Sparkles } from 'lucide-react';
import { qrCodeImageUrl } from '../../lib/referralTracking';

interface Referrer {
  id: string;
  name: string;
  phone: string | null;
  referral_code: string;
  commission_amount: number | null;
  notes: string | null;
  is_active: boolean;
  created_at: string;
  stats?: { total: number; paid: number };
}

// Both links land straight on the registration form (#dang-ky) — the query
// param (?ref=/?src=) is captured on load in App.tsx before ScrollToTop
// scrolls to the section, so the form is pre-filled by the time
// the visitor sees it.
const referralLink = (code: string) => `https://www.nvhthanhthieunhidongnai.com/dang-ky.html?ref=${encodeURIComponent(code)}`;
const campaignLink = (label: string) => `https://www.nvhthanhthieunhidongnai.com/dang-ky.html?src=${encodeURIComponent(label)}`;

const CopyButton = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
    >
      {copied ? <Check size={13} className="text-brand-green" /> : <Copy size={13} />}
      {copied ? 'Đã chép' : 'Chép link'}
    </button>
  );
};

const QrModal = ({ url, title, onClose }: { url: string; title: string; onClose: () => void }) => (
  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6" onClick={onClose}>
    <div className="bg-white rounded-2xl p-6 max-w-xs w-full text-center" onClick={e => e.stopPropagation()}>
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-heading font-bold text-gray-900 truncate">{title}</h4>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-700"><X size={18} /></button>
      </div>
      <img src={qrCodeImageUrl(url, 260)} alt={`QR code cho ${title}`} className="mx-auto rounded-xl border border-gray-100" />
      <p className="text-xs text-gray-500 mt-4 break-all">{url}</p>
      <a
        href={qrCodeImageUrl(url, 600)}
        download={`qr-${title.replace(/\s+/g, '-').toLowerCase()}.png`}
        className="mt-4 inline-flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
      >
        Tải ảnh QR (in được)
      </a>
    </div>
  </div>
);

export const ReferrersManager = () => {
  const [referrers, setReferrers] = useState<Referrer[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [qrTarget, setQrTarget] = useState<{ url: string; title: string } | null>(null);

  const [form, setForm] = useState({ name: '', phone: '', referral_code: '', commission_amount: '', notes: '' });

  const [campaignLabel, setCampaignLabel] = useState('');

  const fetchReferrers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('referrers').select('*').order('created_at', { ascending: false });
    
    // Fetch leads to calculate referral stats
    const { data: leadsData } = await supabase.from('leads').select('referral_code, status').not('referral_code', 'is', null);
    
    if (!error && data) {
      const referralStats = (leadsData || []).reduce((acc: any, lead: any) => {
        const code = lead.referral_code?.toUpperCase();
        if (!code) return acc;
        if (!acc[code]) acc[code] = { total: 0, paid: 0 };
        acc[code].total += 1;
        if (lead.status === 'paid') acc[code].paid += 1;
        return acc;
      }, {});

      const referrersWithStats = (data as Referrer[]).map(r => ({
        ...r,
        stats: referralStats[r.referral_code.toUpperCase()] || { total: 0, paid: 0 }
      }));
      setReferrers(referrersWithStats);
    }
    setLoading(false);
  };

  useEffect(() => { fetchReferrers(); }, []);

  const slugifyCode = (name: string) =>
    name
      .replace(/đ/gi, 'd')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // strip Vietnamese diacritics
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, '')
      .slice(0, 12);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.referral_code.trim()) return;
    setSaving(true);
    const { error } = await supabase.from('referrers').insert({
      name: form.name.trim(),
      phone: form.phone.trim() || null,
      referral_code: form.referral_code.trim().toUpperCase(),
      commission_amount: form.commission_amount ? Number(form.commission_amount) : null,
      notes: form.notes.trim() || null,
    });
    setSaving(false);
    if (error) {
      alert('Lỗi khi lưu: ' + error.message + (error.message.includes('unique') ? ' (mã giới thiệu đã tồn tại)' : ''));
      return;
    }
    setForm({ name: '', phone: '', referral_code: '', commission_amount: '', notes: '' });
    setShowForm(false);
    fetchReferrers();
  };

  const toggleActive = async (r: Referrer) => {
    await supabase.from('referrers').update({ is_active: !r.is_active }).eq('id', r.id);
    setReferrers(prev => prev.map(x => x.id === r.id ? { ...x, is_active: !x.is_active } : x));
  };

  const deleteReferrer = async (id: string) => {
    if (!confirm('Xoá người giới thiệu này? Các lead đã ghi nhận trước đó vẫn giữ nguyên mã, chỉ không còn khớp với hồ sơ này.')) return;
    await supabase.from('referrers').delete().eq('id', id);
    setReferrers(prev => prev.filter(x => x.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">Chương trình giới thiệu (Referral)</h1>
          <p className="text-gray-500 mt-1">
            Tạo mã / link / QR cho từng người giới thiệu — khi phụ huynh quét mã và đăng ký, hệ thống tự biết là khách của ai.
          </p>
        </div>
        <button
          onClick={() => setShowForm(v => !v)}
          className="flex items-center gap-2 bg-brand-blue hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors"
        >
          <Plus size={18} /> Thêm người giới thiệu
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <form onSubmit={handleAdd} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tên người giới thiệu *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => {
                  const name = e.target.value;
                  setForm(f => ({ ...f, name, referral_code: f.referral_code && f.referral_code !== slugifyCode(f.name) ? f.referral_code : slugifyCode(name) }));
                }}
                placeholder="Chị Lan (phụ huynh lớp Vovinam)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
              <input
                type="text"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mã giới thiệu * (tự sinh, có thể sửa)</label>
              <input
                type="text"
                required
                value={form.referral_code}
                onChange={e => setForm(f => ({ ...f, referral_code: e.target.value.toUpperCase() }))}
                placeholder="LANVOVINAM"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hoa hồng / lần giới thiệu thành công (VNĐ, để trống = mặc định)</label>
              <input
                type="number"
                value={form.commission_amount}
                onChange={e => setForm(f => ({ ...f, commission_amount: e.target.value }))}
                placeholder="500000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Ghi chú</label>
              <input
                type="text"
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-lg font-medium text-gray-600 hover:bg-gray-100">Huỷ</button>
            <button type="submit" disabled={saving} className="flex items-center gap-2 bg-brand-blue text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-70">
              {saving && <Loader2 size={16} className="animate-spin" />} Lưu
            </button>
          </div>
        </form>
      )}

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-brand-blue" /></div>
      ) : referrers.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <Users2 className="mx-auto text-gray-300 mb-3" size={40} />
          <p className="text-gray-400">Chưa có người giới thiệu nào. Bấm "Thêm người giới thiệu" để tạo mã đầu tiên.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {referrers.map(r => (
            <div key={r.id} className={`bg-white rounded-2xl border shadow-sm p-5 ${r.is_active ? 'border-gray-100' : 'border-gray-100 opacity-60'}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-heading font-bold text-gray-900 truncate">{r.name}</p>
                  {r.phone && <p className="text-sm text-gray-500">{r.phone}</p>}
                  <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-sm font-bold text-brand-blue bg-blue-50 px-2.5 py-1 rounded-lg">
                    {r.referral_code}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => toggleActive(r)}
                    title={r.is_active ? 'Đang bật — bấm để tắt' : 'Đang tắt — bấm để bật'}
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${r.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                  >
                    {r.is_active ? 'Đang dùng' : 'Đã tắt'}
                  </button>
                  <button onClick={() => deleteReferrer(r.id)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {r.notes && <p className="text-sm text-gray-500 mt-3">{r.notes}</p>}

              <div className="mt-4 flex items-center gap-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100 overflow-x-auto">
                <div className="flex flex-col min-w-[100px]">
                   <span className="text-xs text-gray-500 mb-0.5">Số lead mang về</span>
                   <span className="font-bold text-gray-900 text-base">{r.stats?.total || 0}</span>
                </div>
                <div className="w-px h-8 bg-gray-200 flex-shrink-0"></div>
                <div className="flex flex-col min-w-[100px]">
                   <span className="text-xs text-gray-500 mb-0.5">Đã đóng học phí</span>
                   <span className="font-bold text-green-600 text-base">{r.stats?.paid || 0}</span>
                </div>
                {r.commission_amount != null && (
                   <>
                     <div className="w-px h-8 bg-gray-200 flex-shrink-0"></div>
                     <div className="flex flex-col min-w-[120px]">
                        <span className="text-xs text-gray-500 mb-0.5">
                          Tạm tính hoa hồng <span className="font-normal">({(r.commission_amount / 1000).toLocaleString('vi-VN')}k/khách)</span>
                        </span>
                        <span className="font-bold text-brand-blue text-base">
                          {((r.commission_amount * (r.stats?.paid || 0))).toLocaleString('vi-VN')}đ
                        </span>
                     </div>
                   </>
                )}
              </div>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                <CopyButton value={referralLink(r.referral_code)} />
                <button
                  onClick={() => setQrTarget({ url: referralLink(r.referral_code), title: r.name })}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-blue/10 hover:bg-brand-blue/20 text-brand-blue transition-colors"
                >
                  <QrCode size={13} /> Xem / Tải QR
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Campaign / non-referrer source QR tool */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="flex items-center gap-2 font-heading font-bold text-gray-900 mb-2">
          <Sparkles size={18} className="text-brand-yellow" /> Tạo QR cho nguồn quảng cáo (không gắn người giới thiệu)
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Dùng cho poster, banner, standee, bài đăng Facebook/Zalo... Chỉ cần đặt tên nguồn (VD: "poster-truong-abc"), không cần lưu vào danh sách người giới thiệu ở trên.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={campaignLabel}
            onChange={e => setCampaignLabel(e.target.value)}
            placeholder="poster-truong-tieu-hoc-abc"
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none font-mono text-sm"
          />
          <button
            type="button"
            disabled={!campaignLabel.trim()}
            onClick={() => setQrTarget({ url: campaignLink(campaignLabel.trim()), title: campaignLabel.trim() })}
            className="flex items-center justify-center gap-2 bg-brand-dark text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-black transition-colors disabled:opacity-40"
          >
            <QrCode size={16} /> Tạo QR
          </button>
        </div>
      </div>

      {qrTarget && <QrModal url={qrTarget.url} title={qrTarget.title} onClose={() => setQrTarget(null)} />}
    </div>
  );
};
