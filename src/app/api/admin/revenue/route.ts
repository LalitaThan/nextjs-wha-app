import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";
import type { ApiResponse } from "@/types/api";
import type { RevenuePoint } from "@/types/admin";

export async function GET(request: Request) {
  const admin = await requireAdmin();

  if (!admin) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Unauthorized" },
      { status: 403 }
    );
  }

  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period") || "30d";

  try {
    const now = new Date();
    const startDate = new Date();

    if (period === "7d") {
      startDate.setDate(now.getDate() - 7);
    } else if (period === "90d") {
      startDate.setDate(now.getDate() - 90);
    } else {
      startDate.setDate(now.getDate() - 30);
    }

    const orders = await prisma.orders.findMany({
      where: {
        date: {
          gte: startDate,
        },
      },
      select: {
        date: true,
        total_amount: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    const revenueMap = new Map<string, { revenue: number; orders: number }>();

    orders.forEach((order) => {
      if (!order.date) return;
      const dateStr = order.date.toISOString().split("T")[0];
      const current = revenueMap.get(dateStr) || { revenue: 0, orders: 0 };
      revenueMap.set(dateStr, {
        revenue: current.revenue + Number(order.total_amount || 0),
        orders: current.orders + 1,
      });
    });

    const result: RevenuePoint[] = Array.from(revenueMap.entries()).map(([date, data]) => ({
      date,
      ...data,
    }));

    return NextResponse.json<ApiResponse<RevenuePoint[]>>(
      { success: true, data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ADMIN_REVENUE_ERROR]", error);
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "เกิดข้อผิดพลาด กรุณาลองใหม่" },
      { status: 500 }
    );
  }
}
