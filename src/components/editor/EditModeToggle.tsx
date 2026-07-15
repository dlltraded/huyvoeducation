import React, { useEffect, useState } from 'react';
import { useEditMode } from '../../contexts/EditModeContext';
import { supabase } from '../../lib/supabase';
import { Pencil, X } from 'lucide-react';

export const EditModeToggle = () => {
  const { isEditMode, setIsEditMode } = useEditMode();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(!!session);
    });
  }, []);

  if (!isAdmin) return null;

  return (
    <button
      onClick={() => setIsEditMode(!isEditMode)}
      className={`fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
        isEditMode ? 'bg-gray-800 text-white hover:bg-gray-900 rotate-90' : 'bg-brand-blue text-white hover:bg-blue-700 hover:scale-110'
      }`}
      title={isEditMode ? 'Tắt chế độ chỉnh sửa' : 'Bật chế độ chỉnh sửa'}
    >
      <div className={`transition-transform duration-300 ${isEditMode ? '-rotate-90' : ''}`}>
        {isEditMode ? <X size={24} /> : <Pencil size={24} />}
      </div>
    </button>
  );
};
