import React, { useState } from 'react';
import { useEditMode } from '../../contexts/EditModeContext';
import { Save, RotateCcw, Plus, Layout, Languages, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { translateSections } from '../../lib/gemini';

const availableSections = [
  { type: 'HeroSection', label: 'Hero Banner' },
  { type: 'PhilosophySection', label: 'Triết lý (3 cột)' },
  { type: 'ProgramsSection', label: 'Khóa học nổi bật' },
  { type: 'FacilitiesSection', label: 'Cơ sở vật chất' },
  { type: 'ProgramHeroSection', label: 'Banner Khóa học' },
  { type: 'ProgramContentSection', label: 'Nội dung Khóa học' },
  { type: 'ProgramCurriculumSection', label: 'Lộ trình học' },
  { type: 'ProgramFAQSection', label: 'Câu hỏi thường gặp' },
];

export const EditModeBar = () => {
  const { isEditMode, hasChanges, saveChanges, discardChanges, pageData, setPageData } = useEditMode();
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  if (!isEditMode) return null;

  const handleAddSection = (type: string) => {
    if (!pageData) return;
    const newSection = {
      id: `${type.toLowerCase()}-${Date.now()}`,
      type: type,
      props: {}
    };
    setPageData({ ...pageData, sections: [...pageData.sections, newSection] });
    setShowAddMenu(false);
  };

  const handleAutoTranslate = async () => {
    if (!pageData) return;
    const isEnPage = pageData.slug?.endsWith('-en');
    if (!isEnPage) {
      alert('Tính năng dịch tự động chỉ hoạt động khi bạn đang xem trang Tiếng Anh (EN). Vui lòng chuyển ngôn ngữ sang EN trước.');
      return;
    }

    setIsTranslating(true);
    try {
      const translatedSections = await translateSections(pageData.sections);
      setPageData({ ...pageData, sections: translatedSections });
      alert('✅ Đã dịch xong toàn bộ nội dung! Vui lòng kiểm tra lại rồi bấm "Xuất bản".');
    } catch (err: any) {
      alert('❌ Lỗi khi dịch: ' + (err.message || 'Không kết nối được Gemini API. Vui lòng thử lại.'));
    } finally {
      setIsTranslating(false);
    }
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

          {/* Auto-translate button */}
          <button
            onClick={handleAutoTranslate}
            disabled={isTranslating}
            className="flex items-center gap-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-lg transition-colors font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            title="Dịch toàn bộ nội dung trang sang Tiếng Anh bằng Gemini AI"
          >
            {isTranslating 
              ? <><Loader2 size={18} className="animate-spin" /> Đang dịch...</>
              : <><Languages size={18} /> ✨ Tự động dịch EN</>
            }
          </button>
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
