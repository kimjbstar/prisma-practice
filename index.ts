import fastify, { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import _ from "lodash";
const prisma = new PrismaClient();

const server: FastifyInstance = fastify();

server.get("/ping", async (request, reply) => {
  return {
    query: request.query,
  };
});

const productListOpts = {
  schema: {
    querystring: {
      type: "object",
      properties: {
        name: { type: "string" },
        take: { type: "integer", default: 5 },
        page: { type: "number", default: 1, min: 1 },
        has_any_keyword: { type: "boolean" },
        has_no_keyword: { type: "boolean" },
        some_keyword_with_name: { type: "string" },
        ids: {
          type: "array",
          default: [] as any,
        },
      },
    },
  },
};

server.get<{
  Querystring: {
    [key: string]: any;
  };
}>("/products", productListOpts, async (request, reply) => {
  const args = JSON.parse(JSON.stringify(request.query));

  let where: Object = {};

  if (request.query.name) {
    where = Object.assign(where, {
      name: request.query.name,
    });
  }

  // mutually exclusive
  if (request.query.has_any_keyword) {
    where = Object.assign(where, {
      NOT: {
        keywords: {
          none: {},
        },
      },
    });
  } else if (request.query.has_none_keyword) {
    where = Object.assign(where, {
      keywords: {
        none: {},
      },
    });
  } else if (request.query.some_keyword_with_name) {
    where = Object.assign(where, {
      keywords: {
        some: {
          name: request.query.some_keyword_with_name,
        },
      },
    });
  }

  console.dir(args, { depth: null });
  console.log(where);

  const products = await prisma.product.findMany({
    skip: (args.page - 1) * args.take,
    take: args.take,
    where: where,
    include: {
      keywords: true,
      deals: true,
    },
  });
  return products;
});

server.get("/keywords", async (request, reply) => {
  const keywords = await prisma.keyword.findMany({
    skip: 0,
    take: 2,
  });
  return keywords;
});

server.listen(6500, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
