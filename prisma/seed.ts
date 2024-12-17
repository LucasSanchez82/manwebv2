import { PrismaClient, Type } from '@prisma/client'
import { contentTypesValues } from './constant'

const seed = async () => {
  const prisma = new PrismaClient()
  try {
    const results: Type[] = []
    contentTypesValues.forEach(async ({ name, id }) => {
      const result = await prisma.type.upsert({
        where: { id },
        create: {
          name,
          id,
        },
        update: {
          name,
          id,
        },
      })
      console.log(result)
      results.push(result)
    })
    console.log(results)
  } catch (error) {
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

seed()
