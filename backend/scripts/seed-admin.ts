import "dotenv/config";
import { PrismaClient, Role } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as bcrypt from "bcrypt";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@local.test";
  const plainPassword = process.env.SEED_ADMIN_PASSWORD ?? "Admin123!";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
  const password = await bcrypt.hash(plainPassword, 10);

  await prisma.user.update({
    where: { email },
    data: { password, role: Role.ADMIN },
  });

  console.log("Admin updated:");
  console.log("  email:", email);
  console.log("  password:", plainPassword);
  return;
}


  const password = await bcrypt.hash(plainPassword, 10);

  await prisma.user.create({
    data: { email, password, role: Role.ADMIN },
  });

  console.log("Admin created:");
  console.log("  email:", email);
  console.log("  password:", plainPassword);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
