import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, User, Baby, BookOpen, Clock, CheckCircle2, XCircle, Loader2, RefreshCw, Trash2, ChevronDown } from 'lucide-react';

type LeadStatus = 'new' | 'contacted' | 'enrolled' | 'cancelled';

interface Lead {
  id: string;
  created_at: string;
  parent_name: string;
  phone: string;
  child_name: string;
  child_age: number | null;
  programs: string[];
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
                  <div className="flex items-center gap-4 px-6 py-4">
                    {/* Avatar */}
                    <div className="w-11 h-11 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-lg flex items-center justify-center flex-shrink-0">
                      {lead.parent_name?.charAt(0)?.toUpperCase() || '?'}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-heading font-bold text-gray-900">{lead.parent_name}</span>
                        <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-brand-blue font-semibold hover:underline">
                          <Phone size={14} /> {lead.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 flex-wrap">
                        {lead.child_name && (
                          <span className="flex items-center gap-1"><Baby size={13} /> {lead.child_name}{lead.child_age ? `, ${lead.child_age} tuổi` : ''}</span>
                        )}
                        {lead.programs?.length > 0 && (
                          <span className="flex items-center gap-1"><BookOpen size={13} /> {lead.programs.join(', ')}</span>
                        )}
                        <span className="flex items-center gap-1"><Clock size={13} /> {new Date(lead.created_at).toLocaleString('vi-VN')}</span>
                      </div>
                    </div>

                    {/* Status selector */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${statusCfg.bg} ${statusCfg.color}`}>
                        <StatusIcon size={12} /> {statusCfg.label}
                      </span>
                      <select
                        value={lead.status}
                        onChange={e => updateStatus(lead.id, e.target.value as LeadStatus)}
                        className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 bg-gray-50 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue cursor-pointer"
                      >
                        {STATUSES.map(([k, v]) => (
                          <option key={k} value={k}>{v.label}</option>
                        ))}
                      </select>

                      {/* Expand */}
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : lead.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                      >
                        <ChevronDown size={16} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => deleteLead(lead.id)}
                        disabled={deletingId === lead.id}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                      >
                        {deletingId === lead.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded note */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-gray-100"
                      >
                        <div className="px-6 py-4 bg-gray-50">
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
                              className="flex items-center gap-2 px-5 py-2 bg-brand-blue text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors disabled:opacity-70"
                            >
                              {savingNote === lead.id ? <Loader2 size={14} className="animate-spin" /> : null}
                              Lưu ghi chú
                            </button>
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
