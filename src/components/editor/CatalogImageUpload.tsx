import { useState } from 'react';
import { supabase } from '../../lib/supabase';

const BUCKET = 'website-images';
const MAX_INPUT_SIZE = 15 * 1024 * 1024;
const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

async function prepareImage(file: File): Promise<Blob> {
  if (!ACCEPTED_TYPES.includes(file.type)) throw new Error('Vui lòng chọn ảnh JPG, PNG hoặc WebP.');
  if (!file.size || file.size > MAX_INPUT_SIZE) throw new Error('Ảnh cần có dung lượng dưới 15 MB.');
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    if (!image.naturalWidth || !image.naturalHeight) throw new Error('Ảnh không hợp lệ.');
    const scale = Math.min(1, 1920 / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Trình duyệt chưa hỗ trợ xử lý ảnh.');
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error('Chưa xử lý được ảnh.')), 'image/webp', 0.85));
    if (blob.size > MAX_UPLOAD_SIZE) throw new Error('Ảnh sau xử lý còn quá lớn. Vui lòng chọn ảnh nhỏ hơn.');
    return blob;
  } finally { URL.revokeObjectURL(url); }
}

export function CatalogImageUpload({ value, kind, onChange, onBusyChange }: {
  value: string;
  kind: 'programs' | 'instructors';
  onChange: (url: string) => void;
  onBusyChange: (busy: boolean) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [failed, setFailed] = useState(false);
  const label = kind === 'instructors' ? 'Ảnh chân dung' : 'Ảnh môn học';
  const upload = async (file: File) => {
    setUploading(true); onBusyChange(true); setMessage(''); setFailed(false);
    try {
      const blob = await prepareImage(file);
      const extension = blob.type === 'image/webp' ? 'webp' : 'png';
      const path = `${kind}/${crypto.randomUUID()}.${extension}`;
      const { error } = await supabase.storage.from(BUCKET).upload(path, blob, { contentType: blob.type, cacheControl: '31536000', upsert: false });
      if (error) throw new Error('Chưa tải được ảnh. Vui lòng kiểm tra kết nối và quyền admin rồi thử lại.');
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      onChange(data.publicUrl);
      setMessage('Đã tải ảnh lên. Bấm “Lưu danh sách” để cập nhật website.');
    } catch (error) {
      setFailed(true);
      setMessage(error instanceof Error ? error.message : 'Chưa đọc được ảnh. Vui lòng thử ảnh khác.');
    } finally { setUploading(false); onBusyChange(false); }
  };
  return <div className="space-y-3 rounded-xl border border-gray-200 p-4">
    <p className="font-semibold">{label}</p>
    {value ? <img key={value} src={value} alt={`Xem trước ${label.toLowerCase()}`} className="w-full max-h-64 rounded-lg bg-gray-50 object-contain" /> : <div className="rounded-lg bg-gray-50 p-6 text-center text-gray-500">Chưa có ảnh</div>}
    <label className="block text-sm font-medium">{uploading ? 'Đang xử lý và tải ảnh…' : 'Chọn ảnh từ máy hoặc điện thoại'}
      <input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} className="mt-2 block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-brand-blue" onChange={event => {
        const file = event.currentTarget.files?.[0];
        event.currentTarget.value = '';
        if (file) void upload(file);
      }} />
    </label>
    <p className="text-xs text-gray-500">JPG, PNG hoặc WebP, tối đa 15 MB. Ảnh được tự thu nhỏ để website tải nhanh hơn.</p>
    {message && <p role={failed ? 'alert' : 'status'} className={`text-sm ${failed ? 'text-red-700' : 'text-green-700'}`}>{message}</p>}
    <details className="text-sm text-gray-600"><summary className="cursor-pointer">Dùng đường dẫn ảnh có sẵn</summary><label className="mt-2 block">Đường dẫn {label.toLowerCase()}<input value={value} onChange={event => { onChange(event.target.value); setMessage(''); }} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" /></label></details>
  </div>;
}
