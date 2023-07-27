const CommentsRepository = require("../data/comments");

class CommetsService {
  commentsRepository = new CommentsRepository();

  getAll = async (postId) => {
    const comments = await this.commentsRepository.getAll(postId);
    return comments;
  };

  getById = async (id) => {
    const comment = await this.commentsRepository.getOne(id);
    return comment;
  };

  create = async (postId, userId, comment) => {
    const createdComment = await this.commentsRepository.create(postId, userId, comment);
    return createdComment;
  };

  update = async (comment, userId, id) => {
    const updatedComment = await this.commentsRepository.update(comment, userId, id);
    return updatedComment;
  };

  remove = async (id, userId) => {
    const removeComment = await this.commentsRepository.remove(id, userId);
    return removeComment;
  };
}
module.exports = CommetsService;
