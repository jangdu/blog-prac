import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  development: {
    username: "admin",
    password: "!272422jdj",
    database: "blog_db",
    host: "database-1.chuvs2bdhmq1.ap-northeast-2.rds.amazonaws.com",
    dialect: "mysql" as const,
  },
};
