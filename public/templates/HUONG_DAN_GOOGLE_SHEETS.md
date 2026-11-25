# HƯỚNG DẪN KẾT NỐI GOOGLE SHEETS VỚI WEBSITE SHICONS E&C

Hệ thống cho phép bạn quản lý 100% nội dung website thông qua một file **Google Sheets** trực tuyến duy nhất. Bất kỳ khi nào bạn chỉnh sửa trên Google Sheets, website sẽ tự động cập nhật!

---

## BƯỚC 1: TẠO FILE GOOGLE SHEETS MẪU
Bạn chỉ cần mở Google Sheets và tạo một bảng tính mới với các trang tính (Tabs) như sau:

### 1. Trang tính: `DuAn` (Quản lý Dự án Cơ điện)
Tạo hàng tiêu đề với các cột sau:
- **`Tiêu đề`**: Tên dự án (Ví dụ: *Nhà máy Bán dẫn Amkor*)
- **`Hình ảnh`**: Link ảnh chất lượng cao (Unsplash hoặc ảnh Drive công khai)
- **`Mô tả`**: Đoạn tóm tắt ngắn (1-2 câu hiển thị ở trang chủ & danh sách)
- **`Chi tiết`**: Mô tả chi tiết giải pháp kỹ thuật, công nghệ thi công
- **`Chủ đầu tư`**: Tên chủ đầu tư (Ví dụ: *Amkor Technology*, *Vingroup*)
- **`Địa điểm`**: Vị trí công trình (Ví dụ: *Bắc Ninh*, *Hải Phòng*)
- **`Loại hình`**: `cleanroom` (Phòng sạch), `industrial` (Nhà máy), `commercial` (Tòa nhà), `infrastructure` (Hạ tầng)
- **`Năm`**: Năm thực hiện (Ví dụ: *2024*)
- **`Hạng mục MEP`**: Các thẻ phân cách bằng dấu `;` (Ví dụ: *HVAC Chiller; Trạm biến áp 22kV; PCCC*)
- **`Tiêu biểu`**: Gõ `Có` nếu muốn hiện to ở trang chủ

### 2. Trang tính: `LinhVuc` (5 Mảng Cơ điện)
- **`Tiêu đề`**: Tên hệ thống (Ví dụ: *Hệ thống Điều hòa không khí & Thông gió*)
- **`Tên tiếng Anh`**: *HVAC & Cleanroom Solutions*
- **`Hình ảnh`**: Link ảnh đại diện
- **`Mô tả`**: Đoạn giới thiệu ngắn
- **`Chi tiết`**: Giải pháp tổng thể, năng lực thiết kế
- **`Tiêu chuẩn`**: *ASHRAE, ISO 14644, QCVN 06*

### 3. Trang tính: `TinTuc` (Tin tức & Sự kiện)
- **`Tiêu đề`**: Tiêu đề bài viết
- **`Hình ảnh`**: Link ảnh bìa bài viết
- **`Mô tả`**: Đoạn tóm tắt hiển thị ngoài danh sách
- **`Chi tiết`**: Toàn bộ nội dung bài viết
- **`Chuyên mục`**: `project` (Tin dự án), `company` (Hoạt động), `technical` (Góc kỹ thuật)
- **`Ngày đăng`**: Ngày hiển thị (Ví dụ: *15 Tháng 10, 2024*)

### 4. Trang tính: `TuyenDung` (Tuyển dụng)
- **`Tiêu đề`**: Vị trí tuyển dụng (Ví dụ: *Chỉ huy trưởng Cơ điện MEP*)
- **`Phòng ban`**: Ban Quản lý Dự án / Phòng Kỹ thuật BIM
- **`Địa điểm`**: Bắc Ninh / Hải Phòng / TP.HCM
- **`Mức lương`**: 25.000.000 - 45.000.000 VNĐ
- **`Mô tả`**: Các đầu việc chính (phân cách bằng dấu `;`)
- **`Yêu cầu`**: Yêu cầu năng lực, bằng cấp (phân cách bằng dấu `;`)
- **`Quyền lợi`**: Chế độ đãi ngộ, bảo hiểm (phân cách bằng dấu `;`)
- **`Hạn nộp`**: Ngày hết hạn

---

## BƯỚC 2: CẤP QUYỀN TRUY CẬP CÔNG KHAI CHO GOOGLE SHEETS
1. Trong file Google Sheets, bấm vào nút **Chia sẻ** (Share) ở góc trên bên phải.
2. Tại mục *Quyền truy cập chung* (General access), chọn: **Bất kỳ ai có đường liên kết** (Anyone with the link).
3. Đặt vai trò là: **Người xem** (Viewer).
4. Bấm **Sao chép đường liên kết** (Copy link).

Đường link sẽ có dạng:  
`https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing`  
Trong đó đoạn mã giữa `/d/` và `/edit` chính là **ID Bảng tính**: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`.

---

## BƯỚC 3: KẾT NỐI VÀO WEBSITE SHICONS E&C
Có 2 cách cực kỳ nhanh chóng:

### Cách 1 (Trực tiếp trên giao diện Admin):
1. Truy cập vào trang quản trị: **`http://localhost:3000/admin`**
2. Dán đường link hoặc ID Google Sheet của bạn vào ô nhập.
3. Bấm **Lưu & Đồng bộ ngay**!

### Cách 2 (Qua file cấu hình):
Mở file `.env.local` trong thư mục gốc và dán:
```env
NEXT_PUBLIC_GOOGLE_SHEET_ID=dán_id_bảng_tính_vào_đây
```
Sau đó khởi động lại server (`npm run dev` hoặc `npm run build`).

---

## LƯU Ý KHI KHÔNG CÓ MẠNG HOẶC CHƯA CẤU HÌNH SHEETS
Nếu bạn chưa điền Google Sheet ID hoặc khi mất mạng, website sẽ **tự động đọc dữ liệu từ các file JSON cục bộ** tại thư mục `content/`:
- `content/projects.json` (Dự án)
- `content/services.json` (5 Lĩnh vực MEP)
- `content/posts.json` (Tin tức)
- `content/jobs.json` (Tuyển dụng)
- `content/settings.json` (Thông tin công ty, hotline, địa chỉ)
