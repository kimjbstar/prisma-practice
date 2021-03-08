import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import faker from "faker";

async function main() {
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();
  await prisma.keyword.deleteMany();

  for (const idx of Array(10).keys()) {
    const brandName = faker.company.companyName();
    await prisma.brand.upsert({
      where: { name: brandName },
      update: {},
      create: {
        name: brandName,
      },
    });
  }

  for (const idx of Array(5).keys()) {
    const categoryName = `CATEGORY-${idx}`;
    await prisma.category.create({
      data: {
        name: categoryName,
        children: {
          create: ["A", "B", "C", "D"].map((v) => ({
            name: `${categoryName}-${v}`,
            children: {
              create: ["가", "나", "다", "라"].map((vv) => ({
                name: `${categoryName}-${v}-${vv}`,
              })),
            },
          })),
        },
      },
    });
  }

  for (const idx of Array(10).keys()) {
    await prisma.keyword.create({
      data: {
        name: `keyword${idx}`,
      },
    });
  }

  for (const idx of Array(10).keys()) {
    await prisma.product.create({
      data: {
        name: `product${idx}`,
        price: 100,
        desc: "desc",
        keywords: {
          connect: [
            {
              id: 1,
            },
            {
              id: 2,
            },
          ],
        },
      },
    });
  }
}
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
