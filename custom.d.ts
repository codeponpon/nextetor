declare namespace NodeJS {
  interface ProcessEnv {
    APP_SECRET: string;
    DB_HOST: string;
    MYSQL_ROOT_USER: string;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    MYSQL_ROOT_PASSWORD: string;
    MYSQL_DATABASE: string;
    MYSQL_PORT: number;
    SALT_ROUNDS: number;
  }
}

declare module "*.graphql" {
  import { DocumentNode } from "graphql";
  const Schema: DocumentNode;

  export = Schema;
}
