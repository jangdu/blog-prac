import Sequelize, { CreateOptions, CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import Users from "./users";
import Comments from "./comments";
import Like from "./like";

class Posts extends Model<InferAttributes<Posts>, InferCreationAttributes<Posts>> {
  declare postId: CreateOptions<number>;
  declare UserId: CreateOptions<number>;
  declare title: string;
  declare content: string;
  static initiate(sequelize: Sequelize.Sequelize) {
    Posts.init(
      {
        postId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        UserId: Sequelize.INTEGER,
        title: Sequelize.STRING,
        content: Sequelize.STRING,
      },
      {
        sequelize,
        modelName: "Posts",
      }
    );
  }

  static associate() {
    // define association here
    Posts.belongsTo(Users, {
      targetKey: "userId",
      foreignKey: "UserId",
    });

    Posts.hasMany(Comments, {
      sourceKey: "postId",
      foreignKey: "PostId",
    });
    Posts.hasMany(Like, {
      sourceKey: "postId",
      foreignKey: "postId",
    });
  }
}
export default Posts;
