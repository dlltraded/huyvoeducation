# Quản trị môn học và giảng viên

## Trạng thái ngày 17/11/2026

Đã triển khai website thật, nghiệm thu đăng nhập admin, lưu danh mục và dịch Gemini.

## Sử dụng

- `/admin/programs`: thêm/sửa môn học, nhóm môn, ảnh tải trực tiếp hoặc bằng URL, thời lượng, độ tuổi, giới thiệu và điểm nổi bật.
- `/admin/instructors`: thêm/sửa hồ sơ giảng viên, ảnh tải trực tiếp hoặc bằng URL, kinh nghiệm và thành tích.
- Nhãn mùa/học kỳ chỉ là ghi chú trong admin; không tự lên lịch đổi mùa.
- Dùng Hiển thị trên website và Lên/Xuống để đổi danh sách theo mùa. Mục mới mặc định ẩn. Nút Xoá bỏ mục khỏi danh sách đang sửa sau khi xác nhận; phải bấm Lưu danh sách để ghi thay đổi.
- Lưu danh sách ghi toàn bộ danh mục. Kiểm tra phiên bản `updated_at` ngăn ghi đè khi có phiên khác đã lưu trước.
- Tự dịch khi lưu mặc định bật, chỉ điền các bản tiếng Anh còn thiếu. Bản đã nhập tay được giữ lại.
- Sửa tiếng Việt xoá bản tiếng Anh tương ứng. Nút Dịch sang tiếng Anh dịch lại toàn bộ mục, có xác nhận trước khi thay bản đã có.
- Nếu dịch lỗi, lượt lưu tự dịch không ghi dữ liệu. Có thể tắt tự dịch và nhập tiếng Anh thủ công. Khi thiếu tiếng Anh, trang công khai dùng nội dung Việt thay cho ô trống.
- Dữ liệu nằm trong `site_content`, hai khoá `catalog_programs` và `catalog_instructors`, dạng `{ items: [...] }`. Chưa có khoá thì dùng dữ liệu hiện tại trong mã nguồn. Lỗi tải dữ liệu hiện thông báo, không đưa các mục đã ẩn trở lại.
- Các trang danh sách chương trình, chi tiết chương trình và đội ngũ giảng viên đọc danh mục này. Các section trang chủ do Page Builder quản lý riêng.
- Mục ẩn chỉ ẩn trên giao diện công khai; `site_content` là bảng đọc công khai. Không lưu dữ liệu riêng tư ở đây.

## Triển khai phần dịch

- Website: Vercel project `thucphamso-1/huyvoeducation`, domain `www.huyvoeducation.vn`. Liên kết cũ `website` của worktree gốc đã lỗi thời.
- API: `POST /api/translate-catalog` chạy bằng Vercel Function; không cần deploy Edge Function Supabase.
- Secret `GEMINI_API_KEY` ở Vercel Production. Không đưa vào biến `VITE_`. Khóa local do chủ dự án cung cấp nằm trong file được Git bỏ qua; không ghi giá trị vào tài liệu.
- `GEMINI_TRANSLATION_MODEL` tuỳ chọn, mặc định `gemini-2.5-flash`.
- Xác minh Supabase Auth bằng access token của người dùng; chỉ UUID admin cùng chính sách CMS được gọi dịch.
- API không cache, không trả lỗi nguyên bản từ Gemini hoặc khoá ra client.
- `CATALOG_ADMIN_ID` tuỳ chọn; khi đổi admin phải cập nhật cả quyền bảng và quyền gọi dịch.
- Vercel config build nguồn bằng `npm run build`, xuất `dist` và giữ route API trước SPA fallback.
- Supabase production đã kiểm tra: RLS bật, khách chỉ đọc `site_content`, quyền ghi chỉ có admin; hai khoá danh mục chưa tồn tại trước triển khai. Không cần thay schema.
- Trang dịch vụ hiện tại là `/dich-vu`; `/chuong-trinh` giữ chuyển hướng cũ. Giảng viên trên chi tiết môn học cũng đọc danh mục mới.

Tên riêng, URL, ảnh và slug không gửi dịch. Dịch vụ kiểm tra tài khoản admin trước khi gọi Gemini; kiểm tra đầu vào, JSON trả về và từ chối bản dịch bị cắt. Prompt giữ nguyên sự kiện, bằng cấp và số liệu; người quản trị vẫn nên duyệt lại thuật ngữ chuyên môn.

API tham khảo: https://ai.google.dev/gemini-api/docs/structured-output

## Kiểm tra đã thực hiện

- `npm run build`: qua; còn cảnh báo bundle lớn của dự án.
- `npm run lint`: qua, còn cảnh báo ở các file sẵn có, không phát sinh cảnh báo trong phần mới.
- Kiểm tra câu chữ bằng `validate_copy.py`: 0 lỗi, 0 cảnh báo cho CatalogManager.
- Kiểm tra trình duyệt với API giả lập: sửa/lưu, tự dịch, ẩn khỏi danh sách và chi tiết, chặn ghi khi dịch lỗi, xung đột phiên bản, thêm giảng viên mặc định ẩn, bố cục điện thoại không tràn ngang.
- `node --test tests/catalog-translation.test.mjs`: qua; kiểm tra phương thức, đăng nhập, quyền admin, cấu hình, đầu vào sai/quá lớn, bản dịch thành công/bị cắt và lỗi nhà cung cấp.
- Đã kiểm chứng RLS hiện tại bằng truy vấn read-only; gọi Gemini trực tiếp thành công. Các bài kiểm tra tự động dùng dữ liệu giả lập.

## Nghiệm thu production 17/11/2026

- Production READY: `dpl_FuznLTGuMTVZNQhcfih5ScNzSurm`; tên miền chính `https://www.huyvoeducation.vn`.
- Mã ứng dụng đã kiểm tra: `c192fd5`.
- Đã đăng nhập admin thật, lưu 9 môn và 9 giảng viên vào `site_content`; cả 18 mục vẫn hiển thị.
- Tự dịch khi lưu đã điền tiếng Anh cho thời lượng 9 môn, ví dụ `24 buổi → 24 sessions`. Gộp phần thiếu vào một lượt gọi để giảm giới hạn Gemini; danh mục lớn chia nhóm theo kích thước.
- Nút dịch hồ sơ giảng viên trả bản dịch xem trước thành công. Đã bỏ bản xem trước sau kiểm tra, giữ nguyên hồ sơ đã duyệt.
- Trang công khai chi tiết Bóng đá ở chế độ EN hiển thị `Football`, `24 sessions` và giảng viên phụ trách từ danh mục; trang đội ngũ hiển thị đủ 9 người.
- API thật trả 405 khi GET, 401 khi chưa đăng nhập hoặc token giả. Quyền bảng CMS đã kiểm tra read-only: RLS bật, chỉ UUID admin được ghi.
- Quét output build và toàn bộ file Git theo dõi: không chứa khóa Gemini. Khóa chỉ nằm trong Vercel Production Secret và file local được Git bỏ qua.
- Ảnh nghiệm thu: `E:/HUYVOEDUCATION/outputs/hve-catalog-admin/production-admin.jpg`.
- Build, lint và test handler qua. Ẩn/hiện, thêm và xung đột phiên bản đã kiểm tra bằng API giả lập; không cố tình ẩn nội dung đang công khai khi nghiệm thu production.

## Tải ảnh trực tiếp

- Admin môn học/giảng viên có nút chọn ảnh từ máy/điện thoại và ảnh xem trước. Dùng đường dẫn có sẵn vẫn nằm trong mục mở rộng.
- Nhận JPG/PNG/WebP tối đa 15 MB. Trình duyệt chuyển thành WebP (hoặc PNG nếu trình duyệt không hỗ trợ), cạnh dài tối đa 1920 px, tải file tối đa 5 MB. Không cắt ảnh.
- Kho `website-images` trong Supabase project HVE, thư mục `programs/` và `instructors/`. Mỗi lần tải dùng UUID mới, không ghi đè ảnh cũ.
- Ảnh tải xong chưa đổi website cho tới khi bấm Lưu danh sách. Nếu bỏ chỉnh sửa, file đã tải vẫn còn trong kho; chưa có chức năng dọn ảnh không sử dụng.
- Bucket công khai để phục vụ ảnh website. RLS chỉ cho UUID admin hiện có INSERT/SELECT; không cho khách tải lên, không cấp UPDATE/DELETE. Chỉ nhận MIME JPG/PNG/WebP và giới hạn 5 MB tại máy chủ.
- Ảnh có sẵn: 9 ảnh giảng viên ở `public/instructors/` và một số ảnh môn ở `src/assets/images/`, phục vụ qua Vercel; vài ảnh môn dùng Pexels. Danh mục Supabase lưu đường dẫn ảnh; việc thêm upload không di chuyển toàn bộ ảnh cũ.
- Migration `20261117043902_catalog_image_uploads.sql` đã áp dụng production bằng MCP. Đã kiểm tra bucket, MIME, giới hạn dung lượng, RLS và advisor; không có lỗi storage mới.

## Sửa biểu mẫu tên và thêm xoá danh mục

- Tên giảng viên/tên môn học được render tường minh ở đầu biểu mẫu, không phụ thuộc thứ tự thuộc tính JSON từ database hoặc dữ liệu mặc định.
- Khi thêm mới, tự cuộn tới ô tên và đặt con trỏ để nhập ngay.
- Xoá có xác nhận theo tên mục; chỉ thay danh sách đang sửa, chưa ghi database cho tới khi bấm Lưu danh sách. Không xoá file ảnh trên Storage.
- Hỗ trợ xoá mục cuối cùng, lưu danh sách rỗng và tạo lại mục mới; danh sách rỗng đã lưu không khôi phục dữ liệu mẫu.
- Build/lint và kiểm tra câu chữ qua. Kiểm tra trình duyệt với API giả lập cho cả môn học/giảng viên: thứ tự tên với thuộc tính JSON xáo trộn, nhập tên mới và focus, huỷ xoá, xác nhận xoá, chỉ ghi khi Lưu, lưu/reread danh sách rỗng và thêm lại. Không xoá dữ liệu production để thử nghiệm.
