import React, { useState, useEffect, useCallback, useRef } from 'react';
import { IllustrationTag } from '../IllustrationTag';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EditableText } from '../editor/EditableText';

// Slides follow the HVE Company Profile 2026: tagline, then services 01–03.
// Photography: Pexels, free commercial use.
const DEFAULT_SLIDES = [
  {
    image: 'https://images.pexels.com/photos/30481773/pexels-photo-30481773.jpeg?auto=compress&cs=tinysrgb&w=1920',
    kicker: { vi: 'HUY VÕ EDUCATION', en: 'HUY VO EDUCATION' },
    headlineTop: { vi: 'SAU TIẾNG CHUÔNG TAN TRƯỜNG,', en: 'AFTER THE SCHOOL BELL RINGS,' },
    headlineHighlight: { vi: 'MỘT THẾ GIỚI ĐANG LỚN LÊN', en: 'A WHOLE WORLD IS GROWING UP' },
    subtitle: {
      vi: 'Đối tác ngoại khóa của nhà trường, học sinh và phụ huynh.',
      en: 'The after-school partner for schools, students and parents.',
    },
    ctaText: { vi: 'Đăng Ký Đào Tạo', en: 'Enroll Now' },
    ctaLink: '/#register',
  },
  {
    image: 'https://images.pexels.com/photos/6777314/pexels-photo-6777314.jpeg?auto=compress&cs=tinysrgb&w=1920',
    kicker: { vi: 'CCA TẠI TRƯỜNG', en: 'ON-CAMPUS CCA' },
    headlineTop: { vi: 'TIẾNG CHUÔNG VỪA DỨT,', en: 'THE BELL RINGS,' },
    headlineHighlight: { vi: 'LỚP HỌC MỚI BẮT ĐẦU', en: 'A NEW CLASS BEGINS' },
    subtitle: {
      vi: 'HVE triển khai trọn gói chương trình ngoại khóa ngay tại trường: danh mục hoạt động, giáo viên, ghi danh, vận hành lớp và báo cáo.',
      en: 'HVE runs complete co-curricular programmes on your campus: activities, instructors, enrolment, delivery and reporting.',
    },
    ctaText: { vi: 'Dành cho nhà trường', en: 'For schools' },
    ctaLink: '/#nha-truong',
  },
  {
    image: 'https://images.pexels.com/photos/35180899/pexels-photo-35180899.jpeg?auto=compress&cs=tinysrgb&w=1920',
    kicker: { vi: 'KỸ NĂNG SỐNG · KHÓA HÈ · THỂ THAO', en: 'LIFE SKILLS · SUMMER CAMPS · SPORTS' },
    headlineTop: { vi: 'THẾ GIỚI ẤY TIẾP TỤC LỚN LÊN', en: 'THAT WORLD KEEPS GROWING' },
    headlineHighlight: { vi: 'TẠI CAMPUS HVE', en: 'AT HVE CAMPUSES' },
    subtitle: {
      vi: 'Lớp kỹ năng sống, khóa hè, dạy bơi và thể thao theo lộ trình từng độ tuổi. Mỗi khóa học có mục tiêu và đánh giá rõ ràng.',
      en: 'Life-skills classes, summer camps, swimming and sports on age-based pathways. Every course has clear objectives and assessment.',
    },
    ctaText: { vi: 'Xem lĩnh vực hoạt động', en: 'See activity areas' },
    ctaLink: '/chuong-trinh',
  },
  {
    image: 'https://images.pexels.com/photos/31022969/pexels-photo-31022969.jpeg?auto=compress&cs=tinysrgb&w=1920',
    kicker: { vi: 'FIELD TRIP · LỮ HÀNH GIÁO DỤC', en: 'FIELD TRIPS · EDUCATIONAL TRAVEL' },
    headlineTop: { vi: 'CÓ NHỮNG BÀI HỌC', en: 'SOME LESSONS LIE' },
    headlineHighlight: { vi: 'NẰM NGOÀI CỔNG TRƯỜNG', en: 'BEYOND THE SCHOOL GATE' },
    subtitle: {
      vi: 'Chuyến đi học tập trọn gói, từ mục tiêu bài học đến xe, bữa ăn, an toàn và báo cáo, theo giấy phép lữ hành nội địa của HVE.',
      en: "End-to-end learning trips, from objectives to transport, meals, safety and reporting, under HVE's own domestic tour licence.",
    },
    ctaText: { vi: 'Tìm hiểu field trip', en: 'About field trips' },
    ctaLink: '/#nha-truong',
  },
];

const AUTO_ADVANCE_MS = 6000;

export const HeroSection = ({ props, sectionId, t }: { props: any, sectionId: string, t?: any }) => {
  const tr = t || ((vi: string) => vi);

  // Slide 0's copy stays CMS-editable (title/subtitle/cta_text/badge_text/hero_image);
  // the remaining slides are curated program spotlights.
  const slides = props?.slides && Array.isArray(props.slides) && props.slides.length > 0
    ? props.slides
    : DEFAULT_SLIDES;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex(((i % slides.length) + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex(i => (i + 1) % slides.length);
    }, AUTO_ADVANCE_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, slides.length]);

  const slide = slides[index];
  const title = index === 0 && props?.title ? props.title : null;
  const subtitleOverride = index === 0 && props?.subtitle ? props.subtitle : null;
  const ctaOverride = index === 0 && props?.cta_text ? props.cta_text : null;
  const imageOverride = index === 0 && props?.hero_image ? props.hero_image : null;
  const badgeOverride = index === 0 && props?.badge_text ? props.badge_text : null;

  return (
    <section
      className="relative h-[92vh] min-h-[600px] max-h-[920px] flex items-end overflow-hidden bg-gray-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          <motion.img
            src={imageOverride || slide.image}
            alt={tr(slide.kicker?.vi, slide.kicker?.en)}
            className="w-full h-full object-cover object-[center_30%]"
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: AUTO_ADVANCE_MS / 1000 + 1, ease: 'linear' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 md:from-black/60 via-black/10 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <IllustrationTag t={tr} className="top-28 right-6 md:right-8" />

      {/* Prev / next arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white items-center justify-center transition-colors"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white items-center justify-center transition-colors"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 pt-40 md:pb-28 md:pt-44">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-wide mb-5 w-max">
              <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
              {badgeOverride || tr(slide.kicker?.vi, slide.kicker?.en)}
            </div>

            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.15] text-white mb-5 drop-shadow-lg">
              {title ? (
                <EditableText tag="span" value={title} sectionId={sectionId} path="title" />
              ) : (
                <>
                  <span className="block mb-2">{tr(slide.headlineTop?.vi, slide.headlineTop?.en)}</span>
                  <span className="inline bg-brand-blue px-3 py-0.5 -ml-1 rounded-md leading-[1.45] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                    {tr(slide.headlineHighlight?.vi, slide.headlineHighlight?.en)}
                  </span>
                </>
              )}
            </h1>

            <p className="text-base md:text-lg text-white/90 mb-8 max-w-xl leading-relaxed">
              {subtitleOverride || tr(slide.subtitle?.vi, slide.subtitle?.en)}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to={ctaOverride ? '/#phu-huynh' : (slide.ctaLink === '/#register' ? '/#phu-huynh' : (slide.ctaLink || '/#phu-huynh'))}
                className="group bg-brand-blue hover:bg-brand-blue-dark text-white px-7 py-3.5 rounded-full font-heading font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                {ctaOverride || tr(slide.ctaText?.vi, slide.ctaText?.en)}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              {slide.ctaLink && slide.ctaLink !== '/#register' && (
                <Link
                  to="/#lien-he"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm px-7 py-3.5 rounded-full font-heading font-semibold transition-all flex items-center justify-center"
                >
                  {tr('Liên hệ HVE', 'Contact HVE')}
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        {slides.length > 1 && (
          <div className="flex items-center gap-2 mt-12 md:mt-16">
            {slides.map((_: any, i: number) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className="group py-2"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-10 bg-brand-yellow' : 'w-4 bg-white/40 group-hover:bg-white/60'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 leading-none z-10 pointer-events-none">
        <svg viewBox="0 0 1440 50" className="w-full h-8 md:h-12" preserveAspectRatio="none">
          <path d="M0,26 C240,52 480,0 720,13 C960,26 1200,52 1440,26 L1440,50 L0,50 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
};
