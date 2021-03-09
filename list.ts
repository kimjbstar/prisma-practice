import { PrismaClient } from "@prisma/client";
import _ from "lodash";
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    skip: 0,
    take: 4,
    where: {
      keywords: {
        some: {
          name: "keyword1",
        },
      },
    },
    include: {
      keywords: true,
      deals: true,
    },
  });
  console.dir(products, { depth: null });
}
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
