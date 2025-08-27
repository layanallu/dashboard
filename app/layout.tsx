import "./globals.css"; // ضروري
export const metadata = { title: "بوصلة الممكنات" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="min-h-dvh bg-darkBg text-textMain antialiased" suppressHydrationWarning>
        <main className="container-page">
          {/* Cover */}
          <div className="header-cover mb-4">
            <div className="header-inner">
              <div>
                <div className="header-title">بوصلة الممكنات</div>
                <div className="header-sub">لوحة نظيفة تعرض مؤشراتك ورؤى السوق</div>
              </div>
              <div className="badge">نسخة تجريبية</div>
            </div>
          </div>

          {children}
        </main>
      </body>
    </html>
  );
}
