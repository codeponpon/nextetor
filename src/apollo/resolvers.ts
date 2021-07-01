import { CreatedBy, Resolvers, UserStatus } from "@/generated/backend";
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

interface UserDbRow {
  id: number;
  username: string;
  password: string;
  createdBy: CreatedBy;
  status: UserStatus;
  createdAt: string;
}

type UsersDbQueryResult = UserDbRow[];
type UserDbQueryResult = UserDbRow[];

const getUserById = async (id: number, db: ServerlessMysql) => {
  const user = await db.query<UserDbQueryResult>(
    "SELECT * FROM User WHERE id = ?",
    [id]
  );
  return user[0];
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
      const { status, createdBy } = args;
      let hasParams = false;
      let query = "SELECT * FROM User";
      let queryParams = [];
      query = status || createdBy ? query + " WHERE " : query;

      if (status) {
        query += hasParams ? " AND status = ?" : " status = ?";
        queryParams.push(status);
        hasParams = true;
      }

      if (createdBy) {
        query += hasParams ? " AND createdBy = ?" : " createdBy = ?";
        queryParams.push(createdBy);
        hasParams = true;
      }

      const users = await context.db.query<UsersDbQueryResult>(
        query,
        queryParams
      );
      await context.db.end();
      return users;
    },
    async user(parent, args, context) {
      return await getUserById(args.id, context.db);
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
      return await getUserById(args.input.id, context.db);
    },
    async deleteUser(parent, args, context) {
      const user = await getUserById(args.id, context.db);
      if (!user) {
        throw new UserInputError("Could not found the user!");
      }
      await context.db.query("DELETE FROM User WHERE id = ?", [args.id]);
      return user;
    },
    async signIn(parent, args, context) {
      const user = await context.prisma.user.findUnique({
        where: { username: args.input.username },
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
        roleId: userWithToken.roleId,
        username: userWithToken.username,
        password: userWithToken.password,
        createdBy: userWithToken.createdBy as CreatedBy,
        status: userWithToken.status as UserStatus,
        createdAt: userWithToken.createdAt.toString(),
        updatedAt: userWithToken.updatedAt?.toString(),
        token: userWithToken.token,
      };
    },
  },
};
