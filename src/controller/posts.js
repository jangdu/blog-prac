const PostsRepository = require("../data/posts");
const PostsService = require("../services/posts");

class PostsController {
  postsRepository = new PostsRepository();
  postsService = new PostsService();

  getAll = async (req, res, next) => {
    try {
      const posts = await this.postsService.findAll();
      return res.status(200).json({ data: posts });
    } catch (error) {
      return res.status(500).json({ error, message: "서버오류" });
    }
  };

  getOne = async (req, res) => {
    try {
      const { postId } = req.params;
      if (!postId) return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });

      const post = await this.postsService.getById(postId);

      if (!post) {
        return res.status(404).json({ errorMessage: "해당하는 게시글을 찾을 수 없습니다." });
      }

      return res.status(200).json({ data: post });
    } catch (error) {
      return res.status(500).json({ error, message: "서버오류" });
    }
  };

  create = async (req, res) => {
    try {
      const { title, content } = req.body;
      const UserId = req.userId;

      if (!(title && content)) return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });

      if (!UserId) return res.status(403).json({ errorMessage: "로그인이 필요한 기능입니다." });

      const newPost = this.postsService.create(UserId, title, content);

      if (!newPost) return res.status(500).json({ errorMessage: "게시글 생성의 문제가 발생했습니다." });

      return res.status(201).json({ message: "게시글을 생성하였습니다." });
    } catch (error) {
      return res.status(500).json({ error, message: "서버오류" });
    }
  };

  update = async (req, res) => {
    try {
      console.log("aaaaa");
      const { postId } = req.params;
      const { title, content } = req.body;

      const userId = req.userId;

      if (!userId) return res.status(403).json({ errorMessage: "로그인이 필요한 기능입니다." });

      if (!(title && content && postId)) {
        return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
      }

      const post = await this.postsService.getById(postId);

      if (!post) return res.status(400).json({ errorMessage: "해당하는 게시글을 찾을 수 없습니다." });

      if (userId !== post.UserId) return res.status(403).json({ errorMessage: "게시글 수정의 권한이 존재하지 않습니다." });

      const updatedPost = await this.postsService.update(postId, userId, title, content);

      return res.status(200).json({ message: "게시글을 수정하였습니다." });
    } catch (error) {
      return res.status(500).json({ error, message: "서버오류" });
    }
  };

  remove = async (req, res) => {
    try {
      const { postId } = req.params;
      const userId = req.userId;

      if (!userId) return res.status(403).json({ errorMessage: "로그인이 필요한 기능입니다." });
      if (!postId) return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });

      const post = await this.postsService.getById(postId);

      if (!post) return res.status(400).json({ errorMessage: "해당하는 게시글을 찾을 수 없습니다." });

      if (userId !== post.UserId) return res.status(403).json({ errorMessage: "게시글 수정의 권한이 존재하지 않습니다." });

      const removedPost = await this.postsService.remove(postId, userId);

      return res.status(200).json({ message: "게시글을 삭제하였습니다." });
    } catch (error) {
      return res.status(500).json({ error, message: "서버오류" });
    }
  };
}

module.exports = PostsController;
