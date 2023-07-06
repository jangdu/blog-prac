"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      Like.belongsTo(models.Users, {
        targetKey: "userId",
        foreignKey: "userId",
      });

      Like.belongsTo(models.Posts, {
        targetKey: "postId",
        foreignKey: "postId",
      });
    }
  }

  Like.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Like",
      tableName: "likes", // 테이블명 설정 (기본값: 모델명의 복수형)
    }
  );

  return Like;
};
