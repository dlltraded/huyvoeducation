import React from 'react';
import { motion } from 'framer-motion';
import { EditableText } from '../editor/EditableText';
import { EditableImage } from '../editor/EditableImage';

export const ProgramHeroSection = ({ props, sectionId }: { props: any, sectionId: string }) => {
  const badge = props?.badge || 'PROGRAM';
  const title = props?.title || 'Tên chương trình';
  const subtitle = props?.subtitle || 'Mô tả ngắn về chương trình';
  const bg_image = props?.bg_image || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1600&auto=format&fit=crop';

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <EditableImage src={bg_image} alt={title} className="w-full h-full object-cover opacity-40 absolute inset-0" sectionId={sectionId} path="bg_image" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent pointer-events-none"></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-block bg-brand-blue text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6">
            <EditableText tag="span" value={badge} sectionId={sectionId} path="badge" />
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            <EditableText tag="span" value={title} sectionId={sectionId} path="title" />
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <EditableText tag="span" value={subtitle} sectionId={sectionId} path="subtitle" />
          </p>
        </motion.div>
      </div>
    </section>
  );
};
