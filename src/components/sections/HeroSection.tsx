import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import heroImg from '../../assets/images/premium_hero_banner_1784076757254.png';
import { EditableText } from '../editor/EditableText';
import { EditableImage } from '../editor/EditableImage';

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export const HeroSection = ({ props, sectionId }: { props: any, sectionId: string }) => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Use props from DB, fallback to hardcoded
  const title = props?.title || 'Sau tiếng chuông tan trường, một thế giới để lớn lên.';
  const subtitle = props?.subtitle || 'Không chỉ là học thêm một môn năng khiếu. Tại Huy Võ Education, mỗi buổi chiều là một cơ hội để con khám phá năng lực, kết nối bạn bè và phát triển toàn diện.';
  const cta_text = props?.cta_text || 'Đầu tư cho con ngay';
  const badge_text = props?.badge_text || 'Hệ sinh thái giáo dục sau giờ học';
  const hero_image = props?.hero_image || heroImg;

  return (
    <section className="relative h-screen flex items-center pt-20 overflow-hidden bg-white">
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <EditableImage src={hero_image} alt="Hero" className="w-full h-full object-cover" sectionId={sectionId} path="hero_image" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 md:via-white/60 to-transparent"></div>
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col justify-center">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-brand-blue px-4 py-1.5 rounded-full text-sm font-semibold mb-6 w-max">
            <span className="w-2 h-2 rounded-full bg-brand-green"></span>
            <EditableText tag="span" value={badge_text} sectionId={sectionId} path="badge_text" />
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 leading-[1.15] mb-6">
            <EditableText tag="span" value={title} sectionId={sectionId} path="title" />
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-base md:text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
            <EditableText tag="span" value={subtitle} sectionId={sectionId} path="subtitle" />
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
            <a href="#register" className="bg-brand-blue hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-heading font-semibold shadow-lg hover:shadow-blue-500/30 transition-all flex justify-center items-center gap-2">
              <EditableText tag="span" value={cta_text} sectionId={sectionId} path="cta_text" />
              <ArrowRight size={18} />
            </a>
            <a href="#about" className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-8 py-3.5 rounded-full font-heading font-semibold shadow-sm transition-all text-center">
              Tìm hiểu thêm
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
