import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ShieldCheck, PhoneCall, Mail, Waves, Bus, MessageSquare, Siren, HeartPulse } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { formatPhone, telHref } from '../lib/phone';

// Content: "Cam kết Bảo vệ Trẻ em" — summary for families and partners of the
// HVE Child Protection Policy (HVE-POL-01). Wording kept close to the source.

const fadeUp: any = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};
const stagger: any = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const COMMITMENTS = [
  {
    vi: 'An toàn đặt trước mọi thứ khác', en: 'Safety comes before everything else',
    dVi: 'Khi an toàn của trẻ và tiến độ chương trình, thành tích hay sự thuận tiện vận hành mâu thuẫn nhau, chúng tôi chọn an toàn. Không có ngoại lệ nào đáng để đánh đổi.',
    dEn: "When a child's safety conflicts with programme schedules, results or operational convenience, we choose safety. No exception is worth the trade.",
  },
  {
    vi: 'Trẻ được tôn trọng, không bị hạ thấp', en: 'Children are respected, never diminished',
    dVi: 'Chúng tôi không dùng đòn roi, không phạt bằng tập luyện quá sức, không dùng lời lẽ miệt thị hay so sánh làm trẻ xấu hổ trước bạn bè. Kỷ luật ở Huy Võ là nhắc nhở, giải thích và đồng hành.',
    dEn: 'We do not use physical punishment, punitive over-exercise, or belittling words and comparisons that shame a child in front of peers. Discipline here means reminding, explaining and walking alongside.',
  },
  {
    vi: 'Mỗi buổi học đều có người chịu trách nhiệm', en: 'Every session has someone accountable',
    dVi: 'Mọi hoạt động đều có giáo viên hoặc huấn luyện viên phụ trách rõ ràng. Với hoạt động dưới nước, luôn có nhân viên cứu hộ trực và người có chứng nhận sơ cấp cứu trong khu vực.',
    dEn: 'Every activity has a clearly assigned teacher or coach. For water-based activities, a lifeguard is always on duty and a first-aid-certified staff member is present in the area.',
  },
  {
    vi: 'Trẻ chỉ về với đúng người của gia đình', en: 'Children go home only with the right person',
    dVi: 'Chúng tôi chỉ bàn giao học viên cho cha mẹ hoặc người đã được gia đình đăng ký. Khi chưa chắc chắn, chúng tôi giữ trẻ lại và gọi cho gia đình, kể cả khi điều đó khiến ai đó phải chờ.',
    dEn: 'We release a learner only to a parent or a person the family has registered. When in doubt, we keep the child and call the family, even if that means someone has to wait.',
  },
  {
    vi: 'Hình ảnh của con là của gia đình', en: "Your child's image belongs to your family",
    dVi: 'Chúng tôi chỉ đăng hình ảnh học viên khi gia đình đã đồng ý. Anh chị có thể thay đổi quyết định bất kỳ lúc nào và chúng tôi sẽ gỡ bỏ. Chúng tôi không đăng kèm thông tin nhận dạng chi tiết của trẻ.',
    dEn: "We publish images of a learner only with the family's consent. You may change your mind at any time and we will remove them. We never publish detailed identifying information alongside a child's image.",
  },
  {
    vi: 'Mọi băn khoăn đều được trả lời', en: 'Every concern gets an answer',
    dVi: 'Không có băn khoăn nào là quá nhỏ. Mỗi phản ánh đều được ghi nhận, xem xét và phản hồi lại cho gia đình, kể cả khi kết quả cho thấy đó là một hiểu lầm.',
    dEn: 'No concern is too small. Every report is recorded, reviewed and answered back to the family, including when it turns out to have been a misunderstanding.',
  },
];

const PRACTICES = [
  {
    Icon: Waves, vi: 'Trong lớp và tại hồ bơi', en: 'In class and at the pool',
    items: [
      ['Lớp học diễn ra ở không gian mở, dễ quan sát. Khi cần trao đổi riêng với một học viên, giáo viên chọn nơi người khác nhìn thấy được và không đóng kín cửa.', 'Classes take place in open, observable spaces. When a teacher needs to speak privately with a learner, they choose a spot others can see and do not close the door.'],
      ['Số lượng học viên mỗi lớp được giới hạn theo độ tuổi và trình độ. Chúng tôi không nhận thêm quá số lượng đó, kể cả khi được đề nghị.', 'Class sizes are capped by age and level. We do not take on more than that number, even when asked to.'],
      ['Khi hướng dẫn kỹ thuật bơi cần chạm vào học viên, giáo viên nói trước cho con biết, chỉ chạm ở mức cần thiết và luôn ở nơi có người khác nhìn thấy.', 'Where swimming instruction requires touch, the teacher tells the child first, keeps it to what is necessary, and always does so in view of others.'],
      ['Học viên được điểm danh khi xuống nước và khi lên bờ. Không có trẻ nào ở khu vực hồ mà không có người lớn trông.', 'Learners are counted in and out of the water. No child is in the pool area without an adult watching.'],
    ],
  },
  {
    Icon: Bus, vi: 'Khi đưa đón và đi lại', en: 'Getting to and from class',
    items: [
      ['Con chưa được đón sẽ ngồi ở khu vực chờ có người trông, không tự ra khỏi cổng. Đội ngũ chỉ rời vị trí khi học viên cuối cùng đã về với gia đình.', 'A child not yet collected waits in a supervised area and does not leave the gate alone. Staff stay on duty until the last learner has gone home.'],
      ['Nếu vì lý do đột xuất mà cần đưa học viên bằng xe cá nhân, giáo viên chỉ làm khi gia đình đã đồng ý và đã báo cho quản lý cơ sở biết.', "If an unexpected situation means a learner must be driven in a personal vehicle, the teacher does so only with the family's agreement and after informing site management."],
      ['Với hoạt động ngoài cơ sở (dã ngoại, thi đấu, trại hè), chúng tôi gửi kế hoạch trước, xin đồng ý của gia đình và điểm danh mỗi lần lên xuống xe.', 'For off-site activities (excursions, competitions, camps) we share the plan in advance, obtain family consent, and take a headcount at every boarding and alighting.'],
    ],
  },
  {
    Icon: MessageSquare, vi: 'Khi liên lạc và chia sẻ hình ảnh', en: 'Communication and photos',
    items: [
      ['Chúng tôi trao đổi với gia đình qua nhóm lớp hoặc số Zalo công việc của cơ sở, để mọi thông tin đều rõ ràng và có thể tra lại.', "We communicate with families through the class group or the site's work Zalo number, so that everything is clear and traceable."],
      ['Với học viên dưới 16 tuổi, giáo viên không nhắn tin riêng một–một mà trao đổi qua cha mẹ.', 'For learners under 16, teachers do not message one-to-one but communicate through the parents.'],
      ['Hình ảnh học viên được chụp bằng thiết bị của cơ sở và chỉ đăng khi gia đình đã đồng ý. Chúng tôi không đăng ảnh học viên mặc đồ bơi ở góc chụp không phù hợp.', 'Photos are taken on site-owned devices and published only with family consent. We do not publish images of learners in swimwear from inappropriate angles.'],
      ['Trong phòng thay đồ và nhà vệ sinh, tuyệt đối không sử dụng điện thoại hay thiết bị ghi hình. Quy định này áp dụng cho tất cả mọi người.', 'In changing rooms and toilets, phones and recording devices are never used. This applies to everyone, without exception.'],
    ],
  },
];

const CONCERN_STEPS = [
  ['Nói với giáo viên phụ trách hoặc quản lý cơ sở. Phần lớn mọi việc được giải quyết ngay tại bước này.', 'Speak to the teacher in charge or the site manager. Most matters are resolved right here.'],
  ['Nếu chưa yên tâm, liên hệ Người phụ trách bảo vệ trẻ em của cơ sở. Chúng tôi ghi nhận và xem xét trong vòng 48 giờ.', "If you are still uneasy, contact the site's Child Protection Officer. We record the matter and review it within 48 hours."],
  ['Chúng tôi phản hồi lại kết quả cho gia đình. Với những việc vượt thẩm quyền của trung tâm, chúng tôi phối hợp với cơ quan chức năng và thông báo cho gia đình.', 'We report the outcome back to you. Where a matter goes beyond what the centre can handle, we work with the authorities and keep you informed.'],
];

export const ChildProtection: React.FC = () => {
  const { t } = useOutletContext<any>() || { t: (vi: string) => vi };
  const { settings } = useSettings();

  return (
    <div className="bg-white">
      <Helmet>
        <title>{t('Chính sách bảo vệ trẻ em | Huy Võ Education', 'Child Protection Policy | Huy Võ Education')}</title>
        <meta
          name="description"
          content={t(
            'Sáu cam kết bảo vệ trẻ em của Huy Võ Education, cách đội ngũ làm việc trong lớp, tại hồ bơi, khi đưa đón và chia sẻ hình ảnh, và quy trình tiếp nhận phản ánh trong 48 giờ.',
            "Huy Võ Education's six child protection commitments, how our team works in class, at the pool, at pick-up and with photos, and how concerns are reviewed within 48 hours."
          )}
        />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-32 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-blue-dark to-brand-navy" />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div variants={fadeUp} className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={30} className="text-white" />
          </motion.div>
          <motion.p variants={fadeUp} className="uppercase tracking-widest text-xs font-bold text-brand-blue-soft mb-4">
            {t('HVE-POL-01 · Áp dụng từ 01/06/2026', 'HVE-POL-01 · Effective 1 June 2026')}
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight text-white">
            {t('Chính sách bảo vệ trẻ em', 'Child Protection Policy')}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-white/80 leading-relaxed">
            {t(
              'Khi một đứa trẻ bước vào cơ sở của chúng tôi, điều đầu tiên gia đình gửi gắm không phải là kỳ vọng về thành tích mà là sự an tâm. Chúng tôi xem đây là trách nhiệm lớn nhất của mình, và là điều chúng tôi thực hành mỗi ngày.',
              'When a child walks into one of our sites, the first thing a family entrusts to us is not an expectation of results, it is peace of mind. We treat it as our greatest responsibility, and it is what we practise every day.'
            )}
          </motion.p>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 60" className="w-full h-10 md:h-14" preserveAspectRatio="none">
            <path d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,32 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Six commitments */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-8">{t('Sáu cam kết của chúng tôi', 'Our six commitments')}</h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMMITMENTS.map((c, i) => (
              <motion.div key={c.vi} variants={fadeUp} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <span className="inline-flex w-9 h-9 rounded-full bg-brand-blue text-white font-heading font-bold text-sm items-center justify-center mb-4">{i + 1}</span>
                <h3 className="font-heading font-bold text-gray-900 mb-2">{t(c.vi, c.en)}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t(c.dVi, c.dEn)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How the team works */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-8">{t('Đội ngũ của chúng tôi làm việc như thế nào', 'How our team works')}</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {PRACTICES.map(pr => (
              <div key={pr.vi} className="rounded-2xl bg-white border border-gray-100 p-7">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-10 h-10 rounded-xl bg-brand-blue-tint text-brand-blue flex items-center justify-center"><pr.Icon size={20} /></span>
                  <h3 className="font-heading font-bold text-gray-900">{t(pr.vi, pr.en)}</h3>
                </div>
                <ul className="space-y-3.5">
                  {pr.items.map(([vi, en]) => (
                    <li key={vi} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 shrink-0" />
                      <span>{t(vi, en)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concerns + incidents */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-3">{t('Khi anh chị có điều băn khoăn', 'When something concerns you')}</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {t(
                'Anh chị không cần chắc chắn mới lên tiếng. Chỉ cần một cảm giác chưa ổn cũng đủ để nói với chúng tôi. Chúng tôi thà nghe mười lần nhầm còn hơn bỏ lỡ một lần thật.',
                'You do not need to be certain before speaking up. A feeling that something is not right is reason enough. We would rather hear ten false alarms than miss one real one.'
              )}
            </p>
            <ol className="space-y-4">
              {CONCERN_STEPS.map(([vi, en], i) => (
                <li key={vi} className="flex gap-4">
                  <span className="w-9 h-9 shrink-0 rounded-full bg-brand-blue text-white font-heading font-bold text-sm flex items-center justify-center">{i + 1}</span>
                  <p className="text-gray-700 leading-relaxed pt-1.5">{t(vi, en)}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-3">{t('Khi có sự cố', 'When an incident happens')}</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {t('Áp dụng cho mọi lớp học, mọi chuyến đi và mọi giáo viên HVE cung ứng. Mỗi sự cố đều được ghi nhận bằng văn bản và theo dõi đến khi khắc phục xong.', 'Applies to every class, trip and instructor HVE supplies. Every incident is recorded in writing and followed through to closure.')}
            </p>
            <ol className="space-y-3">
              {[
                ['Xử lý tại chỗ: đảm bảo an toàn, sơ cứu khi cần, giữ các học sinh khác trong tầm quan sát.', 'Immediate care: secure the child, give first aid if needed, keep other students in sight.'],
                ['Báo ngay cho phụ huynh và nhà trường khi tình huống được kiểm soát.', 'Notify parents and the school once the situation is under control.'],
                ['Chuyển tuyến y tế hoặc phối hợp cơ quan chức năng khi cần.', 'Escalate to medical care or the authorities when needed.'],
                ['Gửi báo cáo bằng văn bản: diễn biến, cách xử lý, người chịu trách nhiệm.', 'Written report: what happened, how it was handled, who is responsible.'],
                ['Thống nhất biện pháp phòng ngừa và theo dõi đến khi hoàn tất.', 'Agree preventive actions and track them to completion.'],
              ].map(([vi, en], i) => (
                <li key={vi} className="flex gap-3 rounded-xl border border-gray-100 p-4 text-sm text-gray-700 leading-relaxed">
                  <span className="font-heading font-bold text-brand-blue w-5 shrink-0">{i + 1}.</span>
                  <span>{t(vi, en)}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section className="relative py-16 md:py-20 bg-brand-navy overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-3">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">{t('Liên hệ khi cần', 'Who to contact')}</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                {t('Mọi phản ánh được ghi nhận, xem xét trong vòng 48 giờ và giữ kín thông tin người phản ánh.', 'Every concern is recorded, reviewed within 48 hours, and the reporter is kept confidential.')}
              </p>
              <a href="tel:+84947000067" className="flex items-center gap-4 rounded-2xl bg-white/10 border border-white/15 p-5 mb-6 hover:bg-white/15 transition-colors">
                <ShieldCheck size={24} className="text-brand-blue-soft shrink-0" />
                <div>
                  <p className="text-sm text-white/70">{t('Người phụ trách bảo vệ trẻ em', 'Child Protection Officer')}</p>
                  <p className="font-heading font-bold text-white text-lg">Tony · (+84)947000067</p>
                </div>
              </a>
              <p className="text-sm text-white/70 mb-3">{t('Đường dây chung của Huy Võ Education', 'Huy Võ Education main line')}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={telHref(settings.phone)} className="inline-flex items-center justify-center gap-2 bg-white text-brand-navy font-heading font-bold px-6 py-3 rounded-xl hover:bg-brand-blue-tint transition-colors">
                  <PhoneCall size={18} /> {formatPhone(settings.phone)}
                </a>
                <a href={`mailto:${settings.email}`} className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-heading font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">
                  <Mail size={18} /> {settings.email}
                </a>
              </div>
            </div>
            <div className="lg:col-span-2 grid gap-3">
              <a href="tel:111" className="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 transition-colors">
                <Siren size={22} className="text-brand-blue-soft shrink-0" />
                <div>
                  <p className="font-heading font-bold text-white text-xl">111</p>
                  <p className="text-sm text-white/70">{t('Tổng đài quốc gia bảo vệ trẻ em (miễn phí, 24/7)', 'National Child Protection Hotline (free, 24/7)')}</p>
                </div>
              </a>
              <a href="tel:115" className="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 transition-colors">
                <HeartPulse size={22} className="text-brand-blue-soft shrink-0" />
                <div>
                  <p className="font-heading font-bold text-white text-xl">115</p>
                  <p className="text-sm text-white/70">{t('Cấp cứu y tế', 'Medical emergency')}</p>
                </div>
              </a>
            </div>
          </div>
          <p className="mt-12 pt-6 border-t border-white/10 text-sm text-white/60 leading-relaxed">
            {t(
              'Đây là bản tóm lược dành cho gia đình và đối tác, áp dụng từ ngày 01/06/2026. Bản đầy đủ, Chính sách Bảo vệ Trẻ em (mã HVE-POL-01), được lưu tại từng cơ sở và cung cấp khi anh chị có nhu cầu.',
              'This is a summary for families and partners, effective 1 June 2026. The full Child Protection Policy (HVE-POL-01) is held at each site and available on request.'
            )}
          </p>
          <p className="mt-3 font-heading font-semibold text-white/90">
            {t('An toàn không phải là điều kiện kèm theo. Đó là điều kiện đầu tiên.', 'Safety is not a condition attached to what we do. It is the first condition of it.')}
          </p>
        </div>
      </section>
    </div>
  );
};
