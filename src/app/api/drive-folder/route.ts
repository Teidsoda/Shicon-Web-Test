import { NextRequest, NextResponse } from 'next/server';
import { extractDriveFolderId } from '@/lib/driveUtils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { folderUrl } = body;

    if (!folderUrl) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng cung cấp đường dẫn Google Drive Folder.' },
        { status: 400 }
      );
    }

    const folderId = extractDriveFolderId(folderUrl);
    if (!folderId) {
      return NextResponse.json(
        { success: false, message: 'Đường dẫn không hợp lệ. Vui lòng cung cấp link dạng: https://drive.google.com/drive/folders/...' },
        { status: 400 }
      );
    }

    // Attempt to fetch public Google Drive folder page
    const driveUrl = `https://drive.google.com/drive/folders/${folderId}`;
    const response = await fetch(driveUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'vi,en;q=0.9',
      },
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        message: `Không thể kết nối đến Google Drive (HTTP ${response.status}). Hãy đảm bảo folder đã được bật quyền "Bất kỳ ai có đường liên kết đều có thể xem".`,
        folderId
      });
    }

    const html = await response.text();

    // In Google Drive folder HTML, items are serialized into JSON or array structures
    // Pattern 1: Look for file IDs in serialized items: ["FILE_ID",...
    const fileIdSet = new Set<string>();

    // Search for Drive file IDs (typically 28 to 44 characters, base64url characters)
    const regex = /["']([a-zA-Z0-9_-]{28,45})["']/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      const id = match[1];
      // Exclude folderId itself and common google tracking/asset IDs
      if (id !== folderId && !id.startsWith('drive_') && !id.startsWith('https')) {
        fileIdSet.add(id);
      }
    }

    const extractedIds = Array.from(fileIdSet);

    // Convert found IDs to direct image links
    const images = extractedIds.map((id) => `https://lh3.googleusercontent.com/d/${id}`);

    if (images.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Không tìm thấy hình ảnh nào trong folder, hoặc folder yêu cầu đăng nhập. Bạn có thể dán trực tiếp danh sách link ảnh từ Drive.',
        folderId,
        images: []
      });
    }

    return NextResponse.json({
      success: true,
      folderId,
      total: images.length,
      images,
      message: `Đã tìm thấy ${images.length} tệp từ Google Drive Folder.`
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: `Lỗi khi xử lý link Drive: ${error.message}` },
      { status: 500 }
    );
  }
}
