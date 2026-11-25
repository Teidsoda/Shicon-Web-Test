'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Layers, 
  FolderKanban, 
  Newspaper, 
  Briefcase, 
  Settings,
  Sparkles,
  Search,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  RefreshCw,
  X,
  Save,
  CheckCircle2,
  AlertCircle,
  LayoutDashboard,
  ShieldCheck,
  Eye,
  EyeOff,
  Upload,
  Image as ImageIcon,
  Calendar,
  MapPin,
  Clock,
  Phone,
  Mail,
  FileText,
  Handshake,
  Check,
  Sliders,
  DollarSign,
  FolderDown,
  Link2,
  Loader2,
  Star,
  ImagePlus,
  Factory,
  Info
} from 'lucide-react';
import { 
  useContent, 
  ExtendedDomainItem, 
  ExtendedHeroSlide, 
  ExtendedPartnerItem,
  ProductionLine,
  AboutData,
  ManufacturingData,
  ContactSettingsData
} from '@/context/ContentContext';
import { Project, NewsItem, JobItem } from '@/data/shiconsData';
import { Logo } from '@/components/Logo';
import { 
  extractDriveFileId, 
  extractDriveFolderId, 
  convertToDirectDriveImageUrl, 
  parseDriveLinks 
} from '@/lib/driveUtils';

type TabType = 'dashboard' | 'services' | 'hero-banners' | 'projects' | 'news' | 'careers' | 'partners' | 'about' | 'manufacturing' | 'settings';

export default function AdminPage() {
  const {
    heroBanners,
    projects,
    services,
    news,
    jobs,
    partners,
    settings,
    aboutData,
    manufacturingData,
    updateHeroBanner,
    toggleHeroBanner,
    addProject,
    updateProject,
    deleteProject,
    updateService,
    toggleServiceActive,
    addNews,
    updateNews,
    deleteNews,
    addJob,
    updateJob,
    deleteJob,
    toggleJobStatus,
    addPartner,
    updatePartner,
    deletePartner,
    togglePartnerActive,
    updateSettings,
    updateAboutData,
    updateManufacturingData,
    updateProductionLine,
    addProductionLine,
    deleteProductionLine,
    resetAllToDefault
  } = useContent();

  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Editing Modals State
  const [editingService, setEditingService] = useState<ExtendedDomainItem | null>(null);
  const [editingBanner, setEditingBanner] = useState<ExtendedHeroSlide | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [editingJob, setEditingJob] = useState<JobItem | null>(null);
  const [editingPartner, setEditingPartner] = useState<ExtendedPartnerItem | null>(null);
  const [editingProductionLine, setEditingProductionLine] = useState<{ index: number; line: ProductionLine } | null>(null);

  // File input refs for uploading images
  const serviceFileInputRef = useRef<HTMLInputElement>(null);
  const bannerFileInputRef = useRef<HTMLInputElement>(null);
  const projectFileInputRef = useRef<HTMLInputElement>(null);
  const newsFileInputRef = useRef<HTMLInputElement>(null);
  const partnerFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const aboutBannerRef = useRef<HTMLInputElement>(null);
  const aboutTeamRef = useRef<HTMLInputElement>(null);
  const mfgBannerRef = useRef<HTMLInputElement>(null);
  const mfgFactoryRef = useRef<HTMLInputElement>(null);
  const mfgLineRef = useRef<HTMLInputElement>(null);
  const contactBannerRef = useRef<HTMLInputElement>(null);

  // Google Drive & Construction Gallery States
  const [driveFolderInput, setDriveFolderInput] = useState('');
  const [isDriveLoading, setIsDriveLoading] = useState(false);
  const [driveTextLinks, setDriveTextLinks] = useState('');
  const [newGalleryInput, setNewGalleryInput] = useState('');
  const [showDriveTextModal, setShowDriveTextModal] = useState(false);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Dung lượng ảnh vượt quá 5MB. Vui lòng chọn ảnh nhỏ hơn.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          callback(event.target.result as string);
          showToast('Đã tải ảnh lên thành công!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMultipleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const addedUrls: string[] = [];
    let count = 0;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          addedUrls.push(event.target.result as string);
        }
        count++;
        if (count === files.length) {
          setEditingProject((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              gallery: [...(prev.gallery || []), ...addedUrls],
            };
          });
          showToast(`Đã thêm ${addedUrls.length} ảnh thi công thành công!`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImportDriveFolder = async () => {
    if (!driveFolderInput.trim()) {
      showToast('Vui lòng dán link Google Drive Folder hoặc link chia sẻ.', 'info');
      return;
    }
    setIsDriveLoading(true);
    try {
      const res = await fetch('/api/drive-folder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderUrl: driveFolderInput.trim() }),
      });
      const data = await res.json();
      if (data.success && data.images && data.images.length > 0) {
        const allImgs: string[] = data.images;
        // Quy tắc: 1 link folder gồm 4 ảnh (1 ảnh nhà máy, 3 ảnh thi công tối thiểu, nếu nhiều hơn sẽ làm ảnh tự trượt ngang)
        const factoryImg = allImgs[0];
        const constructionImgs = allImgs.slice(1);

        setEditingProject((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            imageUrl: factoryImg,
            gallery: constructionImgs,
          };
        });

        if (allImgs.length < 4) {
          showToast(`Đã nhận ${allImgs.length} ảnh. Lưu ý: Quy chuẩn cần tối thiểu 4 ảnh (1 ảnh nhà máy + 3 ảnh thi công).`, 'info');
        } else if (constructionImgs.length > 3) {
          showToast(`✨ Đã nạp 1 ảnh nhà máy & ${constructionImgs.length} ảnh thi công (>3 ảnh: Tự động trượt ngang trên web)!`);
        } else {
          showToast(`✅ Đã nạp thành công 1 ảnh nhà máy & 3 ảnh thi công thực tế!`);
        }
        setDriveFolderInput('');
      } else {
        // Fallback: extract IDs directly from input text
        const extracted = parseDriveLinks(driveFolderInput);
        if (extracted.length >= 1) {
          const factoryImg = extracted[0];
          const constructionImgs = extracted.slice(1);
          setEditingProject((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              imageUrl: factoryImg,
              gallery: constructionImgs.length > 0 ? constructionImgs : prev.gallery,
            };
          });
          showToast(`Đã trích xuất ${extracted.length} ảnh từ liên kết Drive!`);
          setDriveFolderInput('');
        } else {
          alert(data.message || 'Không thể quét tự động folder này. Bạn có thể dán trực tiếp danh sách link ảnh chia sẻ từ Drive vào ô bên dưới.');
        }
      }
    } catch (err: any) {
      showToast(`Lỗi kết nối: ${err.message}`, 'info');
    } finally {
      setIsDriveLoading(false);
    }
  };

  const handleApplyDriveTextLinks = () => {
    if (!driveTextLinks.trim()) return;
    const parsed = parseDriveLinks(driveTextLinks);
    if (parsed.length === 0) {
      showToast('Không tìm thấy link ảnh Google Drive hợp lệ.', 'info');
      return;
    }
    const factoryImg = parsed[0];
    const constructionImgs = parsed.slice(1);
    setEditingProject((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        imageUrl: factoryImg,
        gallery: constructionImgs.length > 0 ? constructionImgs : prev.gallery,
      };
    });

    if (parsed.length < 4) {
      showToast(`Đã nạp ${parsed.length} ảnh (Quy tắc cần tối thiểu 4 ảnh: 1 nhà máy + 3 thi công).`, 'info');
    } else if (constructionImgs.length > 3) {
      showToast(`✨ Đã nạp 1 ảnh nhà máy & ${constructionImgs.length} ảnh thi công (>3: Kích hoạt tự động trượt ngang)!`);
    } else {
      showToast(`✅ Đã nạp 1 ảnh nhà máy & 3 ảnh thi công thực tế!`);
    }
    setDriveTextLinks('');
    setShowDriveTextModal(false);
  };

  const activeServicesCount = services.filter((s) => s.isActive !== false).length;
  const activeJobsCount = jobs.filter((j) => j.status === 'active').length;
  const activePartnersCount = partners.filter((p) => p.isActive !== false).length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-5 py-3 rounded-[2px] bg-emerald-600 text-white shadow-2xl animate-fadeIn text-xs sm:text-sm font-semibold">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="h-9 w-auto flex items-center">
            <Logo variant="color" />
          </div>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-[2px] bg-[#0040A0] text-[11px] font-black tracking-widest uppercase text-white font-mono">
            CMS
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (confirm('Bạn có chắc chắn muốn khôi phục toàn bộ nội dung về mặc định của Shicons E&C?')) {
                resetAllToDefault();
                showToast('Đã khôi phục toàn bộ dữ liệu mẫu!');
              }
            }}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors border border-slate-700"
            title="Khôi phục dữ liệu gốc"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Khôi phục gốc</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-blue-600/20 hover:bg-blue-600/30 text-[#00C5FF] border border-blue-500/30 text-xs font-semibold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Xem Website Trực Tiếp</span>
          </Link>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-800 bg-slate-950/50 p-4 hidden md:flex flex-col justify-between">
          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase text-slate-500 font-bold px-3 py-2">
              Hệ Thống Quản Trị
            </div>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[2px] text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#0040A0] text-white shadow-md'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Tổng Quan</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[2px] text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'services'
                  ? 'bg-[#0040A0] text-white shadow-md'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4" />
                <span>5 Lĩnh Vực (Ẩn/Hiện)</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${activeServicesCount === services.length ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'}`}>
                {activeServicesCount}/{services.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('hero-banners')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[2px] text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'hero-banners'
                  ? 'bg-[#0040A0] text-white shadow-md'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Hero Banners</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[2px] text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'projects'
                  ? 'bg-[#0040A0] text-white shadow-md'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <FolderKanban className="w-4 h-4" />
                <span>Dự Án Tiêu Biểu</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 font-mono text-slate-300">
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('news')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[2px] text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'news'
                  ? 'bg-[#0040A0] text-white shadow-md'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Newspaper className="w-4 h-4" />
                <span>Tin Tức &amp; Sự Kiện</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 font-mono text-slate-300">
                {news.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('careers')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[2px] text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'careers'
                  ? 'bg-[#0040A0] text-white shadow-md'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4" />
                <span>Tuyển Dụng</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${activeJobsCount > 0 ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'}`}>
                {activeJobsCount > 0 ? `${activeJobsCount} mở` : 'Tự ẩn web'}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('partners')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[2px] text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'partners'
                  ? 'bg-[#0040A0] text-white shadow-md'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Handshake className="w-4 h-4" />
                <span>Đối Tác Thiết Bị</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 font-mono text-slate-300">
                {activePartnersCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[2px] text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'about'
                  ? 'bg-[#0040A0] text-white shadow-md'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Trang Về Chúng Tôi</span>
            </button>

            <button
              onClick={() => setActiveTab('manufacturing')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[2px] text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'manufacturing'
                  ? 'bg-[#0040A0] text-white shadow-md'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Factory className="w-4 h-4" />
                <span>Trang Sản Xuất</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 font-mono text-slate-300">
                {manufacturingData.productionLines.length} line
              </span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[2px] text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#0040A0] text-white shadow-md'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Cài Đặt &amp; Liên Hệ</span>
            </button>
          </div>

          <div className="p-3 rounded-[2px] bg-slate-900 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Hệ Thống Trực Tuyến</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Cổng quản trị Shicons E&amp;C — Mọi chỉnh sửa được đồng bộ tức thì lên Website.
            </p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-extrabold text-white uppercase font-heading tracking-tight">
                  Bảng Điều Khiển Hệ Thống
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Quản lý toàn diện dữ liệu dự án, dịch vụ cơ điện, tuyển dụng và nội dung website Shicons E&amp;C.
                </p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div 
                  onClick={() => setActiveTab('projects')}
                  className="p-5 rounded-[2px] bg-slate-800/80 border border-slate-700 cursor-pointer hover:border-[#0040A0] transition-colors"
                >
                  <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                    Dự án tiêu biểu
                  </span>
                  <div className="text-3xl font-black text-white font-heading">
                    {projects.length}
                  </div>
                  <span className="text-[11px] text-emerald-400 mt-1 block">
                    Đã bàn giao &amp; Đang thi công
                  </span>
                </div>

                <div 
                  onClick={() => setActiveTab('services')}
                  className="p-5 rounded-[2px] bg-slate-800/80 border border-slate-700 cursor-pointer hover:border-[#0040A0] transition-colors"
                >
                  <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                    Lĩnh vực hoạt động
                  </span>
                  <div className="text-3xl font-black text-[#00C5FF] font-heading">
                    {activeServicesCount} / {services.length}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {activeServicesCount === services.length ? '100% đang hiển thị' : `Đang ẩn ${services.length - activeServicesCount} lĩnh vực`}
                  </span>
                </div>

                <div 
                  onClick={() => setActiveTab('careers')}
                  className="p-5 rounded-[2px] bg-slate-800/80 border border-slate-700 cursor-pointer hover:border-[#0040A0] transition-colors"
                >
                  <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                    Vị trí tuyển dụng
                  </span>
                  <div className="text-3xl font-black text-[#ED1C24] font-heading">
                    {activeJobsCount}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {activeJobsCount === 0 ? '🚫 Tự ẩn trên Landing Page' : '👁️ Đang hiển thị Landing Page'}
                  </span>
                </div>

                <div 
                  onClick={() => setActiveTab('partners')}
                  className="p-5 rounded-[2px] bg-slate-800/80 border border-slate-700 cursor-pointer hover:border-[#0040A0] transition-colors"
                >
                  <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                    Đối tác thiết bị
                  </span>
                  <div className="text-3xl font-black text-amber-400 font-heading">
                    {activePartnersCount}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Daikin, Siemens, Schneider...
                  </span>
                </div>
              </div>

              {/* Status Alert for Recruitment */}
              {activeJobsCount === 0 && (
                <div className="p-4 rounded-[2px] bg-amber-950/60 border border-amber-600/40 text-amber-200 flex items-start gap-3 text-xs">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-400 mt-0.5" />
                  <div>
                    <strong className="font-bold uppercase tracking-wider block text-amber-300">
                      Tính năng Tự Động Ẩn Mục Tuyển Dụng Đang Hoạt Động
                    </strong>
                    <p className="mt-1 text-slate-300">
                      Hiện tại không có tin tuyển dụng nào ở trạng thái Mở (Active). Mục &quot;TUYỂN DỤNG NHÂN TÀI&quot; trên trang chủ đang được <strong>tự động ẩn hoàn toàn</strong> để đảm bảo giao diện luôn chuyên nghiệp.
                    </p>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="p-6 rounded-[2px] bg-slate-800/50 border border-slate-700 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Lối Tắt Thao Tác
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveTab('services')}
                    className="px-4 py-2.5 rounded-[2px] bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Bật / Ẩn 5 Lĩnh Vực
                  </button>
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="px-4 py-2.5 rounded-[2px] bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold uppercase tracking-wider"
                  >
                    + Thêm / Sửa Dự Án
                  </button>
                  <button
                    onClick={() => setActiveTab('hero-banners')}
                    className="px-4 py-2.5 rounded-[2px] bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Chỉnh Sửa Hero Banners
                  </button>
                  <button
                    onClick={() => setActiveTab('partners')}
                    className="px-4 py-2.5 rounded-[2px] bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold uppercase tracking-wider"
                  >
                    + Thêm Đối Tác Mới
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SERVICES (TOÀN QUYỀN ẨN / HIỆN + SỬA NỘI DUNG & HÌNH ẢNH) */}
          {activeTab === 'services' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white uppercase font-heading tracking-tight">
                    Quản Lý 5 Lĩnh Vực Hoạt Động (M&amp;E)
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Toàn quyền <strong>Bật / Tắt (Ẩn / Hiện)</strong> bất kỳ lĩnh vực nào. Giao diện trang chủ sẽ tự động co giãn số cột hoàn hảo.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-[2px] bg-slate-800 text-xs font-mono text-slate-300">
                    Đang hiển thị: <strong className="text-white">{activeServicesCount}</strong> / {services.length}
                  </span>
                </div>
              </div>

              {/* Services List with Toggle and Edit */}
              <div className="grid grid-cols-1 gap-6">
                {services.map((srv) => {
                  const isVisible = srv.isActive !== false;
                  return (
                    <div
                      key={srv.id}
                      className={`p-6 rounded-[2px] border transition-all ${
                        isVisible
                          ? 'bg-slate-800/80 border-slate-700'
                          : 'bg-slate-900/60 border-slate-800 opacity-75'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-700/80 pb-4">
                        <div className="flex items-start sm:items-center gap-4">
                          {/* Image preview thumbnail */}
                          <div className="w-20 h-14 rounded-[2px] overflow-hidden bg-slate-950 flex-shrink-0 relative border border-slate-700">
                            <img
                              src={srv.imageUrl}
                              alt={srv.viTitle}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-mono text-[#ED1C24] uppercase font-bold tracking-widest">
                                #{srv.code}
                              </span>
                              <span className="text-slate-500">•</span>
                              <span className="text-[11px] font-mono text-slate-400">
                                {srv.standard}
                              </span>
                            </div>
                            <h3 className="text-base sm:text-lg font-extrabold text-white uppercase font-heading">
                              {srv.viTitle}
                            </h3>
                            <span className="text-xs text-slate-400">{srv.enTitle}</span>
                          </div>
                        </div>

                        {/* Action buttons: Toggle Visibility + Edit */}
                        <div className="flex items-center gap-3 self-start lg:self-center">
                          {/* Toggle Button */}
                          <button
                            onClick={() => {
                              toggleServiceActive(srv.id);
                              showToast(
                                isVisible
                                  ? `Đã ẨN lĩnh vực "${srv.viTitle}" khỏi trang chủ`
                                  : `Đã BẬT hiển thị lĩnh vực "${srv.viTitle}" trên trang chủ`
                              );
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-[2px] text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
                              isVisible
                                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30'
                                : 'bg-rose-950/40 text-rose-300 border border-rose-800/50 hover:bg-rose-900/40'
                            }`}
                          >
                            {isVisible ? (
                              <>
                                <Eye className="w-4 h-4 text-emerald-400" />
                                <span>Đang Hiển Thị</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-4 h-4 text-rose-400" />
                                <span>Đã Ẩn Khỏi Web</span>
                              </>
                            )}
                          </button>

                          {/* Edit button */}
                          <button
                            onClick={() => setEditingService(srv)}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-[2px] bg-slate-700 hover:bg-[#0040A0] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Sửa</span>
                          </button>

                          <Link
                            href={`/linh-vuc-hoat-dong/${srv.slug}`}
                            target="_blank"
                            className="p-2 rounded-[2px] bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                            title="Xem trang chi tiết"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>

                      {/* Description preview */}
                      <p className="text-xs text-slate-300 leading-relaxed mt-3 line-clamp-2">
                        {srv.shortDesc}
                      </p>

                      {/* Sub-systems tags */}
                      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-700/50">
                        {srv.subSystems.map((sub, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-[1px] bg-slate-900/80 border border-slate-700/80 text-[11px] text-slate-300"
                          >
                            {sub.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: HERO BANNERS (SỬA NỘI DUNG, ẢNH, BẬT / TẮT) */}
          {activeTab === 'hero-banners' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white uppercase font-heading tracking-tight">
                    Quản Lý Hero Banners Trang Chủ
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Chỉnh sửa tiêu đề, chỉ số, ảnh nền full-screen và bật / tắt từng slide.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {heroBanners.map((banner, index) => {
                  const isVisible = banner.isActive !== false;
                  return (
                    <div
                      key={banner.id}
                      className={`p-6 rounded-[2px] border transition-all flex flex-col md:flex-row gap-6 items-start ${
                        isVisible
                          ? 'bg-slate-800/80 border-slate-700'
                          : 'bg-slate-900/60 border-slate-800 opacity-70'
                      }`}
                    >
                      <div className="w-full md:w-56 h-36 rounded-[2px] overflow-hidden bg-slate-950 flex-shrink-0 relative border border-slate-700">
                        <img
                          src={banner.bgImage}
                          alt={banner.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#ED1C24] text-[10px] font-bold text-white uppercase rounded-[1px]">
                          Slide 0{index + 1}
                        </div>
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-[#00C5FF] uppercase font-bold tracking-wider">
                            {banner.badge}
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                toggleHeroBanner(banner.id);
                                showToast(
                                  isVisible
                                    ? `Đã ẩn Slide 0${index + 1}`
                                    : `Đã bật hiển thị Slide 0${index + 1}`
                                );
                              }}
                              className={`px-3 py-1 rounded-[2px] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                                isVisible
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                  : 'bg-rose-950 text-rose-400 border border-rose-800'
                              }`}
                            >
                              {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                              <span>{isVisible ? 'Đang chạy' : 'Đã tắt'}</span>
                            </button>

                            <button
                              onClick={() => setEditingBanner(banner)}
                              className="px-3 py-1 rounded-[2px] bg-[#0040A0] hover:bg-[#004DA0] text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Sửa Banner</span>
                            </button>
                          </div>
                        </div>

                        <h3 className="text-base font-extrabold text-white uppercase font-heading">
                          {banner.title}
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {banner.desc}
                        </p>
                        <div className="text-[11px] text-yellow-300 font-mono">
                          {banner.stats}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: PROJECTS (TÙY CHỈNH ẢNH UPLOAD + THÊM / SỬA / XÓA DỰ ÁN) */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white uppercase font-heading tracking-tight">
                    Hồ Sơ Dự Án Cơ Điện (MEP)
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Upload ảnh từ máy tính hoặc dán URL ảnh, chỉnh sửa quy mô và phạm vi cơ điện.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newProj: Project = {
                      id: `proj-${Date.now()}`,
                      name: 'DỰ ÁN MỚI ' + (projects.length + 1),
                      slug: `du-an-moi-${Date.now()}`,
                      category: 'industrial',
                      categoryLabel: 'Nhà máy công nghiệp',
                      client: 'Chủ đầu tư mới',
                      location: 'Việt Nam',
                      year: '2026',
                      scale: '25.000 m²',
                      status: 'Đang thi công hoàn thiện',
                      mepScope: ['Hệ thống HVAC Chiller', 'Trạm biến áp 22kV', 'Hệ thống PCCC'],
                      imageUrl: '/images/projects/nha-may-intel.jpg',
                      gallery: [],
                      description: 'Mô tả tóm tắt quy mô thi công cơ điện...',
                      technicalHighlights: ['Thi công chuẩn BIM LOD 400', 'Đạt chứng nhận công trình xanh LEED Gold'],
                      challengesAndSolutions: 'Áp dụng công nghệ tiền chế modun ống gió rút ngắn 20% tiến độ.',
                    };
                    setEditingProject(newProj);
                  }}
                  className="btn-shicons px-5 py-2.5 bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs uppercase tracking-wider gap-2 self-start sm:self-auto shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm Dự Án Mới</span>
                </button>
              </div>

              {/* Projects Grid / Table */}
              <div className="rounded-[2px] border border-slate-700 overflow-x-auto bg-slate-800/60">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-700">
                    <tr>
                      <th className="py-3 px-4">Ảnh</th>
                      <th className="py-3 px-4">Dự án</th>
                      <th className="py-3 px-4">Phân loại</th>
                      <th className="py-3 px-4">Chủ đầu tư</th>
                      <th className="py-3 px-4">Địa điểm</th>
                      <th className="py-3 px-4">Năm</th>
                      <th className="py-3 px-4">Tình trạng</th>
                      <th className="py-3 px-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {projects.map((proj) => (
                      <tr key={proj.id} className="hover:bg-slate-700/40 transition-colors">
                        <td className="py-3 px-4">
                          <div className="w-14 h-10 rounded-[2px] overflow-hidden bg-slate-950 border border-slate-700">
                            <img
                              src={proj.imageUrl}
                              alt={proj.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4 font-bold text-white max-w-xs truncate">
                          {proj.name}
                        </td>
                        <td className="py-3 px-4 text-[#00C5FF]">
                          {proj.categoryLabel}
                        </td>
                        <td className="py-3 px-4 truncate max-w-[150px]">
                          {proj.client}
                        </td>
                        <td className="py-3 px-4 truncate max-w-[150px]">
                          {proj.location}
                        </td>
                        <td className="py-3 px-4 font-mono">
                          {proj.year}
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-[1px] bg-blue-950 text-blue-300 text-[10px] font-semibold">
                            {proj.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => setEditingProject(proj)}
                            className="p-1.5 hover:text-white text-slate-400 hover:bg-slate-700 rounded transition-colors"
                            title="Sửa dự án & ảnh"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Bạn có chắc chắn muốn xóa dự án "${proj.name}"?`)) {
                                deleteProject(proj.id);
                                showToast('Đã xóa dự án thành công!');
                              }
                            }}
                            className="p-1.5 hover:text-red-400 text-slate-400 hover:bg-slate-700 rounded transition-colors"
                            title="Xóa dự án"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: NEWS (SỬA NỘI DUNG, HÌNH ẢNH, VIẾT BÀI MỚI) */}
          {activeTab === 'news' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white uppercase font-heading tracking-tight">
                    Tin Tức &amp; Góc Kỹ Thuật
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Chỉnh sửa nội dung, hình ảnh và tạo bài viết mới cho website.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newArticle: NewsItem = {
                      id: `news-${Date.now()}`,
                      title: 'TIÊU ĐỀ BÀI VIẾT KỸ THUẬT MỚI',
                      slug: `bai-viet-moi-${Date.now()}`,
                      category: 'technical',
                      categoryLabel: 'Góc kỹ thuật',
                      date: '21 Tháng 11, 2026',
                      imageUrl: '/images/projects/nha-ga-t3-tsn.jpg',
                      excerpt: 'Tóm tắt nội dung bài viết về công nghệ cơ điện tiên tiến...',
                      content: 'Nội dung chi tiết bài viết mới...',
                      author: 'Ban Kỹ thuật Shicons E&C',
                    };
                    setEditingNews(newArticle);
                  }}
                  className="btn-shicons px-5 py-2.5 bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs uppercase tracking-wider gap-2 self-start sm:self-auto shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Viết Bài Mới</span>
                </button>
              </div>

              <div className="space-y-4">
                {news.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-[2px] bg-slate-800/80 border border-slate-700 flex flex-col sm:flex-row items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-24 h-16 rounded-[2px] overflow-hidden bg-slate-950 flex-shrink-0 border border-slate-700">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="px-2 py-0.5 bg-[#ED1C24] text-white text-[10px] font-bold uppercase rounded-[1px]">
                            {item.categoryLabel}
                          </span>
                          <span className="text-slate-400">{item.date}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-400 font-mono">{item.author}</span>
                        </div>
                        <h4 className="text-base font-bold text-white uppercase font-heading">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-300 max-w-3xl leading-relaxed line-clamp-2">
                          {item.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <button
                        onClick={() => setEditingNews(item)}
                        className="p-2 hover:text-white text-slate-400 hover:bg-slate-700 rounded transition-colors"
                        title="Sửa bài viết & ảnh"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Bạn có chắc chắn muốn xóa bài viết "${item.title}"?`)) {
                            deleteNews(item.id);
                            showToast('Đã xóa bài viết thành công!');
                          }
                        }}
                        className="p-2 hover:text-red-400 text-slate-400 hover:bg-slate-700 rounded transition-colors"
                        title="Xóa bài viết"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CAREERS (BẬT / TẮT TRẠNG THÁI TUYỂN DỤNG + TỰ ẨN TRÊN LANDING PAGE) */}
          {activeTab === 'careers' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white uppercase font-heading tracking-tight">
                    Cơ Hội Tuyển Dụng Nhân Tài
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    <strong>Tính năng tự động:</strong> Khi tất cả vị trí đóng tuyển hoặc bị xóa, mục Tuyển dụng trên Landing Page sẽ <strong>tự động ẩn hoàn toàn</strong>.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newJob: JobItem = {
                      id: `job-${Date.now()}`,
                      title: 'KỸ SƯ ME&P MỚI',
                      slug: `ky-su-mep-moi-${Date.now()}`,
                      department: 'Ban Quản lý Dự án',
                      location: 'TP. Hồ Chí Minh & Công trường',
                      experience: 'Từ 2 - 5 năm kinh nghiệm',
                      salary: '18 - 30 Triệu VNĐ',
                      deadline: '31/12/2026',
                      status: 'active',
                      imageUrl: '/images/projects/nha-may-intel.jpg',
                      description: ['Mô tả công việc và quyền lợi kỹ sư ME&P...'],
                      requirements: ['Tốt nghiệp Đại học chuyên ngành Điện / Nhiệt lạnh / Cấp thoát nước'],
                      benefits: ['Thưởng dự án theo tiến độ', 'Đóng BHXH đầy đủ'],
                    };
                    setEditingJob(newJob);
                  }}
                  className="btn-shicons px-5 py-2.5 bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs uppercase tracking-wider gap-2 self-start sm:self-auto shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Đăng Vị Trí Mới</span>
                </button>
              </div>

              {/* Status banner */}
              <div className={`p-4 rounded-[2px] border text-xs flex items-center justify-between gap-4 ${
                activeJobsCount > 0 
                  ? 'bg-emerald-950/40 border-emerald-700/50 text-emerald-300' 
                  : 'bg-rose-950/40 border-rose-700/50 text-rose-300'
              }`}>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span>
                    Trạng thái hiển thị Landing Page: <strong>{activeJobsCount > 0 ? `Đang hiển thị (${activeJobsCount} vị trí mở)` : 'Đang TỰ ĐỘNG ẨN (Không có vị trí mở)'}</strong>
                  </span>
                </div>
                {activeJobsCount === 0 && (
                  <span className="text-[11px] font-mono uppercase bg-rose-900/60 px-2 py-0.5 rounded text-white">
                    Đã ẩn trên trang chủ
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {jobs.map((job) => {
                  const isOpen = job.status === 'active';
                  return (
                    <div
                      key={job.id}
                      className={`p-6 rounded-[2px] border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                        isOpen
                          ? 'bg-slate-800/80 border-slate-700'
                          : 'bg-slate-900/60 border-slate-800 opacity-70'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-[#00C5FF] font-mono font-bold uppercase">
                            {job.department}
                          </span>
                          <span className="text-xs text-slate-400">
                            {job.experience}
                          </span>
                        </div>
                        <h4 className="text-lg font-extrabold text-white uppercase font-heading">
                          {job.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-4 text-xs">
                          <span className="text-slate-300">Nơi làm việc: {job.location}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-[#ED1C24] font-bold">Mức lương: {job.salary}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-amber-400 font-mono">Hạn nộp: {job.deadline}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-start md:self-center">
                        {/* Toggle Status Button */}
                        <button
                          onClick={() => {
                            toggleJobStatus(job.id);
                            showToast(
                              isOpen
                                ? `Đã ĐÓNG tuyển vị trí "${job.title}"`
                                : `Đã MỞ tuyển vị trí "${job.title}"`
                            );
                          }}
                          className={`px-3 py-1.5 rounded-[2px] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                            isOpen
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-700 hover:bg-emerald-900/50'
                              : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                          }`}
                        >
                          {isOpen ? <Check className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                          <span>{isOpen ? 'Đang Mở Tuyển' : 'Đã Đóng Tuyển'}</span>
                        </button>

                        <button
                          onClick={() => setEditingJob(job)}
                          className="p-2 hover:text-white text-slate-400 hover:bg-slate-700 rounded transition-colors"
                          title="Sửa tin tuyển dụng"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Bạn có chắc chắn muốn xóa tin tuyển dụng "${job.title}"?`)) {
                              deleteJob(job.id);
                              showToast('Đã xóa tin tuyển dụng!');
                            }
                          }}
                          className="p-2 hover:text-red-400 text-slate-400 hover:bg-slate-700 rounded transition-colors"
                          title="Xóa tin tuyển dụng"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 7: PARTNERS (NÚT THÊM ĐỐI TÁC + BẬT / TẮT / XÓA) */}
          {activeTab === 'partners' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white uppercase font-heading tracking-tight">
                    Mạng Lưới Đối Tác Thiết Bị Uy Tín
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Quản lý danh sách các hãng sản xuất thiết bị cơ điện liên kết và chứng nhận cùng Shicons.
                  </p>
                </div>

                {/* NÚT THÊM ĐỐI TÁC MỚI THEO YÊU CẦU */}
                <button
                  onClick={() => {
                    const newPartner: ExtendedPartnerItem = {
                      id: `partner-${Date.now()}`,
                      name: 'ĐỐI TÁC MỚI',
                      logo: '/partners/partner_1.png',
                      tag: 'Thiết bị Cơ điện',
                      type: 'equipment',
                      typeLabel: 'Thiết bị & Công nghệ',
                      isActive: true,
                    };
                    setEditingPartner(newPartner);
                  }}
                  className="btn-shicons px-5 py-2.5 bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs uppercase tracking-wider gap-2 self-start sm:self-auto shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Thêm Đối Tác Mới</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {partners.map((partner) => {
                  const isVisible = partner.isActive !== false;
                  return (
                    <div
                      key={partner.id}
                      className={`p-4 rounded-[2px] border flex flex-col items-center justify-between text-center space-y-3 relative group transition-all ${
                        isVisible
                          ? 'bg-slate-800/80 border-slate-700'
                          : 'bg-slate-900/60 border-slate-800 opacity-60'
                      }`}
                    >
                      {/* Logo Box */}
                      <div className="h-14 w-full flex items-center justify-center p-2 bg-white/5 rounded border border-white/5">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-h-full max-w-[130px] object-contain filter invert opacity-90"
                        />
                      </div>

                      <div>
                        <strong className="text-xs text-white uppercase font-heading block">
                          {partner.name}
                        </strong>
                        <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                          {partner.tag}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-700/60 w-full justify-center">
                        <button
                          onClick={() => {
                            togglePartnerActive(partner.id);
                            showToast(
                              isVisible
                                ? `Đã ẩn đối tác "${partner.name}"`
                                : `Đã hiển thị đối tác "${partner.name}"`
                            );
                          }}
                          className={`p-1.5 rounded transition-colors ${
                            isVisible ? 'text-emerald-400 hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-700'
                          }`}
                          title={isVisible ? 'Ẩn đối tác' : 'Bật hiển thị'}
                        >
                          {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          onClick={() => setEditingPartner(partner)}
                          className="p-1.5 hover:text-white text-slate-400 hover:bg-slate-700 rounded transition-colors"
                          title="Sửa đối tác"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Bạn có chắc muốn xóa đối tác "${partner.name}"?`)) {
                              deletePartner(partner.id);
                              showToast('Đã xóa đối tác thành công!');
                            }
                          }}
                          className="p-1.5 hover:text-red-400 text-slate-400 hover:bg-slate-700 rounded transition-colors"
                          title="Xóa đối tác"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 8: VỀ CHÚNG TÔI (ABOUT) */}
          {activeTab === 'about' && (
            <div className="space-y-6 animate-fadeIn max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white uppercase font-heading tracking-tight flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-[#00C5FF]" />
                    <span>Quản Trị Trang Về Chúng Tôi</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Chỉnh sửa nội dung giới thiệu, ban lãnh đạo, tầm nhìn, sứ mệnh, cam kết an toàn HSE và các số liệu năng lực.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/ve-chung-toi"
                    target="_blank"
                    className="px-3 py-2 rounded-[2px] bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Xem Trang Thực Tế</span>
                  </Link>
                  <button
                    onClick={() => showToast('✨ Đã lưu toàn bộ thông tin Trang Về Chúng Tôi!')}
                    className="btn-shicons px-4 py-2 bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs uppercase tracking-wider gap-2 shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu Thay Đổi</span>
                  </button>
                </div>
              </div>

              {/* 1. HERO BANNER TRANG VỀ CHÚNG TÔI */}
              <div className="p-6 rounded-[2px] bg-slate-800/80 border border-slate-700 space-y-4 text-xs">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-700 pb-2">
                  <Sliders className="w-4 h-4 text-[#00C5FF]" />
                  <span>1. Hero Banner Đầu Trang</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Huy hiệu (Badge)
                    </label>
                    <input
                      type="text"
                      value={aboutData.bannerBadge}
                      onChange={(e) => updateAboutData({ bannerBadge: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Tiêu đề chính
                    </label>
                    <input
                      type="text"
                      value={aboutData.bannerTitle}
                      onChange={(e) => updateAboutData({ bannerTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Mô tả phụ đề
                  </label>
                  <textarea
                    rows={2}
                    value={aboutData.bannerSubtitle}
                    onChange={(e) => updateAboutData({ bannerSubtitle: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none resize-none focus:border-[#0040A0]"
                  />
                </div>

                {/* Banner Image */}
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Hình ảnh nền Banner
                  </label>
                  <div className="flex gap-4 items-center">
                    <div className="w-28 h-18 rounded-[2px] overflow-hidden bg-slate-950 border border-slate-700 flex-shrink-0">
                      <img
                        src={aboutData.bannerImage}
                        alt="Banner Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={aboutData.bannerImage}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateAboutData({ bannerImage: convertToDirectDriveImageUrl(val) });
                        }}
                        placeholder="Dán link ảnh hoặc link Google Drive..."
                        className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none text-xs"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          ref={aboutBannerRef}
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (url) => updateAboutData({ bannerImage: url }))}
                        />
                        <button
                          type="button"
                          onClick={() => aboutBannerRef.current?.click()}
                          className="px-3 py-1.5 rounded-[2px] bg-slate-900 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Tải ảnh từ máy</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. GIỚI THIỆU TỔNG QUAN & ĐỘI NGŨ */}
              <div className="p-6 rounded-[2px] bg-slate-800/80 border border-slate-700 space-y-4 text-xs">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-700 pb-2">
                  <Info className="w-4 h-4 text-[#00C5FF]" />
                  <span>2. Tổng Quan Năng Lực &amp; Đội Ngũ Kỹ Sư</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Huy hiệu khối giới thiệu (Badge)
                    </label>
                    <input
                      type="text"
                      value={aboutData.overviewBadge || 'VỀ CHÚNG TÔI'}
                      onChange={(e) => updateAboutData({ overviewBadge: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Tiêu đề khối giới thiệu
                    </label>
                    <input
                      type="text"
                      value={aboutData.overviewTitle || 'SHICONS E&C'}
                      onChange={(e) => updateAboutData({ overviewTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Nội dung giới thiệu - Đoạn 1
                  </label>
                  <textarea
                    rows={3}
                    value={aboutData.overviewParagraphs[0] || ''}
                    onChange={(e) => {
                      const newParas = [...aboutData.overviewParagraphs];
                      newParas[0] = e.target.value;
                      updateAboutData({ overviewParagraphs: newParas });
                    }}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none resize-none focus:border-[#0040A0]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Nội dung giới thiệu - Đoạn 2
                  </label>
                  <textarea
                    rows={3}
                    value={aboutData.overviewParagraphs[1] || ''}
                    onChange={(e) => {
                      const newParas = [...aboutData.overviewParagraphs];
                      newParas[1] = e.target.value;
                      updateAboutData({ overviewParagraphs: newParas });
                    }}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none resize-none focus:border-[#0040A0]"
                  />
                </div>

                {/* 4 Tiêu chuẩn / Cam kết kỹ thuật Checklist */}
                <div className="pt-2">
                  <label className="block text-slate-400 uppercase font-bold mb-2">
                    4 Tiêu Chuẩn &amp; Cam Kết Kỹ Thuật (Checklist hiển thị trên Trang chủ &amp; Trang Về chúng tôi)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(aboutData.highlights || [
                      'Tiêu chuẩn quốc tế HTM & NFPA',
                      'Kiểm định T&C phòng sạch ISO',
                      'Đội ngũ kỹ sư chứng chỉ hành nghề',
                      'Bảo hành & O&M 24/7 toàn diện'
                    ]).map((item, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-900 border border-slate-700 rounded-[2px] space-y-1">
                        <span className="text-[10px] font-mono text-[#00C5FF] font-bold block">
                          Cam kết #{idx + 1}
                        </span>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const newHL = [...(aboutData.highlights || [
                              'Tiêu chuẩn quốc tế HTM & NFPA',
                              'Kiểm định T&C phòng sạch ISO',
                              'Đội ngũ kỹ sư chứng chỉ hành nghề',
                              'Bảo hành & O&M 24/7 toàn diện'
                            ])];
                            newHL[idx] = e.target.value;
                            updateAboutData({ highlights: newHL });
                          }}
                          className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none text-xs font-semibold focus:border-[#0040A0]"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Team Image & Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Số năm kinh nghiệm
                    </label>
                    <input
                      type="text"
                      value={aboutData.experienceYears}
                      onChange={(e) => updateAboutData({ experienceYears: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Tiêu đề kinh nghiệm
                    </label>
                    <input
                      type="text"
                      value={aboutData.experienceTitle}
                      onChange={(e) => updateAboutData({ experienceTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Phụ đề khối kinh nghiệm
                    </label>
                    <input
                      type="text"
                      value={aboutData.experienceSubtitle}
                      onChange={(e) => updateAboutData({ experienceSubtitle: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                    />
                  </div>
                </div>

                {/* Huy hiệu trên ảnh */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Nhãn phụ góc ảnh
                    </label>
                    <input
                      type="text"
                      value={aboutData.imageBadgeCategory || 'Kỹ thuật & An toàn'}
                      onChange={(e) => updateAboutData({ imageBadgeCategory: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Tiêu đề chứng chỉ góc ảnh
                    </label>
                    <input
                      type="text"
                      value={aboutData.imageBadgeTitle || 'BIM Revit MEP LOD 400'}
                      onChange={(e) => updateAboutData({ imageBadgeTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Hình ảnh đội ngũ kỹ sư / hoạt động
                  </label>
                  <div className="flex gap-4 items-center">
                    <div className="w-28 h-18 rounded-[2px] overflow-hidden bg-slate-950 border border-slate-700 flex-shrink-0">
                      <img
                        src={aboutData.overviewImage}
                        alt="Team Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={aboutData.overviewImage}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateAboutData({ overviewImage: convertToDirectDriveImageUrl(val) });
                        }}
                        placeholder="Dán link ảnh hoặc link Google Drive..."
                        className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none text-xs"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          ref={aboutTeamRef}
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (url) => updateAboutData({ overviewImage: url }))}
                        />
                        <button
                          type="button"
                          onClick={() => aboutTeamRef.current?.click()}
                          className="px-3 py-1.5 rounded-[2px] bg-slate-900 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Tải ảnh từ máy</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. TẦM NHÌN, SỨ MỆNH & GIÁ TRỊ CỐT LÕI */}
              <div className="p-6 rounded-[2px] bg-slate-800/80 border border-slate-700 space-y-4 text-xs">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-700 pb-2">
                  <Star className="w-4 h-4 text-amber-400" />
                  <span>3. Tầm Nhìn, Sứ Mệnh &amp; Giá Trị Cốt Lõi</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Tiêu đề Tầm nhìn
                    </label>
                    <input
                      type="text"
                      value={aboutData.visionTitle}
                      onChange={(e) => updateAboutData({ visionTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Tiêu đề Sứ mệnh
                    </label>
                    <input
                      type="text"
                      value={aboutData.missionTitle}
                      onChange={(e) => updateAboutData({ missionTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Nội dung Tầm nhìn
                    </label>
                    <textarea
                      rows={3}
                      value={aboutData.visionDesc}
                      onChange={(e) => updateAboutData({ visionDesc: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none resize-none focus:border-[#0040A0]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Nội dung Sứ mệnh
                    </label>
                    <textarea
                      rows={3}
                      value={aboutData.missionDesc}
                      onChange={(e) => updateAboutData({ missionDesc: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none resize-none focus:border-[#0040A0]"
                    />
                  </div>
                </div>

                {/* 3 Giá trị cốt lõi */}
                <div className="pt-2">
                  <label className="block text-slate-400 uppercase font-bold mb-2">
                    Các Giá Trị Cốt Lõi (3 Trụ Cột)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {aboutData.coreValues.map((cv, idx) => (
                      <div key={idx} className="p-3 bg-slate-900 border border-slate-700 rounded-[2px] space-y-2">
                        <span className="text-[10px] font-mono text-[#00C5FF] font-bold">
                          Giá trị #{idx + 1}
                        </span>
                        <input
                          type="text"
                          value={cv.title}
                          onChange={(e) => {
                            const newCV = [...aboutData.coreValues];
                            newCV[idx] = { ...newCV[idx], title: e.target.value };
                            updateAboutData({ coreValues: newCV });
                          }}
                          placeholder="Tiêu đề (VD: Chính xác)"
                          className="w-full px-2 py-1.5 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none text-xs font-bold"
                        />
                        <textarea
                          rows={2}
                          value={cv.desc}
                          onChange={(e) => {
                            const newCV = [...aboutData.coreValues];
                            newCV[idx] = { ...newCV[idx], desc: e.target.value };
                            updateAboutData({ coreValues: newCV });
                          }}
                          placeholder="Mô tả ý nghĩa..."
                          className="w-full px-2 py-1 bg-slate-950 border border-slate-700 text-slate-300 rounded-[2px] outline-none text-[11px] resize-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. AN TOÀN LAO ĐỘNG HSE & CHỈ SỐ DOANH NGHIỆP */}
              <div className="p-6 rounded-[2px] bg-slate-800/80 border border-slate-700 space-y-4 text-xs">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-700 pb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>4. Cam Kết An Toàn HSE &amp; Số Liệu Năng Lực</span>
                </h3>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Tiêu đề Cam kết HSE
                  </label>
                  <input
                    type="text"
                    value={aboutData.hseTitle}
                    onChange={(e) => updateAboutData({ hseTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Mô tả Cam kết HSE
                  </label>
                  <textarea
                    rows={2}
                    value={aboutData.hseDesc}
                    onChange={(e) => updateAboutData({ hseDesc: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none resize-none focus:border-[#0040A0]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-2">
                    4 Chỉ Số Năng Lực Thống Kê
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {aboutData.companyStats.map((st, idx) => (
                      <div key={idx} className="p-3 bg-slate-900 border border-slate-700 rounded-[2px] space-y-2">
                        <label className="text-[10px] text-slate-400 uppercase font-mono block">
                          Chỉ số #{idx + 1}
                        </label>
                        <input
                          type="text"
                          value={st.value}
                          onChange={(e) => {
                            const newStats = [...aboutData.companyStats];
                            newStats[idx] = { ...newStats[idx], value: e.target.value };
                            updateAboutData({ companyStats: newStats });
                          }}
                          placeholder="Giá trị (VD: 150+)"
                          className="w-full px-2 py-1 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none font-bold text-center"
                        />
                        <input
                          type="text"
                          value={st.label}
                          onChange={(e) => {
                            const newStats = [...aboutData.companyStats];
                            newStats[idx] = { ...newStats[idx], label: e.target.value };
                            updateAboutData({ companyStats: newStats });
                          }}
                          placeholder="Nhãn (VD: Dự án hoàn thành)"
                          className="w-full px-2 py-1 bg-slate-950 border border-slate-700 text-slate-300 rounded-[2px] outline-none text-[11px] text-center"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700 flex justify-end">
                  <button
                    onClick={() => showToast('✨ Đã lưu toàn bộ thông tin Trang Về Chúng Tôi!')}
                    className="btn-shicons px-6 py-2.5 bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs uppercase tracking-wider gap-2 shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu Trang Về Chúng Tôi</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: SẢN XUẤT - NHÀ MÁY (MANUFACTURING) */}
          {activeTab === 'manufacturing' && (
            <div className="space-y-6 animate-fadeIn max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white uppercase font-heading tracking-tight flex items-center gap-2">
                    <Factory className="w-6 h-6 text-[#00C5FF]" />
                    <span>Quản Trị Trang Sản Xuất &amp; Nhà Máy</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Cập nhật năng lực nhà máy 10.000m², thông số sản xuất ống gió, tủ bảng điện và danh sách các dây chuyền gia công tự động.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/san-xuat"
                    target="_blank"
                    className="px-3 py-2 rounded-[2px] bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Xem Trang Thực Tế</span>
                  </Link>
                  <button
                    onClick={() => showToast('✨ Đã lưu toàn bộ thông tin Trang Sản Xuất!')}
                    className="btn-shicons px-4 py-2 bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs uppercase tracking-wider gap-2 shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu Thay Đổi</span>
                  </button>
                </div>
              </div>

              {/* 1. HERO BANNER TRANG SẢN XUẤT */}
              <div className="p-6 rounded-[2px] bg-slate-800/80 border border-slate-700 space-y-4 text-xs">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-700 pb-2">
                  <Sliders className="w-4 h-4 text-[#00C5FF]" />
                  <span>1. Hero Banner Đầu Trang</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Huy hiệu (Badge)
                    </label>
                    <input
                      type="text"
                      value={manufacturingData.bannerBadge}
                      onChange={(e) => updateManufacturingData({ bannerBadge: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Tiêu đề chính
                    </label>
                    <input
                      type="text"
                      value={manufacturingData.bannerTitle}
                      onChange={(e) => updateManufacturingData({ bannerTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Mô tả phụ đề
                  </label>
                  <textarea
                    rows={2}
                    value={manufacturingData.bannerSubtitle}
                    onChange={(e) => updateManufacturingData({ bannerSubtitle: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none resize-none focus:border-[#0040A0]"
                  />
                </div>

                {/* Banner Image */}
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Hình ảnh nền Banner
                  </label>
                  <div className="flex gap-4 items-center">
                    <div className="w-28 h-18 rounded-[2px] overflow-hidden bg-slate-950 border border-slate-700 flex-shrink-0">
                      <img
                        src={manufacturingData.bannerImage}
                        alt="Banner Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={manufacturingData.bannerImage}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateManufacturingData({ bannerImage: convertToDirectDriveImageUrl(val) });
                        }}
                        placeholder="Dán link ảnh hoặc link Google Drive..."
                        className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none text-xs"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          ref={mfgBannerRef}
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (url) => updateManufacturingData({ bannerImage: url }))}
                        />
                        <button
                          type="button"
                          onClick={() => mfgBannerRef.current?.click()}
                          className="px-3 py-1.5 rounded-[2px] bg-slate-900 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Tải ảnh từ máy</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. CƠ SỞ HẠ TẦNG & 3 CHỈ SỐ NĂNG LỰC */}
              <div className="p-6 rounded-[2px] bg-slate-800/80 border border-slate-700 space-y-4 text-xs">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-700 pb-2">
                  <Layers className="w-4 h-4 text-[#00C5FF]" />
                  <span>2. Hạ Tầng Nhà Máy &amp; Chỉ Số Năng Lực</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Huy hiệu hạ tầng
                    </label>
                    <input
                      type="text"
                      value={manufacturingData.factoryBadge}
                      onChange={(e) => updateManufacturingData({ factoryBadge: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Tiêu đề giới thiệu nhà máy
                    </label>
                    <input
                      type="text"
                      value={manufacturingData.factoryTitle}
                      onChange={(e) => updateManufacturingData({ factoryTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Đoạn văn giới thiệu 1
                  </label>
                  <textarea
                    rows={3}
                    value={manufacturingData.factoryParagraphs[0] || ''}
                    onChange={(e) => {
                      const newParas = [...manufacturingData.factoryParagraphs];
                      newParas[0] = e.target.value;
                      updateManufacturingData({ factoryParagraphs: newParas });
                    }}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none resize-none focus:border-[#0040A0]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Đoạn văn giới thiệu 2
                  </label>
                  <textarea
                    rows={3}
                    value={manufacturingData.factoryParagraphs[1] || ''}
                    onChange={(e) => {
                      const newParas = [...manufacturingData.factoryParagraphs];
                      newParas[1] = e.target.value;
                      updateManufacturingData({ factoryParagraphs: newParas });
                    }}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none resize-none focus:border-[#0040A0]"
                  />
                </div>

                {/* Factory Image */}
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Hình ảnh tổng thể nhà xưởng
                  </label>
                  <div className="flex gap-4 items-center">
                    <div className="w-28 h-18 rounded-[2px] overflow-hidden bg-slate-950 border border-slate-700 flex-shrink-0">
                      <img
                        src={manufacturingData.factoryImage}
                        alt="Factory Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={manufacturingData.factoryImage}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateManufacturingData({ factoryImage: convertToDirectDriveImageUrl(val) });
                        }}
                        placeholder="Dán link ảnh hoặc link Google Drive..."
                        className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none text-xs"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          ref={mfgFactoryRef}
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (url) => updateManufacturingData({ factoryImage: url }))}
                        />
                        <button
                          type="button"
                          onClick={() => mfgFactoryRef.current?.click()}
                          className="px-3 py-1.5 rounded-[2px] bg-slate-900 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Tải ảnh từ máy</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3 Key Stats */}
                <div className="pt-2">
                  <label className="block text-slate-400 uppercase font-bold mb-2">
                    3 Chỉ Số Năng Lực Cốt Lõi
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-900 border border-slate-700 rounded-[2px] space-y-2">
                      <span className="text-[10px] font-mono text-[#00C5FF] font-bold">1. Diện Tích Nhà Xưởng</span>
                      <input
                        type="text"
                        value={manufacturingData.areaStat}
                        onChange={(e) => updateManufacturingData({ areaStat: e.target.value })}
                        placeholder="VD: 10.000 m²"
                        className="w-full px-2 py-1.5 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none text-xs font-bold"
                      />
                      <input
                        type="text"
                        value={manufacturingData.areaLabel}
                        onChange={(e) => updateManufacturingData({ areaLabel: e.target.value })}
                        placeholder="Nhãn hiển thị"
                        className="w-full px-2 py-1 bg-slate-950 border border-slate-700 text-slate-400 rounded-[2px] outline-none text-[11px]"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-700 rounded-[2px] space-y-2">
                      <span className="text-[10px] font-mono text-[#00C5FF] font-bold">2. Công Suất Ống Gió</span>
                      <input
                        type="text"
                        value={manufacturingData.ductStat}
                        onChange={(e) => updateManufacturingData({ ductStat: e.target.value })}
                        placeholder="VD: 300.000 m²"
                        className="w-full px-2 py-1.5 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none text-xs font-bold"
                      />
                      <input
                        type="text"
                        value={manufacturingData.ductLabel}
                        onChange={(e) => updateManufacturingData({ ductLabel: e.target.value })}
                        placeholder="Nhãn hiển thị"
                        className="w-full px-2 py-1 bg-slate-950 border border-slate-700 text-slate-400 rounded-[2px] outline-none text-[11px]"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-700 rounded-[2px] space-y-2">
                      <span className="text-[10px] font-mono text-[#00C5FF] font-bold">3. Công Suất Tủ Điện MSB</span>
                      <input
                        type="text"
                        value={manufacturingData.panelStat}
                        onChange={(e) => updateManufacturingData({ panelStat: e.target.value })}
                        placeholder="VD: 6300A"
                        className="w-full px-2 py-1.5 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none text-xs font-bold"
                      />
                      <input
                        type="text"
                        value={manufacturingData.panelLabel}
                        onChange={(e) => updateManufacturingData({ panelLabel: e.target.value })}
                        placeholder="Nhãn hiển thị"
                        className="w-full px-2 py-1 bg-slate-950 border border-slate-700 text-slate-400 rounded-[2px] outline-none text-[11px]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. QUẢN LÝ DÂY CHUYỀN SẢN XUẤT */}
              <div className="p-6 rounded-[2px] bg-slate-800/80 border border-slate-700 space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#00C5FF]" />
                    <span>3. Danh Sách Dây Chuyền Sản Xuất ({manufacturingData.productionLines.length})</span>
                  </h3>
                  <button
                    onClick={() => {
                      setEditingProductionLine({
                        index: -1,
                        line: {
                          id: 'line-' + Date.now(),
                          title: '',
                          tag: 'CÔNG NGHỆ GIA CÔNG',
                          desc: '',
                          image: '/images/services/co-dien.jpg',
                          specs: ['Công suất vận hành chuẩn', 'Điều khiển tự động CNC']
                        }
                      });
                    }}
                    className="btn-shicons px-3 py-1.5 bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs uppercase gap-1.5 shadow"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm Dây Chuyền</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {manufacturingData.productionLines.map((line, idx) => (
                    <div key={idx} className="p-4 bg-slate-900 border border-slate-700 rounded-[2px] space-y-3 relative group">
                      <div className="flex gap-3">
                        <div className="w-20 h-16 rounded-[2px] overflow-hidden bg-slate-950 border border-slate-800 flex-shrink-0">
                          <img
                            src={line.image}
                            alt={line.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-mono text-[#00C5FF] font-semibold uppercase block">
                            {line.tag}
                          </span>
                          <h4 className="text-xs font-bold text-white line-clamp-1">
                            {line.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                            {line.desc}
                          </p>
                        </div>
                      </div>

                      {/* Specs */}
                      <div className="space-y-1 pt-1 border-t border-slate-800">
                        <span className="text-[10px] font-mono text-slate-500 uppercase">Thông số:</span>
                        <ul className="text-[11px] text-slate-300 list-disc list-inside space-y-0.5">
                          {line.specs.slice(0, 3).map((spec, sIdx) => (
                            <li key={sIdx} className="truncate">{spec}</li>
                          ))}
                          {line.specs.length > 3 && (
                            <li className="text-slate-500 italic">+{line.specs.length - 3} thông số khác</li>
                          )}
                        </ul>
                      </div>

                      {/* Actions */}
                      <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                        <button
                          onClick={() => setEditingProductionLine({ index: idx, line: { ...line } })}
                          className="px-2.5 py-1 rounded-[2px] bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 border border-slate-700"
                        >
                          <Edit className="w-3 h-3 text-[#00C5FF]" />
                          <span>Sửa</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Bạn có chắc muốn xóa dây chuyền "${line.title}"?`)) {
                              deleteProductionLine(line.id);
                              showToast('Đã xóa dây chuyền thành công!');
                            }
                          }}
                          className="px-2.5 py-1 rounded-[2px] bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-semibold flex items-center gap-1 border border-red-800/40"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Xóa</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-700 flex justify-end">
                  <button
                    onClick={() => showToast('✨ Đã lưu toàn bộ thông tin Trang Sản Xuất!')}
                    className="btn-shicons px-6 py-2.5 bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs uppercase tracking-wider gap-2 shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu Trang Sản Xuất</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: CÀI ĐẶT DOANH NGHIỆP & TRANG LIÊN HỆ (SETTINGS & CONTACT) */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fadeIn max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white uppercase font-heading tracking-tight flex items-center gap-2">
                    <Settings className="w-6 h-6 text-[#00C5FF]" />
                    <span>Cài Đặt Website &amp; Trang Liên Hệ</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Quản lý toàn bộ thông tin doanh nghiệp, hotline, email, địa chỉ 3 cơ sở (trụ sở, chi nhánh, nhà máy) và bản đồ Google Maps.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/lien-he"
                    target="_blank"
                    className="px-3 py-2 rounded-[2px] bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Xem Trang Liên Hệ</span>
                  </Link>
                  <button
                    onClick={() => showToast('✨ Đã lưu toàn bộ cấu hình website & thông tin liên hệ!')}
                    className="btn-shicons px-4 py-2 bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs uppercase tracking-wider gap-2 shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu Thay Đổi</span>
                  </button>
                </div>
              </div>

              {/* 1. HERO BANNER TRANG LIÊN HỆ */}
              <div className="p-6 rounded-[2px] bg-slate-800/80 border border-slate-700 space-y-4 text-xs">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-700 pb-2">
                  <Sliders className="w-4 h-4 text-[#00C5FF]" />
                  <span>1. Hero Banner Trang Liên Hệ (/lien-he)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Huy hiệu (Badge)
                    </label>
                    <input
                      type="text"
                      value={settings.bannerBadge}
                      onChange={(e) => updateSettings({ ...settings, bannerBadge: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Tiêu đề chính
                    </label>
                    <input
                      type="text"
                      value={settings.bannerTitle}
                      onChange={(e) => updateSettings({ ...settings, bannerTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Mô tả phụ đề
                  </label>
                  <textarea
                    rows={2}
                    value={settings.bannerSubtitle}
                    onChange={(e) => updateSettings({ ...settings, bannerSubtitle: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none resize-none focus:border-[#0040A0]"
                  />
                </div>

                {/* Banner Image */}
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Hình ảnh nền Banner
                  </label>
                  <div className="flex gap-4 items-center">
                    <div className="w-28 h-18 rounded-[2px] overflow-hidden bg-slate-950 border border-slate-700 flex-shrink-0">
                      <img
                        src={settings.bannerImage}
                        alt="Banner Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={settings.bannerImage}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateSettings({ ...settings, bannerImage: convertToDirectDriveImageUrl(val) });
                        }}
                        placeholder="Dán link ảnh hoặc link Google Drive..."
                        className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none text-xs"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          ref={contactBannerRef}
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (url) => updateSettings({ ...settings, bannerImage: url }))}
                        />
                        <button
                          type="button"
                          onClick={() => contactBannerRef.current?.click()}
                          className="px-3 py-1.5 rounded-[2px] bg-slate-900 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Tải ảnh từ máy</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. THÔNG TIN DOANH NGHIỆP & HOTLINE */}
              <div className="p-6 rounded-[2px] bg-slate-800/80 border border-slate-700 space-y-4 text-xs">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-700 pb-2">
                  <Building2 className="w-4 h-4 text-[#00C5FF]" />
                  <span>2. Thông Tin Pháp Lý &amp; Kênh Liên Lạc</span>
                </h3>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Tên đầy đủ công ty
                  </label>
                  <input
                    type="text"
                    value={settings.companyName}
                    onChange={(e) => updateSettings({ ...settings, companyName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Mã số thuế doanh nghiệp
                    </label>
                    <input
                      type="text"
                      value={settings.taxCode}
                      onChange={(e) => updateSettings({ ...settings, taxCode: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Giờ làm việc văn phòng
                    </label>
                    <input
                      type="text"
                      value={settings.workingHours}
                      onChange={(e) => updateSettings({ ...settings, workingHours: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Hotline chính (Tổng đài)
                    </label>
                    <input
                      type="text"
                      value={settings.hotlines[0] || ''}
                      onChange={(e) => {
                        const newHotlines = [...settings.hotlines];
                        newHotlines[0] = e.target.value;
                        updateSettings({ ...settings, hotlines: newHotlines });
                      }}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Hotline kinh doanh &amp; hỗ trợ kỹ thuật
                    </label>
                    <input
                      type="text"
                      value={settings.hotlines[1] || ''}
                      onChange={(e) => {
                        const newHotlines = [...settings.hotlines];
                        newHotlines[1] = e.target.value;
                        updateSettings({ ...settings, hotlines: newHotlines });
                      }}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Email tiếp nhận hồ sơ / kinh doanh
                    </label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => updateSettings({ ...settings, email: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1">
                      Email tiếp nhận tuyển dụng
                    </label>
                    <input
                      type="email"
                      value={settings.recruitmentEmail || ''}
                      onChange={(e) => updateSettings({ ...settings, recruitmentEmail: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Đường dẫn tải Hồ Sơ Năng Lực (PDF Profile URL)
                  </label>
                  <input
                    type="text"
                    value={settings.profilePdfUrl || ''}
                    onChange={(e) => updateSettings({ ...settings, profilePdfUrl: e.target.value })}
                    placeholder="https://... hoặc link tải file Google Drive / PDF"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                  />
                </div>
              </div>

              {/* 3. ĐỊA CHỈ TRỤ SỞ, CHI NHÁNH & NHÀ MÁY */}
              <div className="p-6 rounded-[2px] bg-slate-800/80 border border-slate-700 space-y-4 text-xs">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-700 pb-2">
                  <MapPin className="w-4 h-4 text-[#00C5FF]" />
                  <span>3. Địa Chỉ Trụ Sở &amp; Các Chi Nhánh Hoạt Động</span>
                </h3>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Trụ sở chính công ty
                  </label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => updateSettings({ ...settings, address: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Văn phòng đại diện / Chi nhánh
                  </label>
                  <input
                    type="text"
                    value={settings.branchAddress || ''}
                    onChange={(e) => updateSettings({ ...settings, branchAddress: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Địa chỉ Nhà máy sản xuất &amp; chế tạo
                  </label>
                  <input
                    type="text"
                    value={settings.factoryAddress || ''}
                    onChange={(e) => updateSettings({ ...settings, factoryAddress: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                  />
                </div>
              </div>

              {/* 4. GOOGLE MAPS EMBED */}
              <div className="p-6 rounded-[2px] bg-slate-800/80 border border-slate-700 space-y-4 text-xs">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-700 pb-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>4. Bản Đồ Nhúng Google Maps Trang Liên Hệ</span>
                </h3>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Link nhúng Google Map Iframe (src="..." trong mã nhúng)
                  </label>
                  <input
                    type="text"
                    value={settings.googleMapEmbedUrl || ''}
                    onChange={(e) => {
                      let val = e.target.value.trim();
                      // Tự trích xuất src nếu người dùng dán nguyên đoạn <iframe src="...">
                      const match = val.match(/src=["']([^"']+)["']/);
                      if (match && match[1]) {
                        val = match[1];
                      }
                      updateSettings({ ...settings, googleMapEmbedUrl: val });
                    }}
                    placeholder="https://www.google.com/maps/embed?pb=..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0] font-mono text-[11px]"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    * Mẹo: Bạn có thể dán toàn bộ đoạn mã nhúng `&lt;iframe src="..."&gt;&lt;/iframe&gt;` từ Google Maps, hệ thống sẽ tự động lọc lấy link chuẩn.
                  </p>
                </div>

                {/* Live Map Preview */}
                {settings.googleMapEmbedUrl && (
                  <div className="mt-3 space-y-1">
                    <span className="text-[11px] text-slate-400 uppercase font-bold block">
                      Xem trước bản đồ nhúng:
                    </span>
                    <div className="w-full h-56 rounded-[2px] overflow-hidden border border-slate-700 bg-slate-950">
                      <iframe
                        src={settings.googleMapEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map Preview"
                      />
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-700 flex justify-end">
                  <button
                    onClick={() => showToast('✨ Đã lưu toàn bộ cấu hình website & thông tin liên hệ!')}
                    className="btn-shicons px-6 py-2.5 bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs uppercase tracking-wider gap-2 shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu Cài Đặt &amp; Liên Hệ</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: SỬA LĨNH VỰC HOẠT ĐỘNG (SERVICES) */}
      {/* ========================================================================= */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-[2px] shadow-2xl p-6 relative my-8 text-xs max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingService(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white uppercase font-heading mb-4">
              Chỉnh Sửa Lĩnh Vực Hoạt Động #{editingService.code}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateService(editingService);
                setEditingService(null);
                showToast(`Đã cập nhật lĩnh vực "${editingService.viTitle}" thành công!`);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Tiêu đề tiếng Việt *
                </label>
                <input
                  type="text"
                  required
                  value={editingService.viTitle}
                  onChange={(e) => setEditingService({ ...editingService, viTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Tiêu đề tiếng Anh
                </label>
                <input
                  type="text"
                  value={editingService.enTitle}
                  onChange={(e) => setEditingService({ ...editingService, enTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Mã số (Code)
                  </label>
                  <input
                    type="text"
                    value={editingService.code}
                    onChange={(e) => setEditingService({ ...editingService, code: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Tiêu chuẩn kỹ thuật
                  </label>
                  <input
                    type="text"
                    value={editingService.standard}
                    onChange={(e) => setEditingService({ ...editingService, standard: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                  />
                </div>
              </div>

              {/* Upload ảnh bìa lĩnh vực */}
              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Hình ảnh bìa lĩnh vực
                </label>
                <div className="flex gap-4 items-center">
                  <div className="w-24 h-16 rounded-[2px] overflow-hidden bg-slate-950 border border-slate-700 flex-shrink-0">
                    <img
                      src={editingService.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={editingService.imageUrl}
                      onChange={(e) => setEditingService({ ...editingService, imageUrl: e.target.value })}
                      placeholder="Dán URL ảnh hoặc tải ảnh lên bên dưới"
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none text-xs"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        ref={serviceFileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (url) => setEditingService({ ...editingService, imageUrl: url }))}
                      />
                      <button
                        type="button"
                        onClick={() => serviceFileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-[2px] bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Tải ảnh từ máy tính</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Mô tả ngắn (Hiển thị cột banner)
                </label>
                <textarea
                  rows={2}
                  value={editingService.shortDesc}
                  onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none resize-none focus:border-[#0040A0]"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Mô tả chi tiết năng lực
                </label>
                <textarea
                  rows={4}
                  value={editingService.fullDesc}
                  onChange={(e) => setEditingService({ ...editingService, fullDesc: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none resize-none focus:border-[#0040A0]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-[2px] bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold uppercase"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="btn-shicons px-6 py-2 bg-[#0040A0] hover:bg-[#004DA0] text-white font-bold uppercase"
                >
                  Lưu Thay Đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: SỬA HERO BANNER */}
      {/* ========================================================================= */}
      {editingBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-[2px] shadow-2xl p-6 relative my-8 text-xs max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingBanner(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white uppercase font-heading mb-4">
              Chỉnh Sửa Hero Banner ({editingBanner.badge})
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateHeroBanner(editingBanner);
                setEditingBanner(null);
                showToast('Đã cập nhật banner thành công!');
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Huy hiệu (Badge) *
                </label>
                <input
                  type="text"
                  required
                  value={editingBanner.badge}
                  onChange={(e) => setEditingBanner({ ...editingBanner, badge: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Tiêu đề chính (Headline) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingBanner.title}
                  onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none resize-none focus:border-[#0040A0]"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Mô tả ngắn
                </label>
                <textarea
                  rows={3}
                  value={editingBanner.desc}
                  onChange={(e) => setEditingBanner({ ...editingBanner, desc: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none resize-none focus:border-[#0040A0]"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Chỉ số kỹ thuật nổi bật (Stats)
                </label>
                <input
                  type="text"
                  value={editingBanner.stats}
                  onChange={(e) => setEditingBanner({ ...editingBanner, stats: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                />
              </div>

              {/* Upload ảnh nền banner */}
              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Ảnh nền toàn màn hình
                </label>
                <div className="flex gap-4 items-center">
                  <div className="w-24 h-16 rounded-[2px] overflow-hidden bg-slate-950 border border-slate-700 flex-shrink-0">
                    <img
                      src={editingBanner.bgImage}
                      alt="Banner Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={editingBanner.bgImage}
                      onChange={(e) => setEditingBanner({ ...editingBanner, bgImage: e.target.value })}
                      placeholder="Dán URL ảnh hoặc tải ảnh lên bên dưới"
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none text-xs"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        ref={bannerFileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (url) => setEditingBanner({ ...editingBanner, bgImage: url }))}
                      />
                      <button
                        type="button"
                        onClick={() => bannerFileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-[2px] bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Tải ảnh từ máy tính</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingBanner(null)}
                  className="px-4 py-2 rounded-[2px] bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold uppercase"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="btn-shicons px-6 py-2 bg-[#0040A0] hover:bg-[#004DA0] text-white font-bold uppercase"
                >
                  Lưu Thay Đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: SỬA & UPLOAD ẢNH CHO DỰ ÁN (PROJECTS) */}
      {/* ========================================================================= */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-[2px] shadow-2xl p-6 relative my-8 text-xs max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingProject(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white uppercase font-heading mb-4">
              {projects.some((p) => p.id === editingProject.id) ? 'Chỉnh Sửa Dự Án' : 'Thêm Dự Án Mới'}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (projects.some((p) => p.id === editingProject.id)) {
                  updateProject(editingProject);
                  showToast('Đã cập nhật dự án thành công!');
                } else {
                  addProject(editingProject);
                  showToast('Đã thêm dự án mới thành công!');
                }
                setEditingProject(null);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Tên Dự Án *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.name}
                  onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                />
              </div>

              {/* ========================================================= */}
              {/* PHẦN 1: TÍNH NĂNG TRUY CẬP HÌNH TỪ GOOGLE DRIVE */}
              {/* QUY TẮC: 1 LINK FOLDER GỒM 4 ẢNH (1 ẢNH NHÀ MÁY, 3 ẢNH THI CÔNG TỐI THIỂU, NẾU NHIỀU HƠN SẼ LÀM ẢNH TỰ TRƯỢT NGANG) */}
              {/* ========================================================= */}
              <div className="p-4 rounded-[2px] bg-gradient-to-r from-blue-950/70 via-slate-900 to-slate-950 border border-blue-600/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white">
                    <FolderDown className="w-5 h-5 text-[#00C5FF]" />
                    <span className="font-extrabold uppercase tracking-wide text-xs">
                      Truy Cập &amp; Nạp Hình Từ Google Drive
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-[1px] bg-blue-600/30 text-blue-300 font-mono">
                    Quy tắc 4+ ảnh chuẩn
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed">
                  <strong>Quy tắc nhập ảnh Drive:</strong> 1 folder gồm tối thiểu 4 ảnh (<strong>Ảnh #1:</strong> Ảnh nhà máy / tổng quan; <strong>Ảnh #2, #3, #4+:</strong> Ảnh thi công thực tế). <em>Nếu có nhiều hơn 3 ảnh thi công, hệ thống sẽ tự động kích hoạt tính năng trượt ngang mượt mà trên website!</em>
                </p>

                {/* Ô nhập link Google Drive Folder */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Dán link Google Drive Folder (https://drive.google.com/drive/folders/...)"
                      value={driveFolderInput}
                      onChange={(e) => setDriveFolderInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none text-xs focus:border-[#0040A0]"
                    />
                    <Link2 className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>

                  <button
                    type="button"
                    onClick={handleImportDriveFolder}
                    disabled={isDriveLoading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-[2px] flex items-center justify-center gap-2 whitespace-nowrap shadow-md transition-colors"
                  >
                    {isDriveLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Đang Quét...</span>
                      </>
                    ) : (
                      <>
                        <FolderDown className="w-4 h-4" />
                        <span>Tải Từ Drive</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowDriveTextModal(!showDriveTextModal)}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-[2px] border border-slate-700 whitespace-nowrap"
                  >
                    {showDriveTextModal ? 'Đóng ô dán link' : 'Dán nhiều link lẻ'}
                  </button>
                </div>

                {/* Hộp dán nhiều link lẻ khi folder bị giới hạn quyền riêng tư */}
                {showDriveTextModal && (
                  <div className="pt-2 border-t border-slate-800 space-y-2">
                    <label className="block text-[11px] text-slate-400 font-mono">
                      Dán danh sách các link chia sẻ file ảnh Drive (Mỗi dòng 1 link - Dòng 1 là ảnh nhà máy, các dòng sau là ảnh thi công):
                    </label>
                    <textarea
                      rows={3}
                      placeholder={`https://drive.google.com/file/d/1abc.../view?usp=sharing\nhttps://drive.google.com/file/d/2def.../view?usp=sharing\nhttps://drive.google.com/file/d/3ghi.../view?usp=sharing\nhttps://drive.google.com/file/d/4jkl.../view?usp=sharing`}
                      value={driveTextLinks}
                      onChange={(e) => setDriveTextLinks(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none text-xs font-mono resize-none focus:border-[#0040A0]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyDriveTextLinks}
                      className="px-4 py-1.5 bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs font-bold rounded-[2px]"
                    >
                      Áp Dụng Danh Sách Link Drive
                    </button>
                  </div>
                )}
              </div>

              {/* ========================================================= */}
              {/* PHẦN 2: ẢNH NHÀ MÁY / CÔNG TRÌNH CHÍNH (imageUrl) */}
              {/* ========================================================= */}
              <div className="p-4 rounded-[2px] bg-slate-950 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 uppercase font-bold text-xs flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-emerald-400" />
                    <span>1. Ảnh Đại Diện Nhà Máy &amp; Công Trình (Ảnh Chính)</span>
                  </label>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    Ảnh #1 trong folder
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-40 h-24 rounded-[2px] overflow-hidden bg-slate-900 border border-slate-700 flex-shrink-0 relative">
                    <img
                      src={editingProject.imageUrl}
                      alt="Ảnh nhà máy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/80 text-[9px] font-mono text-white rounded">
                      Ảnh nhà máy
                    </div>
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    <input
                      type="text"
                      value={editingProject.imageUrl}
                      onChange={(e) => setEditingProject({ ...editingProject, imageUrl: convertToDirectDriveImageUrl(e.target.value) })}
                      placeholder="Dán URL ảnh hoặc tải ảnh lên từ máy tính"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none text-xs focus:border-[#0040A0]"
                    />

                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="file"
                        ref={projectFileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (url) => setEditingProject({ ...editingProject, imageUrl: url }))}
                      />
                      <button
                        type="button"
                        onClick={() => projectFileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-[2px] bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Tải ảnh nhà máy từ máy</span>
                      </button>

                      <span className="text-[11px] text-slate-400">hoặc chọn mẫu:</span>

                      <button
                        type="button"
                        onClick={() => setEditingProject({ ...editingProject, imageUrl: '/images/projects/nha-may-intel.jpg' })}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[10px] text-slate-300"
                      >
                        Intel
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingProject({ ...editingProject, imageUrl: '/images/projects/nha-may-bel.jpg' })}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[10px] text-slate-300"
                      >
                        Bel
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingProject({ ...editingProject, imageUrl: '/images/projects/nha-ga-t3-tsn.jpg' })}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[10px] text-slate-300"
                      >
                        T3 TSN
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* PHẦN 3: ẢNH THỰC TẾ THI CÔNG (gallery) */}
              {/* QUY TẮC: TỐI THIỂU 3 ẢNH, NẾU NHIỀU HƠN SẼ TỰ TRƯỢT NGANG */}
              {/* ========================================================= */}
              <div className="p-4 rounded-[2px] bg-slate-950 border border-slate-700 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#ED1C24]" />
                    <label className="text-slate-300 uppercase font-bold text-xs">
                      2. Hình Ảnh Thi Công Thực Tế (Gallery)
                    </label>
                    <span className="text-xs px-2 py-0.5 rounded-[1px] bg-slate-800 text-white font-mono font-bold">
                      {(editingProject.gallery || []).length} ảnh
                    </span>
                  </div>

                  {/* Trạng thái quy tắc 3 ảnh & tự trượt ngang */}
                  <div>
                    {(editingProject.gallery || []).length < 3 && (
                      <span className="text-[11px] px-2.5 py-1 rounded-[1px] bg-amber-950/80 text-amber-300 border border-amber-700/60 font-medium inline-block">
                        ⚠️ Cần tối thiểu 3 ảnh thi công (hiện có {(editingProject.gallery || []).length}/3)
                      </span>
                    )}
                    {(editingProject.gallery || []).length === 3 && (
                      <span className="text-[11px] px-2.5 py-1 rounded-[1px] bg-blue-950/80 text-blue-300 border border-blue-700/60 font-medium inline-block">
                        ✅ Chuẩn 3 ảnh thi công cố định
                      </span>
                    )}
                    {(editingProject.gallery || []).length > 3 && (
                      <span className="text-[11px] px-2.5 py-1 rounded-[1px] bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 font-bold inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>✨ Đã kích hoạt tính năng tự động trượt ngang (hơn 3 ảnh)</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Danh sách ảnh thi công hiện có */}
                {(!editingProject.gallery || editingProject.gallery.length === 0) ? (
                  <div className="py-6 text-center text-slate-500 border border-dashed border-slate-800 rounded-[2px] text-xs">
                    Chưa có ảnh thi công thực tế nào. Hãy tải ảnh lên từ máy tính hoặc nạp từ Google Drive.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {editingProject.gallery.map((imgUrl, gIdx) => (
                      <div
                        key={gIdx}
                        className="rounded-[2px] overflow-hidden bg-slate-900 border border-slate-700 relative group flex flex-col justify-between"
                      >
                        <div className="h-24 w-full overflow-hidden bg-slate-950 relative">
                          <img
                            src={imgUrl}
                            alt={`Ảnh thi công ${gIdx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-black/80 text-[9px] font-mono text-white rounded">
                            #{gIdx + 1}
                          </div>
                        </div>

                        {/* Thanh thao tác dưới ảnh */}
                        <div className="p-1.5 bg-slate-900 flex items-center justify-between border-t border-slate-800 text-[10px]">
                          <button
                            type="button"
                            onClick={() => {
                              // Hoán đổi ảnh này làm ảnh nhà máy chính
                              const oldCover = editingProject.imageUrl;
                              const newGallery = [...editingProject.gallery];
                              newGallery[gIdx] = oldCover;
                              setEditingProject({
                                ...editingProject,
                                imageUrl: imgUrl,
                                gallery: newGallery,
                              });
                              showToast(`Đã chuyển ảnh #${gIdx + 1} làm Ảnh Nhà Máy chính!`);
                            }}
                            className="px-1.5 py-0.5 rounded text-blue-300 hover:text-white hover:bg-slate-800 flex items-center gap-1"
                            title="Đặt làm ảnh nhà máy chính"
                          >
                            <Star className="w-3 h-3 text-yellow-400" />
                            <span>Làm bìa</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const newGallery = editingProject.gallery.filter((_, idx) => idx !== gIdx);
                              setEditingProject({ ...editingProject, gallery: newGallery });
                              showToast('Đã xóa ảnh thi công!');
                            }}
                            className="p-1 rounded text-red-400 hover:text-white hover:bg-red-900/60"
                            title="Xóa ảnh này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Thêm ảnh thi công mới (Tải nhiều ảnh hoặc dán URL) */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-800">
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      placeholder="Dán link ảnh thi công (Drive hoặc URL)"
                      value={newGalleryInput}
                      onChange={(e) => setNewGalleryInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none text-xs focus:border-[#0040A0]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newGalleryInput.trim()) return;
                        const directUrl = convertToDirectDriveImageUrl(newGalleryInput.trim());
                        setEditingProject({
                          ...editingProject,
                          gallery: [...(editingProject.gallery || []), directUrl],
                        });
                        setNewGalleryInput('');
                        showToast('Đã thêm 1 ảnh thi công mới!');
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-[2px] border border-slate-600 whitespace-nowrap"
                    >
                      + Thêm Link
                    </button>
                  </div>

                  <div>
                    <input
                      type="file"
                      ref={galleryFileInputRef}
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleMultipleGalleryUpload}
                    />
                    <button
                      type="button"
                      onClick={() => galleryFileInputRef.current?.click()}
                      className="w-full sm:w-auto px-4 py-1.5 bg-[#0040A0] hover:bg-[#004DA0] text-white text-xs font-bold rounded-[2px] flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <ImagePlus className="w-3.5 h-3.5" />
                      <span>+ Tải Nhiều Ảnh Thi Công Từ Máy Tính</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Chủ đầu tư *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.client}
                    onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Địa điểm *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.location}
                    onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Năm thực hiện
                  </label>
                  <input
                    type="text"
                    value={editingProject.year}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Quy mô diện tích
                  </label>
                  <input
                    type="text"
                    value={editingProject.scale}
                    onChange={(e) => setEditingProject({ ...editingProject, scale: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Tình trạng
                  </label>
                  <select
                    value={editingProject.status}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as 'Đã hoàn thành bàn giao' | 'Đang thi công hoàn thiện' })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none"
                  >
                    <option value="Đang thi công hoàn thiện">Đang thi công hoàn thiện</option>
                    <option value="Đã hoàn thành bàn giao">Đã hoàn thành bàn giao</option>
                  </select>
                </div>
              </div>

              {/* PHÂN LOẠI DỰ ÁN */}
              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Phân loại chuyên mục *
                </label>
                <select
                  value={editingProject.category}
                  onChange={(e) => {
                    const cat = e.target.value as 'cleanroom' | 'industrial' | 'infrastructure' | 'healthcare';
                    const labelMap: Record<string, string> = {
                      cleanroom: 'Phòng sạch & Công nghệ cao',
                      industrial: 'Nhà máy công nghiệp',
                      infrastructure: 'Hạ tầng kỹ thuật',
                      healthcare: 'Y tế & Bệnh viện',
                    };
                    setEditingProject({
                      ...editingProject,
                      category: cat,
                      categoryLabel: labelMap[cat] || 'Công trình tiêu biểu',
                    });
                  }}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                >
                  <option value="cleanroom">Phòng sạch &amp; Công nghệ cao</option>
                  <option value="industrial">Nhà máy công nghiệp</option>
                  <option value="infrastructure">Hạ tầng kỹ thuật</option>
                  <option value="healthcare">Y tế &amp; Bệnh viện</option>
                </select>
              </div>

              {/* MÔ TẢ TỔNG QUAN */}
              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Mô tả tóm tắt dự án
                </label>
                <textarea
                  rows={3}
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none resize-none focus:border-[#0040A0]"
                />
              </div>

              {/* PHẠM VI CƠ ĐIỆN (MEP SCOPE) */}
              <div className="p-4 rounded-[2px] bg-slate-950 border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 uppercase font-bold text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-3.5 bg-[#00C5FF] rounded-[1px]" />
                    <span>Phạm vi cơ điện (MEP Scope)</span>
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Mỗi dòng một hạng mục cơ điện
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={Array.isArray(editingProject.mepScope) ? editingProject.mepScope.join('\n') : (editingProject.mepScope || '')}
                  onChange={(e) => setEditingProject({
                    ...editingProject,
                    mepScope: e.target.value.split('\n').filter((s) => s.trim().length > 0)
                  })}
                  placeholder={`Phòng sạch Bán dẫn Class 1000\nChiller làm lạnh chính xác ±0.5°C\nĐiện động lực & Hệ thống lưu điện UPS\nHệ thống cấp khí siêu sạch CDA\nPCCC chuyên dụng & Cảnh báo sớm VESDA`}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none resize-none font-sans text-xs focus:border-[#0040A0]"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(editingProject.mepScope || []).map((scope, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded-[1px] bg-slate-800 border border-slate-700 text-[10px] text-slate-300 flex items-center gap-1"
                    >
                      <span>{scope}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* ĐIỂM NỔI BẬT VỀ KỸ THUẬT & CÔNG NGHỆ THI CÔNG */}
              <div className="p-4 rounded-[2px] bg-slate-950 border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 uppercase font-bold text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-3.5 bg-[#ED1C24] rounded-[1px]" />
                    <span>Điểm Nổi Bật Về Kỹ Thuật &amp; Công Nghệ Thi Công</span>
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Mỗi dòng một gạch đầu dòng (Icon tích xanh)
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={Array.isArray(editingProject.technicalHighlights) ? editingProject.technicalHighlights.join('\n') : (editingProject.technicalHighlights || '')}
                  onChange={(e) => setEditingProject({
                    ...editingProject,
                    technicalHighlights: e.target.value.split('\n').filter((s) => s.trim().length > 0)
                  })}
                  placeholder={`Thi công hệ thống cấp khí siêu tinh khiết CDA và đường ống vi sinh inox 316L\nHệ thống điều hòa chính xác kiểm soát nhiệt ẩm độ dung sai ±0.5°C\nHệ thống điện dự phòng độc lập UPS và máy phát điện liên tục không gián đoạn\nỨng dụng 100% mô hình BIM Revit MEP Level of Development (LOD) 400`}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none resize-none font-sans text-xs focus:border-[#0040A0]"
                />
              </div>

              {/* THÁCH THỨC & GIẢI PHÁP KỸ THUẬT */}
              <div className="p-4 rounded-[2px] bg-slate-950 border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 uppercase font-bold text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-3.5 bg-amber-400 rounded-[1px]" />
                    <span>Thách Thức &amp; Giải Pháp Kỹ Thuật (Xử lý thực tế tại công trường)</span>
                  </label>
                </div>
                <textarea
                  rows={3}
                  value={editingProject.challengesAndSolutions || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, challengesAndSolutions: e.target.value })}
                  placeholder="Mô tả các thách thức địa hình, độ rung chấn hoặc tiến độ tại công trường và giải pháp kỹ thuật vượt trội do Shicons E&C áp dụng..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-[2px] outline-none resize-none font-sans text-xs focus:border-[#0040A0]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-[2px] bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold uppercase"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="btn-shicons px-6 py-2 bg-[#0040A0] hover:bg-[#004DA0] text-white font-bold uppercase shadow-md"
                >
                  Lưu Dự Án
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: SỬA & UPLOAD ẢNH BÀI VIẾT TIN TỨC (NEWS) */}
      {/* ========================================================================= */}
      {editingNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-[2px] shadow-2xl p-6 relative my-8 text-xs max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingNews(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white uppercase font-heading mb-4">
              {news.some((n) => n.id === editingNews.id) ? 'Chỉnh Sửa Bài Viết' : 'Viết Bài Mới'}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (news.some((n) => n.id === editingNews.id)) {
                  updateNews(editingNews);
                  showToast('Đã cập nhật bài viết thành công!');
                } else {
                  addNews(editingNews);
                  showToast('Đã thêm bài viết mới thành công!');
                }
                setEditingNews(null);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Tiêu đề bài viết *
                </label>
                <input
                  type="text"
                  required
                  value={editingNews.title}
                  onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Chuyên mục
                  </label>
                  <input
                    type="text"
                    value={editingNews.categoryLabel}
                    onChange={(e) => setEditingNews({ ...editingNews, categoryLabel: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Tác giả / Nguồn
                  </label>
                  <input
                    type="text"
                    value={editingNews.author}
                    onChange={(e) => setEditingNews({ ...editingNews, author: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none"
                  />
                </div>
              </div>

              {/* Upload ảnh bài viết */}
              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Ảnh đại diện bài viết
                </label>
                <div className="flex gap-4 items-center">
                  <div className="w-24 h-16 rounded-[2px] overflow-hidden bg-slate-950 border border-slate-700 flex-shrink-0">
                    <img
                      src={editingNews.imageUrl}
                      alt="News Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={editingNews.imageUrl}
                      onChange={(e) => setEditingNews({ ...editingNews, imageUrl: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none text-xs"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        ref={newsFileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (url) => setEditingNews({ ...editingNews, imageUrl: url }))}
                      />
                      <button
                        type="button"
                        onClick={() => newsFileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-[2px] bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Tải ảnh từ máy tính</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Tóm tắt bài viết (Excerpt)
                </label>
                <textarea
                  rows={2}
                  value={editingNews.excerpt}
                  onChange={(e) => setEditingNews({ ...editingNews, excerpt: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Nội dung chi tiết
                </label>
                <textarea
                  rows={5}
                  value={editingNews.content}
                  onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingNews(null)}
                  className="px-4 py-2 rounded-[2px] bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold uppercase"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="btn-shicons px-6 py-2 bg-[#0040A0] hover:bg-[#004DA0] text-white font-bold uppercase shadow-md"
                >
                  Lưu Bài Viết
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: SỬA VỊ TRÍ TUYỂN DỤNG (CAREERS) */}
      {/* ========================================================================= */}
      {editingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-[2px] shadow-2xl p-6 relative my-8 text-xs max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingJob(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white uppercase font-heading mb-4">
              {jobs.some((j) => j.id === editingJob.id) ? 'Chỉnh Sửa Tin Tuyển Dụng' : 'Đăng Tin Tuyển Dụng Mới'}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (jobs.some((j) => j.id === editingJob.id)) {
                  updateJob(editingJob);
                  showToast('Đã cập nhật tin tuyển dụng!');
                } else {
                  addJob(editingJob);
                  showToast('Đã thêm tin tuyển dụng mới!');
                }
                setEditingJob(null);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Vị trí tuyển dụng *
                </label>
                <input
                  type="text"
                  required
                  value={editingJob.title}
                  onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Phòng ban
                  </label>
                  <input
                    type="text"
                    value={editingJob.department}
                    onChange={(e) => setEditingJob({ ...editingJob, department: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Mức lương
                  </label>
                  <input
                    type="text"
                    value={editingJob.salary}
                    onChange={(e) => setEditingJob({ ...editingJob, salary: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Nơi làm việc
                  </label>
                  <input
                    type="text"
                    value={editingJob.location}
                    onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Kinh nghiệm yêu cầu
                  </label>
                  <input
                    type="text"
                    value={editingJob.experience}
                    onChange={(e) => setEditingJob({ ...editingJob, experience: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">
                    Hạn nộp hồ sơ
                  </label>
                  <input
                    type="text"
                    value={editingJob.deadline}
                    onChange={(e) => setEditingJob({ ...editingJob, deadline: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Trạng thái
                </label>
                <select
                  value={editingJob.status}
                  onChange={(e) => setEditingJob({ ...editingJob, status: e.target.value as 'active' | 'closed' })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none"
                >
                  <option value="active">Đang mở tuyển (Hiển thị Landing Page)</option>
                  <option value="closed">Đã đóng tuyển (Không tính hiển thị)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Mô tả công việc &amp; quyền lợi (mỗi dòng một ý)
                </label>
                <textarea
                  rows={4}
                  value={Array.isArray(editingJob.description) ? editingJob.description.join('\n') : (editingJob.description || '')}
                  onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value.split('\n').filter(Boolean) })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingJob(null)}
                  className="px-4 py-2 rounded-[2px] bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold uppercase"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="btn-shicons px-6 py-2 bg-[#0040A0] hover:bg-[#004DA0] text-white font-bold uppercase shadow-md"
                >
                  Lưu Tin Tuyển Dụng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 6: THÊM & SỬA ĐỐI TÁC THIẾT BỊ (PARTNERS) */}
      {/* ========================================================================= */}
      {editingPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-[2px] shadow-2xl p-6 relative my-8 text-xs">
            <button
              onClick={() => setEditingPartner(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white uppercase font-heading mb-4">
              {partners.some((p) => p.id === editingPartner.id) ? 'Chỉnh Sửa Đối Tác' : 'Thêm Đối Tác Mới'}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (partners.some((p) => p.id === editingPartner.id)) {
                  updatePartner(editingPartner);
                  showToast('Đã cập nhật đối tác thành công!');
                } else {
                  addPartner(editingPartner);
                  showToast('Đã thêm đối tác mới thành công!');
                }
                setEditingPartner(null);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Tên Đối Tác / Thương Hiệu *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: DAIKIN, SIEMENS, SCHNEIDER..."
                  value={editingPartner.name}
                  onChange={(e) => setEditingPartner({ ...editingPartner, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Giải Pháp / Ngành Thiết Bị (Tag) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: HVAC Chiller, Tự động hóa BMS, Tủ điện trung thế..."
                  value={editingPartner.tag}
                  onChange={(e) => setEditingPartner({ ...editingPartner, tag: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                />
              </div>

              {/* Upload logo đối tác */}
              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Hình ảnh Logo đối tác
                </label>
                <div className="flex gap-4 items-center">
                  <div className="w-24 h-16 rounded-[2px] overflow-hidden bg-white/5 border border-slate-700 flex-shrink-0 flex items-center justify-center p-2">
                    <img
                      src={editingPartner.logo}
                      alt="Logo Preview"
                      className="max-h-full max-w-full object-contain filter invert opacity-90"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={editingPartner.logo}
                      onChange={(e) => setEditingPartner({ ...editingPartner, logo: e.target.value })}
                      placeholder="Dán URL ảnh hoặc tải ảnh lên bên dưới"
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none text-xs"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        ref={partnerFileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (url) => setEditingPartner({ ...editingPartner, logo: url }))}
                      />
                      <button
                        type="button"
                        onClick={() => partnerFileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-[2px] bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Tải logo từ máy</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingPartner(null)}
                  className="px-4 py-2 rounded-[2px] bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold uppercase"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="btn-shicons px-6 py-2 bg-[#0040A0] hover:bg-[#004DA0] text-white font-bold uppercase shadow-md"
                >
                  Lưu Đối Tác
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 7: THÊM & SỬA DÂY CHUYỀN SẢN XUẤT (PRODUCTION LINE) */}
      {/* ========================================================================= */}
      {editingProductionLine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-[2px] shadow-2xl p-6 relative my-8 text-xs max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingProductionLine(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white uppercase font-heading mb-4 flex items-center gap-2">
              <Factory className="w-5 h-5 text-[#00C5FF]" />
              <span>
                {editingProductionLine.index >= 0 ? 'Chỉnh Sửa Dây Chuyền Sản Xuất' : 'Thêm Dây Chuyền Sản Xuất Mới'}
              </span>
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editingProductionLine.index >= 0) {
                  updateProductionLine(editingProductionLine.line);
                  showToast('Đã cập nhật dây chuyền sản xuất thành công!');
                } else {
                  addProductionLine(editingProductionLine.line);
                  showToast('Đã thêm dây chuyền sản xuất mới thành công!');
                }
                setEditingProductionLine(null);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Tên dây chuyền gia công / sản xuất *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Dây chuyền sản xuất ống gió tự động Auto-Line V"
                  value={editingProductionLine.line.title}
                  onChange={(e) => setEditingProductionLine({
                    ...editingProductionLine,
                    line: { ...editingProductionLine.line, title: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Thẻ phân loại công nghệ (Tag) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: CÔNG NGHỆ TỰ ĐỘNG HÓA CNC"
                  value={editingProductionLine.line.tag}
                  onChange={(e) => setEditingProductionLine({
                    ...editingProductionLine,
                    line: { ...editingProductionLine.line, tag: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none focus:border-[#0040A0]"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Mô tả năng lực &amp; quy trình *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Mô tả các tính năng, độ chính xác và tốc độ gia công..."
                  value={editingProductionLine.line.desc}
                  onChange={(e) => setEditingProductionLine({
                    ...editingProductionLine,
                    line: { ...editingProductionLine.line, desc: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none resize-none focus:border-[#0040A0]"
                />
              </div>

              {/* Hình ảnh dây chuyền */}
              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Hình ảnh dây chuyền máy móc
                </label>
                <div className="flex gap-4 items-center">
                  <div className="w-24 h-16 rounded-[2px] overflow-hidden bg-slate-950 border border-slate-700 flex-shrink-0">
                    <img
                      src={editingProductionLine.line.image}
                      alt="Line Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={editingProductionLine.line.image}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditingProductionLine({
                          ...editingProductionLine,
                          line: { ...editingProductionLine.line, image: convertToDirectDriveImageUrl(val) }
                        });
                      }}
                      placeholder="Dán URL ảnh hoặc link Google Drive..."
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none text-xs"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        ref={mfgLineRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (url) => setEditingProductionLine({
                          ...editingProductionLine,
                          line: { ...editingProductionLine.line, image: url }
                        }))}
                      />
                      <button
                        type="button"
                        onClick={() => mfgLineRef.current?.click()}
                        className="px-3 py-1.5 rounded-[2px] bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Tải ảnh từ máy</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thông số kỹ thuật (Specs) */}
              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">
                  Thông số kỹ thuật nổi bật (mỗi dòng 1 thông số)
                </label>
                <textarea
                  rows={4}
                  placeholder="Ví dụ:&#10;Độ dày tole: 0.58mm - 1.2mm&#10;Tốc độ gia công: 18m/phút&#10;Tiêu chuẩn: SMACNA / DW144"
                  value={editingProductionLine.line.specs.join('\n')}
                  onChange={(e) => setEditingProductionLine({
                    ...editingProductionLine,
                    line: {
                      ...editingProductionLine.line,
                      specs: e.target.value.split('\n').filter(Boolean)
                    }
                  })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-[2px] outline-none resize-none font-mono text-[11px] focus:border-[#0040A0]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingProductionLine(null)}
                  className="px-4 py-2 rounded-[2px] bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold uppercase"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="btn-shicons px-6 py-2 bg-[#0040A0] hover:bg-[#004DA0] text-white font-bold uppercase shadow-md"
                >
                  Lưu Dây Chuyền
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
