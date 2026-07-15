import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useOutletContext } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { RegistrationForm } from '../components/RegistrationForm';
import sportsImg from '../assets/images/premium_sports_1784076784989.png';

export const SportsPage = () => {
  const { t } = useOutletContext<any>();

  return (
    <>
      <Helmet>
        <title>Chương trình Thể thao & Bơi lội | Huy Võ Education</title>
        <meta name="description" content="Khóa học bơi lội và thể thao giúp trẻ phát triển thể chất toàn diện, tăng chiều cao, sức bền và rèn luyện kỹ năng sinh tồn an toàn dưới nước." />
        <meta property="og:image" content={window.location.origin + sportsImg} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={sportsImg} alt="Sports & Swimming Program" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block bg-brand-green text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6">
              SPORTS & SWIMMING
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
              {t('Thể thao & Bơi lội', 'Sports & Swimming')}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('Phát triển thể chất toàn diện, rèn luyện sự bền bỉ, tính kỷ luật và trang bị kỹ năng sinh tồn quan trọng cho trẻ trong suốt cuộc đời.', 'Comprehensive physical development, endurance training, discipline, and equipping children with crucial lifelong survival skills.')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
              {t('Khỏe mạnh thể chất, Vững vàng tinh thần', 'Physically strong, Mentally resilient')}
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {t('Bơi lội không chỉ là một môn thể thao, mà là một kỹ năng sinh tồn bắt buộc. Hơn thế nữa, môi trường nước giúp trẻ giải tỏa căng thẳng sau giờ học, phát triển hệ cơ xương khớp tối đa và xây dựng sự tự tin tuyệt vời.', 'Swimming is not just a sport, it is a mandatory survival skill. Moreover, the water environment helps children relieve stress after school, maximize musculoskeletal development, and build immense self-confidence.')}
            </p>
            <ul className="space-y-4">
              {[
                t('Phát triển tối đa chiều cao và hệ hô hấp', 'Maximize height and respiratory system development'),
                t('Trang bị kỹ năng an toàn môi trường nước', 'Equip water safety skills'),
                t('Ăn ngủ ngon hơn, tinh thần tích cực hơn', 'Better eating and sleeping, more positive mindset')
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle2 className="text-brand-green w-6 h-6 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl relative">
             <img src={sportsImg} alt="Kids swimming" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Timeline/Roadmap */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              {t('Lộ trình Huấn luyện Bơi lội', 'Swimming Training Roadmap')}
            </h2>
            <p className="text-gray-600 text-lg">
              {t('Giáo án chuẩn quốc tế, tôn trọng nhịp độ phát triển tâm sinh lý của từng trẻ.', 'International standard curriculum, respecting the psychological and physiological pace of each child.')}
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                age: t('Dưới 5 Tuổi', 'Under 5 Years'),
                title: t('Giai đoạn Xóa mù nước: Tự tin và Thoải mái', 'Water Acclimation Stage: Confident and Comfortable'),
                desc: t('Giúp trẻ vượt qua nỗi sợ nước bằng các trò chơi vận động dưới nước. Tập kỹ năng hít thở nhịp nhàng, làm quen với việc nước vào tai, mặt và học cách nổi cơ bản.', 'Helping children overcome the fear of water through underwater games. Practicing rhythmic breathing, getting used to water in ears/face, and learning basic floating.'),
                color: 'bg-cyan-500'
              },
              {
                age: t('5 - 7 Tuổi', '5 - 7 Years'),
                title: t('Giai đoạn Kỹ thuật cơ bản: Bơi ếch, Bơi ngửa', 'Basic Technique Stage: Breaststroke, Backstroke'),
                desc: t('Rèn luyện sự phối hợp nhịp nhàng giữa tay, chân và nhịp thở. Trẻ làm chủ được cơ thể dưới nước, biết cách bơi liên tục ở cự ly ngắn mà không mất sức.', 'Training the rhythmic coordination between arms, legs, and breathing. Children master their bodies underwater, knowing how to swim continuously for short distances without exhaustion.'),
                color: 'bg-brand-blue'
              },
              {
                age: t('Từ 7 Tuổi', 'From 7 Years'),
                title: t('Giai đoạn Nâng cao & Sinh tồn', 'Advanced & Survival Stage'),
                desc: t('Hoàn thiện bơi sải, bơi bướm để tăng sức bền và tốc độ. Đặc biệt chú trọng huấn luyện các kỹ năng sinh tồn như: đứng nước lâu, xử lý chuột rút và kỹ năng cứu đuối an toàn.', 'Perfecting freestyle and butterfly strokes to increase endurance and speed. Special emphasis on survival training like treading water, handling cramps, and safe rescue skills.'),
                color: 'bg-indigo-600'
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

      <RegistrationForm t={t} initialProgram="Thể thao" />
    </>
  );
};
