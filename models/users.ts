import Sequelize, { CreateOptions, CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import Posts from "./posts";
import Comments from "./comments";
import Like from "./like";

class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>> {
  declare userId: CreateOptions<number>;
  declare nickname: string;
  declare password: string;

  static initiate(sequelize: Sequelize.Sequelize) {
    Users.init(
      {
        userId: {
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
          type: Sequelize.INTEGER,
        },
        nickname: Sequelize.STRING,
        password: Sequelize.STRING,
      },
      {
        sequelize,
        modelName: "Users",
      }
    );
  }

  static associate() {
    Users.hasMany(Posts, {
      sourceKey: "userId",
      foreignKey: "UserId",
    });

    Users.hasMany(Comments, {
      sourceKey: "userId",
      foreignKey: "UserId",
    });

    Users.hasMany(Like, {
      sourceKey: "userId",
      foreignKey: "userId",
    });
  }
}
export default Users;
