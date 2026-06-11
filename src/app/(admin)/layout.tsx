import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import { cn } from "@/lib/utils";
import "../globals.css";

const promptFont = Prompt({
  weight: ["400", "500", "700"],
  subsets: ["thai"],
  display: "swap",
});

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
    <html lang="th" className={cn(promptFont.className, "font-sans")}>
      <body className="min-h-screen bg-muted/30">{children}</body>
    </html>
  );
}
