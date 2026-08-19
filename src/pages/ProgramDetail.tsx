import React from 'react';
import { Link, useOutletContext, useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, CalendarDays, Users, CheckCircle2 } from 'lucide-react';
import { PROGRAMS, CATEGORIES } from '../data/programs';

const fadeUp: any = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};
const stagger: any = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export const ProgramDetail: React.FC = () => {
  const { t } = useOutletContext<any>() || { t: (vi: string) => vi };
  const { slug } = useParams();
  const program = PROGRAMS.find(p => p.slug === slug);

  if (!program) return <Navigate to="/chuong-trinh" replace />;

  return (
    <div className="bg-white">
      <Helmet>
        <title>{t(`${program.name.vi} | Huy Võ Education`, `${program.name.en} | Huy Võ Education`)}</title>
        <meta name="description" content={t(program.summary.vi, program.summary.en)} />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-32 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-[#0A4A8F] to-gray-900" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }}
        />
        <motion.div
          className="absolute -top-24 -right-16 w-[26rem] h-[26rem] rounded-full bg-brand-yellow/20 blur-[110px]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div variants={fadeUp}>
            <Link to="/chuong-trinh" className="inline-flex items-center gap-1.5 text-sm text-blue-100/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft size={15} /> {t('Tất cả chương trình', 'All programs')}
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto mb-6 text-3xl">
            {program.icon}
          </motion.div>
          <motion.p variants={fadeUp} className="uppercase tracking-widest text-xs font-bold text-brand-yellow mb-4">
            {t(CATEGORIES[program.category].vi, CATEGORIES[program.category].en)}
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-bold mb-4 leading-tight text-white">
            {t(program.name.vi, program.name.en)}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-blue-100/90 leading-relaxed max-w-2xl mx-auto">
            {t(program.tagline.vi, program.tagline.en)}
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mt-8 flex-wrap">
            <span className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 text-sm text-white">
              <Users size={15} /> {program.ageGroups} {t('tuổi', 'yrs old')}
            </span>
            <span className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 text-sm text-white">
              <CalendarDays size={15} /> {program.sessions}
            </span>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 60" className="w-full h-10 md:h-14" preserveAspectRatio="none">
            <path d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,32 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
              {t('Về chương trình', 'About this program')}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-10">{t(program.summary.vi, program.summary.en)}</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="bg-gray-50 rounded-2xl p-8 mb-10"
          >
            <h3 className="font-heading font-bold text-gray-900 mb-5">{t('Điểm nổi bật', 'Highlights')}</h3>
            <ul className="space-y-3">
              {program.highlights.map((h, i) => (
                <motion.li key={i} variants={fadeUp} className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle2 size={18} className="text-brand-green shrink-0 mt-0.5" />
                  <span>{t(h.vi, h.en)}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
            <a
              href="/#register"
              className="inline-flex items-center gap-2 bg-brand-blue hover:bg-blue-700 text-white font-heading font-bold px-8 py-4 rounded-xl shadow-lg shadow-brand-blue/30 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              {t('Đăng ký tư vấn chương trình này', 'Register interest in this program')}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
