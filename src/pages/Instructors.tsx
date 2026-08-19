import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Users, X, Award, MapPin, User } from 'lucide-react';
import { INSTRUCTORS, type Instructor } from '../data/instructors';

const fadeUp: any = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const stagger: any = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const STATS = [
  { value: '9', vi: 'Gương mặt tiêu biểu', en: 'Featured instructors' },
  { value: '100+', vi: 'Năm kinh nghiệm cộng dồn', en: 'Combined years of experience' },
  { value: '6', vi: 'Bộ môn chuyên sâu', en: 'Specializations' },
];

export const Instructors: React.FC = () => {
  const { t } = useOutletContext<any>() || { t: (vi: string) => vi };
  const [active, setActive] = useState<Instructor | null>(null);

  return (
    <div className="bg-white">
      <Helmet>
        <title>{t('Đội ngũ giảng viên tiêu biểu | Huy Võ Education', 'Featured Instructors | Huy Võ Education')}</title>
        <meta
          name="description"
          content={t(
            'Đội ngũ giảng viên và huấn luyện viên xác thực của Huy Võ Education — Vovinam, Karate, Taekwondo, Bóng đá, Múa, Đàn bầu và hơn thế nữa.',
            "Huy Vo Education's verified instructors and coaches — Vovinam, Karate, Taekwondo, Football, Dance, Dan Bau, and more."
          )}
        />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-32 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A4A8F] via-brand-blue to-gray-900" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }}
        />
        <motion.div
          className="absolute -top-24 -left-20 w-[26rem] h-[26rem] rounded-full bg-brand-green/25 blur-[110px]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-32 -right-16 w-[30rem] h-[30rem] rounded-full bg-brand-yellow/20 blur-[120px]"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            variants={fadeUp}
            className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto mb-6"
          >
            <GraduationCap size={30} className="text-brand-yellow" />
          </motion.div>
          <motion.p variants={fadeUp} className="uppercase tracking-widest text-xs font-bold text-brand-yellow mb-4">
            {t('Đội ngũ Huy Võ Education', 'The Huy Vo Education Team')}
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight text-white">
            {t('Đội ngũ giảng viên tiêu biểu', 'Featured Instructors')}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-blue-100/90 leading-relaxed max-w-2xl mx-auto mb-3">
            {t(
              'Được tuyển chọn và xác minh chuyên môn cùng Đoàn TNCS Hồ Chí Minh và Nhà Văn Hóa Thanh Thiếu Nhi Đồng Nai — mỗi giảng viên đều công khai học vấn, kinh nghiệm và thành tích.',
              'Sourced and verified together with the Ho Chi Minh Communist Youth Union and the Dong Nai Youth Cultural House — every instructor publishes their education, experience, and achievements.'
            )}
          </motion.p>
          <motion.p variants={fadeUp} className="text-sm text-blue-100/70 leading-relaxed max-w-2xl mx-auto mb-10 italic">
            {t(
              'Dưới đây là một số gương mặt tiêu biểu — đội ngũ giảng viên và huấn luyện viên thực tế của Huy Võ Education còn đông đảo hơn nhiều.',
              'Below are a few featured faces — the actual team of instructors and coaches at Huy Vo Education is much larger.'
            )}
          </motion.p>

          <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {STATS.map((s, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl py-4 px-2">
                <p className="text-2xl md:text-3xl font-heading font-bold text-white">{s.value}</p>
                <p className="text-[11px] md:text-xs text-blue-100/80 mt-1 leading-tight">{t(s.vi, s.en)}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 60" className="w-full h-10 md:h-14" preserveAspectRatio="none">
            <path d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,32 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {INSTRUCTORS.map(ins => (
              <motion.button
                key={ins.slug}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                onClick={() => setActive(ins)}
                className="text-left group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-brand-blue/10 overflow-hidden transition-shadow duration-300"
              >
                <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {ins.photo ? (
                    <img
                      src={ins.photo}
                      alt={ins.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <User size={64} />
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <span className="inline-block bg-brand-yellow text-gray-900 text-[11px] font-bold px-2.5 py-1 rounded-full">
                      {t(ins.specializationTag.vi, ins.specializationTag.en)}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-lg text-gray-900 mb-0.5">{ins.name}</h3>
                  <p className="text-sm text-brand-blue font-semibold mb-3">{t(ins.title.vi, ins.title.en)}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Award size={13} /> {t(ins.experience.vi, ins.experience.en)}</span>
                    <span className="flex items-center gap-1"><Users size={13} /> {ins.learners} {t('tuổi', 'yrs')}</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Detail modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[88vh] overflow-y-auto shadow-2xl"
            >
              <div className="relative">
                <div className="h-40 bg-gradient-to-br from-brand-blue to-[#0A4A8F]" />
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-sm"
                >
                  <X size={18} />
                </button>
                <div className="absolute -bottom-14 left-8 w-28 h-28 rounded-2xl border-4 border-white shadow-lg bg-gray-100 overflow-hidden">
                  {active.photo ? (
                    <img src={active.photo} alt={active.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <User size={36} />
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-20 px-8 pb-8">
                <h3 className="text-2xl font-heading font-bold text-gray-900">{active.name}</h3>
                <p className="text-brand-blue font-semibold mb-4">{t(active.title.vi, active.title.en)}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {[
                    { label: t('Kinh nghiệm', 'Experience'), value: t(active.experience.vi, active.experience.en) },
                    { label: t('Học viên', 'Learners'), value: `${active.learners} ${t('tuổi', 'yrs')}` },
                    { label: t('Sĩ số lớp', 'Class size'), value: active.classSize },
                    { label: t('Năm sinh', 'Born'), value: String(active.yearOfBirth) },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
                      <p className="text-sm font-heading font-bold text-gray-900">{item.value}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{item.label}</p>
                    </div>
                  ))}
                </div>

                <p className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <MapPin size={15} className="text-brand-blue shrink-0" />
                  {t(active.currentPractice.vi, active.currentPractice.en)}
                </p>

                <p className="text-gray-600 leading-relaxed text-sm mb-6">{t(active.summary.vi, active.summary.en)}</p>

                {active.achievements.length > 0 && (
                  <div>
                    <h4 className="font-heading font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Award size={16} className="text-brand-yellow" /> {t('Thành tích nổi bật', 'Achievements')}
                    </h4>
                    <ul className="space-y-2">
                      {active.achievements.map((a, i) => (
                        <li key={i} className="text-sm text-gray-600 flex gap-2">
                          <span className="text-brand-blue mt-1">•</span>
                          <span>{t(a.vi, a.en)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
