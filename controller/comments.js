import PostsService from "../services/posts.js";
import CommentsService from "../services/comments.js";

class CommentsController {
  postsService = new PostsService();
  commentsService = new CommentsService();
  getAll = async (req, res) => {
    try {
      const { PostId } = req.params;
      if (!PostId) return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });

      const post = await this.postsService.getById(PostId);
      if (post.errorMessage) return res.status(400).json({ errorMessage: post.errorMessage });

      const commentsData = await this.commentsService.getAll(PostId);

      return res.status(200).json({ data: commentsData });
    } catch (error) {
      return res.status(500).json({ error, errorMessage: "서버오류" });
    }
  };

  create = async (req, res) => {
    try {
      const { comment } = req.body;
      const { PostId } = req.params;
      const UserId = req.userId;
      if (!UserId) return res.status(403).json({ errorMessage: "로그인이 필요한 기능입니다." });
      if (!comment) return res.status(400).json({ errorMessage: "댓글 내용을 입력해주세요" });
      if (!PostId) return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });

      const post = await this.postsService.getById(PostId);
      if (post.errorMessage) return res.status(400).json({ errorMessage: post.errorMessage });

      await this.commentsService.create(PostId, UserId, comment);

      return res.status(201).json({ errorMessage: "댓글을 생성하였습니다." });
    } catch (error) {
      return res.status(500).json({ error, errorMessage: "서버오류" });
    }
  };

  update = async (req, res) => {
    try {
      const id = req.params.commentId;
      const { comment } = req.body;
      const UserId = req.userId;

      if (!UserId) return res.status(403).json({ errorMessage: "로그인이 필요한 기능입니다." });
      if (!id) return res.status(400).json({ errorMessage: "댓글_id를 입력해주세요." });
      if (!comment) return res.status(400).json({ errorMessage: "댓글 내용을 입력해주세요." });

      const hasComments = await this.commentsService.getById(id);
      if (hasComments.errorMessage) return res.status(404).json({ errorMessage: hasComments.errorMessage });

      if (hasComments.UserId !== UserId) return res.status(401).json({ errorMessage: "수정 권한이 없습니다." });

      await this.commentsService.update(comment, UserId, id);

      return res.status(200).json({ errorMessage: "댓글을 수정하였습니다." });
    } catch (error) {
      return res.status(500).json({ error, errorMessage: "서버오류" });
    }
  };

  remove = async (req, res) => {
    try {
      const id = req.params.commentId;
      const UserId = req.userId;

      if (!UserId) return res.status(403).json({ errorMessage: "로그인이 필요한 기능입니다." });
      if (!id) return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });

      const hasComments = await this.commentsService.getById(id);
      if (hasComments.errorMessage) return res.status(404).json({ errorMessage: hasComments.errorMessage });

      if (hasComments.UserId !== UserId) return res.status(401).json({ errorMessage: "삭제 권한이 없습니다." });

      await this.commentsService.remove(id, UserId);

      return res.status(200).json({ errorMessage: "댓글을 삭제하였습니다." });
    } catch (error) {
      return res.status(500).json({ error, errorMessage: "서버오류" });
    }
  };
}

export default CommentsController;
