import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Award } from 'lucide-react';

import learnImg from '../../assets/images/learn_philosophy.png';
import connectImg from '../../assets/images/connect_philosophy.png';
import growImg from '../../assets/images/grow_philosophy.png';
import { EditableText } from '../editor/EditableText';
import { EditableImage } from '../editor/EditableImage';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export const PhilosophySection = ({ props, sectionId }: { props: any, sectionId: string }) => {
  const title = props?.title || 'Ba mẹ có biết, khoảng thời gian sau giờ học quyết định rất lớn đến sự tự tin của trẻ?';
  const subtitle = props?.subtitle || 'Chúng tôi không xây dựng một trung tâm cho một môn học riêng lẻ. Chúng tôi xây dựng một Hệ sinh thái xoay quanh người học, với triết lý cốt lõi:';

  const items = props?.items || [
    { 
      title: 'LEARN', 
      Icon: BookOpen,
      icon_name: 'BookOpen',
      img: learnImg,
      desc: 'Khơi dậy đam mê học hỏi qua trải nghiệm thực tế.',
      details: 'Chúng tôi tin rằng mọi đứa trẻ đều có sẵn sự tò mò...',
      color: 'text-brand-blue',
      bg: 'bg-blue-50'
    },
    { 
      title: 'CONNECT', 
      Icon: Users,
      icon_name: 'Users',
      img: connectImg,
      desc: 'Xây dựng kỹ năng xã hội và sự thấu cảm.',
      details: 'Không ai lớn lên một mình...',
      color: 'text-brand-green',
      bg: 'bg-green-50'
    },
    { 
      title: 'GROW', 
      Icon: Award,
      icon_name: 'Award',
      img: growImg,
      desc: 'Trưởng thành toàn diện từ thể chất đến tinh thần.',
      details: 'Sự trưởng thành không chỉ là điểm số...',
      color: 'text-yellow-600',
      bg: 'bg-yellow-50'
    }
  ];

  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-heading font-bold mb-6 text-gray-900">
            <EditableText tag="span" value={title} sectionId={sectionId} path="title" />
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-gray-500">
            <EditableText tag="span" value={subtitle} sectionId={sectionId} path="subtitle" />
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item: any, i: number) => {
            const Icon = item.icon_name === 'Users' ? Users : (item.icon_name === 'Award' ? Award : BookOpen);
            return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2, duration: 0.6 }}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/40 hover:-translate-y-2 transition-transform duration-300 flex flex-col"
            >
              <div className="h-48 overflow-hidden relative">
                <EditableImage src={item.img} alt={item.title} className="w-full h-full object-cover" sectionId={sectionId} path={`items[${i}].img`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className={`absolute bottom-4 left-4 w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shadow-lg`}>
                  <Icon size={24} />
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-heading font-bold mb-3">
                  <EditableText tag="span" value={item.title} sectionId={sectionId} path={`items[${i}].title`} />
                </h3>
                <p className={`font-semibold ${item.color} mb-4`}>
                  <EditableText tag="span" value={item.desc} sectionId={sectionId} path={`items[${i}].desc`} />
                </p>
                <p className="text-gray-600 leading-relaxed text-sm">
                  <EditableText tag="span" value={item.details} sectionId={sectionId} path={`items[${i}].details`} />
                </p>
              </div>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
};
