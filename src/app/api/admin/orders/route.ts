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
  const limit = parseInt(searchParams.get("limit") || "5", 10);

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

    const result = orders.map((order) => {
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

    return NextResponse.json({ orders: result });
  } catch (error) {
    console.error("[ADMIN_ORDERS_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
