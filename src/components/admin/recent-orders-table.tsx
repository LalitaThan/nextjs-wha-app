"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { AdminOrderItem } from "@/types/admin";

type StatusConfig = { label: string; variant: "default" | "secondary" | "destructive" | "outline" };

const statusMap: Record<"delivered" | "received" | "processing", StatusConfig> = {
  delivered: { label: "จัดส่งแล้ว", variant: "default" },
  received: { label: "ได้รับแล้ว", variant: "secondary" },
  processing: { label: "กำลังดำเนินการ", variant: "outline" },
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB" }).format(value);

type RecentOrdersTableProps = {
  orders: AdminOrderItem[];
  loading?: boolean;
};

function RecentOrdersTable({ orders, loading }: RecentOrdersTableProps) {
  if (loading) {
    return (
      <div className="space-y-2 p-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 animate-pulse rounded bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>คำสั่งซื้อ</TableHead>
          <TableHead>ลูกค้า</TableHead>
          <TableHead>สถานะ</TableHead>
          <TableHead className="text-right">ยอดรวม</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-muted-foreground">
              ไม่มีคำสั่งซื้อล่าสุด
            </TableCell>
          </TableRow>
        ) : (
          orders.map((order) => {
            const statusConfig = order.status ? statusMap[order.status] : null;
            return (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>
                  {statusConfig ? (
                    <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
                  ) : (
                    <Badge variant="outline">ไม่ระบุ</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(order.totalAmount)}
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}

export { RecentOrdersTable };
