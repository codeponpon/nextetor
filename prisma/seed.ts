import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Create User admin
  // const data = await prisma.user.findOne({
  //   where: {
  //     username: 'superadmin',
  //   },
  // })

  // if (data === null) {
  //   await prisma.user.create({
  //     data: {
  //       username: 'superadmin',
  //       password: await bcrypt.hash('asdqwe123', 10),
  //       profile: {
  //         firstName: 'Super Admin',
  //       },
  //       role: {
  //         connect: {
  //           name: 'super_admin',
  //         },
  //       },
  //       createdBy: 'ADMIN',
  //     },
  //   })
  // }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
