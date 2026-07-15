import React, { useState, useEffect, useRef } from 'react';
import { useEditMode } from '../../contexts/EditModeContext';

interface EditableTextProps {
  sectionId: string;
  path: string;
  value: string;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  placeholder?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({
  sectionId, path, value, tag = 'span', className = '', placeholder = 'Nhập văn bản...'
}) => {
  const { isEditMode, updateField } = useEditMode();
  const [localValue, setLocalValue] = useState(value);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleBlur = () => {
    if (elementRef.current) {
      const text = elementRef.current.innerText || elementRef.current.textContent || '';
      if (text !== value) {
        updateField(sectionId, path, text);
      }
    }
  };

  const Component = tag as any;

  if (!isEditMode) {
    return <Component className={className}>{localValue}</Component>;
  }

  return (
    <Component
      ref={elementRef}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      className={`
        ${className} 
        outline-none transition-all
        hover:outline-dashed hover:outline-2 hover:outline-blue-400 hover:outline-offset-4
        focus:outline-solid focus:outline-2 focus:outline-blue-500 focus:outline-offset-4 focus:bg-blue-50/50 rounded
        cursor-text min-w-[20px] min-h-[1em] empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400
      `}
      data-placeholder={placeholder}
    >
      {localValue}
    </Component>
  );
};
