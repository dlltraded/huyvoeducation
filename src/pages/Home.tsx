import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowRight, CheckCircle2, MapPin, BookOpen, Users, Award } from 'lucide-react';
import { useOutletContext, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';
import { RegistrationForm } from '../components/RegistrationForm';

// Images
import heroImg from '../assets/images/premium_hero_banner_1784076757254.png';
import stemImg from '../assets/images/premium_stem_1784076845442.png';
import artsImg from '../assets/images/premium_arts_1784076768648.png';
import sportsImg from '../assets/images/premium_sports_1784076784989.png';
import sunriseImg from '../assets/images/sunrise_campus_notext.png';
import nvhImg from '../assets/images/nvh_campus_notext.png';
import learnImg from '../assets/images/learn_philosophy.png';
import connectImg from '../assets/images/connect_philosophy.png';
import growImg from '../assets/images/grow_philosophy.png';
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export const Home = () => {
  const { t } = useOutletContext<any>();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [heroContent, setHeroContent] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase.from('site_content').select('content').eq('section_key', 'home_hero').single();
      if (data?.content) setHeroContent(data.content);
    };
    fetchContent();
  }, []);

  const programs = [
    {
      id: 'sports',
      title: t('Thể thao & Bơi lội', 'Sports & Swimming'),
      desc: t('Phát triển thể chất, rèn luyện sự bền bỉ và tinh thần đồng đội trong môi trường chuyên nghiệp.', 'Develop physical fitness, endurance, and teamwork in a professional environment.'),
      img: sportsImg,
      icon: '🏊',
      link: '/chuong-trinh/the-thao-boi-loi'
    },
    {
      id: 'arts',
      title: t('Nghệ thuật & Sáng tạo', 'Arts & Creativity'),
      desc: t('Kích thích sự tự do biểu đạt, nuôi dưỡng trí tưởng tượng và sự tinh tế trong tâm hồn trẻ.', 'Stimulate free expression, nurture imagination and emotional refinement.'),
      img: artsImg,
      icon: '🎨',
      link: '/chuong-trinh/nghe-thuat'
    },
    {
      id: 'stem',
      title: t('Khoa học & Lắp ráp (STEM)', 'Science & Robotics (STEM)'),
      desc: t('Rèn luyện tư duy logic, kỹ năng giải quyết vấn đề qua các thử thách lắp ráp thực tế.', 'Develop logical thinking and problem solving through real-world building challenges.'),
      img: stemImg,
      icon: '🔬',
      link: '/chuong-trinh/stem'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Huy Võ Education | Kỹ năng sống & STEM cho trẻ</title>
        <meta name="description" content="Hệ sinh thái giáo dục sau giờ học uy tín, an toàn và hiện đại dành cho thế hệ trẻ." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center pt-20 overflow-hidden bg-white">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <img src={heroImg} alt="Students in STEM lab" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent"></div>
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col justify-center">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-brand-blue px-4 py-1.5 rounded-full text-sm font-semibold mb-6 w-max">
              <span className="w-2 h-2 rounded-full bg-brand-green"></span>
              {t('Hệ sinh thái giáo dục sau giờ học', 'After-school Education Ecosystem')}
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 leading-[1.15] mb-6">
              {heroContent?.title || (
                <>
                  {t('Sau tiếng chuông tan trường, ', 'After the final bell, ')}
                  <br className="hidden md:block"/>
                  <span className="text-gradient">{t('một thế giới để lớn lên.', 'a world to grow in.')}</span>
                </>
              )}
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-base md:text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
              {heroContent?.subtitle || t('Không chỉ là học thêm một môn năng khiếu. Tại Huy Võ Education, mỗi buổi chiều là một cơ hội để con khám phá năng lực, kết nối bạn bè và phát triển toàn diện.', 'Not just learning an extra skill. At Huy Võ Education, every afternoon is an opportunity to discover potential, connect with friends, and develop fully.')}
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <a href="#register" className="bg-brand-blue hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-heading font-semibold shadow-lg hover:shadow-blue-500/30 transition-all flex justify-center items-center gap-2">
                {heroContent?.cta_text || t('Đầu tư cho con ngay', 'Invest in their future')}
                <ArrowRight size={18} />
              </a>
              <a href="#about" className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-8 py-3.5 rounded-full font-heading font-semibold shadow-sm transition-all text-center">
                {t('Tìm hiểu thêm', 'Learn More')}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Counselor / Philosophy Section */}
      <section id="about" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-heading font-bold mb-6 text-gray-900">
              {t('Ba mẹ có biết, khoảng thời gian sau giờ học quyết định rất lớn đến sự tự tin của trẻ?', "Did you know the hours after school greatly determine a child confidence?")}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-xl text-gray-500">
              {t('Chúng tôi không xây dựng một trung tâm cho một môn học riêng lẻ. Chúng tôi xây dựng một Hệ sinh thái xoay quanh người học, với triết lý cốt lõi:', "We didn't build a center for a single subject. We built a learner-centered Ecosystem with a core philosophy:")}
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: 'LEARN', 
                Icon: BookOpen,
                img: learnImg,
                desc: t('Khơi dậy đam mê học hỏi qua trải nghiệm thực tế.', 'Ignite the passion for learning through hands-on experience.'),
                details: t('Chúng tôi tin rằng mọi đứa trẻ đều có sẵn sự tò mò. Thay vì nhồi nhét lý thuyết, các lớp học tại Huy Võ Education (như STEM, Nghệ thuật) khuyến khích trẻ tự do khám phá, tự tay thực hiện dự án để biến kiến thức thành tư duy giải quyết vấn đề thực tế.', 'We believe every child is naturally curious. Instead of cramming theories, classes at Huy Võ Education encourage children to freely explore and build projects, turning knowledge into practical problem-solving skills.'),
                color: 'text-brand-blue',
                bg: 'bg-blue-50'
              },
              { 
                title: 'CONNECT', 
                Icon: Users,
                img: connectImg,
                desc: t('Xây dựng kỹ năng xã hội và sự thấu cảm.', "Build social skills and empathy."),
                details: t('Không ai lớn lên một mình. Tại hệ sinh thái của chúng tôi, trẻ học cách làm việc nhóm, chia sẻ ý tưởng và tôn trọng sự khác biệt. Đây là nơi những tình bạn đẹp nảy nở và kỹ năng giao tiếp được mài giũa mỗi ngày một cách tự nhiên nhất.', 'No one grows up alone. In our ecosystem, children learn teamwork, share ideas, and respect differences. This is where beautiful friendships bloom and communication skills are naturally honed every day.'),
                color: 'text-brand-green',
                bg: 'bg-green-50'
              },
              { 
                title: 'GROW', 
                Icon: Award,
                img: growImg,
                desc: t('Trưởng thành toàn diện từ thể chất đến tinh thần.', 'Holistic growth from physical to mental well-being.'),
                details: t('Sự trưởng thành không chỉ là điểm số, mà là một cơ thể khỏe mạnh từ lớp bơi lội, một tâm hồn phong phú từ lớp mỹ thuật, và một sự tự tin tỏa sáng khi trình bày dự án STEM. Chúng tôi đồng hành cùng sự phát triển cân bằng và bền vững của trẻ.', 'Growth is not just about grades, but a healthy body from swimming class, a rich soul from art class, and shining confidence when presenting a STEM project. We accompany the balanced and sustainable development of your child.'),
                color: 'text-yellow-600',
                bg: 'bg-yellow-50'
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2, duration: 0.6 }}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/40 hover:-translate-y-2 transition-transform duration-300 flex flex-col"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className={`absolute bottom-4 left-4 w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shadow-lg`}>
                    <item.Icon size={24} />
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-heading font-bold mb-3">{item.title}</h3>
                  <p className={`font-semibold ${item.color} mb-4`}>{item.desc}</p>
                  <p className="text-gray-600 leading-relaxed text-sm">{item.details}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section id="ecosystem" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gray-900">
                {t('Hệ sinh thái Đa dạng', 'Diverse Ecosystem')}
              </h2>
              <p className="text-xl text-gray-600">
                {t('Tại đây, các môn học không cạnh tranh mà bổ trợ cho nhau, giúp trẻ tìm ra thế mạnh thực sự của mình.', 'Here, subjects do not compete but complement each other, helping children find their true strengths.')}
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, i) => (
              <Link to={program.link} key={program.id}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="group relative rounded-3xl overflow-hidden bg-white shadow-lg cursor-pointer h-full"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={program.img} alt={program.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <div className="text-4xl mb-3">{program.icon}</div>
                    <h3 className="text-2xl font-heading font-bold text-white mb-2">{program.title}</h3>
                    <p className="text-gray-200 text-sm opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-300">
                      {program.desc}
                    </p>
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 mt-4 text-brand-yellow font-semibold flex items-center gap-2 text-sm">
                      {t('Xem chi tiết', 'View Details')} <ArrowRight size={14} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Visible Growth */}
      <section className="py-24 bg-brand-blue text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-blue-600/50 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-brand-green/30 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              {t('Sự trưởng thành nhìn thấy được', 'Visible Growth')}
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {t('Chúng tôi không đo lường thành công bằng số buổi học, mà bằng sự trưởng thành trong cách trẻ bước vào thế giới.', "We don't measure success by the number of classes, but by the visible growth in how children step into the world.")}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { vi: 'Tự tin hơn', en: 'More confident' },
              { vi: 'Tò mò hơn', en: 'More curious' },
              { vi: 'Biết hợp tác', en: 'More collaborative' },
              { vi: 'Bền bỉ hơn', en: 'More resilient' },
              { vi: 'Hiểu bản thân', en: 'More self-aware' }
            ].map((trait, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-colors"
              >
                <CheckCircle2 className="w-10 h-10 mx-auto mb-4 text-brand-yellow" />
                <h4 className="font-heading font-bold text-lg">{t(trait.vi, trait.en)}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campuses */}
      <section id="campuses" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gray-900">
              {t('Cơ sở chuẩn Quốc tế', 'International Standard Campuses')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('Không gian an toàn, hiện đại và tràn đầy cảm hứng, được thiết kế có chủ đích cho sự phát triển của trẻ.', "Safe, modern, and inspiring spaces, purposefully designed for children's development.")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              { name: 'Sunrise Campus', addr: 'Trảng Bom, Đồng Nai', desc: t('Cơ sở hiện đại với không gian xanh mát, phòng Lab STEM chuẩn quốc tế.', 'Modern campus with green spaces, international standard STEM lab.'), img: sunriseImg },
              { name: 'NVH Thanh Thiếu Nhi', addr: 'Biên Hòa, Đồng Nai', desc: t('Kế thừa tinh thần cộng đồng mạnh mẽ, mang đến môi trường sinh hoạt năng động.', 'Inheriting strong community spirit, providing a dynamic environment.'), img: nvhImg }
            ].map((campus, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="group">
                <div className="rounded-3xl overflow-hidden mb-6 shadow-xl aspect-video relative">
                  <img src={campus.img} alt={campus.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-2">{campus.name}</h3>
                <div className="flex items-center gap-2 text-brand-blue font-medium mb-3">
                  <MapPin size={18} />
                  <span>{campus.addr}</span>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">{campus.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <RegistrationForm t={t} />
    </>
  );
};
