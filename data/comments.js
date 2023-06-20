const { Users, Comments } = require("../models");
const { Op } = require("sequelize");

async function getAll(PostId) {
  const comments = await Comments.findAll({
    include: [{ model: Users, attributes: ["nickname"] }],
    attributes: ["PostId", "id", "UserId", "comment", "createdAt"],
    where: { PostId },
  });
  if (!comments) {
    return { errorMessage: "해당하는 게시물을 찾을 수 없습니다." };
  }
  return comments.map((data) => {
    return {
      commentId: data.id,
      postId: data.PostId,
      nickname: data.User.dataValues.nickname,
      comment: data.comment,
      createdAt: data.createdAt,
    };
  });
}

async function getOne(id) {
  const comment = await Comments.findOne({ where: { id } });
  if (!comment) {
    return { errorMessage: "해당하는 댓글을 찾을 수 없습니다." };
  }
  console.log(comment);
  return comment;
}

async function create(PostId, UserId, comment) {
  const createdPost = await Comments.create({
    PostId,
    UserId,
    comment,
  });
}

async function update(comment, UserId, id) {
  return await Comments.update(
    { comment },
    {
      where: {
        [Op.and]: [{ UserId }, { id }],
      },
    }
  );
}

async function remove(id, UserId) {
  Comments.destroy({
    where: {
      [Op.and]: [{ id }, { UserId }],
    },
  });
}

module.exports = { getAll, getOne, create, update, remove };
