export type AdminStats = {
  todaySales: number;
  todayOrders: number;
  pendingOrders: number;
  totalProducts: number;
  totalUsers: number;
};

export type RevenuePoint = {
  date: string;
  revenue: number;
  orders: number;
};

export type AdminOrderItem = {
  id: number;
  date: string;
  customerName: string;
  totalAmount: number;
  status: "delivered" | "received" | "processing";
  itemCount: number;
};

export type Period = "7d" | "30d" | "90d";
