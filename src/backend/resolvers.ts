import { CreatedBy, Resolvers, UserStatus } from "@/generated/backend";
import { ServerlessMysql } from "serverless-mysql";
import moment from "moment";
import { OkPacket } from "mysql";
import { UserInputError } from "apollo-server-errors";

interface ApollowContext {
  db: ServerlessMysql;
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
      const now = moment();
      const user = await context.db.query<OkPacket>(
        "INSERT INTO User(username, password, status, createdBy) VALUES(?, ?, ?, ?)",
        [
          args.input.username,
          args.input.password,
          UserStatus.Active,
          CreatedBy.Admin,
        ]
      );
      await context.db.end();
      return {
        id: user.insertId,
        username: args.input.username,
        password: args.input.password,
        status: UserStatus.Active,
        createdBy: CreatedBy.Admin,
        createdAt: now.toString(),
      };
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
  },
};
