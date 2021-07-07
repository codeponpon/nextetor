import {
  CreatedBy,
  Resolvers,
  Role,
  RoleType,
  UserStatus,
} from "@/generated/backend";
import { ServerlessMysql } from "serverless-mysql";
// import { OkPacket } from "mysql";
import { UserInputError } from "apollo-server-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

interface ApollowContext {
  db: ServerlessMysql;
  prisma: PrismaClient;
}

const findUsers = async (prisma: PrismaClient, args: any) => {
  const { status, createdBy, offset, limit } = args;
  console.log("Find user argument: ", typeof offset, typeof limit);
  const users = await prisma.user.findMany({
    skip: offset,
    take: limit,
    where: { status: status, createdBy: createdBy },
    include: { profile: true, role: true },
  });
  console.log("Users ", users);
  return users.map((user) => ({
    ...user,
    status: user.status as UserStatus,
    createdBy: user.createdBy as CreatedBy,
    createdAt: user.createdAt.toString(),
    updatedAt: user.updatedAt && user.updatedAt.toString(),
    profile: {
      ...user.profile,
      birthday: user.profile?.birthday?.toString(),
      createdAt: user.profile?.createdAt.toString(),
    },
    role: {
      ...user.role,
      type: user?.role?.type as RoleType,
      createdAt: user.role?.createdAt.toString(),
    },
  }));
};

const getUserById = async (
  id: number,
  db: ServerlessMysql,
  prisma: PrismaClient
) => {
  const user = await prisma.user.findUnique({
    where: { id: id },
    include: { profile: true, role: true },
  });

  if (!user) throw new UserInputError("Could not found the user!");

  return {
    ...user,
    status: user.status as UserStatus,
    roleId: user.roleId,
    createdBy: user.createdBy as CreatedBy,
    createdAt: user.createdAt.toString(),
    updatedAt: user.updatedAt && user.updatedAt.toString(),
    profile: {
      ...user.profile,
      birthday: user.profile?.birthday?.toString(),
      createdAt: user.profile?.createdAt.toString(),
    },
    role: {
      ...user.role,
      type: user?.role?.type as RoleType,
      createdAt: user.role?.createdAt.toString(),
    },
  };
};

const expiresIn = "1 day";
const createUserByParams = async (
  db: ServerlessMysql,
  prisma: PrismaClient,
  params: any
) => {
  const user = await prisma.user.create({
    data: {
      username: params.username,
      password: await bcrypt.hash(params.password, 10),
      status: params.status,
      createdBy: params.createdBy,
      profile: {
        ...params.profile,
      },
      roleId: params.roleId,
    },
  });

  const userWithToken = {
    ...user,
    token: jwt.sign({ userId: user.id }, process.env.APP_SECRET, {
      expiresIn,
    }),
  };

  return {
    id: userWithToken.id,
    roleId: userWithToken.roleId,
    username: userWithToken.username,
    password: userWithToken.password,
    createdBy: userWithToken.createdBy as CreatedBy,
    status: userWithToken.status as UserStatus,
    createdAt: userWithToken.createdAt.toString(),
    updatedAt: userWithToken.updatedAt?.toString(),
    token: userWithToken.token,
  };
};

export const resolvers: Resolvers<ApollowContext> = {
  Query: {
    async users(parent, args, context) {
      const users = await findUsers(context.prisma, args);
      return users;
    },
    async user(parent, args, context) {
      return await getUserById(args.id, context.db, context.prisma);
    },
    async roles(parent, args, context) {
      const roles = await context.prisma.role.findMany();
      return roles.map((role) => ({ ...role, type: role.type as RoleType }));
    },
  },
  Mutation: {
    async createUser(parent, args, context) {
      return await createUserByParams(context.db, context.prisma, args.input);
    },
    async updateUser(parent, args, context) {
      const columns: string[] = [];
      const sqlParams: any[] = [];

      if (args.input.password) {
        columns.push("password = ?");
        sqlParams.push(args.input.password);
      }

      if (args.input.status) {
        columns.push("status = ?");
        sqlParams.push(args.input.status);
      }
      sqlParams.push(args.input.id);

      await context.db.query(
        `UPDATE User SET ${columns.join(", ")} WHERE id = ?`,
        sqlParams
      );
      await context.db.end();
      return await getUserById(args.input.id, context.db, context.prisma);
    },
    async deleteUser(parent, args, context) {
      const user = await getUserById(args.id, context.db, context.prisma);
      if (!user) {
        throw new UserInputError("Could not found the user!");
      }
      await context.db.query("DELETE FROM User WHERE id = ?", [args.id]);
      return user;
    },
    async signIn(parent, args, context) {
      const user = await context.prisma.user.findUnique({
        where: { username: args.input.username },
        include: { profile: true, role: true },
      });

      if (!user) throw new UserInputError("Could not found the user!");

      const isValid = await bcrypt.compare(args.input.password, user.password);
      if (!isValid) throw new Error("Wrong Password");

      const userWithToken = {
        ...user,
        token: jwt.sign({ userId: user.id }, process.env.APP_SECRET, {
          expiresIn,
        }),
      };

      return {
        id: userWithToken.id,
        username: userWithToken.username,
        password: userWithToken.password,
        createdBy: userWithToken.createdBy as CreatedBy,
        status: userWithToken.status as UserStatus,
        createdAt: userWithToken.createdAt.toString(),
        updatedAt: userWithToken.updatedAt?.toString(),
        token: userWithToken.token,
        profile: {
          ...user.profile,
          birthday: user.profile?.birthday?.toString(),
          createdAt: user.profile?.createdAt.toString(),
        },
        role: {
          ...user.role,
          type: user?.role?.type as RoleType,
          createdAt: user.role?.createdAt.toString(),
        },
      };
    },
  },
};
