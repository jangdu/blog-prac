const { Posts, Users } = require("../models");
const { Op } = require("sequelize");

async function getAll() {
  const posts = await Posts.findAll({
    include: [
      {
        model: Users,
        attributes: ["nickname"],
      },
    ],
    attributes: ["postId", "UserId", "title", "createdAt", "updatedAt"],
    order: [["createdAt", "DESC"]],
  });
  return posts.map(({ postId, title, createdAt, User }) => {
    const { nickname } = User.dataValues;
    return { postId, nickname, title, createdAt };
  });
}

async function getOne(id) {
  const post = await Posts.findOne({
    include: [
      {
        model: Users,
        attributes: ["nickname"],
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

  return { postId, UserId, nickname, title, content, createdAt };
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

module.exports = { getAll, getOne, create, update, remove };
