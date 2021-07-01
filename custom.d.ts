declare namespace NodeJS {
  interface ProcessEnv {
    DB_HOST: string;
    MYSQL_ROOT_USER: string;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    MYSQL_ROOT_PASSWORD: string;
    MYSQL_DATABASE: string;
    MYSQL_PORT: number;
  }
}
