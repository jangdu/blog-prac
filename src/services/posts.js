const PostsRepository = require("../data/posts");

class PostsService {
  postsRepository = new PostsRepository();

  findAll = async () => {
    return await this.postsRepository.getAll();
  };

  getById = async (postId) => {
    const post = await this.postsRepository.getOne(postId);

    return post;
  };

  create = async (userId, title, content) => {
    const post = this.postsRepository.create(userId, title, content);
    return post;
  };

  update = async (postId, userId, title, content) => {
    console.log("");
    const updatedPost = await this.postsRepository.update(postId, userId, title, content);

    return updatedPost;
  };

  remove = async (postId, userId) => {
    const removedPost = await this.postsRepository.remove(postId, userId);
    return removedPost;
  };
}

module.exports = PostsService;
