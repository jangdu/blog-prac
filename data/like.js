const { User, Posts, Like } = require("../models");

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
    const likedPosts = await Like.findAll({
      where: { userId },
      include: [
        {
          model: Posts,
        },
      ],
    });

    return likedPosts;
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
