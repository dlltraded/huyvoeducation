import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle2, Building2, Landmark, Waves } from 'lucide-react';

import trongNghiThucImg from '../../assets/images/trong_nghi_thuc_real.jpg';
import bongDaImg from '../../assets/images/bong_da_real.jpg';
import vovinamImg from '../../assets/images/vovinam_real.jpg';
import { EditableText } from '../editor/EditableText';

// Campus list follows the HVE Company Profile 2026. No venue photos: the earlier
// stock image did not show the real campus.
const CAMPUS_ICONS = [Building2, Landmark, Waves];

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
  const growth_subtitle = 'Mỗi khóa học kết thúc bằng đánh giá tiến bộ của từng học sinh và buổi tổng kết cùng nhà trường, để những thay đổi dưới đây được ghi nhận bằng hồ sơ, không chỉ là lời hứa.';
  const growth_traits = props?.growth_traits || ['Tự tin hơn', 'Tò mò hơn', 'Biết hợp tác', 'Bền bỉ hơn', 'Hiểu bản thân'];

  const campuses_title = 'Hệ thống campus';
  const campuses_subtitle = 'Ba điểm đào tạo phục vụ học sinh khu vực Đồng Nai.';
  const campuses = [
    { vi: 'Campus Bắc Đồng Nai', en: 'North Đồng Nai campus', addrVi: 'Khu vực phía Bắc Đồng Nai', addrEn: 'Northern Đồng Nai', descVi: 'Phục vụ học sinh khu vực phía Bắc Đồng Nai.', descEn: 'Serving students in northern Đồng Nai.' },
    { vi: 'Campus Nhà Văn hóa', en: 'Youth Cultural Centre campus', addrVi: '159 Cách Mạng Tháng 8, phường Trấn Biên, TP. Đồng Nai', addrEn: '159 Cach Mang Thang 8, Tran Bien ward, Đồng Nai', map: 'https://www.google.com/maps/search/?api=1&query=Nh%C3%A0+V%C4%83n+h%C3%B3a+Thanh+thi%E1%BA%BFu+nhi+159+C%C3%A1ch+M%E1%BA%A1ng+Th%C3%A1ng+8+Tr%E1%BA%A5n+Bi%C3%AAn+%C4%90%E1%BB%93ng+Nai', descVi: 'Vận hành cùng Nhà Văn hóa Thanh thiếu nhi TP. Đồng Nai.', descEn: 'Operated with the Đồng Nai City Youth Cultural Centre.' },
    { vi: 'Campus Sunrise', en: 'Sunrise campus', addrVi: 'Xã Bình Minh, TP. Đồng Nai', addrEn: 'Bình Minh, Đồng Nai', descVi: 'Hồ bơi và khu đào tạo.', descEn: 'Pool and training facility.' },
  ];

  return (
    <>
      <section className="pt-28 pb-24 bg-brand-navy text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 leading-none rotate-180">
          <svg viewBox="0 0 1440 50" className="w-full h-8 md:h-12" preserveAspectRatio="none">
            <path d="M0,26 C240,52 480,0 720,13 C960,26 1200,52 1440,26 L1440,50 L0,50 Z" fill="#F9FAFB" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-brand-blue/40 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
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
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              {tr(growth_subtitle, 'Every course ends with an individual progress review and a wrap-up with the school, so the changes below are documented, not just promised.')}
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
            {tr(campuses_title, 'Our campuses')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {tr(campuses_subtitle, 'Three training sites serving students across Đồng Nai.')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {campuses.map((campus, i) => {
            const Icon = CAMPUS_ICONS[i] || Building2;
            return (
              <motion.div key={campus.vi} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} className="rounded-3xl border border-gray-100 bg-gray-50 p-8">
                <div className="w-14 h-14 rounded-2xl bg-brand-blue text-white flex items-center justify-center mb-6">
                  <Icon size={26} />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-2">{tr(campus.vi, campus.en)}</h3>
                <div className="flex items-center gap-2 text-brand-blue font-medium mb-3">
                  <MapPin size={18} />
                  <span>{tr(campus.addrVi, campus.addrEn)}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{tr(campus.descVi, campus.descEn)}</p>
                {'map' in campus && campus.map && (
                  <a href={campus.map as string} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 mt-4 text-sm font-heading font-semibold text-brand-blue hover:text-brand-blue-dark">
                    {tr('Chỉ đường', 'Directions')} →
                  </a>
                )}
              </motion.div>
            );
          })}
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
            {tr('Đa dạng lĩnh vực hoạt động', 'A wide range of activities')}
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
                  loading="lazy"
                  decoding="async"
                  src={item.img}
                  alt={tr(item.vi, item.en)}
                  className="w-full h-full object-cover object-[center_30%] group-hover:scale-[1.04] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute bottom-3 left-0 right-0 text-white text-xs md:text-sm font-heading font-bold px-2">
                  {tr(item.vi, item.en)}
                </span>
              </motion.div>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-500">
            {tr('Ảnh minh họa, tuân thủ chính sách bảo vệ trẻ em.', 'Illustrations, in line with our child protection policy.')}
          </p>
        </motion.div>
      </div>
    </section>
    </>
  );
};
