import {
  CreatedBy,
  CreateUserInput,
  Resolvers,
  RoleType,
  UserStatus,
  ConfigStatus,
  ConfigType,
  Website,
} from "@/generated/backend";
import { ServerlessMysql } from "serverless-mysql";
// import { OkPacket } from "mysql";
import { UserInputError } from "apollo-server-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import GraphQLJSON from "graphql-type-json";
import dayjs from "dayjs";

interface ApollowContext {
  db: ServerlessMysql;
  prisma: PrismaClient;
}

const findUsers = async (prisma: PrismaClient, args: any) => {
  const { status, createdBy, offset, limit, query, begin, end } = args;
  let where = [];

  if (begin && end) {
    where.push({
      createdAt: {
        gte: new Date(begin).toISOString(),
        lte: new Date(end + "T23:59:59.999Z").toISOString(),
      },
    });
  }

  if (begin && !end) {
    where.push({
      createdAt: {
        gte: new Date(begin).toISOString(),
      },
    });
  }

  if (end && !begin) {
    where.push({
      createdAt: {
        lte: new Date(end + "T23:59:59.999Z").toISOString(),
      },
    });
  }

  if (status) {
    where.push({
      status: status,
    });
  }

  if (createdBy) {
    where.push({
      createdBy: createdBy,
    });
  }

  if (query) {
    where.push(
      {
        username: { contains: query },
      },
      {
        profile: {
          firstName: { contains: query },
        },
      },
      {
        profile: {
          lastName: { contains: query },
        },
      }
    );
  }

  const whereCaurse = where.length ? { OR: where } : {};
  const users = await prisma.user.findMany({
    skip: offset,
    take: limit,
    where: whereCaurse,
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
          mobile: profile?.mobile || "",
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

const getWebsiteById = async (
  id: number,
  db: ServerlessMysql,
  prisma: PrismaClient
) => {
  return await prisma.website.findUnique({
    where: { id: id },
    include: { user: true, maintenance: true },
  });
};

export const resolvers: Resolvers<ApollowContext> = {
  JSON: GraphQLJSON,
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
    async websites(parent, args: any, context) {
      let whereClause = { ...args };

      const websites = await context.prisma.website.findMany({
        where: whereClause,
        include: { user: true, maintenance: true },
      });

      return websites.map((website) => ({
        ...website,
        id: Number(website!.id),
        status: website.status as ConfigStatus,
        maintenance: {
          ...website.maintenance,
          id: Number(website.maintenance!.id),
          websiteId: Number(website.id),
          configStatus: website.maintenance?.configStatus as ConfigStatus,
          configType: website.maintenance?.configType as ConfigType,
        },
        user: {
          ...website.user,
          id: Number(website.user.id),
          createdBy: website.user.createdBy as CreatedBy,
          status: website.user.status as UserStatus,
        },
      }));
    },
    async website(parent, args, context): Promise<Website | null> {
      const website = await getWebsiteById(args.id, context.db, context.prisma);
      if (!website) return null;
      return {
        ...website,
        status: website.status as ConfigStatus,
        maintenance: {
          ...website.maintenance,
          id: Number(website.maintenance!.id),
          websiteId: Number(website.id),
          configStatus: website.maintenance?.configStatus as ConfigStatus,
          configType: website.maintenance?.configType as ConfigType,
        },
        user: {
          ...website.user,
          id: Number(website.user.id),
          createdBy: website.user.createdBy as CreatedBy,
          status: website.user.status as UserStatus,
        },
      };
    },
  },
  Mutation: {
    async createUser(parent, args, context) {
      return await createUserByParams(context.db, context.prisma, args.input);
    },
    async updateUser(parent, args: any, context) {
      try {
        const { profile, ...userData } = args.input;
        const updatedUser = await context.prisma.user.update({
          where: { id: args.input.id },
          include: { profile: true },
          data: {
            ...userData,
            profile: {
              update: {
                ...profile,
                mobile: profile?.mobile || "",
              },
            },
          },
        });

        return {
          ...updatedUser,
          createdBy: updatedUser.createdBy as CreatedBy,
          status: updatedUser.status as UserStatus,
          profile: {
            ...updatedUser.profile,
            id: Number(updatedUser.profile?.id),
            birthday: updatedUser.profile?.birthday
              ? dayjs(updatedUser.profile.birthday).format()
              : "",
            createdAt: updatedUser.profile?.createdAt,
          },
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
    async createWebsite(parent, args, context) {
      const website = await context.prisma.website.create({
        data: {
          userId: args.input.userId,
          name: args.input.name,
          domain: args.input.domain,
          subdomain: args.input.subdomain,
          status: args.input.status as ConfigStatus,
        },
      });
      return {
        ...website,
        status: website.status as ConfigStatus,
      };
    },
    async updateWebsite(parent, args, context) {
      try {
        const { id, maintenance, ...websiteData } = args.input;
        let updateWebsiteData;

        if (maintenance) {
          updateWebsiteData = {
            ...websiteData,
            status: websiteData.status as ConfigStatus,
            maintenance: {
              update: {
                ...maintenance,
                configType: maintenance.configType as ConfigType,
                configStatus: maintenance.configStatus as ConfigStatus,
              },
            },
          };
        } else {
          updateWebsiteData = {
            ...websiteData,
            status: websiteData.status as ConfigStatus,
          };
        }

        const website = await context.prisma.website.update({
          where: { id: Number(id) },
          include: { user: true, maintenance: true },
          data: updateWebsiteData,
        });

        return {
          ...website,
          status: website.status as ConfigStatus,
          user: {
            id: website.user.id,
            createdBy: website.user.createdBy as CreatedBy,
          },
          maintenance: {
            ...website.maintenance,
            id: Number(website.maintenance?.id),
            websiteId: Number(website.maintenance?.websiteId),
            configType: website.maintenance?.configType as ConfigType,
            configStatus: website.maintenance?.configStatus as ConfigStatus,
          },
        };
      } catch (error) {
        throw new UserInputError("Could not update the user!");
      }
    },
    async deleteWebsite(parent, args, context) {
      const website = await getWebsiteById(args.id, context.db, context.prisma);
      if (!website) throw new UserInputError("Could not found the website!");

      await context.prisma.website.delete({
        where: { id: args.id },
      });

      return {
        ...website,
        status: website.status as ConfigStatus,
        user: {
          id: website.user.id,
          createdBy: website.user.createdBy as CreatedBy,
        },
        maintenance: {
          ...website.maintenance,
          id: Number(website.maintenance?.id),
          websiteId: Number(website.maintenance?.websiteId),
          configType: website.maintenance?.configType as ConfigType,
          configStatus: website.maintenance?.configStatus as ConfigStatus,
        },
      };
    },
  },
};
