import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Phone, Mail, Loader2, School, UserCheck, Bus, Sun, MoreHorizontal } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getStoredAttribution } from '../lib/referralTracking';
import { useSettings } from '../contexts/SettingsContext';

// Partner/school enquiry form. Stored in the same `leads` table as parent
// registrations, marked with site = 'doi-tac' so the admin can tell them apart.
export const PARTNER_NEEDS = [
  { id: 'DT_GV_HLV', Icon: UserCheck, vi: 'Cung ứng giáo viên, HLV', en: 'Instructor & coach staffing' },
  { id: 'DT_CCA', Icon: School, vi: 'CCA tại trường', en: 'On-campus CCA' },
  { id: 'DT_FIELDTRIP', Icon: Bus, vi: 'Field trip', en: 'Field trip' },
  { id: 'DT_KHOAHE', Icon: Sun, vi: 'Khóa hè, kỹ năng sống', en: 'Summer camp, life skills' },
  { id: 'DT_KHAC', Icon: MoreHorizontal, vi: 'Nhu cầu khác', en: 'Other' },
];

const AREAS = [
  { vi: 'Thể thao', en: 'Sports' },
  { vi: 'Bơi lội', en: 'Swimming' },
  { vi: 'Nghệ thuật', en: 'Arts' },
  { vi: 'Kỹ năng sống', en: 'Life skills' },
  { vi: 'STEM và sáng tạo', en: 'STEM & creativity' },
];

const STEPS = [
  { vi: 'Gửi yêu cầu', en: 'Send a brief', dVi: 'Mục tiêu, khối lớp, thời gian và yêu cầu riêng của nhà trường.', dEn: 'Objectives, grades, timing and specific requirements.' },
  { vi: 'Trao đổi và đề xuất', en: 'Discuss and propose', dVi: 'HVE khảo sát, đề xuất phương án và báo giá.', dEn: 'HVE reviews the site and proposes a plan and quotation.' },
  { vi: 'Thí điểm', en: 'Pilot', dVi: 'Bắt đầu với một học kỳ CCA hoặc một chuyến đi trước khi mở rộng.', dEn: 'Start with one CCA semester or one trip before scaling.' },
];

const inputCls = 'w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all bg-gray-50 focus:bg-white outline-none';
const labelCls = 'block text-sm font-semibold text-gray-700 mb-2';

export const PartnerForm = ({ t }: { t: any }) => {
  const { settings } = useSettings();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [need, setNeed] = useState('');
  const [areas, setAreas] = useState<string[]>([]);

  const orgRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const scaleRef = useRef<HTMLInputElement>(null);
  const startRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const toggleArea = (a: string) =>
    setAreas(prev => (prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!need) {
      setError(t('Vui lòng chọn nhu cầu của đơn vị.', 'Please choose what you need.'));
      return;
    }
    setSubmitting(true);
    setError('');

    const v = (r: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>) => r.current?.value.trim() || '';
    const needLabel = PARTNER_NEEDS.find(n => n.id === need)?.vi || need;
    const note = [
      `[Đối tác] Nhu cầu: ${needLabel}`,
      v(roleRef) && `Chức vụ: ${v(roleRef)}`,
      v(emailRef) && `Email: ${v(emailRef)}`,
      v(scaleRef) && `Khối lớp / số học sinh: ${v(scaleRef)}`,
      v(startRef) && `Thời gian dự kiến: ${v(startRef)}`,
      v(messageRef) && `Nội dung: ${v(messageRef)}`,
    ].filter(Boolean).join('\n');

    const { src, ref } = getStoredAttribution();
    const { error: dbError } = await supabase.from('leads').insert({
      parent_name: v(contactRef),
      phone: v(phoneRef),
      child_name: '',
      child_age: null,
      child_school: v(orgRef),
      package_selected: need,
      programs: areas,
      note,
      site: 'doi-tac',
      source: src || ref || null,
      status: 'new',
    });

    if (dbError) {
      console.error(dbError);
      setError(t('Có lỗi xảy ra, vui lòng thử lại hoặc gọi hotline.', 'Something went wrong. Please try again or call our hotline.'));
    } else {
      setSubmitted(true);
    }
    setSubmitting(false);
  };

  return (
    <div className="grid md:grid-cols-5">
      <div className="md:col-span-2 bg-gradient-to-br from-brand-blue to-brand-blue-dark p-8 md:p-10 text-white flex flex-col justify-between gap-10">
        <div>
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 leading-tight text-white">
            {t('Hãy cùng viết tiếp phần sau tiếng chuông', 'Let us write what comes after the bell, together')}
          </h3>
          <p className="text-white/80 mb-8">
            {t('Nhà trường, doanh nghiệp và tổ chức gửi nhu cầu cho HVE: thuê giáo viên, huấn luyện viên, triển khai CCA, field trip hoặc khóa hè.', 'Schools, companies and organisations: tell HVE what you need, from instructors and coaches to CCA, field trips or summer camps.')}
          </p>
          <ol className="space-y-5">
            {STEPS.map((s, i) => (
              <li key={s.vi} className="flex gap-4">
                <span className="w-8 h-8 shrink-0 rounded-full bg-white/15 border border-white/25 font-heading font-bold text-sm flex items-center justify-center">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-heading font-semibold">{t(s.vi, s.en)}</p>
                  <p className="text-sm text-white/70">{t(s.dVi, s.dEn)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="space-y-4 text-sm">
          <a href={`tel:${settings.phone}`} className="flex items-center gap-3 hover:text-white/90">
            <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center"><Phone size={16} /></span>
            <span className="font-semibold">{settings.phone}</span>
          </a>
          {settings.email && (
            <a href={`mailto:${settings.email}`} className="flex items-center gap-3 hover:text-white/90">
              <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center"><Mail size={16} /></span>
              <span className="font-semibold">{settings.email}</span>
            </a>
          )}
        </div>
      </div>

      <div className="md:col-span-3 p-8 md:p-10">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className={labelCls}>{t('Nhu cầu của đơn vị *', 'What do you need? *')}</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {PARTNER_NEEDS.map(n => (
                    <button
                      type="button"
                      key={n.id}
                      onClick={() => setNeed(n.id)}
                      className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl border-2 text-left text-sm font-semibold transition-colors ${
                        need === n.id ? 'border-brand-blue bg-brand-blue-tint text-brand-blue' : 'border-gray-100 hover:border-gray-200 text-gray-700'
                      } ${n.id === 'DT_KHAC' ? 'col-span-2' : ''}`}
                    >
                      <n.Icon size={18} className="shrink-0" />
                      {t(n.vi, n.en)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelCls}>{t('Tên trường / đơn vị *', 'School / organisation *')}</label>
                <input ref={orgRef} required className={inputCls} placeholder={t('VD: Trường Tiểu học A', 'e.g. A Primary School')} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>{t('Người liên hệ *', 'Contact person *')}</label>
                  <input ref={contactRef} required className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>{t('Chức vụ', 'Position')}</label>
                  <input ref={roleRef} className={inputCls} placeholder={t('VD: Phó Hiệu trưởng', 'e.g. Vice Principal')} />
                </div>
                <div>
                  <label className={labelCls}>{t('Số điện thoại *', 'Phone *')}</label>
                  <input ref={phoneRef} required type="tel" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input ref={emailRef} type="email" className={inputCls} />
                </div>
              </div>

              <div>
                <label className={labelCls}>{t('Lĩnh vực quan tâm', 'Activity areas')}</label>
                <div className="flex flex-wrap gap-2">
                  {AREAS.map(a => (
                    <button
                      type="button"
                      key={a.vi}
                      onClick={() => toggleArea(a.vi)}
                      className={`px-3.5 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                        areas.includes(a.vi) ? 'bg-brand-blue border-brand-blue text-white' : 'border-gray-200 text-gray-600 hover:border-brand-blue/40'
                      }`}
                    >
                      {t(a.vi, a.en)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>{t('Khối lớp / số học sinh', 'Grades / student count')}</label>
                  <input ref={scaleRef} className={inputCls} placeholder={t('VD: Khối 3–5, ~200 HS', 'e.g. Grades 3–5, ~200')} />
                </div>
                <div>
                  <label className={labelCls}>{t('Thời gian dự kiến', 'Expected start')}</label>
                  <input ref={startRef} className={inputCls} placeholder={t('VD: Học kỳ II 2026–2027', 'e.g. Semester 2, 2026–27')} />
                </div>
              </div>

              <div>
                <label className={labelCls}>{t('Nội dung yêu cầu', 'Details')}</label>
                <textarea
                  ref={messageRef}
                  rows={3}
                  className={inputCls}
                  placeholder={t('VD: Cần 02 HLV bóng đá, 2 buổi/tuần, từ tháng 1/2027.', 'e.g. Need 2 football coaches, twice a week, from January 2027.')}
                />
              </div>

              {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-heading font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? <><Loader2 size={20} className="animate-spin" /> {t('Đang gửi...', 'Sending...')}</> : t('Gửi yêu cầu cho HVE', 'Send to HVE')}
              </button>
            </motion.form>
          ) : (
            <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 bg-[#EDF7EC] text-brand-green rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">{t('Đã nhận yêu cầu', 'Request received')}</h3>
              <p className="text-gray-600 mb-8">
                {t('Cảm ơn quý đơn vị. HVE sẽ liên hệ lại để trao đổi chi tiết.', 'Thank you. HVE will contact you to discuss the details.')}
              </p>
              <button onClick={() => setSubmitted(false)} className="text-brand-blue font-semibold hover:underline">
                {t('Gửi yêu cầu khác', 'Send another request')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
