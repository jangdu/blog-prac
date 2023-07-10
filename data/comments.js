const { Users, Comments } = db.import("../models");
import { Op } from "sequelize";

class CommentsRepository {
  getAll = async (PostId) => {
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
  };

  getOne = async (id) => {
    const comment = await Comments.findOne({ where: { id } });
    if (!comment) {
      return { errorMessage: "해당하는 댓글을 찾을 수 없습니다." };
    }
    return comment;
  };

  create = async (PostId, UserId, comment) => {
    const createdPost = await Comments.create({
      PostId,
      UserId,
      comment,
    });
  };

  update = async (comment, UserId, id) => {
    return await Comments.update(
      { comment },
      {
        where: {
          [Op.and]: [{ UserId }, { id }],
        },
      }
    );
  };

  remove = async (id, UserId) => {
    Comments.destroy({
      where: {
        [Op.and]: [{ id }, { UserId }],
      },
    });
  };
}

export default CommentsRepository;
