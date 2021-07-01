import mysql from "serverless-mysql";

export const db = mysql({
  config: {
    user: process.env.MYSQL_ROOT_USER,
    host: process.env.DB_HOST,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
  },
});
