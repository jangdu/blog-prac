const postsRepository = require("../data/posts");
const commentsRepository = require("../data/comments");

async function getAll(req, res) {
  try {
    const { PostId } = req.params;
    if (!PostId) return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });

    const post = await postsRepository.getOne(PostId);
    if (post.errorMessage) return res.status(400).json({ errorMessage: post.errorMessage });

    const commentsData = await commentsRepository.getAll(PostId);

    return res.status(200).json({ data: commentsData });
  } catch (error) {
    return res.status(500).json({ error, errorMessage: "서버오류" });
  }
}

async function create(req, res) {
  try {
    const { comment } = req.body;
    const { PostId } = req.params;
    const UserId = req.userId;
    if (!UserId) return res.status(403).json({ errorMessage: "로그인이 필요한 기능입니다." });
    if (!comment) return res.status(400).json({ errorMessage: "댓글 내용을 입력해주세요" });
    if (!PostId) return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });

    const post = await postsRepository.getOne(PostId);
    if (post.errorMessage) return res.status(400).json({ errorMessage: post.errorMessage });

    await commentsRepository.create(PostId, UserId, comment);

    return res.status(201).json({ errorMessage: "댓글을 생성하였습니다." });
  } catch (error) {
    return res.status(500).json({ error, errorMessage: "서버오류" });
  }
}

async function update(req, res) {
  try {
    const id = req.params.commentId;
    const { comment } = req.body;
    const UserId = req.userId;

    if (!UserId) return res.status(403).json({ errorMessage: "로그인이 필요한 기능입니다." });
    if (!id) return res.status(400).json({ errorMessage: "댓글_id를 입력해주세요." });
    if (!comment) return res.status(400).json({ errorMessage: "댓글 내용을 입력해주세요." });

    const hasComments = await commentsRepository.getOne(id);
    if (hasComments.errorMessage) return res.status(404).json({ errorMessage: hasComments.errorMessage });

    if (hasComments.UserId !== UserId) return res.status(401).json({ errorMessage: "수정 권한이 없습니다." });

    await commentsRepository.update(comment, UserId, id);

    return res.status(200).json({ errorMessage: "댓글을 수정하였습니다." });
  } catch (error) {
    return res.status(500).json({ error, errorMessage: "서버오류" });
  }
}

async function remove(req, res) {
  try {
    const id = req.params.commentId;
    const UserId = req.userId;

    if (!UserId) return res.status(403).json({ errorMessage: "로그인이 필요한 기능입니다." });
    if (!id) return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });

    const hasComments = await commentsRepository.getOne(id);
    if (hasComments.errorMessage) return res.status(404).json({ errorMessage: hasComments.errorMessage });

    if (hasComments.UserId !== UserId) return res.status(401).json({ errorMessage: "삭제 권한이 없습니다." });

    await commentsRepository.remove(id, UserId);

    return res.status(200).json({ errorMessage: "댓글을 삭제하였습니다." });
  } catch (error) {
    return res.status(500).json({ error, errorMessage: "서버오류" });
  }
}

module.exports = { getAll, create, update, remove };
