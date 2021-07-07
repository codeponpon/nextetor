import { PrismaClient, RoleType } from "@prisma/client";
import { hash } from "bcrypt";
import faker from "faker";

const prisma = new PrismaClient();
const roles = require("./seeds/roles.json");

const main = async () => {
  const initRole = await prisma.role.createMany({
    data: roles,
    skipDuplicates: true,
  });
  console.log({ initRole });

  if (initRole) {
    const superAdminRole = await prisma.role.findUnique({
      where: { name: "super_admin" },
    });
    if (superAdminRole) {
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
          roleId: superAdminRole?.id,
        },
      });
      console.log({ superman });
    }

    const adminRole = await prisma.role.findUnique({
      where: { name: "admin" },
    });
    if (adminRole) {
      const admin = await prisma.user.upsert({
        where: { username: "admin" },
        update: {},
        create: {
          username: "admin",
          password: await hash("asdqwe123", 10),
          profile: {
            create: {
              mobile: "0987654322",
              firstName: "ad",
              lastName: "min",
              birthday: faker.date.recent(99),
              lineID: "",
              email: "admin@gmail.com",
            },
          },
          roleId: adminRole?.id,
        },
      });
      console.log({ admin });
    }

    const agentRole = await prisma.role.findUnique({
      where: { name: "agent" },
    });
    if (agentRole) {
      const agent = await prisma.user.upsert({
        where: { username: "agent" },
        update: {},
        create: {
          username: "agent",
          password: await hash("asdqwe123", 10),
          profile: {
            create: {
              mobile: "0987654323",
              firstName: "a",
              lastName: "gent",
              birthday: faker.date.recent(99),
              lineID: "",
              email: "agent@gmail.com",
            },
          },
          roleId: agentRole?.id,
        },
      });
      console.log({ agent });
    }
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
