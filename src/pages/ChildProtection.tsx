import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ShieldCheck,
  Users,
  Eye,
  MessageCircleWarning,
  UserCheck,
  PhoneCall,
  Mail,
} from 'lucide-react';

const PRINCIPLES = [
  {
    icon: Users,
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

  return (
    <div className="bg-white">
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
      <section className="bg-gradient-to-br from-brand-blue to-[#0855A2] text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={32} />
          </div>
          <p className="uppercase tracking-widest text-sm font-semibold text-blue-100 mb-3">
            {t('Cam kết an toàn', 'Our Safety Commitment')}
          </p>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight">
            {t('Chính sách bảo vệ trẻ em', 'Child Protection & Safeguarding')}
          </h1>
          <p className="text-lg text-blue-100 leading-relaxed">
            {t(
              'Tại Huy Võ Education, sự an toàn và phúc lợi của học viên luôn là ưu tiên hàng đầu trong mọi hoạt động — từ lớp học, buổi tập cho đến các sự kiện ngoại khóa.',
              'At Huy Vo Education, the safety and wellbeing of every student is our top priority — in every class, every training session, and every extracurricular event.'
            )}
          </p>
        </div>
      </section>

      {/* Scope */}
      <section className="py-16 border-b border-gray-100">
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
      </section>

      {/* Principles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-12 text-center">
            {t('Các nguyên tắc cốt lõi', 'Core principles')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {PRINCIPLES.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-5">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-gray-900 mb-2">
                    {t(p.vi.title, p.en.title)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {t(p.vi.body, p.en.body)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Note on ongoing work */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8">
            <h3 className="font-heading font-bold text-gray-900 mb-2">
              {t('Tài liệu chính sách đầy đủ', 'Full policy document')}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {t(
                'Huy Võ Education đang hoàn thiện văn bản chính sách bảo vệ trẻ em đầy đủ, bao gồm quy trình xác minh lý lịch giảng viên và quy trình xử lý sự cố chi tiết. Quý phụ huynh cần bản đầy đủ vui lòng liên hệ trực tiếp theo thông tin bên dưới.',
                "Huy Vo Education is finalizing the full child protection policy document, including our detailed instructor vetting and incident-response procedures. Parents who need the complete document are welcome to contact us directly using the details below."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Reporting / contact */}
      <section className="py-16 bg-brand-dark text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-heading font-bold mb-4">
            {t('Cần báo cáo một mối lo ngại?', 'Need to report a concern?')}
          </h2>
          <p className="text-gray-300 mb-8">
            {t(
              'Đừng ngần ngại liên hệ với chúng tôi bất cứ lúc nào. Mọi thông tin được bảo mật.',
              "Please don't hesitate to reach out anytime. All information is kept confidential."
            )}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:0907828939"
              className="flex items-center gap-2 bg-white text-brand-dark font-heading font-bold px-6 py-3 rounded-xl hover:-translate-y-0.5 transition-all"
            >
              <PhoneCall size={18} /> 0907 828 939
            </a>
            <a
              href="mailto:huyvoeducation@gmail.com"
              className="flex items-center gap-2 border border-white/30 text-white font-heading font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-all"
            >
              <Mail size={18} /> huyvoeducation@gmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
