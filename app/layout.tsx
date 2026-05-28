import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "靈魂百味：深夜食堂的最後一晚",
  description: "一場發生在深夜食堂最後一晚的心理測驗",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" className="min-h-full bg-[#12161A]">
      <body className="min-h-screen bg-[#12161A] text-[#EAECEF] antialiased">
        {children}
      </body>
    </html>
  );
}
