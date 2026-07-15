import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle2 } from 'lucide-react';

import sunriseImg from '../../assets/images/sunrise_campus_notext.png';
import nvhImg from '../../assets/images/nvh_campus_notext.png';
import { EditableText } from '../editor/EditableText';
import { EditableImage } from '../editor/EditableImage';

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export const FacilitiesSection = ({ props, sectionId }: { props: any, sectionId: string }) => {
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
      <section className="py-24 bg-brand-blue text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-blue-600/50 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-brand-green/30 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
        
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
      </div>
    </section>
    </>
  );
};
