const postsRepository = require("../data/posts");

async function getAll(req, res, next) {
  try {
    const posts = await postsRepository.getAll();
    return res.status(200).json({ data: posts });
  } catch (error) {
    return res.status(500).json({ error, message: "서버오류" });
  }
}

async function getOne(req, res) {
  try {
    const { postId } = req.params;
    if (!postId) return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });

    const post = await postsRepository.getOne(postId);

    if (post.errorMessage) return res.status(400).json({ errorMessage: post.errorMessage });

    return res.status(200).json({ data: post });
  } catch (error) {
    return res.status(500).json({ error, message: "서버오류" });
  }
}

async function create(req, res) {
  try {
    const { title, content } = req.body;
    const UserId = req.userId;

    if (!(title && content)) return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    if (!UserId) return res.status(403).json({ errorMessage: "로그인이 필요한 기능입니다." });

    postsRepository.create(UserId, title, content);

    return res.status(201).json({ message: "게시글을 생성하였습니다." });
  } catch (error) {
    return res.status(500).json({ error, message: "서버오류" });
  }
}

async function update(req, res) {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;

    const userId = req.userId;

    if (!userId) return res.status(403).json({ errorMessage: "로그인이 필요한 기능입니다." });

    if (!(title && content && postId)) {
      return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
    }

    const post = await postsRepository.getOne(postId);

    if (post.errorMessage) return res.status(400).json({ errorMessage: post.errorMessage });

    if (userId !== post.UserId) return res.status(403).json({ errorMessage: "게시글 수정의 권한이 존재하지 않습니다." });

    await postsRepository.update(postId, userId, title, content);

    return res.status(200).json({ message: "게시글을 수정하였습니다." });
  } catch (error) {
    return res.status(500).json({ error, message: "서버오류" });
  }
}

async function remove(req, res) {
  try {
    const { postId } = req.params;
    const userId = req.userId;

    if (!userId) return res.status(403).json({ errorMessage: "로그인이 필요한 기능입니다." });
    if (!postId) return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });

    const post = await postsRepository.getOne(postId);

    if (post.errorMessage) return res.status(400).json({ errorMessage: post.errorMessage });

    if (userId !== post.UserId) return res.status(403).json({ errorMessage: "게시글 수정의 권한이 존재하지 않습니다." });

    await postsRepository.remove(postId, userId);

    return res.status(200).json({ message: "게시글을 삭제하였습니다." });
  } catch (error) {
    return res.status(500).json({ error, message: "서버오류" });
  }
}

module.exports = { getAll, getOne, create, update, remove };
