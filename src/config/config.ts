import * as dotenv from "dotenv";

dotenv.config();

interface Development {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: string;
}

interface Config {
  development: Development;
  // 다른 환경에 대한 속성 정의
}

export const config: Config = {
  development: {
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "",
    host: process.env.DB_HOST || "",
    dialect: "mysql",
  },
};
