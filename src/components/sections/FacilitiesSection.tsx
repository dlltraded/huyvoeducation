import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle2 } from 'lucide-react';

import nvhImg from '../../assets/images/nvh_campus_real.jpg';
import trongNghiThucImg from '../../assets/images/trong_nghi_thuc_real.jpg';
import bongDaImg from '../../assets/images/bong_da_real.jpg';
import vovinamImg from '../../assets/images/vovinam_real.jpg';
import { EditableText } from '../editor/EditableText';
import { EditableImage } from '../editor/EditableImage';

// Real, authentically-Vietnamese photography (Pexels, free commercial use) —
// replaces the earlier AI-generated illustrations.
const sunriseImg = 'https://images.pexels.com/photos/17893014/pexels-photo-17893014.jpeg?auto=compress&cs=tinysrgb&w=1600';

// Small gallery showing the breadth of programs (martial arts, dance,
// football, basketball, traditional drums) so parents see the diversity
// at a glance.
const PROGRAM_GALLERY = [
  { img: vovinamImg, vi: 'Võ thuật', en: 'Martial Arts' },
  { img: 'https://images.pexels.com/photos/31022969/pexels-photo-31022969.jpeg?auto=compress&cs=tinysrgb&w=800', vi: 'Nghệ thuật', en: 'Arts' },
  { img: bongDaImg, vi: 'Bóng đá', en: 'Football' },
  { img: 'https://images.pexels.com/photos/10643696/pexels-photo-10643696.jpeg?auto=compress&cs=tinysrgb&w=800', vi: 'Bóng rổ', en: 'Basketball' },
  { img: trongNghiThucImg, vi: 'Trống nghi thức', en: 'Ceremonial Drums' },
];

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export const FacilitiesSection = ({ props, sectionId, t }: { props: any, sectionId: string, t?: any }) => {
  const tr = t || ((vi: string) => vi);
  const growth_title = props?.growth_title || 'Sự trưởng thành nhìn thấy được';
  const growth_subtitle = props?.growth_subtitle || 'Chúng tôi không đo lường thành công bằng số buổi học, mà bằng sự trưởng thành trong cách trẻ bước vào thế giới.';
  const growth_traits = props?.growth_traits || ['Tự tin hơn', 'Tò mò hơn', 'Biết hợp tác', 'Bền bỉ hơn', 'Hiểu bản thân'];

  const campuses_title = props?.campuses_title || 'Cơ sở chuẩn Quốc tế';
  const campuses_subtitle = props?.campuses_subtitle || 'Không gian an toàn, hiện đại và tràn đầy cảm hứng, được thiết kế có chủ đích cho sự phát triển của trẻ.';
  const campuses = props?.campuses || [
    { name: 'Sunrise Campus', addr: 'Trảng Bom, Đồng Nai', desc: 'Cơ sở hiện đại với không gian xanh mát, phòng Lab STEM chuẩn quốc tế.', img: sunriseImg },
    { name: 'NVH Thanh Thiếu Nhi', addr: 'Biên Hòa, Đồng Nai', desc: 'Kế thừa tinh thần cộng đồng mạnh mẽ, mang đến môi trường sinh hoạt năng động.', img: nvhImg }
  ];

  return (
    <>
      <section className="pt-28 pb-24 bg-brand-blue text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 leading-none rotate-180">
          <svg viewBox="0 0 1440 50" className="w-full h-8 md:h-12" preserveAspectRatio="none">
            <path d="M0,26 C240,52 480,0 720,13 C960,26 1200,52 1440,26 L1440,50 L0,50 Z" fill="#F9FAFB" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-blue-600/50 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-brand-green/30 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              <EditableText tag="span" value={growth_title} sectionId={sectionId} path="growth_title" />
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              <EditableText tag="span" value={growth_subtitle} sectionId={sectionId} path="growth_subtitle" />
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {growth_traits.map((trait: string, i: number) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-colors"
              >
                <CheckCircle2 className="w-10 h-10 mx-auto mb-4 text-brand-yellow" />
                <h4 className="font-heading font-bold text-lg">
                  <EditableText tag="span" value={trait} sectionId={sectionId} path={`growth_traits[${i}]`} />
                </h4>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 50" className="w-full h-8 md:h-12" preserveAspectRatio="none">
            <path d="M0,26 C240,52 480,0 720,13 C960,26 1200,52 1440,26 L1440,50 L0,50 Z" fill="white" />
          </svg>
        </div>
      </section>

      <section id="campuses" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gray-900">
            <EditableText tag="span" value={campuses_title} sectionId={sectionId} path="campuses_title" />
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            <EditableText tag="span" value={campuses_subtitle} sectionId={sectionId} path="campuses_subtitle" />
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {campuses.map((campus: any, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="group">
              <div className="rounded-3xl overflow-hidden mb-6 shadow-xl aspect-video relative">
                <EditableImage src={campus.img} alt={campus.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" sectionId={sectionId} path={`campuses[${i}].img`} />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-2">
                <EditableText tag="span" value={campus.name} sectionId={sectionId} path={`campuses[${i}].name`} />
              </h3>
              <div className="flex items-center gap-2 text-brand-blue font-medium mb-3">
                <MapPin size={18} />
                <span><EditableText tag="span" value={campus.addr} sectionId={sectionId} path={`campuses[${i}].addr`} /></span>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                <EditableText tag="span" value={campus.desc} sectionId={sectionId} path={`campuses[${i}].desc`} />
              </p>
            </motion.div>
          ))}
        </div>

        {/* Program diversity gallery — a quick visual sense of how varied the programs are */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-20 text-center"
        >
          <p className="text-sm font-bold uppercase tracking-wide text-brand-blue mb-8">
            {tr('Đa dạng chương trình đào tạo', 'A Wide Range of Programs')}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {PROGRAM_GALLERY.map((item, i) => (
              <motion.div
                key={item.vi}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-md"
              >
                <img
                  src={item.img}
                  alt={tr(item.vi, item.en)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute bottom-3 left-0 right-0 text-white text-xs md:text-sm font-heading font-bold px-2">
                  {tr(item.vi, item.en)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
};
