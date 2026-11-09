import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Palette, FlaskConical } from 'lucide-react';
import bongDaImg from '../../assets/images/bong_da_real.jpg';
import danTranhImg from '../../assets/images/dan_tranh_real.jpg';
import { Link } from 'react-router-dom';

import { EditableText } from '../editor/EditableText';
import { EditableImage } from '../editor/EditableImage';

// Local photos for sports and arts; STEM still uses a Pexels photo (free commercial use).
const sportsImg = bongDaImg;
const artsImg = danTranhImg;
const PROGRAM_ICONS: Record<string, React.ElementType> = { sports: Trophy, arts: Palette, stem: FlaskConical };
const stemImg = 'https://images.pexels.com/photos/8471835/pexels-photo-8471835.jpeg?auto=compress&cs=tinysrgb&w=800';

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export const ProgramsSection = ({ props, sectionId, t }: { props: any, sectionId: string, t?: any }) => {
  // Title/subtitle follow the HVE Company Profile 2026 (activity areas), not the older CMS copy.
  const title = 'Lĩnh vực hoạt động';
  const subtitle = 'Thể thao, bơi lội, nghệ thuật, kỹ năng sống, STEM và sáng tạo: hoạt động được chọn phù hợp với học sinh và cơ sở vật chất của từng trường.';
  
  const programs = props?.programs || [
    {
      id: 'sports',
      title: 'Thể thao & Bơi lội',
      desc: 'Bóng đá, bóng rổ, võ thuật và dạy bơi theo lộ trình từng độ tuổi: rèn thể lực, kỷ luật và tinh thần đồng đội.',
      img: sportsImg,
      icon: '🏊',
      link: '/chuong-trinh#the-thao'
    },
    {
      id: 'arts',
      title: 'Nghệ thuật',
      desc: 'Nhảy hiện đại, trống nghi thức và nhạc cụ dân tộc: nuôi dưỡng sự tự tin và khả năng biểu đạt.',
      img: artsImg,
      icon: '🎨',
      link: '/chuong-trinh#nghe-thuat'
    },
    {
      id: 'stem',
      title: 'STEM và sáng tạo',
      desc: 'Robotics, lắp ráp và các thử thách sáng tạo, rèn tư duy logic và kỹ năng giải quyết vấn đề.',
      img: stemImg,
      icon: '🔬',
      link: '/chuong-trinh#stem'
    }
  ];

  return (
    <section id="ecosystem" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gray-900">
              <EditableText tag="span" value={title} sectionId={sectionId} path="title" />
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              <EditableText tag="span" value={subtitle} sectionId={sectionId} path="subtitle" />
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Link to="/chuong-trinh" className="group flex items-center gap-2 text-brand-blue font-semibold hover:text-brand-blue-dark transition-colors bg-brand-blue-tint px-5 py-2.5 rounded-full border border-blue-100">
              {t ? t('Xem 5 lĩnh vực hoạt động', 'See all 5 activity areas') : 'Xem 5 lĩnh vực hoạt động'} 
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((prog: any, i: number) => (
            <motion.div 
              key={prog.id || i}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
            >
              <div className="aspect-[16/10] relative overflow-hidden flex items-center justify-center">
                
                <EditableImage src={prog.img} alt={prog.title} className="w-full h-full object-cover object-[center_30%] group-hover:scale-[1.03] transition-transform duration-700 ease-out absolute inset-0" sectionId={sectionId} path={`programs[${i}].img`} />
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/95 rounded-2xl shadow-sm z-20 flex items-center justify-center text-brand-blue">
                  {(() => { const Icon = PROGRAM_ICONS[prog.id]; return Icon ? <Icon size={22} /> : <span className="text-2xl">{prog.icon}</span>; })()}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-heading font-bold mb-3 group-hover:text-brand-blue transition-colors">
                  <EditableText tag="span" value={prog.title} sectionId={sectionId} path={`programs[${i}].title`} />
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed flex-1">
                  <EditableText tag="span" value={prog.desc} sectionId={sectionId} path={`programs[${i}].desc`} />
                </p>
                <Link to={prog.link} className="inline-flex items-center gap-2 text-brand-blue font-semibold group/link">
                  {t ? t('Khám phá chi tiết', 'Discover details') : 'Khám phá chi tiết'} 
                  <ArrowRight size={18} className="group-hover/link:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
