const { Posts, Users, Like, sequelize } = require("../models");
const { Op } = require("sequelize");

async function getAll() {
  const posts = await Posts.findAll({
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
    attributes: ["postId", "UserId", "title", "createdAt", "updatedAt"],
    group: ["Posts.postId"], // 그룹화하여 중복 제거
    order: [["createdAt", "DESC"]],
  });
  console.log(posts);
  return posts;
}

const getByPostId = async (postId) => {
  return await Posts.findByPk(postId);
};

async function getOne(id) {
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
    where: { postId: id },
  });
  if (!post) {
    return { errorMessage: "해당하는 게시물을 찾을 수 없습니다." };
  }
  const { postId, UserId, title, content, createdAt, User } = post;
  const { nickname } = User.dataValues;

  return post;
}

async function create(UserId, title, content) {
  return await Posts.create({
    UserId,
    title,
    content,
  });
}

async function update(postId, UserId, title, content) {
  return await Posts.update(
    { title, content },
    {
      where: {
        [Op.and]: [{ postId }, { UserId }],
      },
    }
  );
}

async function remove(postId, UserId) {
  await Posts.destroy({
    where: {
      [Op.and]: [{ postId }, { UserId }],
    },
  });
}

module.exports = { getAll, getOne, getByPostId, create, update, remove };
