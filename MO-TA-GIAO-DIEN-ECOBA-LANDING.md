# MÔ TẢ GIAO DIỆN LANDING PAGE — ECOBAME.COM

> **Mục đích file:** mô tả đầy đủ giao diện trang chủ https://ecobame.com/ (đo trực tiếp ngày 19/11/2026: xem trực quan trên trình duyệt + phân tích HTML/CSS) để AI code (Antigravity) **code lại một giao diện tương tự về bố cục, phong cách và hành vi**.
> **Nguyên tắc bắt buộc:** chỉ học *bố cục, hệ màu, kiểu chữ, mẫu component và tương tác*. **Không** sao chép logo, hình ảnh, tên công ty và nội dung chữ của ECOBA — khi thi công phải thay bằng thương hiệu/nội dung/ảnh của chủ site mới. Các kích thước px ghi “ước lượng” là đo từ hiển thị thực tế, chấp nhận sai số ±10%.

---

## 1. TỔNG QUAN

- Loại trang: landing page doanh nghiệp nhà thầu cơ điện (M&E), 1 trang chủ dài, cuộn dọc bình thường (không fullpage).
- Trang gốc chạy WordPress + theme Flatsome; khi code lại không cần dùng WordPress — giữ nguyên *diện mạo và hành vi*, stack tùy chọn (khuyến nghị component hoá theo đúng 9 section dưới đây).
- Thứ tự section từ trên xuống:
  1. Header (trong suốt, chồng lên hero → dính, nền xanh khi cuộn)
  2. Hero slider toàn màn hình
  3. Về chúng tôi (2 cột: video/ảnh — nội dung)
  4. Tin tức (1 thẻ lớn + 2 thẻ nhỏ)
  5. Ba banner dịch vụ dọc: Thiết kế / Thi công / Bảo hành
  6. Tuyển dụng (3 cột tròn + nút ứng tuyển)
  7. Dự án (1 dự án nổi bật + carousel lưới dự án)
  8. Đối tác uy tín (lưới logo 4×2)
  9. Footer 4 cột
- Phần tử cố định: 2 nút tròn nổi ở mép phải giữa màn hình (mở popup liên hệ / gọi điện), popup form liên hệ, nút lên đầu trang ở footer.

## 2. DESIGN TOKENS

### 2.1 Màu sắc (mã hex lấy từ CSS trang gốc)
| Vai trò | Mã | Ghi chú |
|---|---|---|
| Xanh lá thương hiệu (primary) | `#006F3B` | Nền header khi dính, nút chính, tiêu đề nhấn |
| Xanh lá sáng hơn (hover/biến thể) | `#0B7A3E` | Quan sát trên hiển thị |
| Xanh lá đậm | `#066B2F` | Gradient hero, điểm sâu |
| Vàng nhấn (accent) | `#FFCF0E` | Điểm nhấn nhỏ, link “Chi tiết” dự án (nghiêng cam-vàng) |
| Đỏ nút gọi điện | `#C1272D` (ước lượng) | Nút điện thoại nổi |
| Nền xám nhạt section | `#F5F5F5` | Tin tức, Dự án |
| Nền footer | `#F2F2F2` | |
| Nền thanh phụ header | `#F1F1F1` | `header-bottom` trong CSS gốc |
| Chữ chính | `#111111`–`#222222` | Tiêu đề, nội dung chính |
| Chữ phụ | `#666666` | Mô tả, ngày tháng |
| Trắng | `#FFFFFF` | Chữ trên nền xanh/ảnh |

### 2.2 Kiểu chữ
- Font gốc: **URW DIN** (bản Arabic) — heading dùng bản Bold; khi code lại có thể thay bằng font sans hình học tương đương hỗ trợ tiếng Việt tốt (ví dụ Be Vietnam Pro / Inter / Archivo) nhưng phải giữ tính cách: **heading in hoa, bold, hơi nén; body regular 14–16px**.
- Heading section: in hoa, bold, ~30–36px, màu đen; một số section có thêm dòng chữ lớn xanh ngay dưới (xem About) hoặc gạch ngắn màu xanh dưới heading.
- Watermark trang trí: chữ tên thương hiệu dạng outline, xám rất nhạt, kích thước rất lớn, đặt phía sau nội dung ở section About và Dự án.

### 2.3 Khung & nhịp
- Container căn giữa ~1200–1280px, hai bên chừa lề an toàn.
- Padding dọc mỗi section ~80–100px (ước lượng); mật độ thoáng, nhiều khoảng trắng.
- Bo góc: nút bấm gần như **vuông** (bo ≤2px) — đây là nét nhận diện quan trọng, không bo tròn kiểu pill; thẻ tin tức bo ~10px; thẻ dự án bo nhẹ.

### 2.4 Các kiểu nút (button system)
| Kiểu | Diện mạo | Dùng ở |
|---|---|---|
| Outline trắng | Viền mảnh trắng, nền trong suốt, chữ trắng, ~200×44px | CTA trên hero |
| Outline xám (secondary outline) | Viền xám, chữ đen/xám, nền trong suốt | About, “Xem tất cả” tin tức, “Ứng tuyển ngay” |
| Đặc xanh (primary solid) | Nền `#006F3B`, chữ trắng in hoa, ~260×52px | “XEM THÊM DỰ ÁN” |
| Tròn icon | Đường kính ~48–64px | Nút play video, nút nổi liên hệ/điện thoại, social footer |

## 3. HEADER

- Trạng thái đầu trang: **trong suốt, chồng lên hero**. Từ trái qua phải: nút hamburger (3 gạch, trắng) — logo ở **giữa** (bản trắng của logo) — cụm phải: icon kính lúp tìm kiếm + 2 cờ chuyển ngữ VI/EN (icon cờ nhỏ 16×11px).
- Menu **không** trải ngang trên desktop: bấm hamburger mở **ngăn kéo (drawer)** chứa 8 mục theo thứ tự: Trang chủ · Giới thiệu · Năng lực · Lĩnh vực hoạt động · Dự án · Tin tức · Tuyển dụng · Liên hệ.
- Khi cuộn: header **dính (sticky)**, chuyển nền xanh đặc `#006F3B`, chiều cao thu còn ~60–70px, logo và icon giữ màu trắng.
- Không có CTA dạng nút trong header; điểm liên hệ nhanh nằm ở nút nổi (mục 11).

## 4. SECTION 1 — HERO SLIDER

- Toàn chiều ngang, cao ~100vh.
- Cấu trúc slide (trang gốc có 2 slide cùng một bố cục, khác ảnh nền): ảnh nền công trình toàn màn hình + **lớp phủ gradient xanh lá**: đậm ở trái → xanh ngọc (turquoise) ở phải.
- Phía phải slide: ảnh **người cắt nền (cutout)** — 2 kỹ sư đội mũ bảo hộ trắng, áo phản quang — đứng trên nền, cao khoảng 70–80% chiều cao hero, neo sát đáy.
- Nội dung chữ ở **1/3 dưới–trái**: headline trắng bold ~36–40px, tối đa 2 dòng (nội dung mẫu của trang gốc nói về “tiên phong nghiên cứu, ứng dụng mô hình quản lý tiên tiến” — khi code lại thay bằng slogan của chủ site).
- Dưới headline: nút **outline trắng** “Xem thêm về chúng tôi” → trỏ tới trang Giới thiệu.
- Điều khiển slider: trang gốc **không hiển thị** mũi tên/dots (mũi tên trong DOM ở trạng thái tắt); khi code lại giữ đúng tinh thần tối giản này — slider tự chuyển hoặc đứng yên, không lộ controls. Nếu cần controls thì làm dots nhỏ mờ ở đáy.
- Giữa đáy hero: chỉ báo cuộn — chữ nhỏ “Kéo xuống” + icon chevron đôi hướng xuống, màu trắng; bấm vào cuộn xuống section tiếp theo.

## 5. SECTION 2 — VỀ CHÚNG TÔI

- Nền trắng. Bố cục 2 cột (mỗi cột ~48–52%).
- **Cột trái — media:** ảnh thumbnail video công trường; phía sau ảnh, lệch lên–trái, có **khung viền xanh lá dày** tạo hiệu ứng lớp (layer). Giữa ảnh: nút play tròn trắng ~64px, bấm mở video YouTube (trang gốc nhúng 1 video giới thiệu).
- **Cột phải — nội dung:** heading “VỀ CHÚNG TÔI” đen in hoa ~30px → dòng tên thương hiệu xanh lá ~34px bold → gạch ngắn màu xanh → đoạn mô tả xám ~15px, 4–6 dòng (giới thiệu số năm hoạt động, lĩnh vực, loại công trình) → nút **outline xám** “Xem thêm về chúng tôi”.
- Phía sau section: watermark tên thương hiệu outline xám nhạt rất lớn.

## 6. SECTION 3 — TIN TỨC

- Nền xám nhạt `#F5F5F5`.
- Hàng tiêu đề: trái là heading “TIN TỨC” đen ~32px; phải cùng hàng là nút **outline** “Xem tất cả”.
- Lưới bài viết dạng **1 lớn + 2 nhỏ**: thẻ lớn bên trái chiếm ~2/3 bề ngang, cao ~430px; bên phải 2 thẻ nhỏ xếp dọc, mỗi thẻ cao ~200px.
- Giải phẫu thẻ: ảnh tràn toàn thẻ, bo góc ~10px, **gradient đen ở đáy**; tiêu đề bài màu trắng, in hoa, bold, nằm dưới–trái trên gradient; ngay dưới tiêu đề là **ngày đăng kèm icon đồng hồ nhỏ** (không dùng huy hiệu ngày ở góc).
- Hover: ảnh phóng nhẹ (zoom) trong khung.

## 7. SECTION 4 — BA BANNER DỊCH VỤ

- 3 cột ảnh **dọc (portrait)** xếp khít nhau, **full-bleed không khoảng hở**, mỗi cột 1/3 bề ngang, cao ~620–680px (ước lượng). Ba cột: **THIẾT KẾ — THI CÔNG — BẢO HÀNH**.
- Mỗi cột: ảnh công trường toàn cột + lớp phủ tối ~50%.
- Giữa thân cột: **vòng tròn outline trắng mảnh ~110px** chứa icon nét (line icon) trắng theo chủ đề (bút/thước cho thiết kế; dụng cụ/mũ bảo hộ cho thi công; khiên có dấu tick cho bảo hành).
- Dưới vòng tròn: nhãn chữ trắng in hoa, giãn chữ rộng (letter-spacing lớn), ~22–24px.
- Hover: ảnh zoom rất nhẹ; cả cột là 1 link tới trang dịch vụ tương ứng.

## 8. SECTION 5 — TUYỂN DỤNG

- Nền trắng (lưu ý: **không** dùng ảnh nền toàn section dù trang gốc có sẵn ảnh nền tuyển dụng trong thư viện).
- Heading “TUYỂN DỤNG” đen ~36px, **căn giữa**.
- Dưới heading: 3 cột cách đều. Mỗi cột gồm: **ảnh tròn ~250px** (ảnh có phủ tối nhẹ), một **icon nét trắng** chồng ở mép dưới ảnh; phía sau ảnh là vòng tròn outline xám mảnh lớn đặt lệch — 3 vòng của 3 cột nối nhau tạo thành đường cong S liền mạch chạy ngang section.
- Dưới ảnh: tiêu đề cột đen in hoa bold ~18px căn giữa (mẫu: “CHÍNH SÁCH ĐÃI NGỘ”, “MÔI TRƯỜNG LÀM VIỆC”, “VĂN HÓA DOANH NGHIỆP”) + mô tả xám ~14px, căn giữa, tối đa 2 dòng.
- Dưới 3 cột: nút **outline xám** “ỨNG TUYỂN NGAY” căn giữa (~220×48px) → trỏ tới trang Tuyển dụng.

## 9. SECTION 6 — DỰ ÁN

- Nền xám nhạt `#F5F5F5`. Trang trí: dải dọc xanh lá ở mép trái phía sau khu vực heading + watermark outline tên thương hiệu rất lớn ở trên–phải.
- Heading “DỰ ÁN” đen ~36px lệch trái; ngay dưới heading là nút **đặc xanh** “XEM THÊM DỰ ÁN” (~260×52px).
- Bố cục chính chia 2 vùng:
  - **Trái — dự án nổi bật (~42% bề ngang):** ảnh lớn; dưới ảnh là thanh caption nền trắng chứa tiêu đề dự án đen bold (cắt ngắn 1 dòng) + link “Chi tiết” màu cam-vàng kèm vòng tròn xanh chứa chevron phải.
  - **Phải — carousel lưới dự án:** hiển thị ~3 cột + cột thứ 4 ló một phần ở mép phải (gợi ý còn nội dung để trượt), 2 hàng thẻ trong một khung nhìn; tổng 8 nhóm nội dung, có nút Trước/Sau dạng mũi tên xám nhỏ (nút Trước mờ/tắt ở vị trí đầu).
- Giải phẫu thẻ dự án: ảnh ở trên (tỉ lệ ngang), caption trắng bên dưới: tiêu đề đen in hoa ~13–14px, cắt ngắn tối đa 2 dòng. Không phủ chữ lên ảnh, không overlay khi hover.

## 10. SECTION 7 — ĐỐI TÁC UY TÍN

- Nền trắng. Heading “ĐỐI TÁC UY TÍN” đen ~36px lệch trái.
- Lưới logo **4 cột × 2 hàng = 8 logo** hiển thị cùng lúc, khoảng cách đều, logo để **thang xám (grayscale)** là chủ yếu, căn giữa từng ô. Không hiển thị mũi tên/dots (lưới tĩnh hoặc tự trượt không lộ điều khiển).
- Khi code lại: ô logo giữ chiều cao đồng nhất (~80–100px), logo co theo tỉ lệ, không méo.

## 11. PHẦN TỬ NỔI + POPUP LIÊN HỆ

- Cụm nút nổi cố định ở **mép phải, khoảng giữa chiều cao màn hình (~45%)**: 2 nút tròn ~48px xếp dọc, cách nhau ~12px:
  - Nút trên: nền xanh lá, icon máy bay giấy trắng → **mở popup liên hệ**.
  - Nút dưới: nền đỏ `#C1272D`, icon điện thoại trắng → gọi hotline (`tel:`).
- **Popup liên hệ** (mở giữa màn hình, nền trắng, rộng ~800px trên desktop, co theo màn hình mobile):
  - Tiêu đề xanh lá “GỬI THÔNG TIN CHO CHÚNG TÔI” + đường kẻ xám mảnh dưới tiêu đề.
  - Trường: **Tên của bạn \*** và **Số điện thoại \*** nằm cùng 1 hàng 2 cột; **Địa chỉ Email** full-width; **Nội dung** textarea; ô đính kèm file với ghi chú “Định dạng PDF — kích thước tối đa 10MB”.
  - Nút gửi: **đặc xanh**, căn giữa, chữ “GỬI YÊU CẦU”.
  - Đóng bằng nút X / phím Esc / bấm ra ngoài; không tự gửi khi chưa bấm nút.

## 12. FOOTER

- Nền xám rất nhạt `#F2F2F2`, không có dải copyright màu riêng.
- 4 cột:
  1. **Thương hiệu:** logo bản màu + tên công ty đầy đủ (đen, bold).
  2. **LIÊN HỆ:** Địa chỉ / Hotline / Fax / Email — nhãn in đậm, giá trị thường (nội dung thay theo chủ site mới).
  3. **DANH MỤC:** danh sách link dọc: Giới thiệu · Dự án · Năng lực · Lĩnh vực hoạt động · Tin tức.
  4. **LIÊN KẾT:** icon mạng xã hội dạng nút tròn có màu hãng (Facebook xanh dương, YouTube đỏ).
- Tiêu đề mỗi cột: đen bold ~18px, dưới có **gạch ngắn màu xanh ~40px**.
- Hàng đáy cùng nền: trái là dòng bản quyền nhỏ màu xám (“© năm Copyright [Tên thương hiệu]”); phải là **nút lên đầu trang** dạng vòng tròn outline.

## 13. RESPONSIVE (theo breakpoint của theme gốc)

- **≥850px:** bố cục như mô tả trên. Riêng 3 banner dịch vụ giữ 3 cột; lưới đối tác 4 cột.
- **550–849px (tablet):** About xếp 1 cột (media trên, chữ dưới); tin tức: thẻ lớn full-width, 2 thẻ nhỏ xếp dưới; dự án nổi bật full-width, carousel còn ~2 cột; đối tác 3 cột; footer 2 cột.
- **<550px (mobile):** header giữ dạng hamburger + logo giữa; hero: cutout người thu nhỏ/ẩn bớt, headline giảm còn ~26–28px; 3 banner dịch vụ xếp dọc hoặc trượt ngang từng cột; tuyển dụng 3 cột → 1 cột; đối tác 2 cột; footer 1 cột; popup liên hệ full-width trừ lề 16px; cụm nút nổi giữ nguyên vị trí mép phải.

## 14. HÀNH VI & HIỆU ỨNG (giữ mức tối giản như bản gốc)

- Header: trong suốt → dính nền xanh khi cuộn, thu chiều cao.
- Hover: ảnh trong thẻ/banner zoom nhẹ (scale ~1.03–1.05, transition ~0.3–0.5s); nút outline hover thì đầy nền màu tương ứng, chữ đổi màu.
- Carousel dự án: trượt theo nhóm, có trạng thái tắt ở đầu/cuối.
- Không dùng: hiệu ứng cuộn nặng, parallax mạnh, gradient trang trí ngoài hero, bo góc lớn, bóng đổ đậm — phong cách tổng thể là **phẳng, vuông, xanh lá – trắng – xám, nhiều khoảng trắng**.

## 15. TÀI SẢN CẦN CHUẨN BỊ KHI CODE LẠI (thay toàn bộ bằng của chủ site mới)

- Logo 2 bản: bản trắng (header/hero) và bản màu (footer).
- Hero: 1–2 ảnh nền công trình ngang lớn + 1 ảnh người/đội ngũ đã tách nền (PNG trong suốt).
- About: 1 ảnh công trường + 1 video giới thiệu (YouTube).
- Tin tức: ảnh cho tối thiểu 3 bài (1 ngang lớn, 2 ngang nhỏ).
- Dịch vụ: 3 ảnh dọc (thiết kế / thi công / bảo hành) + 3 icon nét trắng.
- Tuyển dụng: 3 ảnh vuông (để cắt tròn) + 3 icon nét.
- Dự án: ảnh cho 1 dự án nổi bật + tối thiểu 8 dự án trong carousel.
- Đối tác: 8 logo (ưu tiên bản đơn sắc/xám).
- Icon: hamburger, kính lúp, cờ VI/EN, play, đồng hồ (ngày), chevron, máy bay giấy, điện thoại, Facebook, YouTube, mũi tên lên.

## 16. CHECKLIST NGHIỆM THU GIAO DIỆN

- [ ] Đủ 9 section đúng thứ tự; header trong suốt ở đầu trang và dính nền xanh `#006F3B` khi cuộn.
- [ ] Hero cao ~100vh, gradient xanh đúng chiều (đậm trái → ngọc phải), cutout người ở phải, nút outline trắng, có chỉ báo “Kéo xuống”.
- [ ] Nút bấm vuông (không pill), đúng 4 kiểu nút ở mục 2.4.
- [ ] Heading section in hoa bold; About và Dự án có watermark outline phía sau.
- [ ] Tin tức đúng mẫu 1 lớn + 2 nhỏ, tiêu đề trắng trên gradient đen ở đáy thẻ.
- [ ] 3 banner dịch vụ full-bleed khít nhau, vòng tròn icon nét trắng + nhãn giãn chữ.
- [ ] Dự án: nổi bật bên trái + carousel ~3,5 cột × 2 hàng bên phải; thẻ có caption trắng dưới ảnh.
- [ ] Đối tác lưới 4×2, logo grayscale căn giữa.
- [ ] Footer 4 cột nền `#F2F2F2`, gạch xanh ngắn dưới tiêu đề cột, có nút lên đầu trang.
- [ ] Nút nổi mép phải giữa màn hình hoạt động: xanh mở đúng popup form (đủ 5 trường + ghi chú PDF 10MB), đỏ gọi đúng hotline.
- [ ] Kiểm 3 mốc bề ngang: 1440px, 768px, 390px — không tràn ngang, không chồng chữ.

---
*Tài liệu lập ngày 19/11/2026 từ đo đạc trực tiếp https://ecobame.com/ (trình duyệt thật + HTML/CSS). Mọi nội dung chữ/ảnh/logo của ECOBA trong file này chỉ là mô tả mẫu vị trí — phải thay bằng tài sản của chủ site khi thi công.*
