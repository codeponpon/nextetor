import {
  CreatedBy,
  CreateUserInput,
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
  const users = await prisma.user.findMany({
    skip: offset,
    take: limit,
    where: { status: status, createdBy: createdBy },
    include: { profile: true, role: true },
  });
  return users.map((user) => ({
    ...user,
    status: user.status as UserStatus,
    createdBy: user.createdBy as CreatedBy,
    createdAt: user.createdAt.toString(),
    updatedAt: user.updatedAt && user.updatedAt.toString(),
    profile: {
      id: Number(user.profile?.id),
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
      id: Number(user.profile?.id),
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
  params: CreateUserInput
) => {
  const { profile, ...userData } = params;
  const user = await prisma.user.create({
    data: {
      username: userData.username,
      password: await bcrypt.hash(userData.password, 10),
      status: userData.status as UserStatus,
      createdBy: userData.createdBy as CreatedBy,
      profile: {
        create: {
          ...profile,
        },
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
      try {
        const { profile, ...userData } = args.input;
        const updatedUser = await context.prisma.user.update({
          where: { id: Number(args.input.id) },
          include: { profile: true },
          data: {
            ...userData,
            profile: {
              update: {
                ...profile,
              },
            },
          },
        });

        return {
          ...updatedUser,
          createdBy: updatedUser.createdBy as CreatedBy,
          status: updatedUser.status as UserStatus,
        };
      } catch (error) {
        throw new UserInputError("Could not update the user!");
      }
    },
    async deleteUser(parent, args, context) {
      const user = await getUserById(args.id, context.db, context.prisma);
      if (!user) {
        throw new UserInputError("Could not found the user!");
      }

      const deleteUser = await context.prisma.user.delete({
        where: { id: args.id },
      });

      console.log("Delete User and Profile ", deleteUser);

      return {
        id: user.id,
        username: user.username,
        password: user.password,
        createdBy: user.createdBy as CreatedBy,
        status: user.status as UserStatus,
        createdAt: user.createdAt.toString(),
        updatedAt: user.updatedAt?.toString(),
        profile: {
          ...user.profile,
          birthday: user.profile?.birthday?.toString(),
        },
        role: {
          ...user.role,
          type: user?.role?.type as RoleType,
          createdAt: user.role?.createdAt.toString(),
        },
      };
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
          id: Number(user.profile?.id),
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
