import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Comment } from "./entity/Comment";
import { Post } from "./entity/Post";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "database-1.chuvs2bdhmq1.ap-northeast-2.rds.amazonaws.com",
  port: 3306,
  username: "admin",
  password: "!272422jdj",
  database: "typeORM_blog",
  synchronize: true,
  logging: true,
  entities: [User, Post, Comment],
  migrations: [],
  subscribers: [],
});
