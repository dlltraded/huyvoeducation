import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface EditModeContextType {
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  pageData: any;
  setPageData: (data: any) => void;
  originalData: any;
  hasChanges: boolean;
  saveChanges: () => Promise<void>;
  discardChanges: () => void;
  updateField: (sectionId: string, path: string, value: any) => void;
  moveSection: (index: number, direction: 'up' | 'down') => void;
  deleteSection: (index: number) => void;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export const EditModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [pageData, setPageData] = useState<any>(null);
  const [originalData, setOriginalData] = useState<any>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Helper to safely deeply update object
  const setDeep = (obj: any, path: string, value: any): any => {
    const parts = path.split(/[.\[\]]/).filter(Boolean);
    const newObj = Array.isArray(obj) ? [...obj] : { ...obj };
    let current = newObj;
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] = isNaN(Number(parts[i + 1])) ? {} : [];
      }
      current[part] = Array.isArray(current[part]) ? [...current[part]] : { ...current[part] };
      current = current[part];
    }
    current[parts[parts.length - 1]] = value;
    return newObj;
  };

  const updateField = (sectionId: string, path: string, value: any) => {
    if (!pageData) return;
    const newSections = pageData.sections.map((sec: any) => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          props: setDeep(sec.props || {}, path, value)
        };
      }
      return sec;
    });
    setPageData({ ...pageData, sections: newSections });
    setHasChanges(true);
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (!pageData) return;
    const newSections = [...pageData.sections];
    if (direction === 'up' && index > 0) {
      [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
      setPageData({ ...pageData, sections: newSections });
      setHasChanges(true);
    } else if (direction === 'down' && index < newSections.length - 1) {
      [newSections[index + 1], newSections[index]] = [newSections[index], newSections[index + 1]];
      setPageData({ ...pageData, sections: newSections });
      setHasChanges(true);
    }
  };

  const deleteSection = (index: number) => {
    if (!pageData) return;
    const newSections = pageData.sections.filter((_: any, i: number) => i !== index);
    setPageData({ ...pageData, sections: newSections });
    setHasChanges(true);
  };

  const saveChanges = async () => {
    if (!pageData || !pageData.slug) return;
    const { error } = await supabase
      .from('pages')
      .upsert({ 
         slug: pageData.slug,
         title: pageData.title || pageData.slug,
         sections: pageData.sections,
         updated_at: new Date().toISOString()
      });
      
    if (!error) {
      setOriginalData(pageData);
      setHasChanges(false);
      alert('Đã lưu thay đổi thành công!');
    } else {
      alert('Lỗi khi lưu: ' + error.message);
    }
  };

  const discardChanges = () => {
    setPageData(originalData);
    setHasChanges(false);
  };

  // Sync incoming original data (used when DynamicPage fetches)
  const setInitialData = (data: any) => {
    if (!isEditMode) {
       // Only update if we aren't in edit mode or haven't made changes yet
       // To avoid overwriting during navigation, we should let DynamicPage control it
    }
  };

  return (
    <EditModeContext.Provider value={{
      isEditMode, setIsEditMode,
      pageData, setPageData: (data) => {
        setPageData(data);
        if (!originalData || data?.slug !== originalData?.slug) {
          setOriginalData(data);
          setHasChanges(false);
        }
      },
      originalData, hasChanges,
      saveChanges, discardChanges,
      updateField, moveSection, deleteSection
    }}>
      {children}
    </EditModeContext.Provider>
  );
};

export const useEditMode = () => {
  const context = useContext(EditModeContext);
  if (!context) throw new Error('useEditMode must be used within an EditModeProvider');
  return context;
};
