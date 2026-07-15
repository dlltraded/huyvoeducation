import React from 'react';
import { useEditMode } from '../../contexts/EditModeContext';
import { ArrowUp, ArrowDown, Trash2 } from 'lucide-react';

interface SectionWrapperProps {
  sectionId: string;
  index: number;
  type: string;
  children: React.ReactNode;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ sectionId, index, type, children }) => {
  const { isEditMode, moveSection, deleteSection } = useEditMode();

  if (!isEditMode) return <>{children}</>;

  return (
    <div className="relative group">
      <div className="absolute inset-0 border-2 border-dashed border-transparent group-hover:border-blue-400 group-hover:bg-blue-50/5 pointer-events-none z-40 transition-colors"></div>
      
      {/* Toolbar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity z-50 flex items-center bg-white shadow-xl border border-gray-200 rounded-t-lg overflow-hidden pointer-events-auto">
        <div className="px-3 py-1.5 bg-gray-50 border-r border-gray-200 text-xs font-semibold text-gray-500 font-mono">
          {type}
        </div>
        <button 
          onClick={() => moveSection(index, 'up')}
          className="p-2 text-gray-600 hover:text-brand-blue hover:bg-blue-50 transition-colors"
          title="Di chuyển lên"
        >
          <ArrowUp size={16} />
        </button>
        <button 
          onClick={() => moveSection(index, 'down')}
          className="p-2 text-gray-600 hover:text-brand-blue hover:bg-blue-50 transition-colors border-l border-gray-100"
          title="Di chuyển xuống"
        >
          <ArrowDown size={16} />
        </button>
        <button 
          onClick={() => {
            if(window.confirm('Bạn có chắc muốn xóa section này?')) deleteSection(index);
          }}
          className="p-2 text-red-500 hover:bg-red-50 transition-colors border-l border-gray-100"
          title="Xóa section"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="relative z-0">
        {children}
      </div>
    </div>
  );
};
