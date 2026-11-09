import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useOutletContext } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';
import { useEditMode } from '../contexts/EditModeContext';
import { SectionWrapper } from '../components/editor/SectionWrapper';

import { HeroSection } from '../components/sections/HeroSection';
import { PhilosophySection } from '../components/sections/PhilosophySection';
import { ProgramsSection } from '../components/sections/ProgramsSection';
import { FacilitiesSection } from '../components/sections/FacilitiesSection';
import { ProgramHeroSection } from '../components/sections/ProgramHeroSection';
import { ProgramContentSection } from '../components/sections/ProgramContentSection';
import { ProgramCurriculumSection } from '../components/sections/ProgramCurriculumSection';
import { ProgramFAQSection } from '../components/sections/ProgramFAQSection';
import { RegistrationForm } from '../components/RegistrationForm';
import { ForSchoolsSection } from '../components/sections/ForSchoolsSection';
import { SafetySection } from '../components/sections/SafetySection';
import { useSettings } from '../contexts/SettingsContext';

const sectionMap: Record<string, React.FC<any>> = {
  'HeroSection': HeroSection,
  'PhilosophySection': PhilosophySection,
  'ProgramsSection': ProgramsSection,
  'FacilitiesSection': FacilitiesSection,
  'ProgramHeroSection': ProgramHeroSection,
  'ProgramContentSection': ProgramContentSection,
  'ProgramCurriculumSection': ProgramCurriculumSection,
  'ProgramFAQSection': ProgramFAQSection
};

interface DynamicPageProps {
  slug: string;
}

export const DynamicPage: React.FC<DynamicPageProps> = ({ slug }) => {
  const { t, lang } = useOutletContext<any>();
  const [loading, setLoading] = useState(true);
  const { pageData, setPageData, isEditMode } = useEditMode();
  const { settings } = useSettings();

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      const targetSlug = lang === 'en' ? `${slug}-en` : slug;
      
      let { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', targetSlug)
        .single();
      
      if (data) {
        setPageData(data);
      } else if (lang === 'en') {
        // Fallback to Vietnamese if English page doesn't exist yet
        const { data: fallbackData } = await supabase
          .from('pages')
          .select('*')
          .eq('slug', slug)
          .single();
          
        if (fallbackData) {
          // Set to fallback data, but change slug so saving creates the English version
          setPageData({ ...fallbackData, slug: targetSlug });
        } else {
          setPageData(null);
        }
      } else {
        setPageData(null);
      }
      setLoading(false);
    };

    fetchPage();
  }, [slug, lang]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex justify-center items-center bg-gray-50">
        <Loader2 className="animate-spin text-brand-blue w-12 h-12" />
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex justify-center items-center bg-gray-50 text-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-gray-600 text-lg">{t('Trang không tồn tại hoặc chưa được xuất bản.', 'Page not found or not yet published.')}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        {/* Helmet needs a single string child; JSX text + expression breaks the title. */}
        <title>{slug === 'home'
          ? t('Huy Võ Education | Đối tác ngoại khóa cho nhà trường và phụ huynh', 'Huy Võ Education | After-school partner for schools and parents')
          : `${pageData.title} | Huy Võ Education`}</title>
      </Helmet>

      {/* Render Dynamic Sections */}
      {pageData.sections.map((section: any, index: number) => {
        const SectionComponent = sectionMap[section.type];
        if (!SectionComponent) return null;

        return (
          <SectionWrapper key={section.id} sectionId={section.id} index={index} type={section.type}>
            <SectionComponent props={section.props} sectionId={section.id} t={t} lang={lang} />
          </SectionWrapper>
        );
      })}

      {/* Homepage-only blocks from the HVE Company Profile 2026 (not CMS-managed) */}
      {slug === 'home' && (
        <>
          <ForSchoolsSection t={t} phone={settings.phone} email={settings.email} />
          <SafetySection t={t} />
        </>
      )}

      {/* Always render Registration Form at the bottom for now */}
      <RegistrationForm t={t} />
    </>
  );
};
