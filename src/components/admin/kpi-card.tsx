import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import {
  RiMoneyDollarCircleLine,
  RiShoppingCartLine,
  RiTimerLine,
  RiBox3Line,
  RiUserLine,
} from "@remixicon/react";

type KpiCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  loading?: boolean;
};

function KpiCard({ title, value, icon, loading }: KpiCardProps) {
  return (
    <Card variant="highlighted" size="sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-muted-foreground">{title}</CardTitle>
          <span className="text-[var(--flip7-teal)]">{icon}</span>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Spinner className="size-6" />
        ) : (
          <p className="text-2xl font-bold">{value}</p>
        )}
      </CardContent>
    </Card>
  );
}

function KpiCardSkeleton() {
  return (
    <Card variant="highlighted" size="sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="size-5 animate-pulse rounded bg-muted" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-8 w-20 animate-pulse rounded bg-muted" />
      </CardContent>
    </Card>
  );
}

export { KpiCard, KpiCardSkeleton };

export const kpiIcons = {
  todaySales: <RiMoneyDollarCircleLine className="size-5" />,
  todayOrders: <RiShoppingCartLine className="size-5" />,
  pendingOrders: <RiTimerLine className="size-5" />,
  totalProducts: <RiBox3Line className="size-5" />,
  totalUsers: <RiUserLine className="size-5" />,
};
