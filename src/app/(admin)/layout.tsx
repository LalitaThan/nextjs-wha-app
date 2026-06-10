import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "ระบบจัดการหลังบ้าน",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="font-sans">
      <body className="min-h-screen bg-muted/30">{children}</body>
    </html>
  );
}
