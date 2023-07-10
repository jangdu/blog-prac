"use strict";
import Sequelize from "sequelize";
import { config } from "../config/config";
import Users from "./users";
import Posts from "./posts";
import Comments from "./comments";
import Like from "./like";

// const env = (process.env.NODE_ENV as "production" | "test") || "development";
// const config = config;

const sequelize = new Sequelize.Sequelize(config.development.database, config.development.username, config.development.password, { host: config.development.host, dialect: config.development.dialect });

Users.initiate(sequelize);
Posts.initiate(sequelize);
Comments.initiate(sequelize);
Like.initiate(sequelize);

Users.associate();
Posts.associate();
Comments.associate();
Like.associate();

export { Users, Posts, Comments, Like };
