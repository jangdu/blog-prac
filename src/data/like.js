const { Users, Posts, Like, sequelize } = require("../models");
const { Sequelize } = require("sequelize");

class LikeRepository {
  getByPostIdandUserId = async (postId, userId) => {
    return await Like.findOne({
      where: {
        postId,
        userId,
      },
    });
  };

  getPostsByUserId = async (userId) => {
    try {
      const posts = await Like.findAll({
        where: userId,
      });
      console.log(posts);
      return posts;

      // return likedPosts;
    } catch (error) {
      console.error("오류 발생:", error);
      return []; // 빈 배열 반환 또는 오류 처리 방식을 수정해주세요.
    }
  };

  create = async (postId, userId) => {
    return await Like.create({
      postId,
      userId,
    });
  };

  remove = async (postId, userId) => {
    return await Like.destroy({
      where: {
        postId,
        userId,
      },
    });
  };
}

module.exports = LikeRepository;
