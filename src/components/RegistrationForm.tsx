import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Phone, Mail, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getStoredAttribution } from '../lib/referralTracking';
import { useSettings } from '../contexts/SettingsContext';

const PACKAGES = [
  { id: 'TH_1BUOI', label: 'Học 01 buổi tại trường', desc: 'Tiểu học · tuyến gần', price: '2.695.000đ' },
  { id: 'THCS_1BUOI', label: 'Học 01 buổi tại trường', desc: 'THCS · tuyến gần', price: '2.820.000đ' },
  { id: 'TH_2BUOI', label: 'Học 02 buổi tại trường', desc: 'Tiểu học · tuyến gần', price: '2.795.000đ' },
  { id: 'THCS_2BUOI', label: 'Học 02 buổi tại trường', desc: 'THCS · tuyến gần', price: '2.920.000đ' },
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
  const childSchoolRef = useRef<HTMLInputElement>(null);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [wantsAfter1630, setWantsAfter1630] = useState(false);
  const [autoRef, setAutoRef] = useState('');
  const [source, setSource] = useState('');
  const [refState, setRefState] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [refData, setRefData] = useState<{ name: string; discount: number } | null>(null);

  const checkReferralCode = async (value: string) => {
    const code = value.trim();
    if (!code) {
      setRefState('idle');
      setRefData(null);
      return;
    }

    setRefState('checking');
    const { data, error: validationError } = await supabase.rpc('validate_referral_code', { p_code: code });
    const match = Array.isArray(data) ? data[0] : data;

    if (validationError || !match) {
      setRefState('invalid');
      setRefData(null);
      return;
    }

    setRefData({
      name: match.referrer_name,
      discount: Number(match.discount_amount || 0),
    });
    setRefState('valid');
  };

  // Auto-fill the referral code (and silently capture the marketing source)
  // when the visitor arrived via a referrer's link/QR code (?ref=CODE) or a
  // campaign link/QR code (?src=LABEL), captured on first page load in App.tsx.
  useEffect(() => {
    const { ref, src } = getStoredAttribution();
    if (ref) {
      setAutoRef(ref);
      if (referralCodeRef.current) referralCodeRef.current.value = ref;
      void checkReferralCode(ref);
    }
    setSource(src || ref || '');
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const basePayload = {
      parent_name: parentNameRef.current?.value || '',
      phone: phoneRef.current?.value || '',
      child_name: childNameRef.current?.value || '',
      child_age: childAgeRef.current?.value ? parseInt(childAgeRef.current.value) : null,
      child_school: childSchoolRef.current?.value || null,
      package_selected: selectedPackage || null,
      wants_after_1630: wantsAfter1630,
      programs: [],
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
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t('Trường học hiện tại của bé *', "Child's Current School *")}</label>
                      <input ref={childSchoolRef} type="text" required placeholder={t('VD: Tiểu học Quang Vinh', 'Ex: Quang Vinh Primary')} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all bg-gray-50 focus:bg-white" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">{t('Chọn gói học kỹ năng theo tháng *', 'Select Monthly Skills Package *')}</label>
                      <div className="flex flex-col gap-3">
                        {PACKAGES.map((pkg) => (
                          <label key={pkg.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${selectedPackage === pkg.id ? 'border-brand-blue bg-blue-50/50' : 'border-gray-100 hover:border-gray-200 bg-white'}`}>
                            <input
                              type="radio"
                              name="package"
                              value={pkg.id}
                              checked={selectedPackage === pkg.id}
                              onChange={() => setSelectedPackage(pkg.id)}
                              required
                              className="w-5 h-5 text-brand-blue border-gray-300 focus:ring-brand-blue"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="text-[15px] font-bold text-gray-900">{t(pkg.label, pkg.label)}</div>
                              <div className="text-sm text-gray-500 mt-0.5">{t(pkg.desc, pkg.desc)}</div>
                            </div>
                            <div className="font-bold text-brand-blue whitespace-nowrap">{pkg.price}</div>
                          </label>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-3">
                        {t('Giá trên áp dụng cho 08 trường tuyến gần. Nếu bé học trường ngoài danh sách, mức phí xe tuyến chuẩn sẽ được tư vấn thêm.', 'Prices apply for 8 nearby schools. If the child attends a school outside the list, standard route bus fees will be advised.')}
                      </p>
                    </div>

                    <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${wantsAfter1630 ? 'border-[#f5b301] bg-[#fffaf0]' : 'border-gray-100 bg-gray-50'}`}>
                      <input
                        type="checkbox"
                        checked={wantsAfter1630}
                        onChange={(e) => setWantsAfter1630(e.target.checked)}
                        className="w-5 h-5 mt-0.5 text-[#f5b301] border-gray-300 focus:ring-[#f5b301] rounded"
                      />
                      <div>
                        <div className="text-[14px] font-semibold text-gray-900 leading-snug">
                          {t('Ba/mẹ có nhu cầu đón bé sau 16:30 (ngoài khung giờ tiêu chuẩn)', 'Need to pick up the child after 16:30 (outside standard hours)')}
                        </div>
                        <div className="text-[13px] text-gray-500 mt-1">
                          {t('Đánh dấu nếu gia đình cần hỗ trợ trông giữ bé muộn hơn giờ đón thông thường — Nhà Văn hóa sẽ tư vấn phương án phù hợp.', 'Check this if you need assistance caring for your child past regular pickup times — we will consult you on available options.')}
                        </div>
                      </div>
                    </label>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('Mã giới thiệu (nếu có)', 'Referral code (optional)')}
                      </label>
                      <input
                        ref={referralCodeRef}
                        type="text"
                        defaultValue={autoRef}
                        onBlur={(e) => checkReferralCode(e.target.value)}
                        placeholder={t('Nhập mã của phụ huynh/học viên cũ để nhận ưu đãi học phí', "Enter a current parent's or student's code for a tuition discount")}
                        className={`w-full px-4 py-3 rounded-xl border transition-all bg-gray-50 focus:bg-white ${refState === 'valid' ? 'border-green-500 focus:ring-2 focus:ring-green-500/20' : refState === 'invalid' ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-gray-200 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue'}`}
                      />
                      {refState === 'checking' && (
                        <p className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold mt-2">
                          <Loader2 size={14} className="animate-spin" />
                          {t('Đang kiểm tra mã...', 'Checking code...')}
                        </p>
                      )}
                      {refState === 'valid' && (
                        <motion.div initial={{opacity: 0, y: -5}} animate={{opacity: 1, y: 0}} className="flex items-center justify-between p-3 mt-2 bg-green-50 border border-green-200 rounded-lg">
                          <p className="flex items-center gap-1.5 text-xs text-green-700 font-semibold">
                            <CheckCircle2 size={14} />
                            {t(`🎉 Mã hợp lệ của ${refData?.name}`, `🎉 Valid code by ${refData?.name}`)}
                          </p>
                          <span className="text-xs font-bold text-green-700 bg-green-200 px-2 py-1 rounded-md">
                            -{refData?.discount?.toLocaleString('vi-VN')}đ
                          </span>
                        </motion.div>
                      )}
                      {refState === 'invalid' && (
                        <p className="text-xs text-red-500 font-semibold mt-2">
                          {t('❌ Mã giới thiệu không hợp lệ. Vui lòng kiểm tra lại hoặc để trống.', '❌ Invalid referral code. Please check again or leave blank.')}
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
