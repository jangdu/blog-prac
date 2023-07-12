import * as dotenv from "dotenv";

dotenv.config();

interface development {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: string;
}

export const config = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
};
