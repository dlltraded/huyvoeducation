import React, { useState } from 'react';
import { useEditMode } from '../../contexts/EditModeContext';
import { Save, RotateCcw, Plus, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const availableSections = [
  { type: 'HeroSection', label: 'Hero Banner' },
  { type: 'PhilosophySection', label: 'Triết lý (3 cột)' },
  { type: 'ProgramsSection', label: 'Khóa học nổi bật' },
  { type: 'FacilitiesSection', label: 'Cơ sở vật chất' },
  { type: 'ProgramHeroSection', label: 'Banner Khóa học' },
  { type: 'ProgramContentSection', label: 'Nội dung Khóa học' }
];

export const EditModeBar = () => {
  const { isEditMode, hasChanges, saveChanges, discardChanges, pageData, setPageData } = useEditMode();
  const [showAddMenu, setShowAddMenu] = useState(false);

  if (!isEditMode) return null;

  const handleAddSection = (type: string) => {
    if (!pageData) return;
    const newSection = {
      id: `${type.toLowerCase()}-${Date.now()}`,
      type: type,
      props: {} // default empty props, component should handle fallbacks
    };
    
    setPageData({
      ...pageData,
      sections: [...pageData.sections, newSection]
    });
    setShowAddMenu(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="fixed bottom-0 left-0 right-0 z-[90] bg-white border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] px-6 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-blue-50 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold border border-blue-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
            </span>
            ĐANG CHỈNH SỬA
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              <Plus size={18} /> Thêm Section
            </button>
            
            {showAddMenu && (
              <div className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                <div className="px-4 py-2 border-b border-gray-50 mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Chọn khối giao diện</span>
                </div>
                {availableSections.map((sec) => (
                  <button
                    key={sec.type}
                    onClick={() => handleAddSection(sec.type)}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700 hover:text-brand-blue transition-colors flex items-center gap-3"
                  >
                    <Layout size={16} className="text-gray-400" />
                    <span className="text-sm font-medium">{sec.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {hasChanges && (
            <span className="text-sm font-medium text-amber-600 mr-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> Chưa lưu
            </span>
          )}
          
          <button
            onClick={discardChanges}
            disabled={!hasChanges}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
              hasChanges 
                ? 'text-gray-700 hover:bg-gray-100 bg-white border border-gray-200' 
                : 'text-gray-400 bg-gray-50 cursor-not-allowed border border-transparent'
            }`}
          >
            <RotateCcw size={18} /> Hủy thay đổi
          </button>
          
          <button
            onClick={saveChanges}
            disabled={!hasChanges}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold transition-all shadow-sm ${
              hasChanges 
                ? 'bg-brand-green hover:bg-green-600 text-white shadow-green-500/20 hover:shadow-green-500/40 hover:-translate-y-0.5' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Save size={18} /> Xuất bản ({hasChanges ? 'Có thay đổi' : 'Đã lưu'})
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
