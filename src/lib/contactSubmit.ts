export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_EXTENSIONS = ['.pdf', '.doc', '.docx'];

export interface EncodedAttachment {
  filename: string;
  contentBase64: string;
  size: number;
}

export function validateAttachmentFile(file: File): 'INVALID_FILE_TYPE' | 'FILE_TOO_LARGE' | null {
  const lowerName = file.name.toLowerCase();
  const hasAllowedExt = ALLOWED_FILE_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
  if (!hasAllowedExt) {
    return 'INVALID_FILE_TYPE';
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return 'FILE_TOO_LARGE';
  }
  return null;
}

export function encodeFileToBase64(file: File): Promise<EncodedAttachment> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      const base64 = result.includes(',') ? result.split(',')[1] : result;
      resolve({
        filename: file.name,
        contentBase64: base64,
        size: file.size,
      });
    };
    reader.onerror = () => reject(new Error('FILE_READ_ERROR'));
    reader.readAsDataURL(file);
  });
}

export function mapApiErrorCodeToStatusKey(code?: string): string {
  switch (code) {
    case 'INVALID_CONTACT':
      return 'invalidContact';
    case 'INVALID_PHONE':
      return 'invalidPhone';
    case 'INVALID_EMAIL':
      return 'invalidEmail';
    case 'MISSING_REQUIRED':
      return 'missingRequired';
    case 'INVALID_FILE_TYPE':
      return 'invalidFileType';
    case 'FILE_TOO_LARGE':
      return 'fileTooLarge';
    case 'RATE_LIMITED':
      return 'rateLimited';
    default:
      return 'serverError';
  }
}
