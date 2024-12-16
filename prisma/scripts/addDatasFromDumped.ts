import { prisma } from '@/lib/prisma'
import json from './datas/contents.json'

const getInput = async () => {
  for await (const line of console) {
    return line
  }
}
const main = async () => {
  console.log("what's your email ?")
  const email = await getInput()
  json.map(() => {})
  try {
    const me = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (me) {
      console.log('success finded email: ', me.email)
      const result = await prisma.content.createMany({
        data: json.map((el) => ({ ...el, userId: me.id })),
      })

      console.log('succesfully added: ')
      console.table(result)
    } else {
      console.log('error user not found')
    }
  } catch (error) {
    console.error(error)
  }
}

main()
