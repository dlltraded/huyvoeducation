import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useOutletContext } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { RegistrationForm } from '../components/RegistrationForm';
import artsImg from '../assets/images/premium_arts_1784076768648.png';

export const ArtsPage = () => {
  const { t } = useOutletContext<any>();

  return (
    <>
      <Helmet>
        <title>Chương trình Nghệ thuật & Sáng tạo | Huy Võ Education</title>
        <meta name="description" content="Khám phá tiềm năng nghệ thuật của trẻ. Lộ trình vẽ và sáng tạo giúp rèn luyện tư duy, thẩm mỹ và giải phóng cảm xúc." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={artsImg} alt="Arts Program" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block bg-brand-yellow text-gray-900 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6">
              ARTS & CREATIVITY
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
              {t('Nghệ thuật & Sáng tạo', 'Arts & Creativity')}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('Cung cấp công cụ để trẻ tự do thể hiện thế giới nội tâm, bộc lộ quan điểm cá nhân và phát triển tư duy thẩm mỹ một cách trọn vẹn nhất.', 'Providing tools for children to freely express their inner world, personal viewpoints, and fully develop aesthetic thinking.')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 rounded-3xl overflow-hidden shadow-2xl relative">
             <img src={artsImg} alt="Kids painting" className="w-full h-auto" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
              {t('Chữa lành và Nuôi dưỡng tâm hồn', 'Healing and Nurturing the Soul')}
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {t('Vẽ nghệ thuật không chỉ để tạo ra bức tranh đẹp, mà là quá trình bé học cách quan sát thế giới xung quanh một cách tĩnh lặng, rèn luyện sự kiên nhẫn và giải phóng căng thẳng.', 'Art is not just about creating a beautiful picture, but a process where children learn to quietly observe the surrounding world, practice patience, and relieve stress.')}
            </p>
            <ul className="space-y-4">
              {[
                t('Phát triển vận động tinh (sự khéo léo của đôi tay)', 'Develop fine motor skills (hand dexterity)'),
                t('Cải thiện khả năng tập trung sâu', 'Improve deep concentration ability'),
                t('Tự tin bộc lộ cảm xúc tích cực', 'Confidently express positive emotions')
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle2 className="text-brand-yellow w-6 h-6 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Timeline/Roadmap */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t('Lộ trình học Mỹ thuật toàn diện', 'Comprehensive Art Learning Roadmap')}
            </h2>
            <p className="text-gray-600 text-lg">
              {t('Từ việc cầm cọ đầu tiên đến việc sáng tác những tác phẩm mang dấu ấn cá nhân.', 'From holding the first brush to creating personalized masterpieces.')}
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                age: t('3 - 5 Tuổi', '3 - 5 Years'),
                title: t('Giai đoạn Cảm thụ: Sắc màu và Nét vẽ', 'Perception Stage: Colors and Lines'),
                desc: t('Rèn luyện cách cầm bút, nhận biết và hòa trộn màu sắc cơ bản. Vẽ các hình khối đơn giản và tô màu không lem để tăng tính kỷ luật.', 'Practicing how to hold a pen, recognizing and mixing basic colors. Drawing simple shapes and coloring without smudging to increase discipline.'),
                color: 'bg-pink-500'
              },
              {
                age: t('6 - 9 Tuổi', '6 - 9 Years'),
                title: t('Giai đoạn Kỹ năng: Quan sát và Mô phỏng', 'Skill Stage: Observation and Simulation'),
                desc: t('Học cách quan sát chi tiết sự vật, hiểu về tỷ lệ, phối cảnh xa gần. Bé bắt đầu vẽ theo chủ đề và làm quen với bố cục không gian trong tranh.', 'Learning to observe details of objects, understanding proportions, and perspective. Children start drawing by themes and get used to spatial layout in paintings.'),
                color: 'bg-brand-yellow text-gray-900'
              },
              {
                age: t('10 Tuổi +', '10 Years +'),
                title: t('Giai đoạn Sáng tạo: Định hình phong cách', 'Creative Stage: Shaping personal style'),
                desc: t('Sử dụng đa dạng chất liệu (Màu nước, Acrylic, Sơn dầu). Nắm vững quy luật ánh sáng, đổ bóng và bắt đầu thực hiện các dự án kể chuyện bằng hình ảnh.', 'Using diverse materials (Watercolor, Acrylic, Oil paint). Mastering the rules of light, shadowing, and starting visual storytelling projects.'),
                color: 'bg-orange-500'
              }
            ].map((step, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex flex-col md:flex-row gap-6 bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative"
              >
                <div className="md:w-1/3 flex-shrink-0">
                  <div className={`inline-block ${step.color} ${i===1?'':'text-white'} px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-4`}>
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

      <RegistrationForm t={t} initialProgram="Nghệ thuật" />
    </>
  );
};
