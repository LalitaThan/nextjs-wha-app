"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { RevenuePoint } from "@/types/admin";
import { Spinner } from "@/components/ui/spinner";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB" }).format(value);

type RevenueChartProps = {
  data: RevenuePoint[];
  loading?: boolean;
};

function RevenueChart({ data, loading }: RevenueChartProps) {
  if (loading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center text-muted-foreground">
        ไม่มีข้อมูลรายได้
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="date" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
        <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
        <Tooltip
          formatter={(value, name) =>
            name === "รายได้" ? formatCurrency(Number(value)) : value
          }
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="revenue"
          name="รายได้"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ fill: "hsl(var(--primary))" }}
        />
        <Line
          type="monotone"
          dataKey="orders"
          name="คำสั่งซื้อ"
          stroke="hsl(var(--destructive))"
          strokeWidth={2}
          dot={{ fill: "hsl(var(--destructive))" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export { RevenueChart };
