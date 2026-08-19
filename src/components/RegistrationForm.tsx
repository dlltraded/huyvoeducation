import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Phone, Mail, Loader2, BadgeCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getStoredAttribution } from '../lib/referralTracking';
import { useSettings } from '../contexts/SettingsContext';

const PROGRAMS = [
  { vi: 'Thể thao & Bơi lội', en: 'Sports & Swimming' },
  { vi: 'Nghệ thuật', en: 'Arts & Creativity' },
  { vi: 'STEM', en: 'STEM' },
  { vi: 'Ngoại ngữ', en: 'Foreign Language' },
];

export const RegistrationForm = ({ t, initialProgram = '' }: any) => {
  const { settings } = useSettings();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const parentNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const childNameRef = useRef<HTMLInputElement>(null);
  const childAgeRef = useRef<HTMLInputElement>(null);
  const referralCodeRef = useRef<HTMLInputElement>(null);
  const checkboxRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [autoRef, setAutoRef] = useState('');
  const [source, setSource] = useState('');

  // Auto-fill the referral code (and silently capture the marketing source)
  // when the visitor arrived via a referrer's link/QR code (?ref=CODE) or a
  // campaign link/QR code (?src=LABEL), captured on first page load in App.tsx.
  useEffect(() => {
    const { ref, src } = getStoredAttribution();
    if (ref) {
      setAutoRef(ref);
      if (referralCodeRef.current) referralCodeRef.current.value = ref;
    }
    setSource(src || ref || '');
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const selectedPrograms = PROGRAMS
      .filter((_, i) => checkboxRefs.current[i]?.checked)
      .map(p => p.vi);

    const basePayload = {
      parent_name: parentNameRef.current?.value || '',
      phone: phoneRef.current?.value || '',
      child_name: childNameRef.current?.value || '',
      child_age: childAgeRef.current?.value ? parseInt(childAgeRef.current.value) : null,
      programs: selectedPrograms,
      referral_code: referralCodeRef.current?.value?.trim() || null,
      status: 'new',
    };

    let { error: dbError } = await supabase.from('leads').insert({ ...basePayload, source: source || null });

    // Fallback for sites where the `source` column migration hasn't been run
    // yet on the `leads` table — don't let a missing optional column block
    // the whole registration.
    if (dbError && /source/i.test(dbError.message || '')) {
      console.warn('leads.source column missing — retrying insert without it. Run supabase/migrations/20260819d_leads_source_tracking.sql to enable source tracking.', dbError);
      ({ error: dbError } = await supabase.from('leads').insert(basePayload));
    }

    if (dbError) {
      setError('Có lỗi xảy ra, vui lòng thử lại hoặc gọi hotline.');
      console.error(dbError);
    } else {
      setFormSubmitted(true);
    }
    setIsSubmitting(false);
  };

  return (
    <section id="register" className="py-24 bg-gray-50 relative">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
        >
          <div className="grid md:grid-cols-5">
            <div className="md:col-span-2 bg-gradient-to-br from-brand-blue to-[#0855A2] p-10 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-heading font-bold mb-4 leading-tight">
                  {t('Đầu tư cho tuổi thơ của con', 'Invest in their childhood')}
                </h3>
                <p className="text-blue-100 text-lg mb-8">
                  {t('Đăng ký ngay để nhận tư vấn lộ trình phát triển cá nhân hóa cho bé.', 'Register now to receive a personalized development consultation for your child.')}
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Hotline</p>
                    <p className="font-semibold">{settings.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Email</p>
                    <p className="font-semibold">{settings.email}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-3 p-10">
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit} 
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{t('Họ tên ba/mẹ *', 'Parent Name *')}</label>
                        <input ref={parentNameRef} type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all bg-gray-50 focus:bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{t('Số điện thoại *', 'Phone Number *')}</label>
                        <input ref={phoneRef} type="tel" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all bg-gray-50 focus:bg-white" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{t('Tên bé', "Child's Name")}</label>
                        <input ref={childNameRef} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all bg-gray-50 focus:bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{t('Tuổi bé', "Child's Age")}</label>
                        <input ref={childAgeRef} type="number" min="3" max="18" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all bg-gray-50 focus:bg-white" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">{t('Quan tâm chương trình', 'Interested in')}</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {PROGRAMS.map((item, i) => (
                          <label key={i} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors">
                            <input
                              type="checkbox"
                              ref={el => { checkboxRefs.current[i] = el; }}
                              defaultChecked={item.vi === initialProgram}
                              className="w-4 h-4 text-brand-blue rounded border-gray-300 focus:ring-brand-blue"
                            />
                            <span className="text-sm font-medium text-gray-700">{t ? t(item.vi, item.en) : item.vi}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('Mã giới thiệu (nếu có)', 'Referral code (optional)')}
                      </label>
                      <input
                        ref={referralCodeRef}
                        type="text"
                        defaultValue={autoRef}
                        placeholder={t('Nhập mã của phụ huynh/học viên cũ để nhận ưu đãi học phí', "Enter a current parent's or student's code for a tuition discount")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all bg-gray-50 focus:bg-white"
                      />
                      {autoRef && (
                        <p className="flex items-center gap-1.5 text-xs text-brand-green font-semibold mt-2">
                          <BadgeCheck size={14} />
                          {t(`Đã tự động áp dụng mã "${autoRef}" từ liên kết/QR bạn vừa quét.`, `Code "${autoRef}" auto-applied from the link/QR you scanned.`)}
                        </p>
                      )}
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-blue hover:bg-blue-700 text-white font-heading font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? <><Loader2 size={20} className="animate-spin" /> {t('Đang gửi...', 'Sending...')}</> : t('Nhận tư vấn ngay', 'Get Consultation Now')}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 text-brand-green rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                      {t('Đăng ký thành công!', 'Successfully Registered!')}
                    </h3>
                    <p className="text-gray-600 mb-8">
                      {t('Cảm ơn ba mẹ. Ban cố vấn giáo dục của Huy Võ sẽ liên hệ trong thời gian sớm nhất.', 'Thank you. Our educational counselors will contact you shortly.')}
                    </p>
                    <button onClick={() => setFormSubmitted(false)} className="text-brand-blue font-semibold hover:underline">
                      {t('Gửi thêm đăng ký', 'Submit another')}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
