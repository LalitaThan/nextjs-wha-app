import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period") || "30d";

  try {
    const now = new Date();
    let startDate = new Date();

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

    const result = Array.from(revenueMap.entries()).map(([date, data]) => ({
      date,
      ...data,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("[ADMIN_REVENUE_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
