import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EditableText } from '../editor/EditableText';

export const ProgramContentSection = ({ props, sectionId }: { props: any, sectionId: string }) => {
  const title = props?.title || 'Tiêu đề nội dung';
  const subtitle = props?.subtitle || 'Đoạn mô tả chi tiết';
  const items = props?.items || ['Điểm nhấn 1', 'Điểm nhấn 2', 'Điểm nhấn 3'];
  const cta_text = props?.cta_text || 'Đăng ký ngay';
  const cta_link = props?.cta_link || '/#register';

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
            <EditableText tag="span" value={title} sectionId={sectionId} path="title" />
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed text-left md:text-center whitespace-pre-wrap">
            <EditableText tag="span" value={subtitle} sectionId={sectionId} path="subtitle" />
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 text-left max-w-3xl mx-auto bg-gray-50 p-8 rounded-3xl">
            {items.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-3 text-gray-700 font-medium">
                <CheckCircle2 className="text-brand-green w-6 h-6 flex-shrink-0 mt-0.5" />
                <span><EditableText tag="span" value={item} sectionId={sectionId} path={`items[${i}]`} /></span>
              </div>
            ))}
          </div>
          
          {cta_text && (
            <div className="mt-12">
              <Link to={cta_link} className="inline-flex items-center gap-2 bg-brand-blue text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 hover:shadow-xl transition-all hover:-translate-y-1">
                <EditableText tag="span" value={cta_text} sectionId={sectionId} path="cta_text" /> <ArrowRight size={20} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
