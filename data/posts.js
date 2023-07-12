const { Posts, Users, Like, sequelize } = require("../models");
// const { Posts } = require("../models/posts");
const { Op, Sequelize } = require("sequelize");

class PostsRepository {
  getAll = async () => {
    try {
      const posts = await Posts.findAll({
        include: [
          {
            model: Users,
            attributes: ["nickname"],
          },
        ],
        attributes: ["postId", "title", "createdAt", [Sequelize.literal("(SELECT COUNT(*) FROM likes WHERE likes.postId = Posts.postId)"), "likeCount"]],
        group: ["Posts.postId"], // 그룹화하여 중복 제거
        order: [[Sequelize.literal("likeCount"), "DESC"]],
        raw: true,
      });
      return posts;
    } catch (error) {
      console.error("오류 발생:", error);
      return []; // 빈 배열 반환 또는 오류 처리 방식을 수정해주세요.
    }
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
          attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "likeCount"]],
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
          [Op.and]: [{ postId }],
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
