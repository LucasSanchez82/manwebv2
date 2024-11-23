import { PrismaClient, Type } from "@prisma/client";
import { contentTypes } from "./constant";

const seed = async () => {
  const prisma = new PrismaClient();
  try {
    const results: Type[] = [];
    Object.values(contentTypes).forEach(async ({ name, id }) => {
      const result = await prisma.type.upsert({
        where: {
          id,
        },
        create: {
          name,
        },
        update: {
          name,
        },
      });
      results.push(result);
    });
    console.log(results);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
