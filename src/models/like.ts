import Sequelize, { CreateOptions, CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import Users from "./users";
import Posts from "./posts";

class Like extends Model<InferAttributes<Like>, InferCreationAttributes<Like>> {
  declare id: CreateOptions<number>;
  declare userId: CreateOptions<number>;
  declare postId: CreateOptions<number>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Like.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: Sequelize.INTEGER,
        postId: Sequelize.INTEGER,
      },
      {
        sequelize,
        modelName: "Like",
        tableName: "likes", // 테이블명 설정 (기본값: 모델명의 복수형)
      }
    );
  }

  static associate() {
    Like.belongsTo(Users, {
      targetKey: "userId",
      foreignKey: "userId",
    });

    Like.belongsTo(Posts, {
      targetKey: "postId",
      foreignKey: "postId",
    });
  }
}
export default Like;
