import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function POST(request: Request) {
  try {
    const secret = process.env.ADMIN_SECRET;
    if (!secret) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: "ไม่ได้กำหนด ADMIN_SECRET ใน .env" },
        { status: 500 }
      );
    }

    const authHeader = request.headers.get("Authorization");
    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    const { email } = await request.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: "กรุณาระบุอีเมล" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: "ไม่พบผู้ใช้นี้" },
        { status: 404 }
      );
    }

    const updated = await prisma.user.update({
      where: { email },
      data: { role: "admin" },
    });

    return NextResponse.json<ApiResponse<{ id: string; email: string; name: string; role: string }>>(
      { success: true, data: { id: updated.id, email: updated.email, name: updated.name, role: updated.role } },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "เกิดข้อผิดพลาด กรุณาลองใหม่" },
      { status: 500 }
    );
  }
}
