import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { EditableText } from '../editor/EditableText';

const defaultFaqs = [
  { q: 'Độ tuổi phù hợp để bắt đầu là bao nhiêu?', a: 'Chương trình được thiết kế cho trẻ từ 5 đến 15 tuổi. Mỗi cấp độ phù hợp với một nhóm tuổi khác nhau để đảm bảo nội dung học tập phù hợp với sự phát triển tự nhiên của trẻ.' },
  { q: 'Một buổi học kéo dài bao lâu?', a: 'Mỗi buổi học kéo dài từ 60-90 phút. Lịch học thường được sắp xếp vào các buổi chiều sau giờ học hoặc cuối tuần, linh hoạt theo nhu cầu của gia đình.' },
  { q: 'Lớp học có bao nhiêu học sinh?', a: 'Sĩ số mỗi lớp giới hạn từ 8-12 học sinh để đảm bảo giáo viên có thể quan tâm đến từng em một cách tốt nhất.' },
  { q: 'Học phí như thế nào?', a: 'Học phí được tính theo tháng hoặc theo khóa học. Gia đình vui lòng liên hệ trực tiếp để được tư vấn học phí phù hợp và các gói ưu đãi hiện có.' },
  { q: 'Có thể học thử trước khi đăng ký không?', a: 'Có! Huy Võ Education cung cấp 1 buổi học thử MIỄN PHÍ để phụ huynh và các bé có thể trải nghiệm trực tiếp chất lượng giảng dạy trước khi quyết định đăng ký.' },
];

export const ProgramFAQSection = ({ props, sectionId, t }: { props: any; sectionId: string; t?: any }) => {
  const title = props?.title || 'Câu hỏi thường gặp';
  const faqs = props?.faqs || defaultFaqs;
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            <EditableText tag="span" value={title} sectionId={sectionId} path="title" />
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="border border-gray-200 rounded-2xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left font-heading font-semibold text-gray-900 hover:bg-gray-50 transition-colors gap-4"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <EditableText tag="span" value={faq.q} sectionId={sectionId} path={`faqs[${i}].q`} />
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 text-brand-blue transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      <EditableText tag="span" value={faq.a} sectionId={sectionId} path={`faqs[${i}].a`} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
