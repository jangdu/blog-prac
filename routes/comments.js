const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const Comments = require("../schemas/comment");

router.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comments.find({ postId });

    if (!postId) {
      return res.status(400).json({ message: "데이터 형식이 올바르지 않습니." });
    }

    const commentsData = comments.map((data) => {
      return {
        commentId: data.commentId,
        user: data.user,
        content: data.content,
        createdAt: data.createdAt,
      };
    });

    res.json({ data: commentsData });
  } catch (error) {
    res.status(500).json({ error, message: "서버오류" });
  }
});

router.post("/:postId", async (req, res) => {
  try {
    const { user, password, content } = req.body;
    const { postId } = req.params;

    if (!content) {
      return res.status(400).json({ errorMessage: "댓글 내용을 입력해주세요" });
    }

    if (!(user && password && postId)) {
      return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }
    const createdPost = await Comments.create({
      postId,
      user,
      password,
      commentId: uuidv4(),
      content,
    });

    res.json({ message: "댓글을 생성하였습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error, message: "서버오류" });
  }
});

module.exports = router;
