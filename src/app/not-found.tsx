import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="vi">
      <body className="min-h-screen flex items-center justify-center bg-slate-100 p-6 font-sans">
        <div className="max-w-md w-full bg-white p-8 rounded-[2px] shadow text-center space-y-4">
          <div className="text-5xl font-black text-[#0040A0]">404</div>
          <h1 className="text-xl font-bold text-slate-900">Không tìm thấy trang</h1>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 bg-[#0040A0] text-white text-xs font-bold uppercase tracking-wider rounded-[2px]"
          >
            Về trang chủ
          </Link>
        </div>
      </body>
    </html>
  );
}
