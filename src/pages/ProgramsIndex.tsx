import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Waves, Palette, HeartHandshake, FlaskConical, School, Home, Sun, Bus } from 'lucide-react';
import { PROGRAMS, type Program } from '../data/programs';
import { IllustrationTag } from '../components/IllustrationTag';

const fadeUp: any = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};
const stagger: any = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

// The five activity areas listed in the HVE Company Profile 2026 (Service 01).
type Area = {
  id: string;
  Icon: React.ElementType;
  vi: string;
  en: string;
  descVi: string;
  descEn: string;
  categories?: Program['category'][];
  notesVi?: string[];
  notesEn?: string[];
};

const AREAS: Area[] = [
  {
    id: 'the-thao', Icon: Trophy, vi: 'Thể thao', en: 'Sports',
    descVi: 'Thể thao đồng đội và võ thuật theo lộ trình từng độ tuổi: rèn thể lực, kỷ luật và tinh thần đồng đội.',
    descEn: 'Team sports and martial arts on age-based pathways: fitness, discipline and team spirit.',
    categories: ['sports', 'martial-arts'],
  },
  {
    id: 'boi-loi', Icon: Waves, vi: 'Bơi lội', en: 'Swimming',
    descVi: 'Dạy bơi theo lộ trình từng độ tuổi; cam kết đầu ra áp dụng theo điều kiện của từng khóa.',
    descEn: 'Swimming on age-based pathways; outcome commitments apply per course terms.',
    notesVi: ['Học tại Campus Sunrise: hồ bơi và khu đào tạo tại xã Bình Minh', 'Lớp theo khóa cho học sinh, phụ huynh đăng ký trực tiếp hoặc nhà trường gửi theo nhóm'],
    notesEn: ['Taught at Sunrise campus: pool and training facility in Bình Minh', 'Courses open to parents directly or to school groups'],
  },
  {
    id: 'nghe-thuat', Icon: Palette, vi: 'Nghệ thuật', en: 'Arts',
    descVi: 'Nhảy hiện đại, trống nghi thức và nhạc cụ dân tộc: nuôi dưỡng sự tự tin và khả năng biểu đạt.',
    descEn: 'Modern dance, ceremonial drums and traditional instruments: confidence and self-expression.',
    categories: ['arts'],
  },
  {
    id: 'ky-nang-song', Icon: HeartHandshake, vi: 'Kỹ năng sống', en: 'Life skills',
    descVi: 'Giao tiếp, làm việc nhóm, tự lập và kỹ năng an toàn bản thân, theo khóa hoặc theo chuyên đề.',
    descEn: 'Communication, teamwork, independence and personal safety, by course or by theme.',
    notesVi: ['Khóa hè: chương trình cả ngày kết hợp thể thao, kỹ năng, nghệ thuật và trải nghiệm; có thể kèm đưa đón và bữa ăn', 'Field trip theo chủ đề: di sản, cộng đồng, nông nghiệp, văn hóa đọc, khám phá nghề nghiệp'],
    notesEn: ['Summer camps: full-day programmes combining sports, skills, arts and outings; transport and meals available', 'Themed field trips: heritage, community, agriculture, reading culture, career discovery'],
  },
  {
    id: 'stem', Icon: FlaskConical, vi: 'STEM và sáng tạo', en: 'STEM & creativity',
    descVi: 'Robotics, lắp ráp và các thử thách sáng tạo, rèn tư duy logic và kỹ năng giải quyết vấn đề.',
    descEn: 'Robotics, building and creative challenges that train logical thinking and problem solving.',
    notesVi: ['Khung chương trình và hồ sơ giáo viên được gửi nhà trường thẩm định trước khi triển khai'],
    notesEn: ['Curriculum framework and instructor profiles are sent to the school for review before launch'],
  },
];

const FORMATS = [
  { Icon: School, vi: 'CCA tại trường', en: 'On-campus CCA', dVi: 'Triển khai trọn gói ngay tại trường.', dEn: 'Run end-to-end at your school.' },
  { Icon: Home, vi: 'Lớp tại campus HVE', en: 'Classes at HVE campuses', dVi: 'Phụ huynh đăng ký trực tiếp cho con.', dEn: 'Parents enrol their children directly.' },
  { Icon: Sun, vi: 'Khóa hè', en: 'Summer camps', dVi: 'Cả ngày, có thể kèm đưa đón và bữa ăn.', dEn: 'Full day, transport and meals available.' },
  { Icon: Bus, vi: 'Field trip', en: 'Field trips', dVi: 'Theo giấy phép lữ hành nội địa của HVE.', dEn: "Under HVE's domestic tour licence." },
];

const SUBGROUP: Record<Program['category'], { vi: string; en: string }> = {
  sports: { vi: 'Thể thao đồng đội', en: 'Team sports' },
  'martial-arts': { vi: 'Võ thuật', en: 'Martial arts' },
  arts: { vi: 'Nghệ thuật & văn hóa', en: 'Arts & culture' },
};

const ProgramCard = ({ p, t }: { p: Program; t: any }) => (
  <motion.div variants={fadeUp}>
    <Link
      to={`/chuong-trinh/${p.slug}`}
      className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-brand-blue/10 overflow-hidden h-full transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
        <img
          src={p.img}
          alt={t(p.name.vi, p.name.en)}
          loading="lazy"
          className="w-full h-full object-cover object-[center_30%] group-hover:scale-[1.04] transition-transform duration-500"
        />
        <IllustrationTag t={t} />
      </div>
      <div className="p-6">
        <h4 className="font-heading font-bold text-lg text-gray-900 mb-1">{t(p.name.vi, p.name.en)}</h4>
        <p className="text-sm text-gray-500 mb-4">{t(p.tagline.vi, p.tagline.en)}</p>
        <div className="flex items-center justify-between text-xs text-gray-400 font-semibold">
          <span>{p.ageGroups} {t('tuổi', 'yrs')} · {p.sessions}</span>
          <ArrowRight size={16} className="text-brand-blue group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  </motion.div>
);

export const ProgramsIndex: React.FC = () => {
  const { t } = useOutletContext<any>() || { t: (vi: string) => vi };

  return (
    <div className="bg-white">
      <Helmet>
        <title>{t('Lĩnh vực hoạt động | Huy Võ Education', 'Activity areas | Huy Võ Education')}</title>
        <meta
          name="description"
          content={t(
            'Năm lĩnh vực hoạt động của Huy Võ Education: thể thao, bơi lội, nghệ thuật, kỹ năng sống, STEM và sáng tạo. Triển khai tại trường hoặc tại hệ thống campus HVE.',
            "Huy Võ Education's five activity areas: sports, swimming, arts, life skills, STEM and creativity. Delivered at schools or across HVE campuses."
          )}
        />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-32 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-blue-dark to-brand-navy" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }}
        />
        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p variants={fadeUp} className="uppercase tracking-widest text-xs font-bold text-brand-yellow mb-4">
            {t('5 lĩnh vực hoạt động', '5 activity areas')}
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight text-white">
            {t('Lĩnh vực hoạt động', 'Activity areas')}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
            {t(
              'HVE chọn hoạt động phù hợp với học sinh và cơ sở vật chất của từng trường, triển khai tại trường hoặc tại hệ thống campus của HVE. Mỗi khóa học có lộ trình, mục tiêu và đánh giá rõ ràng.',
              "HVE chooses activities that fit each school's students and facilities, delivered on campus or at HVE's own campuses. Every course has a clear pathway, objectives and assessment."
            )}
          </motion.p>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 60" className="w-full h-10 md:h-14" preserveAspectRatio="none">
            <path d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,32 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Overview of the five areas */}
      <section className="pt-14 pb-6">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {AREAS.map(a => (
              <motion.a
                key={a.id}
                variants={fadeUp}
                href={`#${a.id}`}
                className="group rounded-2xl border border-gray-100 bg-white p-5 hover:border-brand-blue/30 hover:shadow-lg hover:shadow-brand-blue/5 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-blue-tint text-brand-blue flex items-center justify-center mb-4 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  <a.Icon size={22} />
                </div>
                <p className="font-heading font-bold text-gray-900">{t(a.vi, a.en)}</p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* One block per area */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6 space-y-20">
          {AREAS.map((a, i) => {
            const groups = (a.categories || []).map(cat => ({ cat, items: PROGRAMS.filter(p => p.category === cat) }));
            return (
              <div key={a.id} id={a.id} className="scroll-mt-28">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex items-start gap-5 mb-8">
                  <span className="font-heading font-bold text-4xl text-brand-blue/20 leading-none pt-1">{String(i + 1).padStart(2, '0')}</span>
                  <div className="max-w-2xl">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">{t(a.vi, a.en)}</h2>
                    <p className="text-gray-600 leading-relaxed">{t(a.descVi, a.descEn)}</p>
                  </div>
                </motion.div>

                {groups.length > 0 ? (
                  <div className="space-y-10">
                    {groups.map(g => (
                      <div key={g.cat}>
                        {groups.length > 1 && (
                          <h3 className="text-sm font-bold uppercase tracking-wide text-brand-blue mb-4">{t(SUBGROUP[g.cat].vi, SUBGROUP[g.cat].en)}</h3>
                        )}
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {g.items.map(p => <ProgramCard key={p.slug} p={p} t={t} />)}
                        </motion.div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="rounded-2xl bg-brand-blue-tint/60 border border-brand-blue/10 p-7 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <ul className="space-y-3">
                      {(a.notesVi || []).map((n, j) => (
                        <li key={n} className="flex items-start gap-3 text-gray-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2.5 shrink-0" />
                          <span>{t(n, a.notesEn?.[j] || n)}</span>
                        </li>
                      ))}
                    </ul>
                    <a href="/#lien-he" className="shrink-0 inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white font-heading font-semibold px-6 py-3 rounded-full transition-colors">
                      {t('Nhận tư vấn', 'Get advice')} <ArrowRight size={16} />
                    </a>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Delivery formats */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-8">{t('Hình thức triển khai', 'How we deliver')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {FORMATS.map(f => (
              <div key={f.vi} className="rounded-2xl bg-white border border-gray-100 p-6">
                <f.Icon size={22} className="text-brand-blue mb-4" />
                <p className="font-heading font-bold text-gray-900 mb-1">{t(f.vi, f.en)}</p>
                <p className="text-sm text-gray-600">{t(f.dVi, f.dEn)}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/#phu-huynh" className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white font-heading font-semibold px-6 py-3 rounded-full transition-colors">
              {t('Phụ huynh: đăng ký tư vấn', 'Parents: request advice')} <ArrowRight size={16} />
            </a>
            <Link to="/#lien-he" className="inline-flex items-center gap-2 bg-white border border-brand-blue/30 text-brand-blue hover:bg-brand-blue-tint font-heading font-semibold px-6 py-3 rounded-full transition-colors">
              {t('Nhà trường: gửi yêu cầu', 'Schools: send a brief')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
