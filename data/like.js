const { User, Posts, Like } = require("../models");

const getByPostIdandUserId = async (postId, userId) => {
  return await Like.findOne({
    where: {
      postId,
      userId,
    },
  });
};

const getPostsByUserId = async (userId) => {
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

const create = async (postId, userId) => {
  return await Like.create({
    postId,
    userId,
  });
};

const remove = async (postId, userId) => {
  return await Like.destroy({
    where: {
      postId,
      userId,
    },
  });
};

module.exports = { getByPostIdandUserId, getPostsByUserId, create, remove };
