const { PrismaClient } = require('@prisma/client')
const {hash} = require("bcrypt");
const faker = require("faker");
const prisma = new PrismaClient()

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
          birthday: faker.date.past(1977),
          lineID: "",
          email: "superadmin@gmail.com",
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
