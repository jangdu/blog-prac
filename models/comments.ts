import Sequelize, { CreateOptions, CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import Users from "./users";
import Posts from "./posts";

class Comments extends Model<InferAttributes<Comments>, InferCreationAttributes<Comments>> {
  static initiate(sequelize: Sequelize.Sequelize) {
    Comments.init(
      {
        UserId: Sequelize.INTEGER,
        PostId: Sequelize.INTEGER,
        comment: Sequelize.STRING,
      },
      {
        sequelize,
        modelName: "Comments",
      }
    );
  }

  static associate() {
    // define association here
    this.belongsTo(Users, {
      targetKey: "userId",
      foreignKey: "UserId",
    });

    this.belongsTo(Posts, {
      targetKey: "postId",
      foreignKey: "PostId",
    });
  }
}
export default Comments;
