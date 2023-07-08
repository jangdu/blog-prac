const { Posts, Users, Like, sequelize } = require("../models");
const { Op } = require("sequelize");

class PostsRepository {
  getAll = async () => {
    const posts = await Posts.findAll({
      include: [
        {
          model: Users,
          attributes: ["nickname"],
        },
      ],
      attributes: ["postId", "title", "createdAt", [sequelize.literal("(SELECT COUNT(*) FROM likes WHERE likes.postId = Posts.postId)"), "likeCount"]],
      group: ["Posts.postId"], // 그룹화하여 중복 제거
      order: [[sequelize.literal("likeCount"), "DESC"]],
      raw: true,
    });
    return posts;
  };

  getByPostId = async (postId) => {
    return await Posts.findByPk(postId);
  };

  getOne = async (postId) => {
    const post = await Posts.findOne({
      include: [
        {
          model: Users,
          attributes: ["nickname"],
        },
        {
          model: Like,
          attributes: [[sequelize.fn("COUNT", sequelize.col("id")), "likeCount"]],
        },
      ],
      attributes: ["postId", "UserId", "title", "content", "createdAt"],
      group: ["Posts.postId"], // 그룹화하여 중복 제거
      where: { postId },
    });

    return post;
  };

  create = async (UserId, title, content) => {
    return await Posts.create({
      UserId,
      title,
      content,
    });
  };

  update = async (postId, UserId, title, content) => {
    return await Posts.update(
      { title, content },
      {
        where: {
          [Op.and]: [{ postId }, { UserId }],
        },
      }
    );
  };

  remove = async (postId, UserId) => {
    await Posts.destroy({
      where: {
        [Op.and]: [{ postId }, { UserId }],
      },
    });
  };
}

module.exports = PostsRepository;
