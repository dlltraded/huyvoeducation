export interface Instructor {
  slug: string;
  photo: string | null;
  specializationTag: { vi: string; en: string };
  name: string;
  title: { vi: string; en: string };
  yearOfBirth: number;
  experience: { vi: string; en: string };
  learners: string;
  classSize: string;
  currentPractice: { vi: string; en: string };
  summary: { vi: string; en: string };
  achievements: { vi: string; en: string }[];
}

// Sourced from "Huy Vo Education — Instructor Profile Book" (bilingual, Aug 2026),
// compiled with the Ho Chi Minh Communist Youth Union & Dong Nai Youth Cultural House.
export const INSTRUCTORS: Instructor[] = [
  {
    slug: 'dinh-thien-long',
    photo: '/instructors/dinh-thien-long.jpg',
    specializationTag: { vi: 'Vovinam', en: 'Vovinam' },
    name: 'Đinh Thiện Long',
    title: { vi: 'Huấn luyện viên Vovinam', en: 'Vovinam Coach & Instructor' },
    yearOfBirth: 1988,
    experience: { vi: '20+ năm', en: '20+ years' },
    learners: '6 – 18+',
    classSize: '15 – 20',
    currentPractice: { vi: 'Nhà Văn Hóa Thanh Thiếu Niên TP. Đồng Nai', en: 'Dong Nai Youth Cultural House' },
    summary: {
      vi: 'Võ sư cao đẳng Hồng Đai Nhị với hơn 20 năm tập luyện, thi đấu và giảng dạy Vovinam. Từng đạt HCV Giải Vovinam Thế giới lần I năm 2009, HCB Giải Vovinam Thế giới 2019, và là thành viên đội tuyển quốc gia tham dự SEA Games 30 năm 2022. Phương châm giảng dạy: "Võ đạo đặt lên hàng đầu."',
      en: 'Black Belt Level II (Hong Dai Nhi) master with 20+ years of training, competition, and teaching experience. Gold medalist at the 2009 Vovinam World Championship, silver medalist in 2019, and a national team member at SEA Games 30 (2022). Teaching philosophy: "martial ethics above all."',
    },
    achievements: [
      { vi: 'HCV — Giải Vovinam Thế giới lần I, 2009', en: 'Gold Medal — 1st World Vovinam Championship, 2009' },
      { vi: 'HCB — Giải Vovinam Thế giới, 2019', en: 'Silver Medal — World Vovinam Championship, 2019' },
      { vi: 'Thành viên Đội tuyển Quốc gia, SEA Games 30, 2022', en: 'National Team Member, SEA Games 30, 2022' },
    ],
  },
  {
    slug: 'cao-hoang-le',
    photo: '/instructors/cao-hoang-le.jpg',
    specializationTag: { vi: 'Múa', en: 'Dance' },
    name: 'Cao Hoàng Lê',
    title: { vi: 'Giảng viên Múa', en: 'Dance Instructor' },
    yearOfBirth: 1993,
    experience: { vi: '9+ năm', en: '9+ years' },
    learners: '6 – 14',
    classSize: '10 – 12',
    currentPractice: { vi: 'Trường Trung cấp Văn hóa Nghệ thuật Đồng Nai', en: 'Dong Nai Secondary School of Culture and Arts' },
    summary: {
      vi: 'Cử nhân Huấn luyện Múa (Trường Văn hóa Nghệ thuật Quân đội), có chứng chỉ Nghiệp vụ sư phạm. Giảng dạy lớp Múa sơ cấp và trung cấp theo phương pháp lấy học viên làm trọng tâm, xây dựng lớp học vui vẻ, không áp lực, giúp học viên tự tin thể hiện cá tính.',
      en: "Bachelor's in Dance Training (Army Academy of Culture and Arts) with a pedagogical training certificate. Teaches elementary and intermediate dance classes using a student-centered method, building an enjoyable, pressure-free classroom that helps students confidently express themselves.",
    },
    achievements: [
      { vi: 'Cử nhân Huấn luyện Múa — Trường Văn hóa Nghệ thuật Quân đội', en: "Bachelor's in Dance Training — Army Academy of Culture and Arts" },
      { vi: 'Chứng chỉ Nghiệp vụ sư phạm', en: 'Pedagogical Training Certificate' },
    ],
  },
  {
    slug: 'phung-manh-phong',
    photo: '/instructors/phung-manh-phong.jpg',
    specializationTag: { vi: 'Đàn bầu', en: 'Dan Bau' },
    name: 'Phùng Mạnh Phong',
    title: { vi: 'Giảng viên Đàn bầu', en: 'Dan Bau (Monochord) Instructor' },
    yearOfBirth: 1974,
    experience: { vi: '16+ năm', en: '16+ years' },
    learners: '11+',
    classSize: '—',
    currentPractice: { vi: 'Trường Trung cấp Văn hóa Nghệ thuật Đồng Nai', en: 'Dong Nai Secondary School of Culture and Arts' },
    summary: {
      vi: 'Thạc sĩ Nghệ thuật với 16 năm kinh nghiệm giảng dạy nhạc cụ dân tộc, chuyên sâu Đàn bầu. Chú trọng nền tảng kỹ thuật tay và khả năng cảm âm cho học viên từ 11 tuổi trở lên.',
      en: "Master's in Arts with 16 years of experience teaching traditional Vietnamese instruments, specializing in Dan Bau. Focuses on solid hand technique and musical ear training for students aged 11 and up.",
    },
    achievements: [
      { vi: 'Thạc sĩ Nghệ thuật', en: "Master's Degree in Arts" },
      { vi: '16 năm giảng dạy nhạc cụ dân tộc', en: '16 years teaching traditional Vietnamese instruments' },
    ],
  },
  {
    slug: 'nguyen-le-hoang-phuc',
    photo: '/instructors/nguyen-le-hoang-phuc.jpg',
    specializationTag: { vi: 'Bóng đá', en: 'Football' },
    name: 'Nguyễn Lê Hoàng Phúc',
    title: { vi: 'Huấn luyện viên Bóng đá', en: 'Football Coach' },
    yearOfBirth: 1995,
    experience: { vi: '6+ năm', en: '6+ years' },
    learners: '6 – 15',
    classSize: '15 – 20',
    currentPractice: { vi: 'Câu lạc bộ Bóng đá BSA', en: 'BSA Football Club' },
    summary: {
      vi: 'Huấn luyện viên Bóng đá có Chứng chỉ Huấn luyện viên AFC (Trường Đại học Thể dục Thể thao TP.HCM), 6 năm huấn luyện tại CLB BSA cho học viên 6–15 tuổi. Từng làm quản sinh tại Trường Song ngữ Á Châu. Phương châm huấn luyện: dạy đạo đức và ứng xử trước khi dạy kỹ thuật, dùng bóng đá làm công cụ hình thành nhân cách.',
      en: 'Football coach holding an AFC Coaching Certificate (Ho Chi Minh City University of Sports), with 6 years coaching students aged 6–15 at BSA Club. Previously a student supervisor at Asia Bilingual School. Coaching philosophy places character first: ethics and conduct before technique.',
    },
    achievements: [
      { vi: 'Giải Ba — Hội Khỏe Phù Đổng Tỉnh Đồng Nai, 2012', en: "3rd Place — Dong Nai Provincial 'Hoi Khoe Phu Dong' Sports Festival, 2012" },
      { vi: 'Chứng chỉ Huấn luyện viên AFC', en: 'AFC Coaching Certificate' },
    ],
  },
  {
    slug: 'truong-cong-khanh',
    photo: '/instructors/truong-cong-khanh.jpg',
    specializationTag: { vi: 'Nhảy hiện đại', en: 'Modern Dance' },
    name: 'Trương Công Khánh',
    title: { vi: 'Giảng viên Nhảy hiện đại', en: 'Modern Dance Instructor' },
    yearOfBirth: 1996,
    experience: { vi: '15+ năm', en: '15+ years' },
    learners: '6 – 18',
    classSize: '15 – 30',
    currentPractice: { vi: 'Trường Tiểu học Trịnh Hoài Đức', en: 'Trinh Hoai Duc Primary School' },
    summary: {
      vi: 'Giảng viên Nhảy hiện đại 15 năm kinh nghiệm, có chứng chỉ Hướng dẫn viên vũ đạo thể thao giải trí (TP.HCM). Từng giảng dạy tại trường mầm non, THCS, đào tạo giáo viên, và hiện điều hành trung tâm đào tạo nhảy riêng. Bản thân là vũ công thi đấu với nhiều danh hiệu trong nước — Top 40 "So You Think You Can Dance" mùa 5 (2016).',
      en: 'Modern dance instructor with 15 years of experience and a Sport & Entertainment Dance Instructor certification (Ho Chi Minh City). Has taught at preschools and secondary schools, trained fellow instructors, and now runs his own dance training center. An accomplished competitive dancer — Top 40, "So You Think You Can Dance" Season 5 (2016).',
    },
    achievements: [
      { vi: 'Top 40 — "So You Think You Can Dance" Mùa 5, 2016', en: "Top 40 — 'So You Think You Can Dance' Season 5, 2016" },
      { vi: 'Giải Nhất — SV Got Talent TP.HCM, 2017', en: '1st Place — SV Got Talent Ho Chi Minh City, 2017' },
      { vi: 'Giải Nhất — Bước Nhảy Viva & Sony Showcase, 2019', en: '1st Place — Buoc Nhay Viva & Sony Showcase, 2019' },
    ],
  },
  {
    slug: 'ha-truong-khanh',
    photo: '/instructors/ha-truong-khanh.jpg',
    specializationTag: { vi: 'Taekwondo', en: 'Taekwondo' },
    name: 'Hà Trường Khanh',
    title: { vi: 'Giảng viên Taekwondo', en: 'Taekwondo Instructor' },
    yearOfBirth: 1993,
    experience: { vi: '15+ năm', en: '15+ years' },
    learners: '6 – 18',
    classSize: '20',
    currentPractice: { vi: 'Trường THPT Lê Quý Đôn', en: 'Le Quy Don High School' },
    summary: {
      vi: 'Giảng viên Taekwondo kiêm Giáo viên Giáo dục thể chất, 15 năm kinh nghiệm, 7 năm công tác tại Trường THPT Lê Quý Đôn. Thạc sĩ Giáo dục học, Cử nhân Giáo dục thể chất (ĐH TDTT TP.HCM), có Chứng chỉ Hướng dẫn viên cấp Quốc gia và cấp Tỉnh. Từng thành lập và điều hành câu lạc bộ Taekwondo, huấn luyện võ sinh 6–18 tuổi.',
      en: 'Taekwondo instructor and Physical Education teacher with 15 years of experience, including 7 years at Le Quy Don High School. Holds a Master\'s in Education and a Bachelor\'s in Physical Education (Ho Chi Minh City University of Sports), plus National and Provincial Instructor Certifications. Has founded and run Taekwondo clubs, coaching students aged 6–18.',
    },
    achievements: [
      { vi: 'Thạc sĩ Giáo dục học — ĐH Thể dục Thể thao TP.HCM', en: "Master's in Education — Ho Chi Minh City University of Sports" },
      { vi: 'Chứng chỉ Hướng dẫn viên cấp Quốc gia & cấp Tỉnh', en: 'National & Provincial Instructor Certifications' },
      { vi: 'Hướng dẫn nhiều học sinh đạt thành tích tại các giải Taekwondo & Hội Khỏe Phù Đổng', en: "Guided students to strong results at Taekwondo tournaments and the 'Hoi Khoe Phu Dong' Games" },
    ],
  },
  {
    slug: 'nguyen-nhat-truong',
    photo: '/instructors/nguyen-nhat-truong.jpg',
    specializationTag: { vi: 'Karate', en: 'Karate' },
    name: 'Nguyễn Nhật Trường',
    title: { vi: 'Huấn luyện viên Karate', en: 'Karate Coach' },
    yearOfBirth: 1996,
    experience: { vi: '10+ năm', en: '10+ years' },
    learners: '6 – 25',
    classSize: '15 – 20',
    currentPractice: { vi: 'Trung tâm Huấn luyện và Thi đấu TDTT tỉnh Đồng Nai', en: 'Dong Nai Sports Training and Competition Center' },
    summary: {
      vi: 'Huấn luyện viên Karate với Đai đen Tứ đẳng, Cử nhân Huấn luyện Thể thao (ĐH TDTT TP.HCM), Chứng nhận Trọng tài & HLV Karate Quốc gia 2024. 10 năm huấn luyện học viên 5–25 tuổi tại các câu lạc bộ trong tỉnh, từng giảng dạy Thể dục tại Trường THPT Ngô Quyền 5 năm.',
      en: 'Karate coach holding a 4th Dan Black Belt and a Bachelor\'s in Sports Coaching (Ho Chi Minh City University of Sports), plus a 2024 National Karate Referee and Coaching certification. 10 years coaching students aged 5–25 across provincial clubs; taught Physical Education at Ngo Quyen High School for 5 years.',
    },
    achievements: [
      { vi: 'HCB — Giải các Câu lạc bộ Mạnh Toàn quốc', en: 'Silver Medal — National Strong Clubs Championship' },
      { vi: 'Nhiều HCV liên tiếp — Giải Vô địch Tỉnh', en: 'Gold Medal for multiple consecutive years — Provincial Championship' },
      { vi: 'Chứng nhận Trọng tài & HLV Karate Quốc gia, 2024', en: 'National Karate Referee & Coaching Certificate, 2024' },
    ],
  },
  {
    slug: 'nguyen-minh-tri',
    photo: '/instructors/nguyen-minh-tri.jpg',
    specializationTag: { vi: 'Nhảy hiện đại', en: 'Modern Dance' },
    name: 'Nguyễn Minh Trí',
    title: { vi: 'Giảng viên Nhảy hiện đại', en: 'Modern Dance Instructor' },
    yearOfBirth: 1995,
    experience: { vi: '13+ năm', en: '13+ years' },
    learners: '6 – 30',
    classSize: '15',
    currentPractice: { vi: 'G.O.G Dance Studio (Nhà sáng lập)', en: 'G.O.G Dance Studio (Founder)' },
    summary: {
      vi: 'Nhà sáng lập G.O.G Dance Studio, hơn 10 năm thi đấu, giảng dạy và huấn luyện Nhảy hiện đại ở nhiều độ tuổi. Cử nhân Quản trị Kinh doanh (ĐH Lạc Hồng), chứng chỉ Dân vũ thể thao và Biên đạo. Phương pháp giảng dạy đi từ nền tảng cơ bản, cập nhật xu hướng mới, mang năng lượng tích cực cho học viên mọi trình độ.',
      en: 'Founder of G.O.G Dance Studio and modern dance instructor with 10+ years of competing, teaching, and coaching across age groups. Holds a Bachelor\'s in Business Administration (Lac Hong University) and a certificate in Folk & Sport Dance and Choreography.',
    },
    achievements: [
      { vi: 'Giải Nhất — Let\'s Dance Đồng Nai, 2023; Giải Nhất — Honda Uni Tour, 2023 & 2024', en: "1st Place — Let's Dance Dong Nai, 2023; 1st Place — Honda Uni Tour, 2023 & 2024" },
      { vi: 'Giải Nhất — Youth Step Battle, Trảng Bom', en: '1st Place — Youth Step Battle, Trang Bom' },
      { vi: 'Top 8 — WAO Battle, 2025', en: 'Top 8 — WAO Battle, 2025' },
    ],
  },
  {
    slug: 'pham-le-vu-hoang',
    photo: null,
    specializationTag: { vi: 'Múa & Biên đạo', en: 'Dance & Choreography' },
    name: 'Phạm Lê Vũ Hoàng',
    title: { vi: 'Giảng viên Múa & Biên đạo', en: 'Dance & Choreography Instructor' },
    yearOfBirth: 1994,
    experience: { vi: '10+ năm', en: '10+ years' },
    learners: '6 – 18',
    classSize: '15 – 20',
    currentPractice: { vi: 'HOANG Dance Studio', en: 'HOANG Dance Studio' },
    summary: {
      vi: 'Biên đạo tự do và giáo viên dạy nhảy tại HOANG Dance Studio, tốt nghiệp Trung cấp Múa tại Trường Trung cấp Múa TP. Hồ Chí Minh, với 10 năm kinh nghiệm giảng dạy học viên ở ba nhóm tuổi 6–12, 12–16 và 16–18. Từng biên đạo cho Thành đoàn TP. Biên Hòa, nhiều trường học và khách hàng doanh nghiệp, ngân hàng.',
      en: 'Freelance choreographer and dance teacher at HOANG Dance Studio, holding an Intermediate Diploma in Dance from the Ho Chi Minh City Intermediate School of Dance, with 10 years of experience across three age groups: 6–12, 12–16, and 16–18. Has choreographed for the Bien Hoa City Youth Union, schools, and corporate/banking clients.',
    },
    achievements: [
      { vi: 'Giải Nhất (Múa) & Giải Nhất Toàn Đoàn — Hội thi Hoa Phượng Đỏ, Đồng Nai, 2018', en: "1st Place (Dance) & Overall 1st Place — 'Hoa Phuong Do' Festival, Dong Nai, 2018" },
      { vi: 'Giải Nhất (Múa) & Giải Nhất Toàn Đoàn — Hội thi Giai Điệu Tuổi Hồng, Đồng Nai, 2022, 2024 & 2025', en: "1st Place (Dance) & Overall 1st Place — 'Giai Dieu Tuoi Hong' Festival, Dong Nai, 2022, 2024 & 2025" },
      { vi: 'Biên đạo các chương trình lớn của Thành đoàn Đồng Nai, gồm sự kiện đại hội và giao lưu văn hóa Việt – Hàn', en: 'Choreographed major Dong Nai Youth Union programs, including national delegation events and a Vietnam–Korea cultural exchange' },
    ],
  },
];
