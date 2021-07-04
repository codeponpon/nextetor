import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import faker from "faker";

const prisma = new PrismaClient();

const main = async () => {
  const superman = await prisma.user.upsert({
    where: { username: "superman" },
    update: {},
    create: {
      username: "superman",
      password: await hash("asdqwe123", 10),
      profile: {
        create: {
          mobile: "0987654321",
          firstName: "Clark",
          lastName: "Kent",
          birthday: faker.date.recent(99),
          lineID: "",
          email: "superadmin@gmail.com",
        },
      },
      role: {
        create: {
          name: "super_admin",
          type: "ADMIN",
        },
      },
    },
  });

  console.log({ superman });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
