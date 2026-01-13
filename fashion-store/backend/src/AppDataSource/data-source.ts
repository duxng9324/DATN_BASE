import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Menu } from "../entity/Menu.entity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,  
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,  
  synchronize: true,
  logging: false,
  // entities: ["src/entity/**/*.ts"],
  entities: [Menu],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
})