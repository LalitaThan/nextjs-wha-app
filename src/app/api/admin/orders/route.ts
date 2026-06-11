import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";
import type { ApiResponse } from "@/types/api";
import type { AdminOrderItem } from "@/types/admin";

export async function GET(request: Request) {
  const admin = await requireAdmin();

  if (!admin) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Unauthorized" },
      { status: 403 }
    );
  }

  const { searchParams } = new URL(request.url);
  const rawLimit = parseInt(searchParams.get("limit") || "5", 10);
  const limit = Number.isFinite(rawLimit) && rawLimit > 0 ? rawLimit : 5;

  try {
    const orders = await prisma.orders.findMany({
      take: limit,
      orderBy: {
        date: "desc",
      },
      include: {
        customers: true,
        order_items: true,
      },
    });

    const result: AdminOrderItem[] = orders.map((order) => {
      const itemCount = order.order_items?.length || 0;
      return {
        id: order.id,
        date: order.date ? order.date.toISOString() : "N/A",
        customerName: order.customers?.name || "Unknown",
        totalAmount: Number(order.total_amount || 0),
        status: order.status,
        itemCount,
      };
    });

    return NextResponse.json<ApiResponse<AdminOrderItem[]>>(
      { success: true, data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ADMIN_ORDERS_ERROR]", error);
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "เกิดข้อผิดพลาด กรุณาลองใหม่" },
      { status: 500 }
    );
  }
}
