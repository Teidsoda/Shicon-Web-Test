/**
 * Utility functions for Google Drive link handling and transformation
 */

/**
 * Extracts a Google Drive file ID from various URL formats
 */
export function extractDriveFileId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  // Pattern: https://drive.google.com/file/d/FILE_ID/...
  const fileDMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]{25,})/);
  if (fileDMatch) return fileDMatch[1];

  // Pattern: id=FILE_ID
  const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]{25,})/);
  if (idParamMatch) return idParamMatch[1];

  // Pattern: https://lh3.googleusercontent.com/d/FILE_ID
  const lh3Match = trimmed.match(/googleusercontent\.com\/d\/([a-zA-Z0-9_-]{25,})/);
  if (lh3Match) return lh3Match[1];

  // Pattern: direct ID (28-45 characters alphanumeric)
  if (/^[a-zA-Z0-9_-]{25,45}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

/**
 * Extracts a Google Drive folder ID from folder URL
 */
export function extractDriveFolderId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  const folderMatch = trimmed.match(/\/folders\/([a-zA-Z0-9_-]{25,})/);
  if (folderMatch) return folderMatch[1];

  return null;
}

/**
 * Converts any Google Drive link to a direct embeddable high-resolution image URL
 */
export function convertToDirectDriveImageUrl(url: string): string {
  const fileId = extractDriveFileId(url);
  if (fileId) {
    // lh3.googleusercontent.com is Google's fast, high-res CDN for Drive files
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  return url;
}

/**
 * Parses multiple Google Drive URLs or a mix of text/links into an array of direct image URLs
 */
export function parseDriveLinks(text: string): string[] {
  if (!text) return [];

  // Match URLs in text
  const urlRegex = /https?:\/\/[^\s"',;]+/g;
  const urls = text.match(urlRegex) || [];
  const results: string[] = [];
  const seenIds = new Set<string>();

  for (const rawUrl of urls) {
    const fileId = extractDriveFileId(rawUrl);
    if (fileId && !seenIds.has(fileId)) {
      seenIds.add(fileId);
      results.push(`https://lh3.googleusercontent.com/d/${fileId}`);
    } else if (!rawUrl.includes('drive.google.com/drive/folders')) {
      // Check if it's already an image URL or direct link
      if (!results.includes(rawUrl)) {
        results.push(rawUrl);
      }
    }
  }

  return results;
}
