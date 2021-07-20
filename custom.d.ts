declare namespace NodeJS {
  interface ProcessEnv {
    APP_SECRET: string;
    DATABASE_URL: string;
    DB_HOST: string;
    MYSQL_ROOT_USER: string;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    MYSQL_ROOT_PASSWORD: string;
    MYSQL_DATABASE: string;
    MYSQL_PORT: number;
    SALT_ROUNDS: number;

    PORT: number;
    NEXT_PUBLIC_BASE_PATH: string;
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_WEB_URL: string;
    GRAPHQL_URL_BACK_OFFICE: string;

    JWT_SECRET: string;
    ADD_HOURS: number;
    DOPOSIT_MIN: number;
    WITHDRAW_MIN: number;
    WITHDRAW_MAX_PER_TIME: number;
    WITHDRAW_MAX_PER_DAY: number;
    USERNAME_PREFIX: string;
  }
}

declare module "*.graphql" {
  import { DocumentNode } from "graphql";
  const Schema: DocumentNode;

  export = Schema;
}

declare module "*.scss" {
  const content: any;
  export = content;
}
