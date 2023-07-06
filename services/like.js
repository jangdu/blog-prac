const LikeRepository = require("../data/like");

class LikeService {
  likeRepository = new LikeRepository();

  put = async (postId, userId) => {
    const existingLike = await this.likeRepository.getByPostIdandUserId(postId, userId);

    if (existingLike) {
      // 이미 좋아요를 눌렀을 경우, 좋아요 삭제
      await this.likeRepository.remove(postId, userId);

      return { message: "좋아요가 취소되었습니다." };
    } else {
      // 좋아요 생성
      await this.likeRepository.create(postId, userId);

      return { message: "좋아요가 생성되었습니다." };
    }
  };

  getPostsByUserId = async (userId) => {
    const likes = await this.likeRepository.getPostsByUserId(userId);
    return likes;
  };
}

module.exports = LikeService;
