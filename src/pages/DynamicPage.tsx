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
import { RegistrationForm } from '../components/RegistrationForm';

const sectionMap: Record<string, React.FC<any>> = {
  'HeroSection': HeroSection,
  'PhilosophySection': PhilosophySection,
  'ProgramsSection': ProgramsSection,
  'FacilitiesSection': FacilitiesSection,
  'ProgramHeroSection': ProgramHeroSection,
  'ProgramContentSection': ProgramContentSection
};

interface DynamicPageProps {
  slug: string;
}

export const DynamicPage: React.FC<DynamicPageProps> = ({ slug }) => {
  const { t } = useOutletContext<any>();
  const [loading, setLoading] = useState(true);
  const { pageData, setPageData, isEditMode } = useEditMode();

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (data) {
        setPageData(data);
      }
      setLoading(false);
    };

    fetchPage();
  }, [slug]);

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
          <p className="text-gray-600 text-lg">Trang không tồn tại hoặc chưa được xuất bản.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{pageData.title} | Huy Võ Education</title>
      </Helmet>

      {/* Render Dynamic Sections */}
      {pageData.sections.map((section: any, index: number) => {
        const SectionComponent = sectionMap[section.type];
        if (!SectionComponent) return null;
        
        return (
          <SectionWrapper key={section.id} sectionId={section.id} index={index} type={section.type}>
            <SectionComponent props={section.props} sectionId={section.id} />
          </SectionWrapper>
        );
      })}

      {/* Always render Registration Form at the bottom for now */}
      <RegistrationForm t={t} />
    </>
  );
};
