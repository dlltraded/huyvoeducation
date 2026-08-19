export interface Program {
  slug: string;
  category: 'sports' | 'martial-arts' | 'arts';
  icon: string; // emoji, matches existing site convention
  img: string; // real photo (Pexels, free commercial use) — no AI-generated images
  name: { vi: string; en: string };
  tagline: { vi: string; en: string };
  ageGroups: string;
  sessions: string;
  summary: { vi: string; en: string };
  highlights: { vi: string; en: string }[];
}

export const CATEGORIES: Record<Program['category'], { vi: string; en: string }> = {
  sports: { vi: 'Thể thao đồng đội', en: 'Team Sports' },
  'martial-arts': { vi: 'Võ thuật', en: 'Martial Arts' },
  arts: { vi: 'Nghệ thuật & Văn hoá', en: 'Arts & Culture' },
};

// Program summaries drawn from the 9 "Chương Trình Đào Tạo" curriculum documents
// (Nhà Văn Hóa Thanh Thiếu Nhi TP. Đồng Nai / Học Viện Đào Tạo Huy Võ, 2026).
export const PROGRAMS: Program[] = [
  {
    slug: 'bong-da',
    category: 'sports',
    icon: '⚽',
    img: 'https://images.pexels.com/photos/35180899/pexels-photo-35180899.jpeg?auto=compress&cs=tinysrgb&w=1000',
    name: { vi: 'Bóng đá', en: 'Football' },
    tagline: { vi: 'Kỹ thuật nền tảng bằng lòng bàn chân', en: 'Foundational technique with the inside of the foot' },
    ageGroups: '7 – 15',
    sessions: '24 buổi',
    summary: {
      vi: 'Chương trình cơ bản 24 buổi tập trung vào bốn nhóm kỹ thuật nền tảng: bài tập bổ trợ, đá bóng, dừng bóng và dẫn bóng bằng lòng bàn chân — diện tiếp xúc lớn nhất, dễ kiểm soát nhất cho người mới bắt đầu.',
      en: 'A 24-session foundational program covering four core technique groups: supplementary drills, passing, trapping, and dribbling with the inside of the foot — the largest, most controllable contact surface for beginners.',
    },
    highlights: [
      { vi: 'Rèn thể lực, sự bền bỉ và tinh thần đồng đội', en: 'Builds fitness, endurance, and teamwork' },
      { vi: 'Yêu cầu tham gia tối thiểu 70% số buổi (17/24 buổi)', en: 'Minimum 70% attendance required (17 of 24 sessions)' },
    ],
  },
  {
    slug: 'bong-ro',
    category: 'sports',
    icon: '🏀',
    img: 'https://images.pexels.com/photos/10643696/pexels-photo-10643696.jpeg?auto=compress&cs=tinysrgb&w=1000',
    name: { vi: 'Bóng rổ', en: 'Basketball' },
    tagline: { vi: 'Học phần cơ bản 38 buổi', en: 'A 38-session foundational course' },
    ageGroups: '7 – 15',
    sessions: '38 buổi',
    summary: {
      vi: 'Học phần cơ bản 38 buổi, phân nhóm học viên theo cả độ tuổi và thể trạng — chiều cao và tầm với ảnh hưởng lớn đến bóng rổ nên độ cao rổ được điều chỉnh theo từng nhóm.',
      en: 'A 38-session foundational course, grouping students by both age and physique — since height and reach matter greatly in basketball, hoop height is adjusted per group.',
    },
    highlights: [
      { vi: 'Điều chỉnh độ cao rổ phù hợp từng nhóm tuổi', en: 'Hoop height adjusted for each age group' },
      { vi: 'Yêu cầu tham gia tối thiểu 70% số buổi (27/38 buổi)', en: 'Minimum 70% attendance required (27 of 38 sessions)' },
    ],
  },
  {
    slug: 'taekwondo',
    category: 'martial-arts',
    icon: '🥋',
    img: 'https://images.pexels.com/photos/7045594/pexels-photo-7045594.jpeg?auto=compress&cs=tinysrgb&w=1000',
    name: { vi: 'Taekwondo', en: 'Taekwondo' },
    tagline: { vi: 'Từ cấp 10 đến Tam đẳng', en: 'From level 10 up to 3rd Dan black belt' },
    ageGroups: '6+',
    sessions: '24 buổi / cấp đai',
    summary: {
      vi: 'Chương trình cơ bản đến nâng cao theo hệ thống cấp đai, mỗi cấp 24 buổi. Võ sinh dưới 14 tuổi thi đạt đeo đai đỏ đen; từ 15 tuổi trở lên đeo đai đen.',
      en: 'A basic-to-advanced program structured by belt rank, 24 sessions per level. Students under 14 who pass testing wear a red-black belt; those 15 and older wear a black belt.',
    },
    highlights: [
      { vi: 'Hệ thống cấp đai rõ ràng, chu kỳ thi khoảng 3 tháng/cấp', en: 'Clear belt-ranking system, roughly a 3-month testing cycle per level' },
      { vi: 'Rèn kỷ luật, phản xạ và sự tự tin', en: 'Builds discipline, reflexes, and confidence' },
    ],
  },
  {
    slug: 'karate',
    category: 'martial-arts',
    icon: '🥋',
    img: 'https://images.pexels.com/photos/7991209/pexels-photo-7991209.jpeg?auto=compress&cs=tinysrgb&w=1000',
    name: { vi: 'Karate', en: 'Karate' },
    tagline: { vi: 'Từ cấp 10 đến Nhất đẳng huyền đai', en: 'From level 10 up to 1st Dan black belt' },
    ageGroups: '6+',
    sessions: '24 buổi / cấp đai',
    summary: {
      vi: 'Chương trình cơ bản đến nâng cao theo hệ thống cấp đai. Do tổ chức theo cấp đai, học viên trong cùng lớp có thể chênh lệch độ tuổi — việc phân nhóm dựa trên cấp đai là chính.',
      en: 'A basic-to-advanced program structured by belt rank. Since classes are organized by rank, students of different ages may train together — grouping is primarily by belt level.',
    },
    highlights: [
      { vi: 'Giáo án theo từng cấp đai, đánh giá định kỳ', en: 'Lesson plans tailored per belt level, with periodic assessment' },
      { vi: 'Rèn sức bền, kỹ thuật và tinh thần võ đạo', en: 'Builds endurance, technique, and martial spirit' },
    ],
  },
  {
    slug: 'vovinam',
    category: 'martial-arts',
    icon: '🥋',
    img: 'https://images.pexels.com/photos/6777314/pexels-photo-6777314.jpeg?auto=compress&cs=tinysrgb&w=1000',
    name: { vi: 'Vovinam – Việt Võ Đạo', en: 'Vovinam – Vietnamese Martial Art' },
    tagline: { vi: 'Sơ đẳng và Trung đẳng', en: 'Beginner to Intermediate ranks' },
    ageGroups: '6+',
    sessions: '24 – 48 buổi / cấp',
    summary: {
      vi: 'Chương trình huấn luyện Sơ đẳng và Trung đẳng, quy đổi 24 buổi cho cấp 3 tháng và 48 buổi cho cấp 6 tháng. Phân nhóm theo cấp đai là chính; riêng nội dung đòn chân tấn công và kỹ thuật vật phân nhóm thêm theo độ tuổi và thể trạng vì có nguy cơ chấn thương cao hơn.',
      en: 'A beginner-to-intermediate training program: 24 sessions for the 3-month rank and 48 sessions for the 6-month rank. Grouping is primarily by belt rank, with extra age/physique grouping for higher-risk techniques like attacking kicks and grappling.',
    },
    highlights: [
      { vi: 'Bộ môn võ thuật dân tộc Việt Nam', en: "Vietnam's own national martial art" },
      { vi: 'Chú trọng an toàn khi luyện tập kỹ thuật vật/đối kháng', en: 'Extra safety focus for grappling/sparring techniques' },
    ],
  },
  {
    slug: 'vo-co-truyen',
    category: 'martial-arts',
    icon: '🥋',
    img: 'https://images.pexels.com/photos/3340319/pexels-photo-3340319.jpeg?auto=compress&cs=tinysrgb&w=1000',
    name: { vi: 'Võ cổ truyền Việt Nam', en: 'Traditional Vietnamese Martial Arts' },
    tagline: { vi: 'Chương trình cơ bản 60 buổi', en: 'A 60-session foundational program' },
    ageGroups: '6 – 15',
    sessions: '60 buổi',
    summary: {
      vi: 'Chương trình cơ bản 60 buổi theo Sổ tay chuẩn đào tạo của Học viện. Yêu cầu tham gia tối thiểu 70% số buổi (42/60 buổi). Đề xuất tối đa 30 học viên/lớp.',
      en: "A 60-session foundational program following the Academy's training standards handbook. Minimum 70% attendance required (42 of 60 sessions). Proposed cap of 30 students per class.",
    },
    highlights: [
      { vi: 'Bảo tồn và phát huy võ thuật cổ truyền dân tộc', en: 'Preserving and promoting traditional Vietnamese martial arts' },
      { vi: 'Kết hợp rèn thể chất và giá trị văn hoá truyền thống', en: 'Combines physical training with traditional cultural values' },
    ],
  },
  {
    slug: 'nhay-hien-dai',
    category: 'arts',
    icon: '💃',
    img: 'https://images.pexels.com/photos/31022969/pexels-photo-31022969.jpeg?auto=compress&cs=tinysrgb&w=1000',
    name: { vi: 'Nhảy hiện đại (Hip Hop)', en: 'Modern Dance (Hip Hop)' },
    tagline: { vi: 'Hai nhóm tuổi 5–9 và 10–16', en: 'Two age groups: 5–9 and 10–16' },
    ageGroups: '5 – 16',
    sessions: '24 buổi / khoá',
    summary: {
      vi: 'Chương trình cơ bản Hip Hop Dance chia theo 2 nhóm tuổi để giáo án phù hợp thể lực và khả năng tiếp thu — 5–9 tuổi và 10–16 tuổi. Yêu cầu tham gia tối thiểu 70% số buổi.',
      en: 'A foundational Hip Hop Dance program split into two age groups so lesson plans match physical ability and learning pace — ages 5–9 and 10–16. Minimum 70% attendance required.',
    },
    highlights: [
      { vi: 'Phát triển thể chất, nhịp điệu và sự tự tin trình diễn', en: 'Builds fitness, rhythm, and performance confidence' },
      { vi: 'Giáo án riêng theo từng nhóm tuổi', en: 'Separate lesson plans per age group' },
    ],
  },
  {
    slug: 'trong-nghi-thuc',
    category: 'arts',
    icon: '🥁',
    img: 'https://images.pexels.com/photos/34678847/pexels-photo-34678847.jpeg?auto=compress&cs=tinysrgb&w=1000',
    name: { vi: 'Trống nghi thức Đội', en: 'Ceremonial Drum Corps' },
    tagline: { vi: 'Đội Nghi lễ Đội TNTP Hồ Chí Minh', en: 'Ho Chi Minh Young Pioneers Ceremonial Corps' },
    ageGroups: '7 – 15',
    sessions: '24 buổi',
    summary: {
      vi: 'Bộ môn có tính nghi lễ cao — sai sót trong buổi lễ chính thức ảnh hưởng trực tiếp đến uy tín đơn vị, nên yêu cầu độ chính xác và tính đồng đều cao hơn mặt bằng chung: tối thiểu 80% số buổi (20/24 buổi).',
      en: 'A highly ceremonial discipline — mistakes during official events directly affect institutional reputation, so precision and uniformity standards are higher than average: minimum 80% attendance (20 of 24 sessions).',
    },
    highlights: [
      { vi: 'Rèn tính kỷ luật, đồng đội và sự chính xác', en: 'Builds discipline, teamwork, and precision' },
      { vi: 'Biểu diễn tại các nghi lễ và sự kiện của Đội TNTP', en: 'Performs at Young Pioneers ceremonies and events' },
    ],
  },
  {
    slug: 'dan-tranh-dan-bau',
    category: 'arts',
    icon: '🎶',
    img: 'https://images.pexels.com/photos/16426063/pexels-photo-16426063.jpeg?auto=compress&cs=tinysrgb&w=1000',
    name: { vi: 'Đàn tranh – Đàn bầu', en: 'Dan Tranh & Dan Bau' },
    tagline: { vi: 'Nhạc cụ dân tộc Việt Nam', en: 'Traditional Vietnamese instruments' },
    ageGroups: '11+',
    sessions: 'Theo lộ trình cá nhân',
    summary: {
      vi: 'Chương trình cơ bản nhạc cụ dân tộc, chú trọng đặc điểm tâm sinh lý lứa tuổi — khả năng tập trung, độ khéo léo bàn tay và sức bền cơ tay. Cần phụ huynh đồng hành cho con luyện tập tại nhà tối thiểu 15 phút/ngày.',
      en: "A foundational traditional-instrument program that accounts for age-specific development — attention span, hand dexterity, and arm-muscle endurance. Requires parent support for at least 15 minutes of daily home practice.",
    },
    highlights: [
      { vi: 'Gìn giữ âm nhạc dân tộc Việt Nam', en: 'Preserving traditional Vietnamese music' },
      { vi: 'Luyện tập tại nhà là yếu tố quyết định kết quả học', en: 'Home practice is the key factor in learning outcomes' },
    ],
  },
];
