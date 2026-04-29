import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Product Records | PM Portfolio",
  description: "A minimalist product manager portfolio built as a record selection interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
