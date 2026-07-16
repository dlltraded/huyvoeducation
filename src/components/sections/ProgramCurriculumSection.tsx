import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { EditableText } from '../editor/EditableText';

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

interface Level {
  badge: string;
  title: string;
  age: string;
  duration: string;
  skills: string[];
  color: string;
}

const defaultLevels: Level[] = [
  {
    badge: 'CẤP 1',
    title: 'Khám phá',
    age: '5 – 7 tuổi',
    duration: '3 tháng',
    skills: ['Làm quen với dụng cụ học tập', 'Tư duy quan sát', 'Phát triển tập trung'],
    color: 'blue'
  },
  {
    badge: 'CẤP 2',
    title: 'Phát triển',
    age: '8 – 10 tuổi',
    duration: '6 tháng',
    skills: ['Kỹ năng cốt lõi của bộ môn', 'Làm việc nhóm', 'Tư duy phản biện cơ bản'],
    color: 'green'
  },
  {
    badge: 'CẤP 3',
    title: 'Thành thạo',
    age: '11 – 15 tuổi',
    duration: '12 tháng',
    skills: ['Kỹ thuật nâng cao', 'Dự án cá nhân', 'Thi đấu / Triển lãm'],
    color: 'yellow'
  }
];

const colorMap: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  blue:   { bg: 'bg-blue-50',   text: 'text-brand-blue',    border: 'border-blue-200',   badge: 'bg-brand-blue text-white' },
  green:  { bg: 'bg-green-50',  text: 'text-brand-green',   border: 'border-green-200',  badge: 'bg-brand-green text-white' },
  yellow: { bg: 'bg-yellow-50', text: 'text-yellow-700',    border: 'border-yellow-200', badge: 'bg-yellow-400 text-white' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-700',    border: 'border-purple-200', badge: 'bg-purple-600 text-white' },
};

export const ProgramCurriculumSection = ({ props, sectionId, t }: { props: any; sectionId: string; t?: any }) => {
  const title = props?.title || 'Lộ trình học theo cấp độ';
  const subtitle = props?.subtitle || 'Mỗi cấp độ được thiết kế phù hợp với độ tuổi và khả năng tiếp thu của từng nhóm học sinh.';
  const levels: Level[] = props?.levels || defaultLevels;
  const note = props?.note || '';

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            <EditableText tag="span" value={title} sectionId={sectionId} path="title" />
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            <EditableText tag="span" value={subtitle} sectionId={sectionId} path="subtitle" />
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {levels.map((level, i) => {
            const colors = colorMap[level.color] || colorMap.blue;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className={`rounded-3xl p-8 border-2 ${colors.bg} ${colors.border} relative`}
              >
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${colors.badge}`}>
                  <EditableText tag="span" value={level.badge} sectionId={sectionId} path={`levels[${i}].badge`} />
                </span>
                <h3 className={`text-2xl font-heading font-bold mb-1 ${colors.text}`}>
                  <EditableText tag="span" value={level.title} sectionId={sectionId} path={`levels[${i}].title`} />
                </h3>
                <div className="flex gap-4 text-sm text-gray-500 mb-6 font-medium">
                  <span>👶 <EditableText tag="span" value={level.age} sectionId={sectionId} path={`levels[${i}].age`} /></span>
                  <span>⏱ <EditableText tag="span" value={level.duration} sectionId={sectionId} path={`levels[${i}].duration`} /></span>
                </div>
                <ul className="space-y-3">
                  {(level.skills || []).map((skill, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colors.text}`} />
                      <EditableText tag="span" value={skill} sectionId={sectionId} path={`levels[${i}].skills[${j}]`} />
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {note ? (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 text-center text-gray-500 text-sm italic">
            <EditableText tag="span" value={note} sectionId={sectionId} path="note" />
          </motion.div>
        ) : null}
      </div>
    </section>
  );
};
