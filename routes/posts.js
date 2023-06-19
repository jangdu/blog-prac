const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const Posts = require("../schemas/posts");
const isAuth = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();

    const postsData = posts.map((data) => {
      return {
        postId: data.postId,
        nickname: data.nickname,
        title: data.title,
        createdAt: data.createdAt,
      };
    });

    return res.status(200).json({ data: postsData });
  } catch (error) {
    return res.status(500).json({ error, message: "서버오류" });
  }
});

router.post("/", isAuth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const nickname = req.userId;

    if (!(title && content)) {
      return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }
    const createdPost = await Posts.create({
      postId: uuidv4(),
      nickname,
      title,
      content,
    });

    return res.status(201).json({ message: "게시글을 생성하였습니다." });
  } catch (error) {
    return res.status(500).json({ error, message: "서버오류" });
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Posts.findOne({ postId });

    if (!post) {
      return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
    }

    return res.status(200).json({
      data: {
        postId,
        nickname: post.nickname,
        content: post.content,
        createdAt: post.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({ error, message: "서버오류" });
  }
});

router.put("/:postId", isAuth, async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;

    const nickname = req.userId;
    const post = await Posts.findOne({ postId });

    if (!(title && content)) {
      return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
    }
    if (post === null) {
      return res.status(404).json({ message: "게시글 조회에 실패하였습니다." });
    }
    if (nickname !== post.nickname) {
      return res.status(403).json({ errorMessage: "게시글 수정의 권한이 존재하지 않습니다." });
    }

    console.log(post);

    await Posts.updateOne({ postId }, { $set: { title, content } });

    return res.status(200).json({ message: "게시글을 수정하였습니다." });
  } catch (error) {
    return res.status(500).json({ error, message: "서버오류" });
  }
});

router.delete("/:postId", isAuth, async (req, res) => {
  try {
    const { postId } = req.params;
    const nickname = req.userId;

    const post = await Posts.findOne({ postId });

    if (nickname !== post.nickname) {
      return res.status(403).json({ errorMessage: "게시글 수정의 권한이 존재하지 않습니다." });
    }

    if (!post) {
      return res.status(404).json({ message: "게시글 조회에 실패하였습니다." });
    }

    await Posts.deleteOne({ postId });

    return res.status(200).json({ message: "게시글을 삭제하였습니다." });
  } catch (error) {
    return res.status(500).json({ error, message: "서버오류" });
  }
});

module.exports = router;
