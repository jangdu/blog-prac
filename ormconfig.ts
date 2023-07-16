import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "admin",
  password: "!272422jdj",
  database: "typeORM_blog",
  synchronize: true,
  logging: false,
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  migrations: [],
  subscribers: [],
});
