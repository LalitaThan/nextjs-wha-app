import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";
import type { ApiResponse } from "@/types/api";

type StatsData = {
  totalUsers: number;
  totalProducts: number;
  pendingOrders: number;
  todayOrders: number;
  todaySales: number;
};

export async function GET() {
  const admin = await requireAdmin();

  if (!admin) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Unauthorized" },
      { status: 403 }
    );
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const [totalUsers, totalProducts, pendingOrders] = await Promise.all([
      prisma.user.count(),
      prisma.products.count(),
      prisma.orders.count({
        where: {
          status: "processing",
        },
      }),
    ]);

    const todayOrdersStats = await prisma.orders.aggregate({
      where: {
        date: {
          gte: today,
          lt: tomorrow,
        },
      },
      _count: {
        id: true,
      },
      _sum: {
        total_amount: true,
      },
    });

    const data: StatsData = {
      totalUsers,
      totalProducts,
      pendingOrders,
      todayOrders: todayOrdersStats._count.id || 0,
      todaySales: Number(todayOrdersStats._sum.total_amount || 0),
    };

    return NextResponse.json<ApiResponse<StatsData>>(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ADMIN_STATS_ERROR]", error);
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "เกิดข้อผิดพลาด กรุณาลองใหม่" },
      { status: 500 }
    );
  }
}
