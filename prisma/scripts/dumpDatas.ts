import { prisma } from '@/lib/prisma'

const main = async () => {
  const contents = await prisma.content.findMany()
  const strJSON = JSON.stringify(contents.map(({ ...props }) => props))
  const writer = Bun.file('./prisma/scripts/datas/contents.json').writer()
  writer.write(strJSON)
  writer.flush()
}
main()
