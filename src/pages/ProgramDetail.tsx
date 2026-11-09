import React from 'react';
import { IllustrationTag } from '../components/IllustrationTag';
import { Link, useOutletContext, useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, CalendarDays, Users, CheckCircle2, MapPin, Wallet, Clock, Trophy, Shield, Palette } from 'lucide-react';
import { INSTRUCTORS } from '../data/instructors';
import { PROGRAMS, CATEGORIES } from '../data/programs';

const fadeUp: any = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};
// Lead instructors per programme (from the instructor profiles on this site).
const LEAD_INSTRUCTORS: Record<string, string[]> = {
  'bong-da': ['nguyen-le-hoang-phuc'],
  taekwondo: ['ha-truong-khanh'],
  karate: ['nguyen-nhat-truong'],
  vovinam: ['dinh-thien-long'],
  'nhay-hien-dai': ['truong-cong-khanh', 'nguyen-minh-tri'],
  'dan-tranh-dan-bau': ['phung-manh-phong'],
};

const stagger: any = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export const ProgramDetail: React.FC = () => {
  const { t } = useOutletContext<any>() || { t: (vi: string) => vi };
  const { slug } = useParams();
  const program = PROGRAMS.find(p => p.slug === slug);

  if (!program) return <Navigate to="/dich-vu#linh-vuc" replace />;

  return (
    <div className="bg-white">
      <Helmet>
        <title>{t(`${program.name.vi} | Huy Võ Education`, `${program.name.en} | Huy Võ Education`)}</title>
        <meta name="description" content={t(program.summary.vi, program.summary.en)} />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-32 bg-brand-navy overflow-hidden">
        <img
          src={program.img}
          alt={t(program.name.vi, program.name.en)}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/90 via-brand-blue-dark/90 to-brand-navy/95" />
        <IllustrationTag t={t} className="top-28 right-6 md:right-8" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }}
        />
        <motion.div
          className="absolute -top-24 -right-16 w-[26rem] h-[26rem] rounded-full bg-brand-blue-light/30 blur-[110px]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div variants={fadeUp}>
            <Link to="/dich-vu#linh-vuc" className="inline-flex items-center gap-1.5 text-sm text-white/80/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft size={15} /> {t('Lĩnh vực hoạt động', 'Activity areas')}
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto mb-6 text-white">
            {(() => { const Icon = program.category === 'arts' ? Palette : program.category === 'martial-arts' ? Shield : Trophy; return <Icon size={28} />; })()}
          </motion.div>
          <motion.p variants={fadeUp} className="uppercase tracking-widest text-xs font-bold text-brand-blue-soft mb-4">
            {t(CATEGORIES[program.category].vi, CATEGORIES[program.category].en)}
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-bold mb-4 leading-tight text-white">
            {t(program.name.vi, program.name.en)}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
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

          {/* Quick facts */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10">
            <h3 className="font-heading font-bold text-gray-900 mb-4">{t('Thông tin nhanh', 'Key facts')}</h3>
            <dl className="divide-y divide-gray-100 rounded-2xl border border-gray-100 overflow-hidden text-sm">
              {[
                { Icon: Users, k: t('Độ tuổi', 'Ages'), v: `${program.ageGroups} ${t('tuổi', 'years')}` },
                { Icon: CalendarDays, k: t('Thời lượng', 'Length'), v: program.sessions },
                { Icon: MapPin, k: t('Nơi học', 'Where'), v: t('Tại trường đối tác (CCA) hoặc tại campus HVE', 'At partner schools (CCA) or at HVE campuses') },
                { Icon: Clock, k: t('Lịch mở lớp', 'Schedule'), v: t('Theo học kỳ của từng trường; HVE gửi lịch cụ thể khi tư vấn', "Follows each school's term; HVE sends the exact timetable when advising") },
                { Icon: Wallet, k: t('Học phí', 'Fees'), v: t('Báo theo trường và hình thức học, gửi trước khi ba mẹ quyết định', 'Quoted per school and format, before you decide') },
              ].map(row => (
                <div key={row.k} className="grid grid-cols-[8.5rem_1fr] sm:grid-cols-[11rem_1fr] gap-3 px-5 py-3.5 bg-white">
                  <dt className="flex items-center gap-2 font-semibold text-gray-700"><row.Icon size={16} className="text-brand-blue shrink-0" />{row.k}</dt>
                  <dd className="text-gray-600">{row.v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Lead instructors */}
          {(LEAD_INSTRUCTORS[program.slug] || []).length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10">
              <h3 className="font-heading font-bold text-gray-900 mb-4">{t('Giảng viên phụ trách', 'Lead instructors')}</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {INSTRUCTORS.filter(i => LEAD_INSTRUCTORS[program.slug].includes(i.slug)).map(ins => (
                  <Link key={ins.slug} to="/doi-ngu-giang-vien" className="flex items-center gap-4 rounded-2xl border border-gray-100 p-3 hover:border-brand-blue/30 hover:shadow-md transition-all">
                    {ins.photo && <img src={ins.photo} alt={ins.name} loading="lazy" className="w-16 h-20 rounded-xl object-cover object-top shrink-0" />}
                    <div>
                      <p className="font-heading font-bold text-gray-900">{ins.name}</p>
                      <p className="text-sm text-brand-blue font-semibold">{t(ins.title.vi, ins.title.en)}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{t(ins.experience.vi, ins.experience.en)} {t('kinh nghiệm', 'experience')}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`/?mon=${program.slug}#phu-huynh`}
              className="inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white font-heading font-bold px-7 py-4 rounded-xl shadow-lg shadow-brand-blue/20 transition-all"
            >
              {t('Tìm lớp này cho con', 'Find this class for my child')}
            </a>
            <a
              href={`/?mon=${program.slug}#lien-he`}
              className="inline-flex items-center justify-center gap-2 bg-white border border-brand-blue/30 text-brand-blue hover:bg-brand-blue-tint font-heading font-bold px-7 py-4 rounded-xl transition-all"
            >
              {t('Nhà trường: triển khai môn này', 'Schools: run this programme')}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
