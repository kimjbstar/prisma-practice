import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import faker from "faker";
import _ from "lodash";
import moment from "moment";

async function main() {
  await prisma.brand.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.keyword.deleteMany({});
  await prisma.productsOnDeals.deleteMany({});
  await prisma.deal.deleteMany({});
  await prisma.product.deleteMany({});

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

  const categories = [];
  for (const idx of Array(5).keys()) {
    const categoryName = `CATEGORY-${idx}`;
    const category = await prisma.category.create({
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
    categories.push(category);
  }

  const keywords = [];
  for (const idx of Array(10).keys()) {
    const keyword = await prisma.keyword.create({
      data: {
        name: `keyword${idx}`,
      },
    });
    keywords.push(keyword);
  }

  const deals = [];
  for (const idx of Array(3).keys()) {
    const deal = await prisma.deal.create({
      data: {
        name: `deal${idx}`,
        startAt: moment().toISOString(),
        endAt: moment().toISOString(),
      },
    });
    deals.push(deal);
  }

  for (const idx of Array(10).keys()) {
    await prisma.product.create({
      data: {
        name: `product${idx}`,
        price: 100,
        desc: "desc😁",
        keywords: {
          connect: _.sampleSize(keywords, 3).map((_keyword) => ({
            id: _keyword.id,
          })),
        },
        images: ["aa", "bb", "cc"],
        category: {
          connect: {
            id: _.sample(categories).id,
          },
        },
        deals: {
          create: {
            dealId: _.sample(deals).id,
            additionalPrice: 100,
          },
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
