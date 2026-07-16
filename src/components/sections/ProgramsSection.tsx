import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import stemImg from '../../assets/images/premium_stem_1784076845442.png';
import artsImg from '../../assets/images/premium_arts_1784076768648.png';
import sportsImg from '../../assets/images/premium_sports_1784076784989.png';
import { EditableText } from '../editor/EditableText';
import { EditableImage } from '../editor/EditableImage';

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export const ProgramsSection = ({ props, sectionId, t }: { props: any, sectionId: string, t?: any }) => {
  const title = props?.title || 'Hệ sinh thái Đa dạng';
  const subtitle = props?.subtitle || 'Mỗi bộ môn đều được thiết kế chuyên sâu bởi các chuyên gia, nhưng lại được kết nối chặt chẽ để tạo nên một lộ trình phát triển toàn diện.';
  
  const programs = props?.programs || [
    {
      id: 'sports',
      title: 'Thể thao & Bơi lội',
      desc: 'Phát triển thể chất, rèn luyện sự bền bỉ và tinh thần đồng đội trong môi trường chuyên nghiệp.',
      img: sportsImg,
      icon: '🏊',
      link: '/chuong-trinh/the-thao-boi-loi'
    },
    {
      id: 'arts',
      title: 'Nghệ thuật & Sáng tạo',
      desc: 'Kích thích sự tự do biểu đạt, nuôi dưỡng trí tưởng tượng và sự tinh tế trong tâm hồn trẻ.',
      img: artsImg,
      icon: '🎨',
      link: '/chuong-trinh/nghe-thuat'
    },
    {
      id: 'stem',
      title: 'Khoa học & Lắp ráp (STEM)',
      desc: 'Rèn luyện tư duy logic, kỹ năng giải quyết vấn đề qua các thử thách lắp ráp thực tế.',
      img: stemImg,
      icon: '🔬',
      link: '/chuong-trinh/stem'
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
            <Link to="/chuong-trinh" className="group flex items-center gap-2 text-brand-blue font-semibold hover:text-blue-800 transition-colors bg-blue-50/50 px-5 py-2.5 rounded-full border border-blue-100">
              {t ? t('Xem tất cả lộ trình', 'View all programs') : 'Xem tất cả lộ trình'} 
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
              <div className="h-56 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-brand-blue/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                <EditableImage src={prog.img} alt={prog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out absolute inset-0" sectionId={sectionId} path={`programs[${i}].img`} />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-sm z-20 text-2xl">
                  {prog.icon}
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
