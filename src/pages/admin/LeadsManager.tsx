import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, User, Baby, BookOpen, Clock, CheckCircle2, XCircle, Loader2, RefreshCw, Trash2, ChevronDown, Gift, MapPin, School, Package, Sunset, Eye } from 'lucide-react';

type LeadStatus = 'new' | 'contacted' | 'enrolled' | 'cancelled';

interface Lead {
  id: string;
  created_at: string;
  parent_name: string;
  phone: string;
  child_name: string;
  child_age: number | null;
  programs: string[];
  child_school?: string | null;
  package_selected?: string | null;
  wants_after_1630?: boolean;
  referral_code: string | null;
  source: string | null;
  status: LeadStatus;
  note: string | null;
}

const STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; bg: string; icon: any }> = {
  new:       { label: 'Mới',          color: 'text-blue-700',  bg: 'bg-blue-100',   icon: Clock },
  contacted: { label: 'Đã liên hệ',  color: 'text-amber-700', bg: 'bg-amber-100',  icon: Phone },
  enrolled:  { label: 'Đã đăng ký',  color: 'text-green-700', bg: 'bg-green-100',  icon: CheckCircle2 },
  cancelled: { label: 'Huỷ',         color: 'text-red-600',   bg: 'bg-red-100',    icon: XCircle },
};

const STATUSES = Object.entries(STATUS_CONFIG) as [LeadStatus, (typeof STATUS_CONFIG)[LeadStatus]][];

const PACKAGE_NAMES: Record<string, string> = {
  'TH_1BUOI': 'Tiểu học (1 buổi)',
  'THCS_1BUOI': 'THCS (1 buổi)',
  'TH_2BUOI': 'Tiểu học (2 buổi)',
  'THCS_2BUOI': 'THCS (2 buổi)',
};

export const LeadsManager = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<LeadStatus | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [noteValues, setNoteValues] = useState<Record<string, string>>({});
  const [savingNote, setSavingNote] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    const query = supabase.from('leads').select('*').order('created_at', { ascending: false });
    const { data, error } = await query;
    if (!error && data) setLeads(data as Lead[]);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const updateStatus = async (id: string, status: LeadStatus) => {
    await supabase.from('leads').update({ status }).eq('id', id);
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const saveNote = async (id: string) => {
    setSavingNote(id);
    await supabase.from('leads').update({ note: noteValues[id] ?? '' }).eq('id', id);
    setLeads(prev => prev.map(l => l.id === id ? { ...l, note: noteValues[id] ?? '' } : l));
    setSavingNote(null);
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Bạn chắc chắn muốn xoá lead này không?')) return;
    setDeletingId(id);
    await supabase.from('leads').delete().eq('id', id);
    setLeads(prev => prev.filter(l => l.id !== id));
    setDeletingId(null);
  };

  const filtered = filterStatus === 'all' ? leads : leads.filter(l => l.status === filterStatus);

  const counts: Record<string, number> = {
    all: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    enrolled: leads.filter(l => l.status === 'enrolled').length,
    cancelled: leads.filter(l => l.status === 'cancelled').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">Quản lý Lead đăng ký</h1>
          <p className="text-gray-500 mt-1">Danh sách phụ huynh đã điền form tư vấn trên website</p>
        </div>
        <button
          onClick={fetchLeads}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 font-medium shadow-sm"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Làm mới
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[{ key: 'all', label: 'Tất cả', color: 'text-gray-700', bg: 'bg-white' }, ...STATUSES.map(([k, v]) => ({ key: k, label: v.label, color: v.color, bg: v.bg }))].map(({ key, label, color, bg }) => (
          <button
            key={key}
            onClick={() => setFilterStatus(key as any)}
            className={`rounded-2xl p-4 text-left border-2 transition-all ${filterStatus === key ? 'border-brand-blue shadow-md' : 'border-transparent shadow-sm'} ${key === 'all' ? 'bg-white' : bg}`}
          >
            <p className="text-3xl font-heading font-bold text-gray-900">{counts[key] ?? 0}</p>
            <p className={`text-sm font-semibold mt-1 ${color}`}>{label}</p>
          </button>
        ))}
      </div>

      {/* Lead list */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-brand-blue" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
          <p className="text-gray-400 text-lg">Chưa có lead nào.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map(lead => {
              const statusCfg = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;
              const StatusIcon = statusCfg.icon;
              const isExpanded = expandedId === lead.id;

              return (
                <motion.div
                  key={lead.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                >
                  {/* Row */}
                  <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-lg flex items-center justify-center flex-shrink-0">
                        {lead.parent_name?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      
                      {/* Primary Info */}
                      <div className="flex flex-col min-w-0">
                        <span className="font-heading font-bold text-gray-900 truncate">{lead.parent_name}</span>
                        <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-sm text-brand-blue font-semibold hover:underline w-fit mt-0.5">
                          <Phone size={13} /> {lead.phone}
                        </a>
                        {(lead.child_name || lead.package_selected) && (
                          <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500 truncate">
                            {lead.child_name && <span className="truncate flex-shrink-0">Bé: {lead.child_name}</span>}
                            {lead.child_name && lead.package_selected && <span className="text-gray-300 flex-shrink-0">•</span>}
                            {lead.package_selected && <span className="text-brand-blue font-medium truncate">{PACKAGE_NAMES[lead.package_selected] || lead.package_selected}</span>}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions & Status */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                      <span className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${statusCfg.bg} ${statusCfg.color}`}>
                        <StatusIcon size={12} /> {statusCfg.label}
                      </span>
                      
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : lead.id)}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${isExpanded ? 'bg-brand-blue/10 text-brand-blue' : 'hover:bg-gray-100 text-gray-500'}`}
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => deleteLead(lead.id)}
                        disabled={deletingId === lead.id}
                        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                      >
                        {deletingId === lead.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-gray-100"
                      >
                        <div className="px-4 sm:px-6 py-5 bg-gray-50/50 space-y-5">
                          {/* Details Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-sm">
                            {/* Column 1 */}
                            <div className="space-y-3">
                              <div>
                                <span className="text-gray-500 font-medium block mb-1">Thời gian đăng ký</span>
                                <div className="flex items-center gap-1.5 text-gray-900 font-semibold"><Clock size={15} className="text-gray-400" /> {new Date(lead.created_at).toLocaleString('vi-VN')}</div>
                              </div>
                              {lead.child_name && (
                                <div>
                                  <span className="text-gray-500 font-medium block mb-1">Học viên</span>
                                  <div className="flex items-center gap-1.5 text-gray-900 font-semibold"><Baby size={15} className="text-gray-400" /> {lead.child_name} {lead.child_age ? `(${lead.child_age} tuổi)` : ''}</div>
                                </div>
                              )}
                              {lead.child_school && (
                                <div>
                                  <span className="text-gray-500 font-medium block mb-1">Trường học hiện tại</span>
                                  <div className="flex items-center gap-1.5 text-gray-900 font-semibold"><School size={15} className="text-gray-400" /> {lead.child_school}</div>
                                </div>
                              )}
                            </div>
                            
                            {/* Column 2 */}
                            <div className="space-y-3">
                              {(lead.package_selected || lead.programs?.length > 0) && (
                                <div>
                                  <span className="text-gray-500 font-medium block mb-1">Chương trình quan tâm</span>
                                  <div className="flex items-center gap-1.5 text-brand-blue font-semibold">
                                    <Package size={15} /> {lead.package_selected ? (PACKAGE_NAMES[lead.package_selected] || lead.package_selected) : lead.programs.join(', ')}
                                  </div>
                                </div>
                              )}
                              {lead.wants_after_1630 && (
                                <div>
                                  <span className="text-gray-500 font-medium block mb-1">Nhu cầu đưa đón</span>
                                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-100 text-orange-700 font-semibold">
                                    <Sunset size={14} /> Đón sau 16:30
                                  </div>
                                </div>
                              )}
                              {(lead.referral_code || lead.source) && (
                                <div>
                                  <span className="text-gray-500 font-medium block mb-1">Nguồn / Mã giới thiệu</span>
                                  <div className="flex items-center gap-2">
                                    {lead.referral_code && (
                                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-100 text-purple-700 font-semibold">
                                        <Gift size={14} /> {lead.referral_code}
                                      </span>
                                    )}
                                    {lead.source && lead.source !== lead.referral_code && (
                                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-100 text-cyan-700 font-semibold">
                                        <MapPin size={14} /> {lead.source}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <hr className="border-gray-200" />

                          {/* Status and Note */}
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Trạng thái xử lý</label>
                              <select
                                value={lead.status}
                                onChange={e => updateStatus(lead.id, e.target.value as LeadStatus)}
                                className="w-full sm:w-auto text-sm border border-gray-200 rounded-xl px-4 py-2.5 bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue cursor-pointer font-medium"
                              >
                                {STATUSES.map(([k, v]) => (
                                  <option key={k} value={k}>{v.label}</option>
                                ))}
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Ghi chú nội bộ</label>
                              <textarea
                                rows={3}
                                value={noteValues[lead.id] ?? (lead.note || '')}
                                onChange={e => setNoteValues(prev => ({ ...prev, [lead.id]: e.target.value }))}
                                placeholder="Nhập ghi chú về lead này (chỉ hiển thị nội bộ)..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all bg-white text-sm resize-none"
                              />
                              <div className="flex justify-end mt-3">
                                <button
                                  onClick={() => saveNote(lead.id)}
                                  disabled={savingNote === lead.id}
                                  className="flex items-center gap-2 px-5 py-2.5 bg-brand-blue text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-70 shadow-sm"
                                >
                                  {savingNote === lead.id ? <Loader2 size={16} className="animate-spin" /> : null}
                                  Lưu ghi chú
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
