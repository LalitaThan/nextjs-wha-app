"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { KpiCard, KpiCardSkeleton, kpiIcons } from "@/components/admin/kpi-card";
import { PeriodSelector } from "@/components/admin/period-selector";
import { RecentOrdersTable } from "@/components/admin/recent-orders-table";
import type { AdminStats, RevenuePoint, AdminOrderItem, Period } from "@/types/admin";
import { RiRefreshLine } from "@remixicon/react";

const RevenueChart = dynamic(
  () => import("@/components/admin/revenue-chart").then((mod) => mod.RevenueChart),
  { ssr: false, loading: () => <div className="flex h-[300px] items-center justify-center"><Spinner className="size-6" /></div> }
);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB" }).format(value);

const formatNumber = (value: number) =>
  new Intl.NumberFormat("th-TH").format(value);

export default function DashboardClient() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  const [revenue, setRevenue] = useState<RevenuePoint[]>([]);
  const [revenueLoading, setRevenueLoading] = useState(true);

  const [period, setPeriod] = useState<Period>("30d");

  const [orders, setOrders] = useState<AdminOrderItem[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) throw new Error("ไม่สามารถโหลดข้อมูลสถิติได้");
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setStats(json.data);
      setStatsError(null);
    } catch (err) {
      setStatsError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const fetchRevenue = useCallback(async (p: Period) => {
    try {
      const res = await fetch(`/api/admin/revenue?period=${p}`);
      if (!res.ok) throw new Error("ไม่สามารถโหลดข้อมูลรายได้");
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setRevenue(json.data);
    } catch {
      setRevenue([]);
    } finally {
      setRevenueLoading(false);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/orders?limit=5");
      if (!res.ok) throw new Error("ไม่สามารถโหลดข้อมูลคำสั่งซื้อได้");
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setOrders(json.data);
      setOrdersError(null);
    } catch (err) {
      setOrdersError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    fetchStats();
    fetchOrders();
  }, [fetchStats, fetchOrders]);

  useEffect(() => {
    fetchRevenue(period);
  }, [period, fetchRevenue]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    const interval = setInterval(() => {
      fetchStats();
      fetchOrders();
    }, 30_000);
    return () => clearInterval(interval);
  }, [fetchStats, fetchOrders]);

  const handlePeriodChange = (newPeriod: Period) => {
    setPeriod(newPeriod);
    setRevenueLoading(true);
  };

  const handleRetryStats = () => {
    setStatsLoading(true);
    fetchStats();
  };

  const handleRetryOrders = () => {
    setOrdersLoading(true);
    fetchOrders();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">ภาพรวมระบบจัดการหลังบ้าน</p>
        </div>
        <PeriodSelector value={period} onChange={handlePeriodChange} />
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {statsLoading ? (
          Array.from({ length: 5 }).map((_, i) => <KpiCardSkeleton key={i} />)
        ) : statsError ? (
          <Card variant="highlighted" size="sm" className="col-span-full">
            <CardContent className="flex flex-col items-center gap-2 py-6">
              <p className="text-sm text-destructive">{statsError}</p>
              <Button variant="outline" size="xs" onClick={handleRetryStats}>
                <RiRefreshLine className="mr-1 size-3" />
                ลองใหม่
              </Button>
            </CardContent>
          </Card>
        ) : stats ? (
          <>
            <KpiCard title="ยอดขายวันนี้" value={formatCurrency(stats.todaySales)} icon={kpiIcons.todaySales} />
            <KpiCard title="คำสั่งซื้อวันนี้" value={formatNumber(stats.todayOrders)} icon={kpiIcons.todayOrders} />
            <KpiCard title="รอจัดส่ง" value={formatNumber(stats.pendingOrders)} icon={kpiIcons.pendingOrders} />
            <KpiCard title="สินค้าทั้งหมด" value={formatNumber(stats.totalProducts)} icon={kpiIcons.totalProducts} />
            <KpiCard title="ผู้ใช้ทั้งหมด" value={formatNumber(stats.totalUsers)} icon={kpiIcons.totalUsers} />
          </>
        ) : null}
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>รายได้และคำสั่งซื้อ</CardTitle>
        </CardHeader>
        <CardContent>
          <RevenueChart data={revenue} loading={revenueLoading} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>คำสั่งซื้อล่าสุด</CardTitle>
            {ordersError && (
              <Button variant="outline" size="xs" onClick={handleRetryOrders}>
                <RiRefreshLine className="mr-1 size-3" />
                ลองใหม่
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {ordersError && !ordersLoading ? (
            <p className="py-4 text-center text-sm text-destructive">{ordersError}</p>
          ) : (
            <RecentOrdersTable orders={orders} loading={ordersLoading} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
