import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ClipboardCheck, Eye, HeartPulse, Lock, FileText, ArrowRight } from 'lucide-react';

// Child-safety controls, taken from the HVE Company Profile 2026.
const CONTROLS = [
  { Icon: ShieldCheck, vi: 'Tuyển chọn nhân sự', en: 'Staff selection', dVi: 'Kiểm tra lý lịch, bằng cấp; ký cam kết bảo vệ trẻ em trước khi đứng lớp.', dEn: 'Background and qualification checks; child-protection pledge signed before teaching.' },
  { Icon: ClipboardCheck, vi: 'Điểm danh và bàn giao', en: 'Attendance and handover', dVi: 'Điểm danh đầu giờ; bàn giao học sinh cho đúng người, đúng nơi.', dEn: 'Attendance at the start; students handed over to the right person and place.' },
  { Icon: Eye, vi: 'Giám sát', en: 'Supervision', dVi: 'Tỷ lệ người lớn trên học sinh theo chính sách trường; luôn trong tầm quan sát.', dEn: 'Adult-to-student ratios per school policy; line of sight at all times.' },
  { Icon: HeartPulse, vi: 'Xử lý sự cố', en: 'Incident response', dVi: 'Sơ cứu, liên hệ phụ huynh và nhà trường, chuyển tuyến khi cần.', dEn: 'First aid, contact with parents and school, escalation when needed.' },
  { Icon: Lock, vi: 'Bảo vệ dữ liệu', en: 'Data protection', dVi: 'Thông tin y tế, danh sách và hình ảnh chỉ dùng đúng mục đích đã thống nhất.', dEn: 'Medical data, rosters and images used only for agreed purposes.' },
  { Icon: FileText, vi: 'Báo cáo', en: 'Reporting', dVi: 'Báo cáo định kỳ và báo cáo sự cố gửi nhà trường; theo dõi khắc phục đến khi hoàn tất.', dEn: 'Regular and incident reports to the school; corrective actions tracked to closure.' },
];

export const SafetySection = ({ t }: { t: any }) => {
  const tr = t || ((vi: string) => vi);

  return (
    <section id="an-toan" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="uppercase tracking-widest text-xs font-bold text-brand-green mb-4">
              {tr('An toàn trẻ em', 'Child safety')}
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-5">
              {tr('An toàn được kiểm soát bằng quy trình', 'Safety managed through procedures')}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {tr(
                'Mỗi lớp học, mỗi chuyến đi và mỗi giáo viên HVE cung ứng đều có quy trình, người chịu trách nhiệm và hồ sơ ghi nhận. HVE áp dụng chuẩn mực của các trường quốc tế cho mọi học sinh.',
                'Every class, every trip and every instructor HVE supplies is covered by procedures, named responsibility and records. HVE applies international-school standards to every student.'
              )}
            </p>
            <Link to="/chinh-sach-bao-ve-tre-em" className="inline-flex items-center gap-2 font-heading font-bold text-brand-blue hover:gap-3 transition-all">
              {tr('Xem chính sách bảo vệ trẻ em', 'Read our safeguarding policy')} <ArrowRight size={18} />
            </Link>
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5">
            {CONTROLS.map(c => (
              <div key={c.vi} className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <c.Icon size={20} className="text-brand-green shrink-0" />
                  <h3 className="font-heading font-bold text-gray-900">{tr(c.vi, c.en)}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{tr(c.dVi, c.dEn)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
