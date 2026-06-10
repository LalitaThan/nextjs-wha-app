import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
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

    return NextResponse.json({
      totalUsers,
      totalProducts,
      pendingOrders,
      todayOrders: todayOrdersStats._count.id || 0,
      todaySales: Number(todayOrdersStats._sum.total_amount || 0),
    });
  } catch (error) {
    console.error("[ADMIN_STATS_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
