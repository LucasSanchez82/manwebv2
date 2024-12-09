import { expect, test, it, describe } from "bun:test";
import { contentTypes } from "@/prisma/constant";
import { prisma } from "@/lib/prisma";

describe("isTypesGenerated", async () => {
  it("should have the same contentTypes as the prisma/constant file", async () => {
    const results = await prisma.type.findMany();
    Object.values(contentTypes).forEach(({ name, id }) => {
      const currContentType = results.find((type) => type.id === id);
      expect(currContentType?.name).toEqual(name);
    });
  });
});
