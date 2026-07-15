import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Loader2, Save, MoveUp, MoveDown, Trash2, Plus, ChevronDown, ChevronUp } from 'lucide-react';

// --- Recursive Generic Field Editor ---
const GenericFieldEditor = ({ fieldKey, value, onChange, path }: { fieldKey: string, value: any, onChange: (val: any) => void, path: string }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (Array.isArray(value)) {
    return (
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/50 space-y-4">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <span className="font-semibold text-gray-700 capitalize">{fieldKey.replace(/_/g, ' ')} ({value.length} items)</span>
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        
        {isExpanded && (
          <div className="space-y-4 pl-4 border-l-2 border-brand-blue/20">
            {value.map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 p-4 rounded-lg relative group">
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => {
                    if(index > 0) {
                      const newArr = [...value];
                      [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
                      onChange(newArr);
                    }
                  }} className="p-1 text-gray-400 hover:text-brand-blue"><MoveUp size={16}/></button>
                  <button onClick={() => {
                    if(index < value.length - 1) {
                      const newArr = [...value];
                      [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
                      onChange(newArr);
                    }
                  }} className="p-1 text-gray-400 hover:text-brand-blue"><MoveDown size={16}/></button>
                  <button onClick={() => {
                    const newArr = value.filter((_, i) => i !== index);
                    onChange(newArr);
                  }} className="p-1 text-red-400 hover:text-red-600"><Trash2 size={16}/></button>
                </div>
                
                <span className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Item #{index + 1}</span>
                <GenericFieldEditor 
                  fieldKey={`Item`} 
                  value={item} 
                  onChange={(newVal) => {
                    const newArr = [...value];
                    newArr[index] = newVal;
                    onChange(newArr);
                  }} 
                  path={`${path}[${index}]`} 
                />
              </div>
            ))}
            <button 
              onClick={() => {
                // Determine template based on first item
                let template: any = typeof value[0] === 'object' ? {} : "";
                if (typeof value[0] === 'object' && value[0] !== null) {
                  Object.keys(value[0]).forEach(k => {
                    template[k] = typeof value[0][k] === 'string' ? "" : (Array.isArray(value[0][k]) ? [] : {});
                  });
                }
                onChange([...value, template]);
              }} 
              className="text-sm font-semibold text-brand-blue flex items-center gap-1 hover:underline"
            >
              <Plus size={16} /> Thêm phần tử mới
            </button>
          </div>
        )}
      </div>
    );
  }

  if (typeof value === 'object' && value !== null) {
    return (
      <div className="space-y-3">
        {Object.entries(value).map(([k, v]) => (
          <div key={k}>
            {fieldKey !== 'Item' && <label className="block text-xs font-semibold text-gray-500 mb-1 capitalize">{k.replace(/_/g, ' ')}</label>}
            <GenericFieldEditor 
              fieldKey={k} 
              value={v} 
              onChange={(newVal) => onChange({ ...value, [k]: newVal })} 
              path={`${path}.${k}`} 
            />
          </div>
        ))}
      </div>
    );
  }

  if (typeof value === 'string') {
    const isImage = value.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i) || value.startsWith('data:image');
    
    return (
      <div>
        {fieldKey !== 'Item' && <label className="block text-sm font-semibold text-gray-700 mb-1 capitalize">{fieldKey.replace(/_/g, ' ')}</label>}
        {isImage && value && (
          <div className="mb-2 w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
        {(value.length > 100 || fieldKey.includes('desc') || fieldKey.includes('detail')) ? (
          <textarea 
            rows={3}
            value={value} 
            onChange={e => onChange(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue/20 text-sm"
          />
        ) : (
          <input 
            value={value} 
            onChange={e => onChange(e.target.value)}
            placeholder={isImage ? "URL hình ảnh..." : ""}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue/20 text-sm"
          />
        )}
      </div>
    );
  }

  return (
    <div>
      <span className="text-sm text-red-500">Unsupported type for {fieldKey}</span>
    </div>
  );
};


export const PageBuilder = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [pageSlug, setPageSlug] = useState('home');
  const [pageData, setPageData] = useState<any>(null);

  // Available pages to select
  const availablePages = [
    { slug: 'home', name: 'Trang chủ (Home)' },
    { slug: 'stem', name: 'Chương trình STEM' },
    { slug: 'arts', name: 'Chương trình Nghệ thuật' },
    { slug: 'sports', name: 'Chương trình Thể thao' },
  ];

  useEffect(() => {
    fetchPage();
  }, [pageSlug]);

  const fetchPage = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', pageSlug)
      .single();
    
    if (!error && data) {
      setPageData(data);
    } else {
      setPageData(null);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('pages')
      .upsert({ 
        slug: pageSlug,
        title: pageData.title,
        sections: pageData.sections,
        updated_at: new Date().toISOString()
      });

    if (!error) {
      alert('Đã lưu nội dung trang thành công!');
    } else {
      alert('Lỗi khi lưu: ' + error.message);
    }
    setSaving(false);
  };

  const updateSection = (index: number, newProps: any) => {
    const newSections = [...pageData.sections];
    newSections[index].props = newProps;
    setPageData({ ...pageData, sections: newSections });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...pageData.sections];
    if (direction === 'up' && index > 0) {
      const temp = newSections[index - 1];
      newSections[index - 1] = newSections[index];
      newSections[index] = temp;
    } else if (direction === 'down' && index < newSections.length - 1) {
      const temp = newSections[index + 1];
      newSections[index + 1] = newSections[index];
      newSections[index] = temp;
    }
    setPageData({ ...pageData, sections: newSections });
  };

  const removeSection = (index: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa khối này?')) {
      const newSections = pageData.sections.filter((_: any, i: number) => i !== index);
      setPageData({ ...pageData, sections: newSections });
    }
  };

  const addSection = (type: string) => {
    // Basic templates for new sections
    const defaultProps: Record<string, any> = {
      HeroSection: { title: "Tiêu đề Hero", subtitle: "Mô tả", cta_text: "Nút bấm", badge_text: "Huy hiệu", hero_image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1600&auto=format&fit=crop" },
      PhilosophySection: { title: "Triết lý", subtitle: "Mô tả", items: [{ title: "Mục 1", desc: "Mô tả", details: "Chi tiết", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop", color: "text-brand-blue", bg: "bg-blue-50", icon: "BookOpen" }] },
      ProgramsSection: { title: "Chương trình", subtitle: "Mô tả", programs: [{ id: "p1", title: "Môn 1", desc: "Mô tả", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop", icon: "🔬", link: "/" }] },
      FacilitiesSection: { growth_title: "Trưởng thành", growth_subtitle: "Mô tả", growth_traits: ["Tự tin", "Tò mò"], campuses_title: "Cơ sở", campuses_subtitle: "Mô tả", campuses: [{ name: "Cơ sở 1", addr: "Địa chỉ", desc: "Mô tả", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop" }] },
      ProgramHeroSection: { badge: "Huy hiệu", title: "Tên môn học", subtitle: "Mô tả", bg_image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1600&auto=format&fit=crop" },
      ProgramContentSection: { title: "Nội dung", subtitle: "Mô tả", items: ["Điểm nổi bật 1", "Điểm nổi bật 2"], cta_text: "Đăng ký" },
    };

    const newSection = {
      id: `${type}-${Date.now()}`,
      type,
      props: defaultProps[type] || { title: 'Tiêu đề' }
    };
    setPageData({ ...pageData, sections: [...pageData.sections, newSection] });
  };

  if (loading && !pageData) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-brand-blue w-8 h-8" /></div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Page Builder</h2>
          <p className="text-gray-500">Chỉnh sửa nội dung và hình ảnh động (Full JSON).</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <select 
            value={pageSlug} 
            onChange={(e) => setPageSlug(e.target.value)}
            className="px-4 py-2 border rounded-lg font-medium flex-1 md:flex-none"
          >
            {availablePages.map(p => (
              <option key={p.slug} value={p.slug}>{p.name}</option>
            ))}
          </select>
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="bg-brand-blue text-white px-6 py-2 rounded-xl font-medium flex items-center gap-2 hover:bg-blue-700 whitespace-nowrap"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Lưu
          </button>
        </div>
      </div>

      {!pageData ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 flex flex-col items-center">
          <p className="text-gray-500 mb-4">Trang này chưa được khởi tạo trong CSDL.</p>
          <button 
            onClick={() => setPageData({ slug: pageSlug, title: availablePages.find(p => p.slug === pageSlug)?.name || pageSlug, sections: [] })}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium"
          >
            Khởi tạo trang {pageSlug}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Tên trang (Title Tab)</label>
            <input 
              value={pageData.title || ''} 
              onChange={e => setPageData({...pageData, title: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>

          {pageData.sections.map((section: any, index: number) => (
            <div key={section.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-100/50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <span className="font-bold text-gray-800 text-lg">Khối #{index + 1}: {section.type}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => moveSection(index, 'up')} disabled={index === 0} className="p-2 bg-white rounded shadow-sm text-gray-500 hover:text-brand-blue disabled:opacity-30"><MoveUp size={16} /></button>
                  <button onClick={() => moveSection(index, 'down')} disabled={index === pageData.sections.length - 1} className="p-2 bg-white rounded shadow-sm text-gray-500 hover:text-brand-blue disabled:opacity-30"><MoveDown size={16} /></button>
                  <button onClick={() => removeSection(index)} className="p-2 bg-red-50 rounded shadow-sm text-red-500 hover:text-red-700 ml-2"><Trash2 size={16} /></button>
                </div>
              </div>
              
              <div className="p-6">
                <GenericFieldEditor 
                  fieldKey="Props"
                  value={section.props}
                  onChange={(newProps) => updateSection(index, newProps)}
                  path={`section[${index}]`}
                />
              </div>
            </div>
          ))}

          {/* Add Section Button */}
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center">
            <p className="text-gray-500 mb-4 font-medium">Thêm khối nội dung mới vào cuối trang</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={() => addSection('HeroSection')} className="px-4 py-2 bg-gray-50 border shadow-sm rounded-lg hover:bg-gray-100 text-sm font-semibold">Hero (Home)</button>
              <button onClick={() => addSection('PhilosophySection')} className="px-4 py-2 bg-gray-50 border shadow-sm rounded-lg hover:bg-gray-100 text-sm font-semibold">Philosophy</button>
              <button onClick={() => addSection('ProgramsSection')} className="px-4 py-2 bg-gray-50 border shadow-sm rounded-lg hover:bg-gray-100 text-sm font-semibold">Programs</button>
              <button onClick={() => addSection('FacilitiesSection')} className="px-4 py-2 bg-gray-50 border shadow-sm rounded-lg hover:bg-gray-100 text-sm font-semibold">Facilities</button>
              <button onClick={() => addSection('ProgramHeroSection')} className="px-4 py-2 bg-blue-50 border border-blue-100 shadow-sm rounded-lg hover:bg-blue-100 text-sm font-semibold text-brand-blue">Program Hero</button>
              <button onClick={() => addSection('ProgramContentSection')} className="px-4 py-2 bg-blue-50 border border-blue-100 shadow-sm rounded-lg hover:bg-blue-100 text-sm font-semibold text-brand-blue">Program Content</button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
