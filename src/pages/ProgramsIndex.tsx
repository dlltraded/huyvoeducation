import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PROGRAMS, CATEGORIES, type Program } from '../data/programs';

const fadeUp: any = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};
const stagger: any = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const CATEGORY_ORDER: Program['category'][] = ['sports', 'martial-arts', 'arts'];
const CATEGORY_COLOR: Record<Program['category'], string> = {
  sports: 'from-blue-500 to-cyan-400',
  'martial-arts': 'from-red-500 to-orange-400',
  arts: 'from-violet-500 to-fuchsia-400',
};

export const ProgramsIndex: React.FC = () => {
  const { t } = useOutletContext<any>() || { t: (vi: string) => vi };

  return (
    <div className="bg-white">
      <Helmet>
        <title>{t('Chương trình học | Huy Võ Education', 'Programs | Huy Võ Education')}</title>
        <meta
          name="description"
          content={t(
            'Toàn bộ chương trình đào tạo tại Huy Võ Education — thể thao, võ thuật và nghệ thuật, xây dựng bài bản theo từng độ tuổi.',
            "All of Huy Vo Education's training programs — sports, martial arts, and the arts, structured for every age group."
          )}
        />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-32 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-[#0A4A8F] to-gray-900" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }}
        />
        <motion.div
          className="absolute -top-28 -right-16 w-[28rem] h-[28rem] rounded-full bg-brand-yellow/20 blur-[110px]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p variants={fadeUp} className="inline-flex items-center gap-1.5 uppercase tracking-widest text-xs font-bold text-brand-yellow mb-4">
            <Sparkles size={13} /> {t('9 bộ môn đào tạo bài bản', '9 Structured Training Programs')}
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight text-white">
            {t('Chương trình học', 'Our Programs')}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-blue-100/90 leading-relaxed max-w-2xl mx-auto">
            {t(
              'Từ thể thao đồng đội, võ thuật đến nghệ thuật truyền thống — mỗi chương trình đều có giáo án riêng theo độ tuổi, do đội ngũ giảng viên xác thực trực tiếp giảng dạy.',
              'From team sports and martial arts to traditional arts — every program has its own age-appropriate curriculum, taught directly by our verified instructors.'
            )}
          </motion.p>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 60" className="w-full h-10 md:h-14" preserveAspectRatio="none">
            <path d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,32 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Grouped grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          {CATEGORY_ORDER.map(cat => {
            const items = PROGRAMS.filter(p => p.category === cat);
            return (
              <div key={cat}>
                <motion.h2
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="text-xl md:text-2xl font-heading font-bold text-gray-900 mb-6 flex items-center gap-3"
                >
                  <span className={`w-2 h-7 rounded-full bg-gradient-to-b ${CATEGORY_COLOR[cat]}`} />
                  {t(CATEGORIES[cat].vi, CATEGORIES[cat].en)}
                </motion.h2>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={stagger}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {items.map(p => (
                    <motion.div key={p.slug} variants={fadeUp}>
                      <Link
                        to={`/chuong-trinh/${p.slug}`}
                        className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-brand-blue/10 overflow-hidden h-full transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="aspect-[16/10] relative overflow-hidden">
                          <img
                            src={p.img}
                            alt={t(p.name.vi, p.name.en)}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <div className={`absolute bottom-3 left-3 w-11 h-11 rounded-xl bg-gradient-to-br ${CATEGORY_COLOR[cat]} flex items-center justify-center text-xl shadow-md`}>
                            {p.icon}
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="font-heading font-bold text-lg text-gray-900 mb-1">{t(p.name.vi, p.name.en)}</h3>
                          <p className="text-sm text-gray-500 mb-4">{t(p.tagline.vi, p.tagline.en)}</p>
                          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold">
                            <span>{p.ageGroups} {t('tuổi', 'yrs')} · {p.sessions}</span>
                            <ArrowRight size={16} className="text-brand-blue group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
