const postsRepository = require("../data/posts");
const likeRepository = require("../data/like");

const toggleLike = async (req, res, next) => {
  const { postId } = req.params;
  const userId = req.userId;

  try {
    // 해당 포스트 조회
    const post = await postsRepository.getByPostId(postId);

    if (!post) {
      return res.status(404).json({ message: "포스트를 찾을 수 없습니다." });
    }

    // 좋아요 여부 확인
    const existingLike = await likeRepository.getByPostIdandUserId(postId, userId);

    if (existingLike) {
      // 이미 좋아요를 눌렀을 경우, 좋아요 삭제
      await likeRepository.remove(postId, userId);

      return res.status(200).json({ message: "좋아요가 취소되었습니다." });
    } else {
      // 좋아요 생성
      await likeRepository.create(postId, userId);

      return res.status(200).json({ message: "좋아요가 생성되었습니다." });
    }
  } catch (error) {
    console.error("좋아요 처리 중 오류가 발생했습니다.", error);
    return res.status(500).json({ message: "서버 오류" });
  }
};

const getByUserId = async (req, res, next) => {
  const userId = req.userId;
  console.log(userId);

  try {
    const likes = await likeRepository.getPostsByUserId(userId);
    console.log(likes);
    return res.status(200).json(likes);
  } catch (error) {
    console.error("좋아요 조회 처리 중 오류가 발생했습니다.", error);
    return res.status(500).json({ message: "서버오류", error });
  }
};

module.exports = { toggleLike, getByUserId };
