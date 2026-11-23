import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://orz.autos"),
  title: "颖的手记 — 个人档案与博客",
  description: "颖的个人站点：嵌入式、前端与服务器运维的学习记录，项目展示与可筛选的手记文章。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
