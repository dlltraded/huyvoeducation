import React, { useState } from 'react';
import { useEditMode } from '../../contexts/EditModeContext';
import { ImagePlus, X, Check } from 'lucide-react';

interface EditableImageProps {
  sectionId: string;
  path: string;
  src: string;
  alt?: string;
  className?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  sectionId, path, src, alt = '', className = ''
}) => {
  const { isEditMode, updateField } = useEditMode();
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempUrl, setTempUrl] = useState(src);

  if (!isEditMode) {
    return <img src={src} alt={alt} className={className} />;
  }

  const handleSave = () => {
    if (tempUrl !== src) {
      updateField(sectionId, path, tempUrl);
    }
    setIsEditing(false);
  };

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ minHeight: '50px', minWidth: '50px' }}
    >
      <img src={src} alt={alt} className={`w-full h-full object-cover ${isHovered && !isEditing ? 'opacity-80' : ''}`} />
      
      {isHovered && !isEditing && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm cursor-pointer border-2 border-dashed border-blue-400 m-1 rounded transition-all"
          onClick={() => setIsEditing(true)}
        >
          <div className="bg-brand-blue text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm font-semibold shadow-lg">
            <ImagePlus size={16} /> Đổi ảnh
          </div>
        </div>
      )}

      {isEditing && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 rounded min-w-[300px]">
          <div className="bg-white p-4 rounded-xl w-full shadow-2xl flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>
            <p className="text-sm font-semibold text-gray-700">Đổi đường dẫn ảnh</p>
            <input 
              type="text" 
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              className="w-full text-sm p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-blue outline-none"
              placeholder="https://example.com/image.jpg"
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-2">
              <button 
                onClick={() => { setTempUrl(src); setIsEditing(false); }}
                className="p-1.5 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                title="Hủy"
              >
                <X size={18} />
              </button>
              <button 
                onClick={handleSave}
                className="p-1.5 bg-brand-blue text-white rounded hover:bg-blue-700 transition-colors"
                title="Lưu"
              >
                <Check size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
