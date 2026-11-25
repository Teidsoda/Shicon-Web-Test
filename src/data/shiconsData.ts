export interface Project {
  id: string;
  name: string;
  nameEn?: string;
  slug: string;
  category: 'cleanroom' | 'industrial' | 'infrastructure' | 'healthcare';
  categoryLabel: string;
  client: string;
  location: string;
  year: string;
  scale: string;
  status: 'Đã hoàn thành bàn giao' | 'Đang thi công hoàn thiện';
  mepScope: string[];
  imageUrl: string;
  gallery: string[];
  description: string;
  technicalHighlights: string[];
  challengesAndSolutions: string;
  featured?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  categoryLabel: string;
  date: string;
  imageUrl: string;
  excerpt: string;
  content: string;
  author: string;
  isFeatured?: boolean;
}

export interface DomainItem {
  id: string;
  code: string;
  slug: string;
  enTitle: string;
  viTitle: string;
  shortDesc: string;
  fullDesc: string;
  standard: string;
  badge: string;
  imageUrl: string;
  features: string[];
  subSystems: { name: string; desc: string }[];
  standards: string[];
}

export interface JobItem {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  salary: string;
  experience: string;
  deadline: string;
  status: string;
  imageUrl: string;
  description: string[];
  requirements: string[];
  benefits: string[];
}

export interface PartnerItem {
  id: string;
  name: string;
  tag: string;
  logo: string;
  type: string;
  typeLabel: string;
}

export interface ProductionLine {
  id: string;
  title: string;
  desc: string;
  specs: string[];
  image: string;
  tag: string;
}

export const CONTACT_INFO = {
  companyName: 'Công ty Cổ phần Shicons E&C',
  tradingName: 'SHICONS E&C',
  slogan: 'Giải pháp Cơ điện Toàn diện - Bền vững - Chuẩn mực Kỹ thuật Cao',
  description: 'Nhà thầu hàng đầu chuyên thiết kế, cung cấp và thi công trọn gói hệ thống Cơ điện (M&E / MEP) cho các dự án Nhà máy công nghệ cao, Tòa tháp thương mại, Phòng sạch Dược phẩm & Trung tâm dữ liệu.',
  hotlines: ['0919 69 29 79', '0919 69 79 86'],
  primaryHotline: '0919692979',
  email: 'shicons.vn@gmail.com',
  address: '78H Đường số 9, Phường Hiệp Bình, TP. Hồ Chí Minh',
  workingHours: 'Thứ Hai - Thứ Sáu: 08:00 - 17:30 | Thứ Bảy: 08:00 - 12:00',
  taxCode: '0314567890',
  websites: ['shicons.vn', 'gmpcons.vn'],
  zaloUrl: 'https://zalo.me/0919692979',
  facebookUrl: 'https://facebook.com/shiconsec',
  linkedinUrl: 'https://linkedin.com/company/shicons-ec',
  youtubeUrl: 'https://youtube.com/@shiconsec',
  profilePdfUrl: '/documents/SHICONS-EC-Profile-2026.pdf'
};

export const COMPANY_STATS = [
  { value: '10+', label: 'Năm kinh nghiệm', sub: 'Hành trình khẳng định vị thế nhà thầu MEP uy tín hàng đầu' },
  { value: '50+', label: 'Dự án MEP hoàn thành', sub: 'Trải dài trên khắp các khu công nghiệp & đô thị trọng điểm' },
  { value: '20+', label: 'Nhân sự & Kỹ sư', sub: 'Đội ngũ giàu kinh nghiệm thực chiến chuyên sâu' },
  { value: '10.000+', label: 'Giờ an toàn HSE', sub: 'Cam kết văn hóa an toàn không tai nạn mất ngày công (Zero LTI)' }
];

export const HERO_SLIDES = [
  {
    id: 'banner-01',
    badge: 'HẠ TẦNG TRỌNG ĐIỂM QUỐC GIA • TP. HỒ CHÍ MINH',
    title: 'Hạ tầng Cơ điện & Thông gió Nhà ga Quốc tế T3 Tân Sơn Nhất',
    desc: 'Giải pháp thông gió hút khói phản lực Jetfan 300°C trong 2 giờ, hạ tầng điện động lực và cấp thoát nước quy mô 112.500 m² sàn phục vụ 20 triệu hành khách/năm.',
    stats: '112.500 m² • Jetfan 300°C/2h • PCCC Sprinkler • BMS',
    bgImage: '/images/projects/nha-ga-t3-tsn.jpg',
    projectImage: '/images/projects/nha-ga-t3-tsn.jpg',
    link: '/du-an/nha-ga-quoc-te-t3-tan-son-nhat'
  },
  {
    id: 'banner-02',
    badge: 'CÔNG NGHỆ BÁN DẪN • TP. THỦ ĐỨC',
    title: 'Tổng thầu Cơ điện (MEP) & Phòng sạch Nhà máy Intel Việt Nam',
    desc: 'Thiết kế & thi công hệ thống Phòng sạch Class 1000, kiểm soát nhiệt ẩm dung sai khắt khe ±0.5°C & trạm điện nguồn liên tục 24/7 cho sản xuất chip bán dẫn.',
    stats: '46.000 m² • Class 1000 • Khí siêu sạch CDA • BIM LOD 400',
    bgImage: '/images/projects/nha-may-intel.jpg',
    projectImage: '/images/projects/nha-may-intel.jpg',
    link: '/du-an/nha-may-san-xuat-ban-dan-intel-viet-nam'
  },
  {
    id: 'banner-03',
    badge: 'CHẾ BIẾN THỰC PHẨM CHÂU ÂU • BÌNH DƯƠNG',
    title: 'Hạ tầng Năng lượng & Phân phối Điện Động lực Nhà máy Bel Việt Nam',
    desc: 'Trạm biến áp trung thế 22kV, hệ thống phân phối Busway Schneider Electric và kiểm soát vi khí hậu kho lạnh đạt chuẩn HACCP cho dây chuyền phô mai Con Bò Cười.',
    stats: '20.000 m² • Trạm 22kV • Busway Schneider • Chuẩn HACCP',
    bgImage: '/images/projects/nha-may-bel.jpg',
    projectImage: '/images/projects/nha-may-bel.jpg',
    link: '/du-an/nha-may-san-xuat-pho-mai-bel-viet-nam'
  },
  {
    id: 'banner-04',
    badge: 'Y TẾ & PHÒNG MỔ CHUYÊN SÂU • TP. HỒ CHÍ MINH',
    title: 'Khí Sạch & Kiểm Soát Vi Khí Hậu Phòng Mổ Bệnh Viện An Sinh',
    desc: 'Hệ thống điều hòa chính xác dòng khí một chiều Laminar Flow, màng lọc HEPA H14, khí y tế trung tâm O2/Air/Vac và hệ thống biến áp cách ly an toàn IT y tế.',
    stats: 'Phòng mổ vô khuẩn Class 100 • Laminar Flow • HTM 02-01',
    bgImage: '/images/projects/phong-mo-an-sinh.jpg',
    projectImage: '/images/projects/phong-mo-an-sinh.jpg',
    link: '/du-an/he-thong-khi-sach-phong-mo-benh-vien-an-sinh'
  }
];

export const DOMAINS_DATA: DomainItem[] = [
  {
    id: 'hvac-system',
    code: '01',
    slug: 'dieu-hoa-khong-khi-hvac',
    enTitle: 'HVAC & AIR CONDITIONING',
    viTitle: 'HỆ THỐNG ĐIỀU HÒA KHÔNG KHÍ',
    shortDesc: 'Thiết kế & thi công hệ thống Chiller giải nhiệt nước/gió, hệ thống VRV/VRF thông minh và hệ thống phân phối khí lạnh hiệu suất cao.',
    fullDesc: 'Shicons E&C cung cấp giải pháp tổng thể về điều hòa không khí cho công trình công nghiệp, thương mại và cao ốc văn phòng hạng A. Đội ngũ kỹ sư làm chủ công nghệ cân bằng thủy lực đường ống nước lạnh, động lực học dòng khí (CFD) và tối ưu hóa hệ số hiệu quả năng lượng COP của Chiller Plant.',
    standard: 'ASHRAE 90.1 / SMACNA',
    badge: 'ASHRAE 90.1',
    imageUrl: '/images/projects/nha-may-astracos.jpg',
    features: [
      'Hệ thống Water Chiller giải nhiệt nước & giải nhiệt gió công suất lớn COP cao',
      'Hệ thống điều hòa trung tâm biến tần VRV / VRF thông minh cho cao ốc',
      'Cân bằng thủy lực, phân phối khí lạnh và tích hợp hệ thống điều khiển BMS'
    ],
    subSystems: [
      { name: 'Hệ thống Water Chiller & AHU/FCU', desc: 'Tối ưu hóa hiệu suất COP cao, tự động điều chỉnh tải thông minh' },
      { name: 'Điều hòa trung tâm VRV / VRF', desc: 'Tiết kiệm năng lượng vượt trội, phân vùng kiểm soát nhiệt độ linh hoạt' },
      { name: 'Mạng lưới đường ống nước lạnh & van cân bằng', desc: 'Thi công chuẩn SMACNA / DW144, van cân bằng chênh áp tự động' },
      { name: 'Tích hợp BMS giám sát năng lượng', desc: 'Tự động hóa toàn diện, giám sát chỉ số kW/ton thời gian thực' }
    ],
    standards: ['ASHRAE 90.1', 'SMACNA', 'TCVN 5687:2010']
  },
  {
    id: 'hospital-cleanroom',
    code: '02',
    slug: 'khi-sach-phong-mo-benh-vien',
    enTitle: 'HOSPITAL CLEANROOM & MEDICAL GAS',
    viTitle: 'HỆ THỐNG KHÍ SẠCH PHÒNG MỔ Y TẾ',
    shortDesc: 'Giải pháp phòng mổ vô trùng dòng khí một chiều (Laminar Flow), màng lọc HEPA H14 và hệ thống khí y tế trung tâm kiểm soát vi khí hậu.',
    fullDesc: 'Môi trường vô trùng tại các trung tâm phẫu thuật và hồi sức cấp cứu đòi hỏi độ chính xác tuyệt đối. Shicons E&C thiết kế và thi công hệ thống điều hòa khí sạch áp lực dương dòng khí một chiều (Laminar Airflow) với màng lọc HEPA H14, triệt tiêu nguy cơ nhiễm khuẩn chéo theo yêu cầu khắt khe.',
    standard: 'Áp suất dương • Lọc HEPA H14',
    badge: 'Laminar Flow / HEPA H14',
    imageUrl: '/images/projects/phong-mo-an-sinh.jpg',
    features: [
      'Trần thổi khí một chiều Laminar Flow màng lọc HEPA H14 vô trùng tuyệt đối',
      'Kiểm soát áp suất dương, độ ẩm và nhiệt độ vô trùng phòng mổ',
      'Hệ thống khí y tế trung tâm O2, Air, N2O, Vac kiểm soát áp lực tự động'
    ],
    subSystems: [
      { name: 'Trần mổ vô khuẩn Laminar Airflow', desc: 'Vận tốc gió đồng đều 0.25 - 0.35 m/s, lọc hạt bụi 0.3 µm đạt 99.995%' },
      { name: 'Kiểm soát vi khí hậu & áp lực phòng', desc: 'Nhiệt độ 20 - 24°C, độ ẩm 50 - 60% RH, áp suất dương bậc cấp > 15 Pa' },
      { name: 'Hệ thống Khí y tế trung tâm', desc: 'Đường ống đồng khử béo y tế, trạm tạo oxy, khí nén y tế và hút chân không' },
      { name: 'Hệ thống điện cách ly IT y tế', desc: 'Biến áp cách ly chống giật, giám sát cách điện tự động cho khu vực phẫu thuật' }
    ],
    standards: ['Áp suất dương vi khí hậu', 'Lọc HEPA H14', 'Dòng khí Laminar Flow', 'Khí y tế HTM 02-01']
  },
  {
    id: 'factory-mep-cleanroom',
    code: '03',
    slug: 'co-dien-phong-sach-nha-may',
    enTitle: 'INDUSTRIAL MEP & CLEANROOM',
    viTitle: 'CƠ ĐIỆN & PHÒNG SẠCH NHÀ MÁY',
    shortDesc: 'Tổng thầu MEP nhà máy bán dẫn, điện tử và dược phẩm: Trạm biến áp 22kV, Busway 6300A, kiểm soát vi khí hậu nhiệt ẩm độ chính xác.',
    fullDesc: 'Shicons E&C tự hào là đối tác chiến lược của các tập đoàn sản xuất công nghệ cao FDI. Chúng tôi đảm nhận toàn bộ hạ tầng cơ điện phức hợp từ trạm điện 22kV/35kV, hệ thống phân phối Busway công suất lớn đến phòng sạch vi điện tử độ chính xác cao và dược phẩm công nghệ cao.',
    standard: 'Trạm 22kV • Busway 6300A',
    badge: 'Vi điện tử / Công nghệ cao',
    imageUrl: '/images/projects/nha-may-bel.jpg',
    features: [
      'Hạ tầng trạm biến áp trung thế 22kV - 35kV & Busway công suất lớn đến 6300A',
      'Thi công phòng sạch vi điện tử & dược phẩm kiểm soát hạt bụi tuyệt đối',
      'Hạ tầng khí nén công nghiệp, nước tinh khiết RO/EDI & vi sinh WFI'
    ],
    subSystems: [
      { name: 'Trạm biến áp & Hệ thống Busway', desc: 'Máy biến áp khô/dầu, tủ phân phối tổng MSB và thanh dẫn Busway mạ bạc' },
      { name: 'Phòng sạch Vi điện tử & Dược phẩm', desc: 'Quạt lọc FFU thông minh, vách trần panel kháng khuẩn, sàn epoxy ESD' },
      { name: 'Hệ thống đường ống công nghệ cao', desc: 'Ống vi sinh inox 316L hàn quỹ đạo Orbital, khí sạch siêu tinh khiết CDA' },
      { name: 'Xử lý nước RO/EDI & Thoát nước thải', desc: 'Hệ thống nước tinh khiết điện trở suất cao và trạm xử lý nước thải chuẩn A' }
    ],
    standards: ['Trạm biến áp 22kV', 'Busway 6300A', 'Phòng sạch Vi điện tử', 'Nước RO/EDI & WFI']
  },
  {
    id: 'ventilation-smoke-exhaust',
    code: '04',
    slug: 'thong-gio-hut-khoi-tao-ap',
    enTitle: 'VENTILATION & SMOKE EXHAUST',
    viTitle: 'THÔNG GIÓ, HÚT KHÓI & TẠO ÁP',
    shortDesc: 'Hệ thống quạt phản lực Jetfan tầng hầm, hút khói hành lang và tăng áp buồng thang thoát hiểm đạt tiêu chuẩn nghiệm thu an toàn cao nhất.',
    fullDesc: 'Đảm bảo an toàn sinh mạng thoát nạn khi có sự cố hỏa hoạn là sứ mệnh cốt lõi của hệ thống thông gió chống khói. Shicons E&C cung cấp giải pháp đồng bộ từ quạt phản lực Jetfan thông gió tầng hầm, van chặn lửa liên động hút khói hành lang đến quạt tăng áp buồng thang thoát hiểm theo đúng quy chuẩn an toàn kỹ thuật.',
    standard: 'Quạt Jetfan 300°C • Van chặn lửa MFD',
    badge: 'An toàn PCCC / Khói sự cố',
    imageUrl: '/images/projects/benh-vien-thong-nhat.jpg',
    features: [
      'Hệ thống quạt phản lực Jetfan thông gió tầng hầm kiểm soát nồng độ CO',
      'Hút khói sự cố đường ống chống cháy chịu nhiệt 300°C trong 2 giờ',
      'Tăng áp buồng thang bộ và giếng thang máy thoát nạn khẩn cấp'
    ],
    subSystems: [
      { name: 'Thông gió phản lực Jetfan tầng hầm', desc: 'Tiêu tán khí thải CO tự động qua cảm biến, chuyển tốc độ cao hút khói khi có cháy' },
      { name: 'Hệ thống Hút khói hành lang', desc: 'Đường ống tôn bọc bông khoáng / sơn chống cháy EI, van gió chặn lửa MFD' },
      { name: 'Quạt tăng áp buồng thang thoát hiểm', desc: 'Duy trì chênh áp dương 20 - 50 Pa ngăn khói tràn vào cầu thang cứu nạn' },
      { name: 'Tủ điều khiển liên động PCCC', desc: 'Kích hoạt tự động theo tín hiệu báo cháy địa chỉ, giám sát trạng thái van gió' }
    ],
    standards: ['Quạt Jetfan 300°C/2h', 'Van ngăn lửa MFD', 'Tạo áp buồng thang 50Pa', 'Hút khói hành lang']
  },
  {
    id: 'tc-om-maintenance',
    code: '05',
    slug: 'tc-bao-tri-van-hanh-he-thong',
    enTitle: 'TESTING, COMMISSIONING & O&M',
    viTitle: 'T&C, BẢO TRÌ VẬN HÀNH HỆ THỐNG',
    shortDesc: 'Kiểm định, cân chỉnh TAB (Testing, Adjusting, Balancing), kiểm toán năng lượng và dịch vụ ủy thác vận hành, bảo trì phòng ngừa 24/7.',
    fullDesc: 'Hệ thống cơ điện chỉ phát huy tối đa tuổi thọ và độ tin cậy khi được chạy thử nghiệm thu (T&C) chuẩn xác và bảo trì định kỳ đúng quy trình kỹ thuật. Shicons E&C cung cấp dịch vụ T&C độc lập theo tiêu chuẩn quốc tế NEBB và các gói ủy thác quản lý vận hành O&M toàn diện với đội ngũ kỹ sư ứng cứu sự cố 24/7.',
    standard: 'NEBB • ISO 55001',
    badge: 'NEBB / ISO 55001',
    imageUrl: '/images/services/kiem-dinh-tc.jpg',
    features: [
      'Kiểm định & cân chỉnh TAB lưu lượng gió, áp suất chuẩn quốc tế NEBB',
      'Bảo trì phòng ngừa định kỳ (Preventive Maintenance) toàn diện',
      'Kiểm toán năng lượng tối ưu hóa COP & ứng cứu sự cố khẩn cấp 24/7'
    ],
    subSystems: [
      { name: 'Thử nghiệm & Cân chỉnh TAB', desc: 'Đo đạc cân bằng lưu lượng khí, nước Chiller bằng máy đo kỹ thuật số chuẩn NEBB' },
      { name: 'Bảo dưỡng phòng ngừa Chiller & Trạm điện', desc: 'Chụp ảnh nhiệt hồng ngoại FLIR, phân tích dầu máy nén, kiểm tra rung động' },
      { name: 'Kiểm toán năng lượng (Energy Audit)', desc: 'Phân tích phụ tải thời gian thực, đề xuất giải pháp tiết kiệm điện đến 20%' },
      { name: 'Phản ứng khẩn cấp trực chốt 24/7', desc: 'Kỹ sư chuyên trách có mặt xử lý sự cố trong vòng 60 phút, sẵn sàng linh kiện thay thế' }
    ],
    standards: ['NEBB Procedural Standards', 'ISO 55001', 'ASHRAE Guideline 0-2019']
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'proj-intel-vietnam',
    name: 'NHÀ MÁY SẢN XUẤT & ĐÓNG GÓI BÁN DẪN INTEL VIỆT NAM',
    nameEn: 'Intel Vietnam Semiconductor Assembly and Test Facility',
    slug: 'nha-may-san-xuat-ban-dan-intel-viet-nam',
    category: 'cleanroom',
    categoryLabel: 'Phòng sạch & Công nghệ cao',
    client: 'Tập đoàn Intel Corporation (Hoa Kỳ)',
    location: 'Khu Công nghệ cao TP.HCM (SHTP), TP. Thủ Đức',
    year: '2023 - 2024',
    scale: '46.000 m² sàn phòng sạch & phụ trợ',
    status: 'Đã hoàn thành bàn giao',
    featured: true,
    mepScope: [
      'Phòng sạch Bán dẫn Class 1000',
      'Chiller làm lạnh chính xác ±0.5°C',
      'Điện động lực & Hệ thống lưu điện UPS',
      'Hệ thống cấp khí siêu sạch CDA',
      'PCCC chuyên dụng & Cảnh báo sớm VESDA'
    ],
    imageUrl: '/images/projects/nha-may-intel.jpg',
    gallery: [
      '/images/projects/nha-may-intel.jpg',
      '/images/projects/nha-may-samtec.jpg',
      '/images/projects/nha-may-bel.jpg'
    ],
    description: 'Dự án nhà máy đóng gói và kiểm định chip bán dẫn quy mô hàng đầu Đông Nam Á của Tập đoàn Intel. Shicons E&C tự hào tham gia thi công các hạng mục cơ điện phụ trợ, đường ống công nghệ và bảo trì phòng sạch công nghệ cao.',
    technicalHighlights: [
      'Thi công hệ thống cấp khí siêu tinh khiết CDA và đường ống vi sinh inox 316L',
      'Hệ thống điều hòa chính xác kiểm soát nhiệt ẩm độ dung sai ±0.5°C',
      'Hệ thống điện dự phòng độc lập UPS và máy phát điện liên tục không gián đoạn',
      'Ứng dụng 100% mô hình BIM Revit MEP Level of Development (LOD) 400'
    ],
    challengesAndSolutions: 'Yêu cầu khắt khe về độ chống rung chấn (Vibration Criteria) và chống tĩnh điện ESD cho khu vực sản xuất bán dẫn. Shicons E&C áp dụng giải pháp nối đất độc lập đẳng thế điện trở dưới 0.5 Ohm.'
  },
  {
    id: 'proj-bel-vietnam',
    name: 'NHÀ MÁY SẢN XUẤT PHÔ MAI BEL VIỆT NAM',
    nameEn: 'Bel Vietnam Cheese Manufacturing Plant',
    slug: 'nha-may-san-xuat-pho-mai-bel-viet-nam',
    category: 'industrial',
    categoryLabel: 'Nhà máy công nghiệp',
    client: 'Tập đoàn Bel Group (Cộng hòa Pháp)',
    location: 'KCN Sóng Thần 3, Tỉnh Bình Dương',
    year: '2023 - 2024',
    scale: '20.000 m² khuôn viên sản xuất',
    status: 'Đã hoàn thành bàn giao',
    featured: true,
    mepScope: [
      'Hệ thống Điện động lực 22kV',
      'Trạm biến áp trung thế',
      'Hệ thống HVAC chế biến thực phẩm',
      'Kho lạnh bảo quản thành phẩm',
      'Hệ thống cấp thoát nước & xử lý nước thải'
    ],
    imageUrl: '/images/projects/nha-may-bel.jpg',
    gallery: [
      '/images/projects/nha-may-bel.jpg',
      '/images/projects/nha-may-hanacos.jpg',
      '/images/projects/nha-may-samtec.jpg'
    ],
    description: 'Nhà máy sản xuất phô mai chuẩn Châu Âu của Tập đoàn Bel tại Việt Nam. Shicons E&C đảm nhận thiết kế thi công hệ thống điện động lực, trạm biến áp trung thế và hạ tầng HVAC phục vụ dây chuyền chế biến phô mai Con Bò Cười.',
    technicalHighlights: [
      'Lắp đặt trạm biến áp và hệ thống phân phối Busway Schneider Electric chống cháy nổ',
      'Hệ thống kiểm soát nhiệt ẩm kho lạnh bảo quản thành phẩm đạt chuẩn HACCP',
      'Đường ống dẫn hơi và nước lạnh Chiller bọc cách nhiệt foam PIR chống đọng sương'
    ],
    challengesAndSolutions: 'Yêu cầu kiểm soát an toàn vệ sinh thực phẩm khắt khe theo chuẩn quốc tế. Hệ thống ống dẫn inox thực phẩm và thông gió phòng sạch được hoàn thiện với độ chính xác cao.'
  },
  {
    id: 'proj-t3-tan-son-nhat',
    name: 'NHÀ GA HÀNH KHÁCH QUỐC TẾ T3 CẢNG HKQT TÂN SƠN NHẤT',
    nameEn: 'Tan Son Nhat International Airport Terminal 3',
    slug: 'nha-ga-quoc-te-t3-tan-son-nhat',
    category: 'infrastructure',
    categoryLabel: 'Hạ tầng kỹ thuật',
    client: 'Tổng công ty Cảng hàng không Việt Nam (ACV)',
    location: 'Quận Tân Bình, TP. Hồ Chí Minh',
    year: '2024 - 2025',
    scale: '112.500 m² sàn xây dựng (20 triệu khách/năm)',
    status: 'Đang thi công hoàn thiện',
    featured: true,
    mepScope: [
      'Hệ thống Thông gió & Hút khói',
      'Hệ thống Điện chiếu sáng & Động lực',
      'Cấp thoát nước',
      'PCCC Sprinkler tự động',
      'BMS Quản lý Tòa nhà'
    ],
    imageUrl: '/images/projects/nha-ga-t3-tsn.jpg',
    gallery: [
      '/images/projects/nha-ga-t3-tsn.jpg',
      '/images/projects/benh-vien-an-sinh.jpg',
      '/images/projects/nha-may-intel.jpg'
    ],
    description: 'Dự án trọng điểm quốc gia nâng công suất khai thác Cảng HKQT Tân Sơn Nhất. Shicons E&C vinh dự tham gia thi công các hạng mục cơ điện phức hợp, đường ống gió thông gió hút khói tầng hầm và hạ tầng điện phục vụ nhà ga.',
    technicalHighlights: [
      'Hệ thống quạt phản lực Jetfan hút khói tầng hầm chịu nhiệt 300°C trong 2 giờ',
      'Ứng dụng mô hình BIM Revit MEP LOD 400 phối hợp giải quyết xung đột không gian mái vòm',
      'Hạ tầng tủ điện phân phối và máng cáp chịu lửa tiêu chuẩn chống cháy quốc tế'
    ],
    challengesAndSolutions: 'Khối lượng thi công khổng lồ cùng tiến độ bàn giao nghiêm ngặt. Shicons E&C đã áp dụng quy trình tiền chế module tại xưởng và lắp đặt cuốn chiếu tại công trường.'
  },
  {
    id: 'proj-an-sinh-hospital',
    name: 'HỆ THỐNG KHÍ SẠCH & PHÒNG MỔ VÔ KHUẨN BỆNH VIỆN AN SINH',
    nameEn: 'An Sinh Hospital Sterile Operating Theatres & IVF Cleanrooms',
    slug: 'he-thong-khi-sach-phong-mo-benh-vien-an-sinh',
    category: 'cleanroom',
    categoryLabel: 'Phòng sạch & Y tế',
    client: 'Công ty TNHH Bệnh viện An Sinh',
    location: '10 Trần Huy Liệu, Phường 11, Quận Phú Nhuận, TP.HCM',
    year: '2023 - 2024',
    scale: 'Cụm phòng mổ vô khuẩn & Khu hỗ trợ sinh sản IVF',
    status: 'Đã hoàn thành bàn giao',
    featured: true,
    mepScope: [
      'Trần mổ Laminar Flow HEPA H14',
      'Hệ thống Khí y tế trung tâm',
      'Điều hòa chính xác vi khí hậu',
      'Điện cách ly IT y tế'
    ],
    imageUrl: '/images/projects/phong-mo-an-sinh.jpg',
    gallery: [
      '/images/projects/phong-mo-an-sinh.jpg',
      '/images/projects/benh-vien-an-sinh.jpg',
      '/images/projects/nha-may-dhg.jpg'
    ],
    description: 'Hệ thống phòng phẫu thuật kỹ thuật cao và phòng nuôi cấy phôi IVF tại Bệnh viện Đa khoa An Sinh. Shicons E&C thiết kế thi công hệ thống điều hòa khí sạch áp lực dương, trần thổi một chiều Laminar Flow màng lọc HEPA H14 và hệ thống cấp khí y tế chuyên sâu.',
    technicalHighlights: [
      'Trần thổi khí một chiều Laminar Flow màng lọc HEPA H14 đạt độ sạch Class 100',
      'Hệ thống khí y tế trung tâm O2, Vac, N2O, Air đạt tiêu chuẩn HTM 02-01',
      'Biến áp cách ly y tế IT kết hợp hệ thống báo động chạm đất tự động an toàn phẫu thuật'
    ],
    challengesAndSolutions: 'Yêu cầu tuyệt đối về độ vô trùng và không rung chấn cho kính hiển vi vi thao tác IVF. Shicons E&C đã bố trí cụm AHU độc lập và hệ thống giảm chấn thủy lực chuyên dụng.'
  },
  {
    id: 'proj-dhg-pharma',
    name: 'NHÀ MÁY DƯỢC PHẨM CÔNG NGHỆ CAO DHG PHARMA',
    nameEn: 'DHG Pharma High-Tech Pharmaceutical Factory',
    slug: 'nha-may-duoc-pham-cong-nghe-cao-dhg-pharma',
    category: 'cleanroom',
    categoryLabel: 'Phòng sạch & Dược phẩm',
    client: 'Công ty Cổ phần Dược Hậu Giang (DHG Pharma)',
    location: 'KCN Tân Phú Thạnh, Tỉnh Hậu Giang',
    year: '2023',
    scale: 'Phân xưởng sản xuất Non-Betalactam 35.000 m²',
    status: 'Đã hoàn thành bàn giao',
    featured: false,
    mepScope: [
      'Phòng sạch GMP-Japan / GMP-EU',
      'Nước tinh khiết RO/WFI',
      'HVAC Chiller & AHU vi khí hậu',
      'Khí nén vô trùng',
      'Xử lý nước thải'
    ],
    imageUrl: '/images/projects/nha-may-dhg.jpg',
    gallery: [
      '/images/projects/nha-may-dhg.jpg',
      '/images/projects/nha-may-hanacos.jpg',
      '/images/projects/phong-mo-an-sinh.jpg'
    ],
    description: 'Nhà máy dược phẩm tiêu chuẩn Japan-GMP và EU-GMP lớn nhất Đồng bằng Sông Cửu Long. Shicons E&C tham gia thi công các hạng mục phòng sạch kiểm soát hạt bụi, đường ống nước tinh khiết vi sinh WFI và hệ thống điều hòa nhiệt ẩm nghiêm ngặt.',
    technicalHighlights: [
      'Hệ thống nước cất pha tiêm WFI tuần hoàn khép kín inox 316L đánh bóng vi sinh Ra < 0.4 µm',
      'Kiểm soát chênh áp bậc thang phòng sạch 15 - 30 Pa hạn chế lây nhiễm chéo tuyệt đối',
      'Hệ thống giám sát SCADA BMS nhiệt ẩm độ và chênh áp thời gian thực 24/7'
    ],
    challengesAndSolutions: 'Đáp ứng tiêu chuẩn kép Japan-GMP và EU-GMP với các mốc kiểm định nghiêm ngặt. Shicons E&C hoàn thành công tác Testing & Commissioning đạt 100% tiêu chí ngay từ lần thẩm định đầu tiên.'
  },
  {
    id: 'proj-hanacos-vietnam',
    name: 'NHÀ MÁY SẢN XUẤT DƯỢC MỸ PHẨM HANACOS VIỆT NAM',
    nameEn: 'Hanacos Vietnam Cosmetics Manufacturing Factory',
    slug: 'nha-may-san-xuat-duoc-my-pham-hanacos-viet-nam',
    category: 'cleanroom',
    categoryLabel: 'Phòng sạch & Mỹ phẩm',
    client: 'Công ty TNHH Hanacos Vietnam (Chuyển giao công nghệ Hàn Quốc)',
    location: 'KCN Tân Bình mở rộng, TP. Hồ Chí Minh',
    year: '2024',
    scale: '15.000 m² sàn sản xuất chuẩn cGMP',
    status: 'Đã hoàn thành bàn giao',
    featured: false,
    mepScope: [
      'Phòng sạch cGMP',
      'Hệ thống HVAC biến tần',
      'Xử lý nước RO',
      'Điện động lực & Chiếu sáng LED Cleanroom',
      'PCCC tự động'
    ],
    imageUrl: '/images/projects/nha-may-hanacos.jpg',
    gallery: [
      '/images/projects/nha-may-hanacos.jpg',
      '/images/projects/nha-may-bel.jpg',
      '/images/projects/nha-may-dhg.jpg'
    ],
    description: 'Nhà máy gia công mỹ phẩm và sản phẩm chăm sóc sức khỏe hàng đầu miền Nam với dây chuyền công nghệ chuyển giao từ Hanacos Hàn Quốc. Shicons E&C là tổng thầu cơ điện và phòng sạch cGMP cho toàn bộ phân xưởng sản xuất.',
    technicalHighlights: [
      'Phòng sạch đạt tiêu chuẩn cGMP ASEAN với hệ thống quạt lọc trần FFU màng lọc HEPA',
      'Hệ thống cấp nước tinh khiết 2 cấp RO đạt tiêu chuẩn vi sinh',
      'Giải pháp chiếu sáng LED Cleanroom kháng ẩm và kháng hóa chất tẩy rửa'
    ],
    challengesAndSolutions: 'Phân chia vùng sạch và áp suất chênh lệch giữa khu pha chế hóa chất và khu đóng gói vô trùng. Shicons E&C ứng dụng van điều khiển VAV tự động kiểm soát lưu lượng chính xác.'
  }
];

export const NEWS_DATA: NewsItem[] = [
  {
    id: 'post-1',
    title: 'Shicons E&C tổ chức Lễ Cất nóc và bàn giao giai đoạn 1 gói thầu MEP Nhà máy Pegatron',
    slug: 'le-cat-noc-va-ban-giao-giai-doan-1-goi-thau-mep-nha-may-pegatron',
    category: 'project',
    categoryLabel: 'Tin dự án',
    date: '15 Tháng 10, 2024',
    imageUrl: '/images/projects/nha-may-bel.jpg',
    excerpt: 'Vượt qua các mốc tiến độ khắt khe, Ban chỉ huy công trường Shicons E&C đã chính thức hoàn thành đóng điện trạm 22kV và chạy thử nghiệm thu hệ thống HVAC phân xưởng chính.',
    content: 'Sáng ngày 15/10/2024, tại KKT Đình Vũ (Hải Phòng), Công ty Cổ phần Shicons E&C cùng Chủ đầu tư Pegatron Corporation và các đơn vị tư vấn giám sát đã long trọng tổ chức Lễ cất nóc và bàn giao giai đoạn 1 gói thầu Cơ điện. Dự án đạt chuẩn 100% an toàn lao động không tai nạn (Zero LTI) tuân thủ tiêu chuẩn HSE, thể hiện tính kỷ luật và năng lực quản lý dự án xuất sắc của tập thể Shicons E&C.',
    author: 'Ban Truyền thông Shicons',
    isFeatured: true
  },
  {
    id: 'post-2',
    title: 'Shicons E&C trúng thầu gói thầu Tổng thầu Cơ điện Tòa tháp Tài chính Capital One',
    slug: 'shicons-trung-thau-tong-thau-co-dien-toa-thap-capital-one',
    category: 'project',
    categoryLabel: 'Tin dự án',
    date: '28 Tháng 09, 2024',
    imageUrl: '/images/projects/nha-ga-t3-tsn.jpg',
    excerpt: 'Gói thầu trị giá hơn 280 tỷ đồng đánh dấu bước tiến lớn khẳng định vị thế của Shicons E&C trong phân khúc cao ốc văn phòng hạng A chuẩn quốc tế.',
    content: 'Sau quá trình đấu thầu quốc tế nghiêm ngặt, Tập đoàn Capital Land đã chính thức trao thầu gói thầu thiết kế và thi công hệ thống Cơ điện toàn diện cho Shicons E&C. Công trình áp dụng tiêu chuẩn LEED Gold đòi hỏi các giải pháp tiết kiệm năng lượng đột phá.',
    author: 'Ban Kế hoạch & Đấu thầu',
    isFeatured: false
  },
  {
    id: 'post-3',
    title: 'Ứng dụng mô hình BIM Revit MEP LOD 400 trong giải quyết xung đột đường ống không gian hẹp',
    slug: 'ung-dung-mo-hinh-bim-revit-mep-giai-quyet-xung-dot-duong-ong',
    category: 'technical',
    categoryLabel: 'Góc kỹ thuật MEP',
    date: '12 Tháng 09, 2024',
    imageUrl: '/images/projects/nha-may-astracos.jpg',
    excerpt: 'Chia sẻ kinh nghiệm thực chiến từ Phòng Kỹ thuật & Thiết kế Shicons E&C về việc phối hợp mô hình không gian 3D giúp tiết kiệm 15% thời gian thi công tại công trường.',
    content: 'Trong các công trình công nghiệp hiện đại, mật độ đường ống gió, máng cáp, ống cứu hỏa và đường ống công nghệ cực kỳ dày đặc. Việc ứng dụng công nghệ BIM (Building Information Modeling) ở cấp độ LOD 400 cho phép các kỹ sư Shicons E&C bóc tách Shop Drawing chính xác tới từng phụ kiện mặt bích, loại bỏ 100% va chạm trước khi chuyển sang giai đoạn gia công.',
    author: 'ThS. KS. Nguyễn Hoàng Nam - Giám đốc Kỹ thuật',
    isFeatured: false
  },
  {
    id: 'post-4',
    title: 'Hội thảo an toàn HSE: Cam kết Văn hóa \'An toàn là trên hết\' tại mọi công trường Shicons',
    slug: 'hoi-thao-an-toan-hse-cam-ket-van-hoa-tai-moi-cong-truong',
    category: 'company',
    categoryLabel: 'Hoạt động công ty',
    date: '25 Tháng 08, 2024',
    imageUrl: '/images/services/kiem-dinh-tc.jpg',
    excerpt: 'Chiến dịch \'Safety First - Zero Accident\' được phát động toàn diện với sự tham gia của 100% cán bộ kỹ sư và công nhân tại tất cả các dự án trên cả nước.',
    content: 'Tại Shicons E&C, an toàn lao động không phải là một khẩu hiệu mà là văn hóa cốt lõi. Ban lãnh đạo công ty đã trực tiếp thị sát, trao bằng khen cho các Ban chỉ huy có thành tích xuất sắc trong việc duy trì chuẩn 100% an toàn lao động không tai nạn (Zero LTI) trên toàn quốc.',
    author: 'Ban An toàn & Môi trường HSE',
    isFeatured: false
  }
];

export const JOBS_DATA: JobItem[] = [
  {
    id: 'job-1',
    title: 'Chỉ huy trưởng Cơ điện (MEP Project Manager)',
    slug: 'chi-huy-truong-co-dien-mep-project-manager',
    department: 'Ban Quản lý Dự án',
    location: 'Bắc Ninh / Hải Phòng',
    salary: '35.000.000 - 55.000.000 VNĐ',
    deadline: '31/12/2026',
    experience: 'Tối thiểu 7 năm kinh nghiệm',
    status: 'active',
    imageUrl: '/images/about/doi-ngu-shicons.jpg',
    description: [
      'Quản lý toàn diện tiến độ, chất lượng, ngân sách và an toàn thi công gói thầu Cơ điện tại công trường.',
      'Làm việc trực tiếp với Chủ đầu tư, Tư vấn giám sát và các Nhà thầu phụ để giải quyết các vướng mắc kỹ thuật.',
      'Chỉ đạo công tác bóc tách vật tư, lập tiến độ thi công chi tiết và phê duyệt biện pháp thi công.',
      'Tổ chức công tác nghiệm thu đóng điện, chạy thử liên động (T&C) và bàn giao công trình.'
    ],
    requirements: [
      'Tốt nghiệp Đại học chuyên ngành Điện, Cơ điện, Kỹ thuật Nhiệt lạnh (ĐH Bách Khoa, ĐH Xây Dựng hoặc tương đương).',
      'Có chứng chỉ hành nghề Giám sát thi công xây dựng hạng I hoặc II.',
      'Tối thiểu 3 năm kinh nghiệm ở vị trí tương đương tại các dự án Nhà máy FDI hoặc Tòa tháp cao tầng.',
      'Khả năng giao tiếp tiếng Anh tốt trong công việc.'
    ],
    benefits: [
      'Mức lương cạnh tranh theo năng lực + Thưởng tiến độ dự án hấp dẫn.',
      'Bảo hiểm sức khỏe cao cấp Bảo Việt 24/7.',
      'Hỗ trợ chỗ ở và công tác phí đầy đủ cho các dự án xa.',
      'Lộ trình thăng tiến rõ ràng lên vị trí Giám đốc Dự án Vùng.'
    ]
  },
  {
    id: 'job-2',
    title: 'Kỹ sư Thiết kế & Điều phối BIM / Revit MEP',
    slug: 'ky-su-thiet-ke-dieu-phoi-bim-revit-mep',
    department: 'Phòng Kỹ thuật & BIM',
    location: 'Trụ sở TP. HCM / Chi nhánh Hà Nội',
    salary: '20.000.000 - 32.000.000 VNĐ',
    deadline: '31/12/2026',
    experience: 'Từ 3 - 5 năm kinh nghiệm',
    status: 'active',
    imageUrl: '/images/projects/nha-may-intel.jpg',
    description: [
      'Xây dựng mô hình 3D Revit MEP các hệ thống HVAC, Điện, Cấp thoát nước, PCCC theo tiêu chuẩn LOD 350 - 400.',
      'Kiểm tra va chạm (Clash Detection) bằng Navisworks, đề xuất phương án xử lý xung đột không gian kỹ thuật.',
      'Xuất bản vẽ Shop Drawing chi tiết phục vụ thi công và chế tạo ngoài công trường.',
      'Phối hợp với Ban chỉ huy cập nhật mô hình As-built hoàn công.'
    ],
    requirements: [
      'Thành thạo phần mềm Revit MEP, Navisworks Manage, AutoCAD.',
      'Am hiểu các tiêu chuẩn thiết kế cơ điện hiện hành (TCVN, QCVN, ASHRAE, NFPA).',
      'Kỹ năng làm việc nhóm tốt, tỉ mỉ và trách nhiệm cao với sản phẩm bản vẽ.'
    ],
    benefits: [
      'Làm việc trong môi trường chuyên nghiệp, trang bị máy tính trạm đồ họa chuyên dụng cấu hình cao.',
      'Thưởng tháng 13 + thưởng hiệu quả dự án hàng quý.',
      'Được tài trợ tham gia các khóa đào tạo chuyên sâu về Quản lý BIM quốc tế.'
    ]
  },
  {
    id: 'job-3',
    title: 'Kỹ sư Giám sát Thi công Điện & Điện nhẹ (Site Electrical Engineer)',
    slug: 'ky-su-giam-sat-thi-cong-dien-va-dien-nhe',
    department: 'Ban Quản lý Dự án',
    location: 'Bình Dương / Đồng Nai',
    salary: '16.000.000 - 24.000.000 VNĐ',
    deadline: '31/12/2026',
    experience: 'Từ 2 năm kinh nghiệm',
    status: 'active',
    imageUrl: '/images/projects/nha-may-bel.jpg',
    description: [
      'Trực tiếp giám sát thi công hệ thống điện trung thế, hạ thế, thang máng cáp, Busway và hệ thống chiếu sáng.',
      'Giám sát việc tuân thủ các quy định an toàn điện và an toàn lao động tại khu vực phụ trách.',
      'Kiểm tra chất lượng vật tư đầu vào theo đúng mẫu mã và quy cách đã được duyệt.',
      'Lập hồ sơ nghiệm thu công việc hàng ngày với Tư vấn giám sát.'
    ],
    requirements: [
      'Tốt nghiệp Cao đẳng/Đại học chuyên ngành Kỹ thuật Điện, Hệ thống điện, Tự động hóa.',
      'Đọc hiểu tốt bản vẽ thiết kế và bản vẽ thi công Shop Drawing.',
      'Chăm chỉ, chịu được áp lực tiến độ công trường.'
    ],
    benefits: [
      'Phụ cấp công trường, tiền ăn ca và tiền điện thoại hàng tháng.',
      'Chế độ bảo hiểm đầy đủ theo quy định của Luật lao động.',
      'Được kèm cặp bởi các Chuyên gia Cơ điện giàu kinh nghiệm.'
    ]
  }
];

export const PARTNERS_DATA: PartnerItem[] = [
  { id: 'partner-1', name: 'DAIKIN', tag: 'HVAC Chiller & VRV', logo: '/partners/daikin.png', type: 'equipment', typeLabel: 'Đối tác thiết bị' },
  { id: 'partner-2', name: 'MITSUBISHI HEAVY', tag: 'Điều hòa & Cơ điện', logo: '/partners/mitsubishi.png', type: 'equipment', typeLabel: 'Đối tác thiết bị' },
  { id: 'partner-3', name: 'SCHNEIDER ELECTRIC', tag: 'Thiết bị điện & BMS', logo: '/partners/schneider.png', type: 'equipment', typeLabel: 'Đối tác thiết bị' },
  { id: 'partner-4', name: 'TRANE', tag: 'Chiller & HVAC', logo: '/partners/trane.png', type: 'equipment', typeLabel: 'Đối tác thiết bị' },
  { id: 'partner-5', name: 'CARRIER', tag: 'Điều hòa trung tâm', logo: '/partners/carrier.png', type: 'equipment', typeLabel: 'Đối tác thiết bị' },
  { id: 'partner-6', name: 'PANASONIC', tag: 'Thông gió & Điều hòa', logo: '/partners/panasonic.png', type: 'equipment', typeLabel: 'Đối tác thiết bị' },
  { id: 'partner-7', name: 'VAF FILTRATION', tag: 'Lọc khí & Phòng sạch', logo: '/partners/vaf.png', type: 'equipment', typeLabel: 'Đối tác thiết bị' },
  { id: 'partner-9', name: 'PHƯƠNG NAM PANEL', tag: 'Panel Phòng sạch', logo: '/partners/phuongnam.png', type: 'equipment', typeLabel: 'Đối tác thiết bị' }
];

export const PRODUCTION_LINES: ProductionLine[] = [
  {
    id: 'ductwork',
    title: 'Gia Công Ống Gió & Phụ Kiện HVAC',
    desc: 'Hệ thống máy cắt plasma CNC và dây chuyền Auto-Line V gia công ống gió vuông bích TDC/TDF, ống xoắn tròn và phụ kiện tiêu âm.',
    specs: [
      'Công suất gia công: 300.000 m² ống gió/năm',
      'Độ dày tôn mạ kẽm: 0.48 mm – 1.5 mm (Z80 – Z275)',
      'Sản xuất van dập lửa MFD, van chặn khói MD và cửa gió khuếch tán',
      'Kiểm định độ kín gió theo chuẩn kỹ thuật áp suất cao'
    ],
    image: '/images/about/doi-ngu-shicons.jpg',
    tag: 'Ductwork Fabrication'
  },
  {
    id: 'switchboard',
    title: 'Chế Tạo Tủ Bảng Điện Công Nghiệp (MSB / MCC / DB)',
    desc: 'Lắp ráp và kiểm định tủ phân phối tổng MSB đến 6300A, tủ điều khiển trung tâm MCC, tủ tụ bù tự động và tủ chuyển nguồn ATS.',
    specs: [
      'Dòng định mức: Lên đến 6300A, điện áp cách điện 1000V',
      'Cấp bảo vệ vỏ tủ: IP43 – IP55 trong nhà và ngoài trời',
      'Đồng thanh dẫn cái mạ bạc tinh khiết 99.99%, form tủ 2b đến 4b',
      'Thử nghiệm xuất xưởng FAT toàn diện trước khi bàn giao công trình'
    ],
    image: '/images/projects/nha-may-bel.jpg',
    tag: 'Switchboard Assembly'
  },
  {
    id: 'cable-tray',
    title: 'Sản Xuất Thang Máng Cáp & Phụ Kiện Đỡ Cáp',
    desc: 'Dây chuyền đột dập CNC và chấn tự động gia công thang cáp (Cable Ladder), máng cáp (Cable Tray) và khay cáp mạ kẽm nhúng nóng.',
    specs: [
      'Vật liệu: Thép mạ kẽm cuộn, Inox 304, mạ kẽm nhúng nóng, sơn tĩnh điện',
      'Độ dày vật liệu: 1.2 mm, 1.5 mm, 2.0 mm, 2.5 mm',
      'Khả năng chịu tải cơ học cao, chống rung lắc và chống võng',
      'Đầy đủ co lơ, cút chữ T, chữ thập và giá treo chuyên dụng'
    ],
    image: '/images/services/kiem-dinh-tc.jpg',
    tag: 'Cable Support Systems'
  }
];

export const FEATURED_PROJECT = PROJECTS_DATA[0];
export const CAROUSEL_PROJECTS = PROJECTS_DATA.slice(1);

export function getProjectBySlug(slug: string) {
  return PROJECTS_DATA.find((p) => p.slug === slug);
}

export function getDomainBySlug(slug: string) {
  return DOMAINS_DATA.find((d) => d.slug === slug);
}

export function getNewsBySlug(slug: string) {
  return NEWS_DATA.find((n) => n.slug === slug);
}

export function getJobBySlug(slug: string) {
  return JOBS_DATA.find((j) => j.slug === slug);
}
