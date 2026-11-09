import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Waves, Palette, HeartHandshake, FlaskConical, Check, X, BadgeCheck } from 'lucide-react';
import { SERVICES, WE_ARE, WE_ARE_NOT, PROCESS } from '../components/sections/ForSchoolsSection';
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
        <title>{t('Dịch vụ cho nhà trường | Huy Võ Education', 'Services for schools | Huy Võ Education')}</title>
        <meta
          name="description"
          content={t(
            'Huy Võ Education là đối tác ngoại khóa của nhà trường: CCA tại trường, cung ứng giáo viên và huấn luyện viên, field trip, khóa hè và kỹ năng sống. Năm lĩnh vực: thể thao, bơi lội, nghệ thuật, kỹ năng sống, STEM và sáng tạo.',
            "Huy Võ Education is the after-school partner for schools: on-campus CCA, instructor and coach staffing, field trips, summer camps and life skills across five activity areas."
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
            {t('Dịch vụ cho nhà trường', 'Services for schools')}
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight text-white">
            {t('Đối tác ngoại khóa của nhà trường', 'The after-school partner for schools')}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
            {t(
              'Một đầu mối chịu trách nhiệm từ đề xuất đến báo cáo. HVE nhận toàn bộ phần việc ngoại khóa: chọn hoạt động, giáo viên, ghi danh, vận hành lớp và báo cáo, để nhà trường chỉ cần duyệt và giám sát.',
              'One accountable partner from proposal to report. HVE takes on the whole after-school workload: activities, instructors, enrolment, delivery and reporting, so the school only approves and oversees.'
            )}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/#lien-he" className="inline-flex items-center gap-2 bg-white text-brand-blue hover:bg-brand-blue-tint font-heading font-bold px-7 py-3.5 rounded-full transition-colors">
              {t('Đăng ký làm đối tác', 'Become a partner school')} <ArrowRight size={18} />
            </Link>
            <a href="#linh-vuc" className="inline-flex items-center gap-2 border border-white/40 text-white hover:bg-white/10 font-heading font-semibold px-7 py-3.5 rounded-full transition-colors">
              {t('Xem 5 lĩnh vực hoạt động', 'See the 5 activity areas')}
            </a>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 60" className="w-full h-10 md:h-14" preserveAspectRatio="none">
            <path d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,32 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Four services */}
      <section className="pt-16 pb-6">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">{t('Bốn nhóm dịch vụ', 'Four services')}</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">{t('Nhà trường chọn một hoặc kết hợp nhiều dịch vụ, theo buổi, theo học kỳ hoặc theo năm học.', 'Schools choose one service or combine several, per session, semester or academic year.')}</p>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map(sv => (
              <motion.div key={sv.no} variants={fadeUp} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-brand-blue-tint text-brand-blue flex items-center justify-center"><sv.Icon size={22} /></div>
                  <span className="font-heading font-bold text-2xl text-gray-200">{sv.no}</span>
                </div>
                <h3 className="font-heading font-bold text-gray-900 mb-2">{t(sv.vi, sv.en)}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t(sv.descVi, sv.descEn)}</p>
              </motion.div>
            ))}
          </motion.div>
          <p className="mt-5 inline-flex items-center gap-2 text-sm text-gray-500">
            <BadgeCheck size={16} className="text-brand-green" />
            {t('Giấy phép kinh doanh lữ hành nội địa số 75-0079/2026/SVHTTDL-GP LHNĐ', 'Domestic tour operator licence No. 75-0079/2026/SVHTTDL-GP LHNĐ')}
          </p>
        </div>
      </section>

      {/* Overview of the five areas */}
      <section id="linh-vuc" className="pt-16 pb-6 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">{t('Năm lĩnh vực hoạt động', 'Five activity areas')}</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">{t('Hoạt động được chọn phù hợp với học sinh và cơ sở vật chất của từng trường. Mỗi khóa học có lộ trình, mục tiêu và đánh giá rõ ràng.', "Activities are matched to each school's students and facilities. Every course has a clear pathway, objectives and assessment.")}</p>
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
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-gray-900 mb-2">{t(a.vi, a.en)}</h3>
                    <p className="text-gray-600 leading-relaxed">{t(a.descVi, a.descEn)}</p>
                  </div>
                </motion.div>

                {groups.length > 0 ? (
                  <div className="space-y-10">
                    {groups.map(g => (
                      <div key={g.cat}>
                        {groups.length > 1 && (
                          <p className="text-sm font-bold uppercase tracking-wide text-brand-blue mb-4">{t(SUBGROUP[g.cat].vi, SUBGROUP[g.cat].en)}</p>
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
                    <Link to="/#lien-he" className="shrink-0 inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white font-heading font-semibold px-6 py-3 rounded-full transition-colors">
                      {t('Gửi yêu cầu', 'Send a brief')} <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* How we work */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-8">{t('Quy trình triển khai', 'Delivery process')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {PROCESS.map((pr, i) => (
              <div key={pr.vi} className="relative pl-14">
                <span className="absolute left-0 top-0 w-10 h-10 rounded-full bg-brand-blue text-white font-heading font-bold flex items-center justify-center">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-heading font-bold text-gray-900 mb-1">{t(pr.vi, pr.en)}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t(pr.dVi, pr.dEn)}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-7 border border-gray-100">
              <h3 className="font-heading font-bold text-gray-900 mb-4">{t('HVE là', 'What we are')}</h3>
              <ul className="space-y-3">{WE_ARE.map(w => <li key={w.vi} className="flex gap-3 text-gray-700"><Check size={20} className="text-brand-green shrink-0 mt-0.5" />{t(w.vi, w.en)}</li>)}</ul>
            </div>
            <div className="bg-white rounded-2xl p-7 border border-gray-100">
              <h3 className="font-heading font-bold text-gray-900 mb-4">{t('HVE không phải', 'What we are not')}</h3>
              <ul className="space-y-3">{WE_ARE_NOT.map(w => <li key={w.vi} className="flex gap-3 text-gray-700"><X size={20} className="text-gray-400 shrink-0 mt-0.5" />{t(w.vi, w.en)}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-3xl bg-brand-navy text-white p-8 md:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 brand-rule" aria-hidden="true" />
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">{t('Trở thành trường đối tác của HVE', 'Become an HVE partner school')}</h2>
              <p className="text-white/75 leading-relaxed">
                {t('Bắt đầu thí điểm với một học kỳ CCA, một đợt cung ứng giáo viên hoặc một chuyến field trip, rồi mở rộng khi nhà trường hài lòng.', 'Start with a pilot: one CCA semester, one staffing placement or one field trip, then scale once the school is satisfied.')}
              </p>
            </div>
            <Link to="/#lien-he" className="shrink-0 inline-flex items-center justify-center gap-2 bg-white text-brand-navy hover:bg-brand-blue-tint font-heading font-bold px-7 py-4 rounded-full transition-colors">
              {t('Đăng ký làm đối tác', 'Become a partner')} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
