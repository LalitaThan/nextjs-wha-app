import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

async function main() {
  const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
  const prisma = new PrismaClient({ adapter });

  const email = process.env.ADMIN_EMAIL;
  if (!email) {
    console.error("กรุณาระบุ ADMIN_EMAIL ใน .env");
    process.exit(1);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.error(`ไม่พบผู้ใช้ ${email} — กรุณาสมัครสมาชิกก่อน`);
    process.exit(1);
  }

  if (user.role === "admin") {
    console.log(`${email} เป็น admin อยู่แล้ว`);
    return;
  }

  await prisma.user.update({
    where: { email },
    data: { role: "admin" },
  });

  console.log(`อัปเกรด ${email} เป็น admin เรียบร้อย`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
