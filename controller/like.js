const LikeService = require("../services/like");
const PostsService = require("../services/posts");

class LikeController {
  postService = new PostsService();
  likeService = new LikeService();

  toggleLike = async (req, res, next) => {
    const { postId } = req.params;
    const userId = req.userId;

    try {
      // 해당 포스트 조회
      const post = await this.postService.getById(postId);

      if (!post) {
        return res.status(404).json({ message: "포스트를 찾을 수 없습니다." });
      }

      // 좋아요 여부
      const { message } = await this.likeService.put(postId, userId);

      return res.status(200).json({ message: message });
    } catch (error) {
      console.error("좋아요 처리 중 오류가 발생했습니다.", error);
      return res.status(500).json({ message: "서버 오류" });
    }
  };

  getByUserId = async (req, res, next) => {
    const userId = req.userId;

    try {
      const likes = await this.likeService.getPostsByUserId(userId);
      return res.status(200).json(likes);
    } catch (error) {
      console.error("좋아요 조회 처리 중 오류가 발생했습니다.", error);
      return res.status(500).json({ message: "서버오류", error });
    }
  };
}

module.exports = LikeController;
