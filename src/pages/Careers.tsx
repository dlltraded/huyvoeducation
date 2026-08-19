import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Heart,
  TrendingUp,
  Users2,
  Mail,
  PhoneCall,
  Sparkles,
  GraduationCap,
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

const VALUES = [
  {
    icon: Heart,
    color: 'from-rose-500 to-pink-400',
    vi: { title: 'Yêu trẻ, tận tâm', body: 'Mỗi thành viên đều đặt sự an toàn và phát triển của học viên lên hàng đầu trong từng buổi học.' },
    en: { title: 'Genuine care for children', body: 'Every team member puts student safety and growth first, in every single session.' },
  },
  {
    icon: TrendingUp,
    color: 'from-blue-500 to-cyan-400',
    vi: { title: 'Cơ hội phát triển chuyên môn', body: 'Được đào tạo nghiệp vụ sư phạm, tham gia các buổi chia sẻ chuyên môn định kỳ cùng đội ngũ giảng viên giàu kinh nghiệm.' },
    en: { title: 'Room to grow professionally', body: 'Ongoing pedagogy training and regular knowledge-sharing sessions with an experienced instructor team.' },
  },
  {
    icon: Users2,
    color: 'from-emerald-500 to-teal-400',
    vi: { title: 'Môi trường gắn kết', body: 'Làm việc trong một hệ sinh thái giáo dục năng động, nơi ý tưởng mới luôn được lắng nghe và ghi nhận.' },
    en: { title: 'A close-knit environment', body: 'Work inside a lively education ecosystem where new ideas are heard and valued.' },
  },
  {
    icon: Sparkles,
    color: 'from-amber-500 to-orange-400',
    vi: { title: 'Thu nhập cạnh tranh', body: 'Mức lương và thưởng theo hiệu quả giảng dạy, minh bạch và cạnh tranh so với mặt bằng chung.' },
    en: { title: 'Competitive compensation', body: 'Transparent, performance-based pay that stays competitive with the market.' },
  },
];

const ROLE_CATEGORIES = [
  { icon: '🥋', vi: 'Giảng viên Võ thuật (Vovinam, Võ cổ truyền, Taekwondo, Karate)', en: 'Martial arts instructors (Vovinam, traditional martial arts, Taekwondo, Karate)' },
  { icon: '⚽', vi: 'Huấn luyện viên Thể thao (Bóng đá, Bóng rổ)', en: 'Sports coaches (Football, Basketball)' },
  { icon: '💃', vi: 'Giảng viên Nghệ thuật (Múa hiện đại, Trống nghi thức, Đàn tranh – Đàn bầu)', en: 'Arts instructors (Modern dance, Ceremonial drums, Đàn tranh – Đàn bầu)' },
  { icon: '📋', vi: 'Nhân sự vận hành & Chăm sóc phụ huynh', en: 'Operations & parent-relations staff' },
];

export const Careers: React.FC = () => {
  const { t } = useOutletContext<any>() || { t: (vi: string) => vi };
  const { settings } = useSettings();
  const phoneNumber = settings?.phone || '0907828939';
  const email = settings?.email || 'info@huyvoeducation.com';

  return (
    <div className="bg-white overflow-hidden">
      <Helmet>
        <title>{t('Tuyển dụng | Huy Võ Education', 'Careers | Huy Võ Education')}</title>
        <meta
          name="description"
          content={t(
            'Gia nhập đội ngũ giảng viên và nhân sự của Huy Võ Education — hệ sinh thái giáo dục kỹ năng sống sau giờ học.',
            'Join the instructor and staff team at Huy Vo Education — an after-school life-skills education ecosystem.'
          )}
        />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-28 lg:pt-44 lg:pb-36 bg-gray-900 overflow-hidden">
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
            <Briefcase size={30} className="text-brand-yellow" />
          </motion.div>
          <motion.p variants={fadeUp} className="inline-flex items-center gap-1.5 uppercase tracking-widest text-xs font-bold text-brand-yellow mb-4">
            <Sparkles size={13} /> {t('Gia nhập đội ngũ', 'Join Our Team')}
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6 whitespace-pre-line">
            {t('Cùng Huy Võ Education\nđồng hành với thế hệ trẻ', "Grow the Next Generation\nWith Huy Vo Education")}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-blue-100/90 leading-relaxed max-w-2xl mx-auto">
            {t(
              'Chúng tôi luôn tìm kiếm những giảng viên, huấn luyện viên và nhân sự tận tâm để cùng xây dựng một môi trường giáo dục sau giờ học an toàn và truyền cảm hứng.',
              'We are always looking for dedicated instructors, coaches, and staff to help build a safe, inspiring after-school education environment.'
            )}
          </motion.p>
        </motion.div>
      </section>

      {/* Why work here */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t('Vì sao chọn Huy Võ Education?', 'Why Work at Huy Vo Education?')}
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {VALUES.map((v, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-4 shadow-md`}>
                  <v.icon size={22} className="text-white" />
                </div>
                <h3 className="font-heading font-bold text-gray-900 mb-2">{t(v.vi.title, v.en.title)}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t(v.vi.body, v.en.body)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Roles we look for */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-brand-blue px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
              <GraduationCap size={15} />
              {t('Vị trí thường xuyên tuyển', 'Roles We Regularly Hire For')}
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
              {t('Chúng tôi luôn chào đón', 'We Welcome')}
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid sm:grid-cols-2 gap-5"
          >
            {ROLE_CATEGORIES.map((r, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-start gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-5"
              >
                <span className="text-3xl leading-none">{r.icon}</span>
                <p className="text-gray-700 font-medium leading-relaxed">{t(r.vi, r.en)}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-gray-500 mt-8 italic"
          >
            {t(
              'Hiện chưa có tin tuyển dụng cụ thể nào đang mở — nhưng chúng tôi luôn tiếp nhận hồ sơ ứng tuyển cho các vị trí trên.',
              'No specific openings are posted right now — but we always welcome applications for the roles above.'
            )}
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-brand-blue to-[#0855A2] rounded-[2.5rem] shadow-2xl p-10 md:p-14 text-center text-white"
          >
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              {t('Gửi hồ sơ ứng tuyển', 'Send Us Your Application')}
            </h3>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              {t(
                'Vui lòng gửi CV kèm vị trí mong muốn qua email hoặc gọi trực tiếp hotline — đội ngũ tuyển dụng sẽ liên hệ lại sớm nhất.',
                'Send your CV along with the role you\'re interested in by email, or call our hotline directly — our team will get back to you soon.'
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${email}?subject=${encodeURIComponent(t('Ứng tuyển tại Huy Võ Education', 'Application to Huy Vo Education'))}`}
                className="flex items-center justify-center gap-2 bg-brand-yellow hover:bg-amber-400 text-gray-900 px-7 py-3.5 rounded-full font-heading font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <Mail size={18} /> {email}
              </a>
              <a
                href={`tel:${phoneNumber}`}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-7 py-3.5 rounded-full font-heading font-semibold transition-all"
              >
                <PhoneCall size={18} /> {phoneNumber}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
