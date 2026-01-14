declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    JWT_EXPIRES_IN: string;
  }
}
