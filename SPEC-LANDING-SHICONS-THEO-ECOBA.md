# SPEC LANDING PAGE MỚI CHO SHICONS — NỘI DUNG SHICONS × GIAO DIỆN ECOBA

> **Công thức:** bố cục, component và hành vi lấy theo landing page https://ecobame.com/ (đã mô tả chi tiết trong file `MO-TA-GIAO-DIEN-ECOBA-LANDING.md` cùng thư mục — đọc kèm file đó); **nội dung** lấy từ website Shicons hiện tại https://web-shicons-flame.vercel.app/ (thu thập ngày 19/11/2026); **hệ màu** lấy theo logo Shicons.
> **Đối tượng đọc:** AI code (Antigravity) thi công giao diện mới cho Shicons E&C.
> **Ràng buộc cứng:**
> 1. Không dùng màu xanh lá, font, ảnh hay nội dung của Ecoba — Ecoba chỉ là mẫu *bố cục*.
> 2. Không sao chép ảnh stock: mọi ảnh phải là ảnh thật công trình/đội ngũ của Shicons; ảnh dự án phải **đúng dự án** (bản cũ từng gắn sai ảnh — xem mục 13).
> 3. Không giữ các lỗi của bản Shicons cũ: cuộn fullpage từng màn hình, chữ trang trí kiểu bản vẽ “CAD: 00.00 / BIM LOD 400” lặp khắp nơi, nút EN nửa vời, tiêu đề thẻ dự án chữ đen trên ảnh tối.

---

## 1. HỆ MÀU SHICONS (thay toàn bộ hệ màu Ecoba)

Màu trích trực tiếp từ file logo Shicons (`logo_shicons.png`, lấy mẫu pixel) + các mã đang dùng thống nhất trên site hiện tại:

| Vai trò | Mã | Nguồn / cách dùng |
|---|---|---|
| **Xanh chủ đạo (primary)** | `#0040A0` | Màu chữ SHI trong logo. Thay vai trò xanh lá `#006F3B` của Ecoba: nút đặc, header khi dính, khung viền ảnh About, vòng tròn icon |
| Xanh sáng (hover/biến thể) | `#004DA0` / `#0A4DA2` | Đang dùng trên site hiện tại |
| **Navy đậm** | `#00306E`–`#07182E` | Đầu gradient hero, nền footer nếu cần đậm, chữ heading phụ |
| **Đỏ nhấn (accent)** | `#ED1C24` (biến thể đang dùng `#EE1C25`) | Màu trong logo. Thay vai trò vàng `#FFCF0E` của Ecoba: link “Chi tiết”, gạch nhấn, pill nhãn, nút gọi điện — **chỉ điểm nhấn, không làm nền diện rộng** |
| Xanh cyan phụ | `#00C5FF` | Chỉ dùng rất hạn chế (chi tiết nhỏ kiểu bản vẽ nếu thật cần); mặc định không dùng |
| Nền xám nhạt section | `#F5F5F5` | Tin tức, Dự án (giữ như mẫu Ecoba) |
| Nền footer | `#F2F2F2` | Giữ như mẫu Ecoba |
| Chữ chính / phụ | `#111111`–`#222222` / `#666666` | |

**Ánh xạ nhanh Ecoba → bản mới:** xanh lá → xanh `#0040A0`; gradient xanh lá→ngọc → gradient **navy đậm (trái) → xanh `#0040A0` (phải)** trong cùng họ xanh dương, không chệch sang xanh lá/ngọc; vàng nhấn → đỏ `#ED1C24`; đỏ nút điện thoại → giữ đỏ (trùng màu nhấn Shicons).

## 2. KIỂU CHỮ

- Giữ font đang chạy trên site Shicons: **Be Vietnam Pro** cho heading (Bold, in hoa), **Plus Jakarta Sans** cho body 14–16px. Không dùng font URW DIN của Ecoba.
- Heading section: in hoa, bold, ~30–36px, màu đen; gạch ngắn màu **đỏ** hoặc xanh dưới heading theo mẫu từng section ở file Ecoba.
- Watermark outline tên thương hiệu phía sau section About và Dự án: đổi chữ thành **“SHICONS”**, xám rất nhạt như mẫu.

## 3. BẢNG GHÉP SECTION (tổng quan)

| # | Khung Ecoba | Nội dung Shicons đưa vào |
|---|---|---|
| 1 | Header trong suốt + menu drawer | Logo Shicons bản trắng, menu 6 mục của Shicons |
| 2 | Hero slider 100vh, 1 headline + CTA | 4 slide dự án/thông điệp của Shicons (xoay vòng) |
| 3 | Về chúng tôi 2 cột + media có play | Giới thiệu Shicons E&C + dải 4 con số năng lực |
| 4 | Tin tức 1 lớn + 2 nhỏ | 3 bài mới nhất của Shicons |
| 5 | Banner dọc dịch vụ (Ecoba 3 cột) | **5 lĩnh vực của Shicons → mở rộng thành 5 cột** |
| 6 | Tuyển dụng 3 cột tròn | 3 vị trí đang tuyển của Shicons |
| 7 | Dự án: nổi bật trái + carousel phải | Dự án Amkor nổi bật + 5 dự án còn lại |
| 8 | Đối tác lưới 4×2 | Đúng 8 đối tác của Shicons |
| 9 | Footer 4 cột | Thông tin liên hệ Shicons |
| + | Nút nổi + popup form | Kênh liên hệ Shicons: form tư vấn, Zalo, hotline |

## 4. HEADER

- Như mẫu Ecoba: đầu trang **trong suốt chồng lên hero** — trái: hamburger; **giữa: logo Shicons bản trắng**; phải: kính lúp tìm kiếm + cờ VI/EN.
- Cuộn xuống: dính, nền xanh đặc `#0040A0`, cao ~60–70px.
- Menu drawer 6 mục đúng thứ tự site Shicons: **Trang chủ · Về chúng tôi · Lĩnh vực · Dự án · Tin tức · Liên hệ**.
- Cờ EN: chỉ hiển thị khi bản tiếng Anh đã hoàn chỉnh toàn site; chưa xong thì **ẩn hẳn ở mọi thiết bị** (không lặp lỗi bản cũ: desktop ẩn nhưng mobile còn).

## 5. HERO (khung Ecoba, nội dung Shicons)

- Cao ~100vh, slider **4 slide** tương ứng 4 thông điệp hiện tại của Shicons; mỗi slide: ảnh nền công trình thật toàn màn hình + phủ gradient **navy → xanh** (đậm trái, sáng phải); khối visual/ảnh dự án nằm phía phải như vị trí cutout của mẫu Ecoba (dùng ảnh thật của chính dự án trong slide, không dùng ảnh người mẫu tách nền).
- Cấu trúc chữ mỗi slide (1/3 dưới–trái): pill nhãn nhỏ viền trắng (loại dự án + địa điểm) → **headline trắng bold ~36–40px, tối đa 2–3 dòng** → dòng mô tả ngắn có số liệu → hàng 2 nút: **đặc đỏ** “Khám phá dự án tiêu biểu” + **outline trắng** “Hồ sơ năng lực (PDF)”.
- 4 headline (nguyên văn định hướng, rút gọn khi lên layout nếu quá dài):
  1. Amkor Technology Vietnam — “Thi công Hệ thống Cơ điện & Phòng sạch Bán dẫn — Tiêu chuẩn Toàn cầu” (KCN Yên Phong II-C, Bắc Ninh).
  2. Bệnh viện Đa khoa Quốc tế Vinmec — “Hệ thống Khí sạch Phòng mổ & Hạ tầng Y tế Chuẩn Quốc tế”.
  3. Pegatron Hải Phòng — “Thi công Cơ điện Nhà máy Sản xuất Điện tử Công nghệ cao”.
  4. Bệnh viện An Sinh — “Hệ thống Khí sạch & Phòng mổ Y tế”.
- Điều khiển: khác mẫu Ecoba (Ecoba ẩn controls), bản này **giữ điều khiển của Shicons nhưng đặt an toàn**: mũi tên Trước/Sau + thanh tiến trình ở **cụm đáy–trái**, dots ở đáy; cụm nút nổi liên hệ (mục 11) tuyệt đối không đè lên cụm này.
- Giữa đáy: chỉ báo “Cuộn xuống” + chevron đôi trắng như mẫu Ecoba.
- Nút “Hồ sơ năng lực” phải trỏ tới file PDF hồ sơ thật, có nội dung (bản hiện tại: 29 trang) — kiểm tra file tải được trước khi gắn.

## 6. VỀ CHÚNG TÔI (khung Ecoba 2 cột)

- Cột trái (media): ảnh thật đội ngũ/công trường Shicons, **khung viền xanh `#0040A0` dày đặt lệch sau ảnh** như mẫu; nút play tròn trắng ở giữa **chỉ xuất hiện khi có video thật** của Shicons — chưa có video thì bỏ nút play, giữ nguyên ảnh + khung.
- Cột phải: heading “VỀ CHÚNG TÔI” → dòng “SHICONS E&C” xanh `#0040A0` ~34px → gạch ngắn đỏ → đoạn mô tả rút gọn: nhà thầu cơ điện chuyên sâu cho nhà máy công nghệ cao FDI, bệnh viện và cao ốc; tôn chỉ “Kỹ thuật Chính xác — An toàn Tuyệt đối — Bền vững Cùng Khách hàng”; ứng dụng BIM Revit MEP trong thiết kế–thi công → nút **outline xám** “Tìm hiểu năng lực Shicons E&C” → trang Về chúng tôi.
- **Dải số liệu dưới section (bổ sung theo nội dung Shicons, mẫu Ecoba không có):** 4 con số chạy đếm khi cuộn tới, style phẳng, số xanh đậm + nhãn xám: **10+ năm kinh nghiệm · 20+ kỹ sư & chuyên gia · 50+ dự án hoàn thành · 100% chuẩn an toàn HSE**. Chỉ dùng đúng 4 con số này (đã chốt trên bản hiện tại); không thêm số liệu khác khi chưa có nguồn.

## 7. TIN TỨC (khung Ecoba 1 lớn + 2 nhỏ)

- Nền `#F5F5F5`; heading “TIN TỨC” trái + nút outline “Xem tất cả” phải cùng hàng.
- Thẻ lớn (trái, ~2/3): bài **Lễ cất nóc nhà máy Pegatron Hải Phòng** — 15/10/2024.
- 2 thẻ nhỏ (phải, xếp dọc): **Shicons trúng thầu gói M&E tháp Capital One** — 28/09/2024; **Ứng dụng BIM Revit MEP LOD 400 trong điều phối thi công** — 12/09/2024.
- Giải phẫu thẻ giữ nguyên mẫu Ecoba: ảnh tràn, bo ~10px, gradient đen ở đáy, tiêu đề trắng in hoa trên gradient, ngày + icon đồng hồ ngay dưới tiêu đề. Bài thứ 4 (tuần lễ HSE) chỉ nằm ở trang danh sách tin.

## 8. LĨNH VỰC HOẠT ĐỘNG (khung Ecoba banner dọc — mở rộng 3 → 5 cột)

- 5 cột ảnh dọc **full-bleed khít nhau**, mỗi cột 20% bề ngang desktop, cao ~620–680px; phủ tối ~50%; giữa cột: **vòng tròn outline trắng ~110px + icon nét trắng**; dưới vòng tròn: nhãn phụ tiếng Anh nhỏ + **tên lĩnh vực trắng in hoa giãn chữ**. Cả cột là link tới trang chi tiết lĩnh vực. Tablet: trượt ngang từng cột; mobile: xếp dọc hoặc carousel 1 cột.
- 5 lĩnh vực (đúng nội dung Shicons):
  1. **Hệ thống Điều hòa không khí (HVAC)** — Chiller/VRV-VRF, cân bằng thủy lực, tích hợp BMS.
  2. **Hệ thống Khí sạch & Phòng mổ Y tế** — Laminar HEPA H14, khí y tế chuẩn HTM 02-01 & NFPA 99.
  3. **Cơ điện & Phòng sạch Nhà máy** — Trạm 22–35kV, Busway đến 6300A, phòng sạch vi điện tử/dược, RO/EDI.
  4. **Thông gió, Hút khói & Tạo áp** — Jetfan tầng hầm kiểm soát CO, ống chịu nhiệt 300°C/2 giờ, tăng áp thang thoát hiểm.
  5. **Kiểm định T&C, Vận hành & Bảo trì** — Testing & Commissioning, O&M sau bàn giao.
- Ảnh mỗi cột phải đúng tính chất lĩnh vực (ảnh phòng mổ cho cột 2, ảnh phòng sạch nhà máy cho cột 3…).

## 9. TUYỂN DỤNG (khung Ecoba 3 cột tròn)

- Nền trắng; heading “TUYỂN DỤNG” căn giữa; 3 cột theo mẫu Ecoba (ảnh tròn ~250px phủ tối nhẹ, icon nét trắng ở mép dưới ảnh, vòng outline xám nối nhau phía sau).
- Nội dung 3 cột = **3 vị trí đang tuyển** trên trang Tuyển dụng của Shicons: tiêu đề cột = tên vị trí (đen, in hoa, ~18px); mô tả 2 dòng = nơi làm việc + dải lương:
  1. Kỹ sư Giám sát thi công Điện & Điện nhẹ — Bình Dương / Đồng Nai · 16–24 triệu.
  2. Kỹ sư Thiết kế & Điều phối BIM / Revit MEP — TP. Hồ Chí Minh / Hà Nội · 20–32 triệu.
  3. Chỉ huy trưởng Cơ điện (M&E Site Manager) — Bắc Ninh / Hải Phòng · 35–55 triệu.
- Nút **outline xám** “Ứng tuyển ngay” căn giữa bên dưới → trang Tuyển dụng. Hạn nộp hiện tại 31/12/2026 — khi hết hạn phải cập nhật dữ liệu, không để tin hết hạn chạy trên trang chủ.

## 10. DỰ ÁN (khung Ecoba: nổi bật + carousel)

- Nền `#F5F5F5`; dải dọc **xanh `#0040A0`** sau heading (thay dải xanh lá của mẫu); watermark “SHICONS” trên–phải; heading “DỰ ÁN” + nút **đặc xanh** “XEM THÊM DỰ ÁN” ngay dưới.
- **Dự án nổi bật (trái, ~42%):** Nhà máy Bán dẫn Amkor Technology Vietnam — KCN Yên Phong II-C, Bắc Ninh · 2024 · 230.000 m² · trạng thái “Đã bàn giao”. Caption trắng dưới ảnh: tiêu đề đen bold + link **“Chi tiết” màu đỏ** kèm vòng tròn xanh có chevron phải.
- **Carousel (phải):** 5 dự án còn lại, ~3 cột ló cột thứ 4, 2 hàng; thẻ = ảnh trên + caption trắng dưới (tiêu đề đen in hoa ~13–14px + dòng meta xám: địa điểm • năm • quy mô):
  - Pegatron Hải Phòng — KCN Nam Đình Vũ, Hải Phòng • 2024 • 150.000 m² • Đã bàn giao.
  - Tháp Văn phòng Capital One — Quận 1, TP. Hồ Chí Minh • 2025 • 45.000 m² • Đang thi công.
  - Bệnh viện Vinmec Smart City — Nam Từ Liêm, Hà Nội • 2025 • 68.000 m² • Đang thi công.
  - Trung tâm Dữ liệu Viettel IDC — KCN Cao Láng Hòa Lạc, Hà Nội • 2023 • 25.000 m² • Đã bàn giao.
  - Nhà máy Dược phẩm Danapha — KCN Công nghệ cao, Đà Nẵng • 2024 • 40.000 m² • Đã bàn giao.
- **Quy định ảnh (rút kinh nghiệm bản cũ):** mỗi thẻ dùng ảnh thật của đúng dự án đó; cấm ảnh có logo/tên của chủ đầu tư khác phủ lên dự án không liên quan, cấm ảnh ghép có watermark lạ; tiêu đề nằm trên **caption trắng** như mẫu Ecoba (không in chữ trực tiếp lên ảnh tối) để luôn đọc rõ.

## 11. ĐỐI TÁC (khung Ecoba lưới 4×2)

- Nền trắng; heading “ĐỐI TÁC UY TÍN”; lưới **4 cột × 2 hàng = đúng 8 đối tác** của Shicons: Daikin · Mitsubishi Heavy Industries · Schneider Electric · Trane Technologies · Carrier · Panasonic · VAF · Phương Nam Panel. Logo grayscale, căn giữa ô, chiều cao ô đồng nhất.

## 12. NÚT NỔI + POPUP TƯ VẤN (khung Ecoba, kênh Shicons)

- Cụm nút tròn ~48px cố định **mép phải, giữa chiều cao (~45%)**, xếp dọc cách ~12px, theo thứ tự: (1) nút **xanh `#0040A0`** icon máy bay giấy → mở popup tư vấn; (2) nút **Zalo** (bổ sung theo kênh thực tế của Shicons) → mở chat Zalo; (3) nút **đỏ `#ED1C24`** icon điện thoại → gọi hotline 0919 69 29 79.
- Kiểm tra vị trí cụm nút trên cả desktop và mobile 390px: không đè nút điều khiển hero, không đè nút mở menu.
- **Popup tư vấn** (mẫu Ecoba, trường của Shicons): tiêu đề xanh “GỬI THÔNG TIN CHO CHÚNG TÔI”; hàng 2 cột: Họ và tên \* | Số điện thoại / Email \*; ô Nội dung yêu cầu (textarea); ghi chú đính kèm nếu có (PDF tối đa 10MB như mẫu); nút **đặc xanh** “GỬI YÊU CẦU” căn giữa. Popup chỉ là form nhanh — form đầy đủ (có chọn lĩnh vực quan tâm) nằm ở trang Liên hệ.

## 13. FOOTER (khung Ecoba 4 cột)

- Nền `#F2F2F2`; tiêu đề cột đen bold ~18px + gạch ngắn **xanh** ~40px bên dưới.
  1. Logo Shicons bản màu + “CÔNG TY CỔ PHẦN SHICONS E&C”.
  2. **LIÊN HỆ:** Trụ sở: 78H Đường số 9, Phường Hiệp Bình, TP. Hồ Chí Minh · Hotline: 0919 69 29 79 – 0919 69 79 86 · Email: shicons.vn@gmail.com · Website: shicons.vn / gmpcons.vn. *(Lưu ý nội dung: nên thay email Gmail bằng email theo tên miền công ty khi có.)*
  3. **DANH MỤC:** Về chúng tôi · Lĩnh vực · Dự án · Tin tức · Liên hệ.
  4. **LIÊN KẾT:** nút tròn Facebook + Zalo (màu hãng).
- Hàng đáy: trái “© 2026 Copyright Shicons E&C” xám nhỏ; phải nút lên đầu trang vòng tròn outline.

## 14. RESPONSIVE & HÀNH VI

- Breakpoint theo mẫu Ecoba: ≥850px desktop đầy đủ; 550–849px: About 1 cột, Tin tức xếp dọc, carousel dự án ~2 cột, đối tác 3 cột, footer 2 cột; <550px: hero headline ~26–28px, banner lĩnh vực trượt ngang/xếp dọc, tuyển dụng 1 cột, đối tác 2 cột, footer 1 cột, popup full-width trừ lề 16px.
- Cuộn trang **bình thường** (không fullpage snap như bản Shicons cũ); hiệu ứng giữ tối giản: header đổi nền khi cuộn, hover zoom ảnh nhẹ, carousel dự án trượt theo nhóm, số liệu About đếm khi cuộn tới.
- Nút bấm **vuông** (bo ≤2px) theo mẫu Ecoba trên toàn trang — gồm cả 2 nút hero.

## 15. CHECKLIST NGHIỆM THU

- [ ] Đủ 9 section đúng thứ tự của bảng ghép mục 3; không còn section nào của giao diện cũ (fullpage, dải đối tác bị cắt, trang trí CAD).
- [ ] Toàn trang chỉ dùng hệ màu mục 1: không xuất hiện xanh lá `#006F3B` hay vàng `#FFCF0E` của Ecoba.
- [ ] Header trong suốt → dính nền `#0040A0`; logo giữa; cờ EN ẩn hẳn cho tới khi bản EN hoàn chỉnh.
- [ ] Hero 4 slide đúng 4 dự án/thông điệp mục 5; nút PDF tải được file hồ sơ thật; cụm điều khiển ở đáy–trái không bị nút nổi đè.
- [ ] About có khung viền xanh lệch sau ảnh; không có nút play khi chưa có video thật; dải số liệu đúng 4 con số đã chốt.
- [ ] Tin tức đúng 3 bài và đúng ngày ở mục 7; tiêu đề trắng đọc rõ trên gradient.
- [ ] Lĩnh vực đủ 5 cột, ảnh đúng lĩnh vực, nhãn đọc rõ trên mọi cột.
- [ ] Tuyển dụng đúng 3 vị trí + dải lương + nơi làm việc hiện hành.
- [ ] Dự án: Amkor nổi bật; 5 thẻ carousel đủ meta (địa điểm • năm • quy mô • trạng thái); **ảnh đúng dự án**, không watermark lạ, không logo bên thứ ba phủ sai.
- [ ] Đối tác đủ 8 logo, grayscale, không logo nào lặp.
- [ ] Popup tư vấn đủ trường; nút Zalo và nút gọi mở đúng kênh; kiểm trên 390px không đè nội dung.
- [ ] Footer đủ thông tin liên hệ; kiểm 3 mốc 1440 / 768 / 390px: không tràn ngang, không chồng chữ.

---
*Lập ngày 19/11/2026. Nguồn giao diện: ecobame.com (xem file `MO-TA-GIAO-DIEN-ECOBA-LANDING.md`). Nguồn nội dung: web-shicons-flame.vercel.app tại thời điểm lập. Nguồn màu: lấy mẫu pixel từ logo Shicons + mã màu đang dùng trên site.*
