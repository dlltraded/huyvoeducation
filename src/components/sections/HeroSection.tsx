import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EditableText } from '../editor/EditableText';

// Curated, authentically-Vietnamese photography (Pexels, free commercial use),
// matched to each program theme, plus attention-grabbing bilingual copy.
const DEFAULT_SLIDES = [
  {
    image: 'https://images.pexels.com/photos/30481773/pexels-photo-30481773.jpeg?auto=compress&cs=tinysrgb&w=1920',
    kicker: { vi: 'HUY VÕ EDUCATION', en: 'HUY VO EDUCATION' },
    headlineTop: { vi: 'HÀNH TRANG VỮNG VÀNG CHO', en: 'A STRONG FOUNDATION FOR' },
    headlineHighlight: { vi: 'CON TỰ TIN VÀO ĐỜI', en: "YOUR CHILD'S FUTURE" },
    subtitle: {
      vi: 'Hệ sinh thái giáo dục kỹ năng sống sau giờ học — nơi con được là chính mình và trưởng thành mỗi ngày.',
      en: 'An after-school life-skills ecosystem — where your child grows, plays, and thrives every single day.',
    },
    ctaText: { vi: 'Đăng Ký Đào Tạo', en: 'Enroll Now' },
    ctaLink: '/#register',
  },
  {
    image: 'https://images.pexels.com/photos/6777314/pexels-photo-6777314.jpeg?auto=compress&cs=tinysrgb&w=1920',
    kicker: { vi: 'VÕ THUẬT & KỸ NĂNG TỰ VỆ', en: 'MARTIAL ARTS & SELF-DEFENSE' },
    headlineTop: { vi: 'RÈN BẢN LĨNH TỪ', en: 'BUILD RESILIENCE WITH' },
    headlineHighlight: { vi: 'VÕ CỔ TRUYỀN VIỆT NAM', en: "VIETNAM'S OWN VOVINAM" },
    subtitle: {
      vi: 'Vovinam giúp con rèn sức khoẻ, kỷ luật và sự tự tin — những giá trị theo con suốt cuộc đời.',
      en: 'Vovinam builds strength, discipline, and confidence — values that stay with your child for life.',
    },
    ctaText: { vi: 'Khám phá lớp Võ thuật', en: 'Explore Martial Arts' },
    ctaLink: '/chuong-trinh/vovinam',
  },
  {
    image: 'https://images.pexels.com/photos/31022969/pexels-photo-31022969.jpeg?auto=compress&cs=tinysrgb&w=1920',
    kicker: { vi: 'NGHỆ THUẬT & BIỂU DIỄN', en: 'ARTS & PERFORMANCE' },
    headlineTop: { vi: 'THẮP SÁNG', en: 'IGNITE' },
    headlineHighlight: { vi: 'ĐAM MÊ NGHỆ THUẬT TRONG CON', en: "YOUR CHILD'S PASSION FOR THE ARTS" },
    subtitle: {
      vi: 'Từ những bước nhảy đầu tiên đến sân khấu lớn — Huy Võ đồng hành cùng con khám phá năng khiếu nghệ thuật.',
      en: "From first steps to the big stage — we help your child discover their artistic talent.",
    },
    ctaText: { vi: 'Khám phá lớp Nghệ thuật', en: 'Explore Arts Classes' },
    ctaLink: '/chuong-trinh/nhay-hien-dai',
  },
  {
    image: 'https://images.pexels.com/photos/35180899/pexels-photo-35180899.jpeg?auto=compress&cs=tinysrgb&w=1920',
    kicker: { vi: 'THỂ THAO ĐỒNG ĐỘI', en: 'TEAM SPORTS' },
    headlineTop: { vi: 'RÈN THỂ LỰC,', en: 'BUILD STRENGTH,' },
    headlineHighlight: { vi: 'NUÔI DƯỠNG TINH THẦN ĐỒNG ĐỘI', en: 'NURTURE TEAM SPIRIT' },
    subtitle: {
      vi: 'Bóng đá và các môn thể thao đồng đội giúp con khoẻ mạnh, đoàn kết và học cách vượt qua thử thách.',
      en: 'Football and team sports keep kids healthy, united, and ready to overcome any challenge.',
    },
    ctaText: { vi: 'Khám phá lớp Bóng đá', en: 'Explore Football' },
    ctaLink: '/chuong-trinh/bong-da',
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
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: AUTO_ADVANCE_MS / 1000 + 1, ease: 'linear' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 md:from-black/60 via-black/10 to-transparent" />
        </motion.div>
      </AnimatePresence>

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

            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-white mb-3 drop-shadow-lg">
              {title ? (
                <EditableText tag="span" value={title} sectionId={sectionId} path="title" />
              ) : (
                <>
                  <span className="block">{tr(slide.headlineTop?.vi, slide.headlineTop?.en)}</span>
                  <span className="inline-block bg-brand-blue px-3 py-1 mt-2 -ml-1 rounded-md">
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
                to="/#register"
                className="group bg-brand-yellow hover:bg-amber-400 text-gray-900 px-7 py-3.5 rounded-full font-heading font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                {ctaOverride || tr(slide.ctaText?.vi, slide.ctaText?.en)}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              {slide.ctaLink && slide.ctaLink !== '/#register' && (
                <Link
                  to="/#register"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm px-7 py-3.5 rounded-full font-heading font-semibold transition-all flex items-center justify-center"
                >
                  {tr('Đăng Ký Đào Tạo', 'Enroll Now')}
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
