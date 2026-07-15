import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useOutletContext } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { RegistrationForm } from '../components/RegistrationForm';
import stemImg from '../assets/images/premium_stem_1784076845442.png';

export const StemPage = () => {
  const { t } = useOutletContext<any>();

  return (
    <>
      <Helmet>
        <title>Chương trình STEM & Lắp ráp | Huy Võ Education</title>
        <meta name="description" content="Lộ trình đào tạo STEM chuẩn mực cho trẻ em từ 3-15 tuổi. Phát triển tư duy logic, sáng tạo và kỹ năng giải quyết vấn đề thực tế." />
        <meta property="og:image" content={window.location.origin + stemImg} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={stemImg} alt="STEM Program" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block bg-brand-blue text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6">
              SCIENCE & ROBOTICS
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
              {t('Khoa học & Lắp ráp (STEM)', 'Science & Robotics (STEM)')}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('Phát triển toàn diện tư duy 4C (Tư duy phản biện, Sáng tạo, Hợp tác, Giao tiếp) thông qua phương pháp học qua dự án thực tế.', 'Develop comprehensive 4C skills (Critical Thinking, Creativity, Collaboration, Communication) through project-based learning.')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
              {t('Hơn cả việc lập trình một con robot', 'More than just coding a robot')}
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {t('Chương trình STEM tại Huy Võ không chỉ tập trung vào việc truyền tải kiến thức công nghệ khô khan. Chúng tôi hướng tới việc trang bị cho trẻ "tư duy giải quyết vấn đề" (Problem-solving mindset).', 'The STEM program at Huy Võ does not just focus on dry tech knowledge. We aim to equip children with a "problem-solving mindset".')}
            </p>
            <ul className="space-y-4">
              {[
                t('Không ngại thử nghiệm và thất bại', 'Unafraid of trial and error'),
                t('Quan sát và đặt câu hỏi đa chiều', 'Observe and ask multi-dimensional questions'),
                t('Làm việc nhóm và tôn trọng sự khác biệt', 'Teamwork and respecting differences')
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle2 className="text-brand-green w-6 h-6 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl relative">
             <img src={stemImg} alt="Kids coding" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Timeline/Roadmap */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t('Lộ trình phát triển năng lực', 'Competency Development Roadmap')}
            </h2>
            <p className="text-gray-600 text-lg">
              {t('Thiết kế theo nguyên tắc đồng tâm, độ khó tăng dần phù hợp nhận thức của trẻ.', "Designed concentrically, increasing in difficulty according to the child's cognitive development.")}
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                age: t('3 - 5 Tuổi', '3 - 5 Years'),
                title: t('Giai đoạn Khám phá: Gieo mầm sự tò mò', 'Discovery Stage: Sowing the seeds of curiosity'),
                desc: t('Nuôi dưỡng trí tò mò qua các hoạt động quan sát sự vật tự nhiên (tại sao vật nổi/chìm), làm quen với các khối lắp ghép cơ bản để rèn luyện vận động tinh.', 'Nurturing curiosity through observing natural phenomena, getting used to basic building blocks to develop fine motor skills.'),
                color: 'bg-brand-green'
              },
              {
                age: t('6 - 11 Tuổi', '6 - 11 Years'),
                title: t('Giai đoạn Nền tảng: Kết nối kiến thức thực tế', 'Foundation Stage: Connecting real-world knowledge'),
                desc: t('Làm quen với quy trình thiết kế kỹ thuật, chế tạo mô hình chuyển động, lập trình robot cơ bản và thực hiện các dự án nhóm (Project-based learning).', 'Familiarization with the engineering design process, building moving models, basic robotics programming, and executing group projects.'),
                color: 'bg-brand-blue'
              },
              {
                age: t('12 - 15 Tuổi', '12 - 15 Years'),
                title: t('Giai đoạn Phát triển: Tư duy phản biện sâu', 'Development Stage: Deep critical thinking'),
                desc: t('Giải quyết các bài toán phức tạp, lập trình nâng cao, chế tạo thiết bị thông minh và định hướng phát triển nghề nghiệp công nghệ trong tương lai.', 'Solving complex problems, advanced programming, creating smart devices, and orienting future technology careers.'),
                color: 'bg-purple-600'
              }
            ].map((step, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex flex-col md:flex-row gap-6 bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative"
              >
                <div className="md:w-1/3 flex-shrink-0">
                  <div className={`inline-block ${step.color} text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-4`}>
                    {step.age}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-gray-900">{step.title}</h3>
                </div>
                <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-8">
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <RegistrationForm t={t} initialProgram="STEM" />
    </>
  );
};
