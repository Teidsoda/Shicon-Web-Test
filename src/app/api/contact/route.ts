import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

type FormType = 'popup' | 'lien-he' | 'ung-tuyen';

interface AttachmentPayload {
  filename: string;
  contentBase64: string;
  size?: number;
}

interface ContactRequestBody {
  formType?: FormType;
  name?: string;
  contact?: string;
  phone?: string;
  email?: string;
  company?: string;
  service?: string;
  projectScale?: string;
  message?: string;
  jobTitle?: string;
  jobDepartment?: string;
  pageUrl?: string;
  locale?: string;
  company_website?: string; // Honeypot
  attachment?: AttachmentPayload | null;
}

const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 5;

const ipSubmissions = new Map<string, number[]>();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-().\s]{8,20}$/;

function isValidEmail(val: string): boolean {
  return EMAIL_REGEX.test(val.trim());
}

function isValidPhone(val: string): boolean {
  const trimmed = val.trim();
  if (!PHONE_REGEX.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15;
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers.get('x-real-ip') || 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const existing = ipSubmissions.get(ip) || [];
  const recent = existing.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    ipSubmissions.set(ip, recent);
    return false;
  }
  recent.push(now);
  ipSubmissions.set(ip, recent);
  return true;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatVietnamTime(date: Date): string {
  return new Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);
}

export async function POST(req: NextRequest) {
  let body: ContactRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'INVALID_JSON', code: 'INVALID_JSON' },
      { status: 400 }
    );
  }

  // 1. Honeypot check: silent success for bots without sending mail
  if (body.company_website && String(body.company_website).trim().length > 0) {
    return NextResponse.json({ success: true });
  }

  // 2. Rate limiting (max 5 submissions / hour / IP)
  const clientIp = getClientIp(req);
  if (!checkRateLimit(clientIp)) {
    return NextResponse.json(
      { error: 'RATE_LIMITED', code: 'RATE_LIMITED' },
      { status: 429 }
    );
  }

  const formType: FormType =
    body.formType === 'lien-he' || body.formType === 'ung-tuyen' ? body.formType : 'popup';
  const locale = body.locale === 'en' ? 'en' : 'vi';
  const name = String(body.name || '').trim();
  const contact = String(body.contact || '').trim();
  const phone = String(body.phone || '').trim();
  const email = String(body.email || '').trim();
  const company = String(body.company || '').trim();
  const service = String(body.service || '').trim();
  const projectScale = String(body.projectScale || '').trim();
  const message = String(body.message || '').trim();
  const jobTitle = String(body.jobTitle || '').trim();
  const jobDepartment = String(body.jobDepartment || '').trim();
  const pageUrl = String(body.pageUrl || '').trim();

  // 3. Server-side validation
  if (!name) {
    return NextResponse.json(
      { error: 'VALIDATION_ERROR', code: 'MISSING_REQUIRED' },
      { status: 400 }
    );
  }

  if (formType === 'popup') {
    if (!contact) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', code: 'MISSING_REQUIRED' },
        { status: 400 }
      );
    }
    if (!isValidEmail(contact) && !isValidPhone(contact)) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', code: 'INVALID_CONTACT' },
        { status: 400 }
      );
    }
  } else if (formType === 'lien-he') {
    if (!phone || !email || !service) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', code: 'MISSING_REQUIRED' },
        { status: 400 }
      );
    }
    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', code: 'INVALID_PHONE' },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', code: 'INVALID_EMAIL' },
        { status: 400 }
      );
    }
  } else if (formType === 'ung-tuyen') {
    if (!phone || !email || !jobTitle) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', code: 'MISSING_REQUIRED' },
        { status: 400 }
      );
    }
    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', code: 'INVALID_PHONE' },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', code: 'INVALID_EMAIL' },
        { status: 400 }
      );
    }
  }

  // 4. Validate optional attachment (PDF/DOC/DOCX, <= 10MB)
  let resendAttachments: { filename: string; content: Buffer }[] | undefined;
  if (body.attachment && body.attachment.contentBase64) {
    const filename = String(body.attachment.filename || 'attachment.pdf').trim();
    const lowerName = filename.toLowerCase();
    const hasAllowedExt = ALLOWED_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
    if (!hasAllowedExt) {
      return NextResponse.json(
        { error: 'INVALID_ATTACHMENT', code: 'INVALID_FILE_TYPE' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(body.attachment.contentBase64, 'base64');
    if (buffer.byteLength > MAX_ATTACHMENT_BYTES || (body.attachment.size && body.attachment.size > MAX_ATTACHMENT_BYTES)) {
      return NextResponse.json(
        { error: 'INVALID_ATTACHMENT', code: 'FILE_TOO_LARGE' },
        { status: 400 }
      );
    }

    resendAttachments = [{ filename, content: buffer }];
  }

  // 5. Check Resend configuration
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'SERVER_NOT_CONFIGURED', code: 'MISSING_API_KEY' },
      { status: 500 }
    );
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || 'shicons.vn@gmail.com';
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Shicons E&C <onboarding@resend.dev>';
  const resend = new Resend(apiKey);

  // Determine customer email for Reply-To and confirmation mail
  const customerEmail = isValidEmail(email)
    ? email
    : isValidEmail(contact)
    ? contact
    : undefined;

  const submittedAtVN = formatVietnamTime(new Date());

  const subject =
    formType === 'ung-tuyen'
      ? `[Website Shicons] Hồ sơ ứng tuyển ${jobTitle} — ${name}`
      : `[Website Shicons] Yêu cầu mới từ ${name} — ${service || 'Tư vấn chung'}`;

  const formTypeLabel =
    formType === 'popup'
      ? 'Popup Tư vấn nhanh'
      : formType === 'lien-he'
      ? 'Trang Liên hệ & Báo giá'
      : 'Hồ sơ Ứng tuyển';

  const rows: [string, string][] = [
    ['Loại biểu mẫu', formTypeLabel],
    ['Họ và tên', name],
    ['Điện thoại / Liên hệ', phone || contact || '—'],
    ['Email', email || (isValidEmail(contact) ? contact : '—')],
    ['Công ty / Chủ đầu tư', company || '—'],
    ['Hạng mục / Vị trí', formType === 'ung-tuyen' ? `${jobTitle}${jobDepartment ? ` (${jobDepartment})` : ''}` : service || 'Tư vấn chung'],
    ['Quy mô dự án', projectScale || '—'],
    ['Nội dung yêu cầu', message || '—'],
    ['Tệp đính kèm', resendAttachments ? resendAttachments[0].filename : 'Không có'],
    ['Trang gửi', pageUrl || '—'],
    ['Ngôn ngữ hiển thị', locale.toUpperCase()],
    ['Thời gian gửi (VN)', submittedAtVN],
  ];

  const tableRowsHtml = rows
    .map(
      ([label, val]) => `
      <tr>
        <td style="padding:10px 14px;border:1px solid #e2e8f0;background:#f8fafc;font-weight:700;color:#00306E;width:210px;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:10px 14px;border:1px solid #e2e8f0;color:#1e293b;white-space:pre-wrap;">${escapeHtml(val)}</td>
      </tr>`
    )
    .join('');

  const companyHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:680px;margin:0 auto;color:#1e293b;">
      <div style="background:#0040A0;color:#ffffff;padding:20px 24px;border-bottom:4px solid #ED1C24;">
        <h2 style="margin:0;font-size:18px;letter-spacing:0.5px;">SHICONS E&amp;C — THÔNG BÁO YÊU CẦU MỚI TỪ WEBSITE</h2>
      </div>
      <div style="padding:20px 0;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.5;">
          ${tableRowsHtml}
        </table>
      </div>
      <p style="font-size:12px;color:#64748b;margin-top:16px;">Email được gửi tự động từ hệ thống website Shicons E&amp;C.</p>
    </div>
  `;

  try {
    const { error: sendError } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: customerEmail,
      subject,
      html: companyHtml,
      attachments: resendAttachments,
    });

    if (sendError) {
      console.error('[Contact API] Failed to send company email:', sendError);
      return NextResponse.json(
        { error: 'SEND_FAILED', code: 'SEND_FAILED' },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error('[Contact API] Resend exception:', err);
    return NextResponse.json(
      { error: 'SEND_FAILED', code: 'SEND_FAILED' },
      { status: 502 }
    );
  }

  // 6. Send confirmation email to customer (best effort; failure only logged)
  if (customerEmail) {
    const confirmSubject =
      locale === 'en'
        ? '[Shicons E&C] We have received your inquiry'
        : '[Shicons E&C] Đã tiếp nhận thông tin yêu cầu của Quý khách';

    const confirmHtml =
      locale === 'en'
        ? `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#1e293b;line-height:1.6;">
          <div style="background:#0040A0;color:#ffffff;padding:18px 24px;border-bottom:4px solid #ED1C24;">
            <h2 style="margin:0;font-size:17px;">SHICONS E&amp;C</h2>
          </div>
          <div style="padding:24px;border:1px solid #e2e8f0;border-top:none;">
            <p>Dear <strong>${escapeHtml(name)}</strong>,</p>
            <p>Thank you for contacting <strong>Shicons E&amp;C</strong>. We have received your request and our engineering team will get back to you within <strong>24 business hours</strong>.</p>
            <p>For urgent assistance, please call our 24/7 hotline: <strong style="color:#ED1C24;">0919 69 29 79</strong>.</p>
            <p style="margin-top:20px;font-size:13px;color:#64748b;">Best regards,<br/>Shicons E&amp;C Joint Stock Company</p>
          </div>
        </div>`
        : `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#1e293b;line-height:1.6;">
          <div style="background:#0040A0;color:#ffffff;padding:18px 24px;border-bottom:4px solid #ED1C24;">
            <h2 style="margin:0;font-size:17px;">CÔNG TY CỔ PHẦN SHICONS E&amp;C</h2>
          </div>
          <div style="padding:24px;border:1px solid #e2e8f0;border-top:none;">
            <p>Kính chào Quý khách <strong>${escapeHtml(name)}</strong>,</p>
            <p>Cảm ơn Quý khách đã liên hệ với <strong>Shicons E&amp;C</strong>. Chúng tôi đã tiếp nhận thông tin và đội ngũ kỹ sư phụ trách sẽ liên hệ lại trong vòng <strong>24 giờ làm việc</strong>.</p>
            <p>Trường hợp cần hỗ trợ gấp, vui lòng gọi hotline: <strong style="color:#ED1C24;">0919 69 29 79</strong>.</p>
            <p style="margin-top:20px;font-size:13px;color:#64748b;">Trân trọng,<br/>Công ty Cổ phần Shicons E&amp;C</p>
          </div>
        </div>`;

    try {
      await resend.emails.send({
        from: fromEmail,
        to: [customerEmail],
        subject: confirmSubject,
        html: confirmHtml,
      });
    } catch (confirmErr) {
      console.error('[Contact API] Customer confirmation email failed:', confirmErr);
    }
  }

  return NextResponse.json({ success: true });
}
