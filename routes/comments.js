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

module.exports = router;
