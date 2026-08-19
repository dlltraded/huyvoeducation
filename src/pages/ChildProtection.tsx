import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Users,
  Eye,
  MessageCircleWarning,
  UserCheck,
  PhoneCall,
  Mail,
  Sparkles,
} from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const fadeUp: any = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger: any = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const PRINCIPLES = [
  {
    icon: Users,
    color: 'from-blue-500 to-cyan-400',
    vi: {
      title: 'Ứng xử đúng mực với trẻ',
      body: 'Toàn bộ giảng viên, huấn luyện viên và nhân viên cam kết tuân thủ bộ quy tắc ứng xử: không ở một mình với một học viên trong không gian kín, luôn có ít nhất 2 người lớn giám sát mỗi lớp học hoặc buổi tập.',
    },
    en: {
      title: 'Appropriate conduct with children',
      body: 'Every instructor, coach, and staff member follows a code of conduct: no one-on-one time with a single student in a closed space, and at least two adults present to supervise every class or training session.',
    },
  },
  {
    icon: Eye,
    color: 'from-emerald-500 to-teal-400',
    vi: {
      title: 'Giám sát trong suốt buổi học',
      body: 'Phụ huynh có thể quan sát một phần buổi học qua khu vực chờ hoặc theo lịch mở cửa tham quan lớp, thay vì lớp học hoàn toàn khép kín.',
    },
    en: {
      title: 'Visible supervision at all times',
      body: 'Parents can observe part of a class from the waiting area or during scheduled open-class visits, rather than fully closed-door sessions.',
    },
  },
  {
    icon: UserCheck,
    color: 'from-violet-500 to-purple-400',
    vi: {
      title: 'Xác minh giảng viên trước khi đứng lớp',
      body: 'Mỗi giảng viên được xác minh chuyên môn, kinh nghiệm và đơn vị công tác trước khi được nhận lớp — hồ sơ giảng viên tại Huy Võ Education công khai học vấn, kinh nghiệm và thành tích để phụ huynh tham khảo trước khi đăng ký.',
    },
    en: {
      title: 'Instructors are verified before teaching',
      body: "Every instructor's qualifications, experience, and current workplace are checked before they are assigned a class — Huy Vo Education's instructor profiles are made public so parents can review them before enrolling.",
    },
  },
  {
    icon: MessageCircleWarning,
    color: 'from-amber-500 to-orange-400',
    vi: {
      title: 'Kênh báo cáo sự cố rõ ràng',
      body: 'Bất kỳ phụ huynh, học viên hay nhân viên nào phát hiện hành vi không phù hợp đều có thể báo cáo trực tiếp qua hotline hoặc email bên dưới. Mọi phản ánh được xử lý nghiêm túc và bảo mật thông tin người báo cáo.',
    },
    en: {
      title: 'A clear channel to raise concerns',
      body: 'Any parent, student, or staff member who notices inappropriate behavior can report it directly through the hotline or email below. Every report is taken seriously and the reporter\'s identity is kept confidential.',
    },
  },
];

export const ChildProtection: React.FC = () => {
  const { t } = useOutletContext<any>() || { t: (vi: string) => vi };
  const { settings } = useSettings();

  return (
    <div className="bg-white overflow-hidden">
      <Helmet>
        <title>
          {t(
            'Chính sách bảo vệ trẻ em | Huy Võ Education',
            'Child Protection & Safeguarding | Huy Võ Education'
          )}
        </title>
        <meta
          name="description"
          content={t(
            'Cam kết an toàn và chính sách bảo vệ trẻ em của Huy Võ Education dành cho học viên, phụ huynh và giảng viên.',
            "Huy Vo Education's safety commitment and child protection policy for students, parents, and instructors."
          )}
        />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-28 lg:pt-44 lg:pb-36 bg-gray-900 overflow-hidden">
        {/* decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-[#0A4A8F] to-gray-900" />
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }} />
        <motion.div
          className="absolute -top-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-brand-yellow/20 blur-[100px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-24 w-[32rem] h-[32rem] rounded-full bg-brand-green/20 blur-[120px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative max-w-4xl mx-auto px-6 text-center"
        >
          <motion.div
            variants={fadeUp}
            className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-black/20"
          >
            <ShieldCheck size={30} className="text-brand-yellow" />
          </motion.div>
          <motion.p variants={fadeUp} className="inline-flex items-center gap-1.5 uppercase tracking-widest text-xs font-bold text-brand-yellow mb-4">
            <Sparkles size={13} /> {t('Cam kết an toàn', 'Our Safety Commitment')}
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight text-white">
            {t('Chính sách bảo vệ trẻ em', 'Child Protection & Safeguarding')}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-blue-100/90 leading-relaxed max-w-2xl mx-auto">
            {t(
              'Tại Huy Võ Education, sự an toàn và phúc lợi của học viên luôn là ưu tiên hàng đầu trong mọi hoạt động — từ lớp học, buổi tập cho đến các sự kiện ngoại khóa.',
              'At Huy Vo Education, the safety and wellbeing of every student is our top priority — in every class, every training session, and every extracurricular event.'
            )}
          </motion.p>
        </motion.div>

        {/* wave divider */}
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 60" className="w-full h-10 md:h-14" preserveAspectRatio="none">
            <path d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,32 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Scope */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
        className="py-16 border-b border-gray-100"
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
            {t('Phạm vi áp dụng', 'Who this policy applies to')}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {t(
              'Chính sách này áp dụng cho toàn bộ học viên, phụ huynh, giảng viên, huấn luyện viên, nhân viên và khách tham quan tại tất cả các cơ sở và hoạt động do Huy Võ Education tổ chức, bao gồm cả các hoạt động phối hợp với Nhà Văn Hóa Thanh Thiếu Nhi và các đơn vị đối tác.',
              "This policy applies to all students, parents, instructors, coaches, staff, and visitors at every facility and activity run by Huy Vo Education, including activities run jointly with the Youth Cultural House and partner organizations."
            )}
          </p>
        </div>
      </motion.section>

      {/* Principles */}
      <section className="py-20 md:py-24 bg-gray-50 relative">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-12 text-center"
          >
            {t('Các nguyên tắc cốt lõi', 'Core principles')}
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-6"
          >
            {PRINCIPLES.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-brand-blue/5 p-8 transition-shadow duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-gray-900 mb-2">
                    {t(p.vi.title, p.en.title)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {t(p.vi.body, p.en.body)}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Note on ongoing work */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="py-16"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative overflow-hidden bg-amber-50 border border-amber-200 rounded-2xl p-8">
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-amber-200/40 blur-2xl" />
            <h3 className="relative font-heading font-bold text-gray-900 mb-2">
              {t('Tài liệu chính sách đầy đủ', 'Full policy document')}
            </h3>
            <p className="relative text-gray-600 leading-relaxed text-sm">
              {t(
                'Huy Võ Education đang hoàn thiện văn bản chính sách bảo vệ trẻ em đầy đủ, bao gồm quy trình xác minh lý lịch giảng viên và quy trình xử lý sự cố chi tiết. Quý phụ huynh cần bản đầy đủ vui lòng liên hệ trực tiếp theo thông tin bên dưới.',
                "Huy Vo Education is finalizing the full child protection policy document, including our detailed instructor vetting and incident-response procedures. Parents who need the complete document are welcome to contact us directly using the details below."
              )}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Reporting / contact */}
      <section className="relative py-20 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#141428] to-gray-900" />
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-[20rem] rounded-full bg-brand-blue/20 blur-[110px]"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="relative max-w-4xl mx-auto px-6 text-center"
        >
          <motion.h2 variants={fadeUp} className="text-2xl font-heading font-bold mb-4 text-white">
            {t('Cần báo cáo một mối lo ngại?', 'Need to report a concern?')}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-300 mb-8">
            {t(
              'Đừng ngần ngại liên hệ với chúng tôi bất cứ lúc nào. Mọi thông tin được bảo mật.',
              "Please don't hesitate to reach out anytime. All information is kept confidential."
            )}
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-2 bg-white text-gray-900 font-heading font-bold px-6 py-3 rounded-xl hover:-translate-y-0.5 hover:shadow-xl transition-all"
            >
              <PhoneCall size={18} /> {settings.phone}
            </a>
            <a
              href={`mailto:${settings.email}`}
              className="flex items-center gap-2 border border-white/30 text-white font-heading font-bold px-6 py-3 rounded-xl hover:bg-white/10 hover:-translate-y-0.5 transition-all"
            >
              <Mail size={18} /> {settings.email}
            </a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};
