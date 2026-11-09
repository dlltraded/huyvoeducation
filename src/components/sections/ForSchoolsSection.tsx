import React from 'react';
import { motion } from 'framer-motion';
import { formatPhone, telHref } from '../../lib/phone';
import { School, Sun, Bus, UserCheck, Check, X, Phone, Mail, BadgeCheck } from 'lucide-react';

// Content mirrors the HVE Company Profile 2026 (services 01–04, "what we are / are not",
// delivery process and the pilot-first contact flow).

const SERVICES = [
  {
    no: '01',
    Icon: School,
    vi: 'CCA tại trường',
    en: 'On-campus CCA',
    descVi: 'Triển khai trọn gói chương trình ngoại khóa ngay tại trường: danh mục hoạt động, khung chương trình, giáo viên, ghi danh, vận hành lớp và báo cáo.',
    descEn: "Complete co-curricular programmes run on the school's own campus: activity list, curriculum, instructors, enrolment, delivery and reporting.",
  },
  {
    no: '02',
    Icon: Sun,
    vi: 'Kỹ năng sống, khóa hè và trung tâm thể thao',
    en: 'Life skills, summer camps and sports centres',
    descVi: 'Chương trình HVE tự tổ chức tại hệ thống campus, mở cho học sinh, phụ huynh và các nhóm từ nhà trường.',
    descEn: 'Programmes HVE runs itself across its campuses, open to students, parents and school groups.',
  },
  {
    no: '03',
    Icon: Bus,
    vi: 'Field trip và lữ hành giáo dục',
    en: 'Field trips & educational travel',
    descVi: 'Chuyến đi học tập trọn gói, từ mục tiêu bài học đến xe, an toàn và báo cáo, theo giấy phép lữ hành nội địa của chính HVE.',
    descEn: "End-to-end learning trips, from objectives to transport, safety and reporting, under HVE's own domestic tour operator licence.",
  },
  {
    no: '04',
    Icon: UserCheck,
    vi: 'Cung ứng giáo viên và huấn luyện viên',
    en: 'Instructor & coach staffing',
    descVi: 'Giáo viên, huấn luyện viên do HVE tuyển chọn, ký hợp đồng và quản lý; bố trí người thay thế theo thỏa thuận trong hợp đồng.',
    descEn: 'Instructors and coaches recruited, contracted and managed by HVE, with cover arranged as agreed in the contract.',
  },
];

const WE_ARE = [
  { vi: 'Đơn vị thiết kế và vận hành chương trình ngoại khóa', en: 'A designer and operator of after-school programmes' },
  { vi: 'Một đầu mối chịu trách nhiệm, từ đề xuất đến báo cáo', en: 'One accountable point of contact, from proposal to report' },
  { vi: 'Doanh nghiệp được cấp phép kinh doanh lữ hành nội địa', en: 'A licensed domestic tour operator' },
];

const WE_ARE_NOT = [
  { vi: 'Trung tâm dạy thêm các môn văn hóa', en: 'A cram school for academic subjects' },
  { vi: 'Đơn vị cho thuê lại lao động', en: 'A labour sub-leasing agency' },
  { vi: 'Đơn vị trung gian chỉ giới thiệu nhà cung cấp', en: 'A middleman that only refers suppliers' },
];

const PROCESS = [
  { vi: 'Khảo sát và đề xuất', en: 'Brief and proposal', dVi: 'Nắm nhu cầu, lịch học, không gian; đề xuất danh mục hoạt động.', dEn: 'Understand needs, timetable and spaces; propose an activity list.' },
  { vi: 'Hồ sơ chương trình', en: 'Programme dossier', dVi: 'Khung chương trình và hồ sơ giáo viên từng hoạt động để trường thẩm định.', dEn: 'Curriculum framework and instructor profile per activity for school review.' },
  { vi: 'Tư vấn và ghi danh', en: 'Advice and enrolment', dVi: 'Bàn thông tin, bàn ghi danh tại trường; thông tin rõ ràng cho phụ huynh.', dEn: 'Information and enrolment desks on campus; clear information for parents.' },
  { vi: 'Vận hành và báo cáo', en: 'Delivery and reporting', dVi: 'Đứng lớp, điểm danh, đánh giá tiến bộ, báo cáo định kỳ và cải tiến.', dEn: 'Teaching, attendance, progress reviews, regular reports and improvement.' },
];

export const ForSchoolsSection = ({ t, phone, email }: { t: any; phone: string; email?: string }) => {
  const tr = t || ((vi: string) => vi);

  return (
    <section id="nha-truong" className="py-24 bg-gray-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14"
        >
          <p className="uppercase tracking-widest text-xs font-bold text-brand-blue mb-4">
            {tr('Dành cho nhà trường', 'For schools')}
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-5">
            {tr('Đối tác ngoại khóa của nhà trường, học sinh và phụ huynh', 'The after-school partner for schools, students and parents')}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {tr(
              'Huy Võ Education thiết kế và vận hành những buổi chiều sau giờ học, tại trường công lập, trường quốc tế, trường song ngữ và tại chính hệ thống campus của HVE.',
              "Huy Võ Education designs and runs after-school afternoons at public, international and bilingual schools and across HVE's own campuses."
            )}
          </p>
        </motion.div>

        {/* Four services */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.no}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue-tint text-brand-blue flex items-center justify-center">
                  <s.Icon size={24} />
                </div>
                <span className="font-heading font-bold text-3xl text-gray-200">{s.no}</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-gray-900 mb-3">{tr(s.vi, s.en)}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{tr(s.descVi, s.descEn)}</p>
            </motion.div>
          ))}
        </div>

        {/* What we are / are not */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white rounded-3xl p-8 border border-gray-100">
            <h3 className="font-heading font-bold text-lg text-gray-900 mb-5">{tr('HVE là', 'What we are')}</h3>
            <ul className="space-y-3">
              {WE_ARE.map(item => (
                <li key={item.vi} className="flex items-start gap-3 text-gray-700">
                  <Check size={20} className="text-brand-green shrink-0 mt-0.5" />
                  <span>{tr(item.vi, item.en)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-gray-100">
            <h3 className="font-heading font-bold text-lg text-gray-900 mb-5">{tr('HVE không phải', 'What we are not')}</h3>
            <ul className="space-y-3">
              {WE_ARE_NOT.map(item => (
                <li key={item.vi} className="flex items-start gap-3 text-gray-700">
                  <X size={20} className="text-gray-400 shrink-0 mt-0.5" />
                  <span>{tr(item.vi, item.en)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Delivery process */}
        <h3 className="font-heading font-bold text-xl text-gray-900 mb-6">{tr('Quy trình triển khai', 'Delivery process')}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {PROCESS.map((p, i) => (
            <div key={p.vi} className="relative pl-14">
              <span className="absolute left-0 top-0 w-10 h-10 rounded-full bg-brand-blue text-white font-heading font-bold flex items-center justify-center">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h4 className="font-heading font-bold text-gray-900 mb-1">{tr(p.vi, p.en)}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{tr(p.dVi, p.dEn)}</p>
            </div>
          ))}
        </div>

        {/* Contact CTA for schools */}
        <div className="rounded-3xl bg-brand-blue text-white p-8 md:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h3 className="font-heading font-bold text-2xl md:text-3xl mb-3">
              {tr('Hãy cùng viết tiếp phần sau tiếng chuông', 'Let us write what comes after the bell, together')}
            </h3>
            <p className="text-white/80 leading-relaxed">
              {tr(
                'Gửi mục tiêu, khối lớp và thời gian của nhà trường. HVE khảo sát, đề xuất phương án và báo giá. Có thể bắt đầu thí điểm với một học kỳ CCA hoặc một chuyến đi trước khi mở rộng.',
                "Send us your objectives, grades and timing. HVE reviews the site and proposes a plan and quotation. Start with one CCA semester or one trip before scaling."
              )}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-white/80">
              <BadgeCheck size={16} className="text-brand-yellow" />
              {tr('Giấy phép kinh doanh lữ hành nội địa số 75-0079/2026/SVHTTDL-GP LHNĐ', 'Domestic tour operator licence No. 75-0079/2026/SVHTTDL-GP LHNĐ')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <a href="#lien-he" className="inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-[#46993F] text-white font-heading font-bold px-6 py-3 rounded-full transition-colors">
              {tr('Gửi yêu cầu cho HVE', 'Send a brief to HVE')}
            </a>
            <a href={telHref(phone)} className="inline-flex items-center justify-center gap-2 bg-white hover:bg-brand-blue-tint text-brand-blue font-heading font-bold px-6 py-3 rounded-full transition-colors">
              <Phone size={18} /> {formatPhone(phone)}
            </a>
            {email && (
              <a href={`mailto:${email}`} className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 font-heading font-semibold px-6 py-3 rounded-full transition-colors">
                <Mail size={18} /> {email}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
