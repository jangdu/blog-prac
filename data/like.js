const { Users, Posts, Like, sequelize } = db.import("../models/index.js");

class LikeRepository {
  getByPostIdandUserId = async (postId, userId) => {
    return await Like.findOne({
      where: {
        postId,
        userId,
      },
    });
  };

  getPostsByUserId = async (userId) => {
    const likedPosts = await Like.findAll({
      where: { userId },
      include: [
        {
          model: Posts,
          include: [
            {
              model: Users,
              attributes: ["nickname"],
            },
          ],
          attributes: ["postId", "title", "createdAt", [sequelize.literal("(SELECT COUNT(*) FROM likes WHERE Post.postId = postId)"), "likeCount"]],
          group: ["Posts"], // 그룹화하여 중복 제거
          order: [[sequelize.literal("likeCount"), "DESC"]],
        },
      ],
      attributes: [],
    });

    return likedPosts;
  };

  create = async (postId, userId) => {
    return await Like.create({
      postId,
      userId,
    });
  };

  remove = async (postId, userId) => {
    return await Like.destroy({
      where: {
        postId,
        userId,
      },
    });
  };
}

export default LikeRepository;
