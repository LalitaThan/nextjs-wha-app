import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-guard";
import DashboardClient from "./dashboard-client";

export default async function AdminDashboardPage() {
  const admin = await requireAdmin();

  if (!admin) {
    redirect("/");
  }

  return <DashboardClient />;
}
