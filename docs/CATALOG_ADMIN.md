# Quản trị môn học và giảng viên

## Trạng thái ngày 17/11/2026

Đã làm và kiểm tra ở local; chưa push hoặc triển khai website/Edge Function.
Chưa kiểm tra lưu bằng tài khoản admin thật hoặc dịch với Gemini thật.

## Sử dụng

- `/admin/programs`: thêm/sửa môn học, nhóm môn, ảnh bằng URL, thời lượng, độ tuổi, giới thiệu và điểm nổi bật.
- `/admin/instructors`: thêm/sửa hồ sơ giảng viên, ảnh bằng URL, kinh nghiệm và thành tích.
- Nhãn mùa/học kỳ chỉ là ghi chú trong admin; không tự lên lịch đổi mùa.
- Dùng Hiển thị trên website và Lên/Xuống để đổi danh sách theo mùa. Mục mới mặc định ẩn; không có xoá vĩnh viễn.
- Lưu danh sách ghi toàn bộ danh mục. Kiểm tra phiên bản `updated_at` ngăn ghi đè khi có phiên khác đã lưu trước.
- Tự dịch khi lưu mặc định bật, chỉ điền các bản tiếng Anh còn thiếu. Bản đã nhập tay được giữ lại.
- Sửa tiếng Việt xoá bản tiếng Anh tương ứng. Nút Dịch sang tiếng Anh dịch lại toàn bộ mục, có xác nhận trước khi thay bản đã có.
- Nếu dịch lỗi, lượt lưu tự dịch không ghi dữ liệu. Có thể tắt tự dịch và nhập tiếng Anh thủ công. Khi thiếu tiếng Anh, trang công khai dùng nội dung Việt thay cho ô trống.
- Dữ liệu nằm trong `site_content`, hai khoá `catalog_programs` và `catalog_instructors`, dạng `{ items: [...] }`. Chưa có khoá thì dùng dữ liệu hiện tại trong mã nguồn. Lỗi tải dữ liệu hiện thông báo, không đưa các mục đã ẩn trở lại.
- Các trang danh sách chương trình, chi tiết chương trình và đội ngũ giảng viên đọc danh mục này. Các section trang chủ do Page Builder quản lý riêng.
- Mục ẩn chỉ ẩn trên giao diện công khai; `site_content` là bảng đọc công khai. Không lưu dữ liệu riêng tư ở đây.

## Triển khai phần dịch

1. Kiểm tra quyền hiện tại của `site_content`: khách chỉ đọc; chỉ tài khoản quản trị được ghi. Đối chiếu migration `20261021_secure_public_content.sql` đang có trong workspace; không suy ra đã áp dụng chỉ từ file local.
2. Cấu hình secret `GEMINI_API_KEY` trong Supabase Edge Functions. Không dùng biến `VITE_` cho khoá dịch.
3. `GEMINI_TRANSLATION_MODEL` tuỳ chọn, mặc định `gemini-2.5-flash`.
4. `CATALOG_ADMIN_ID` tuỳ chọn; mặc định cùng UUID tài khoản quản trị trong migration CMS nói trên. Khi đổi tài khoản, cập nhật cả quyền bảng và quyền gọi dịch.
5. Deploy `supabase/functions/translate-catalog` với xác thực JWT bật, rồi build/deploy frontend theo quy trình của dự án.
6. Thử đăng nhập thật, lưu một thay đổi đã duyệt, mở trang công khai Việt/Anh, thử ẩn/hiện và xác nhận tài khoản không có quyền không thể ghi/gọi dịch.

Tên riêng, URL, ảnh và slug không gửi dịch. Dịch vụ kiểm tra tài khoản admin trước khi gọi Gemini; kiểm tra đầu vào, JSON trả về và từ chối bản dịch bị cắt. Prompt giữ nguyên sự kiện, bằng cấp và số liệu; người quản trị vẫn nên duyệt lại thuật ngữ chuyên môn.

API tham khảo: https://ai.google.dev/gemini-api/docs/structured-output

## Kiểm tra đã thực hiện

- `npm run build`: qua; còn cảnh báo bundle lớn của dự án.
- `npm run lint`: qua, còn 22 cảnh báo ở các file sẵn có, không phát sinh cảnh báo trong phần mới.
- Kiểm tra câu chữ bằng `validate_copy.py`: 0 lỗi, 0 cảnh báo cho CatalogManager.
- Kiểm tra trình duyệt với API giả lập: sửa/lưu, tự dịch, ẩn khỏi danh sách và chi tiết, chặn ghi khi dịch lỗi, xung đột phiên bản, thêm giảng viên mặc định ẩn, bố cục điện thoại không tràn ngang.
- Kiểm tra handler dịch với Auth/Gemini giả lập: OPTIONS, thiếu đăng nhập, sai quyền, thiếu cấu hình, đầu vào sai, dịch thành công, bản dịch bị cắt.
- Chưa kiểm chứng RLS/database và Gemini trên production; các bài kiểm tra không ghi dữ liệu thật.
