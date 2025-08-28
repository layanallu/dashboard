import "./globals.css"; // ضروري
export const metadata = { title: "بوصلة الممكنات" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="min-h-dvh bg-darkBg text-textMain antialiased" suppressHydrationWarning>
        <main className="container-page">
          {/* Cover */}
          
          
          {children}
        </main>
      </body>
    </html>
  );
}
