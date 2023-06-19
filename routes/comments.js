const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const Comments = require("../schemas/comment");
const isAuth = require("../middleware/auth");

router.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comments.find({ postId });

    if (!postId) {
      return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니." });
    }

    const commentsData = comments.map((data) => {
      return {
        commentId: data.commentId,
        nickname: data.nickname,
        content: data.content,
        createdAt: data.createdAt,
      };
    });

    return res.status(200).json({ data: commentsData });
  } catch (error) {
    return res.status(500).json({ error, errorMessage: "서버오류" });
  }
});

router.post("/:postId", isAuth, async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;
    const nickname = req.userId;

    if (!content) {
      return res.status(400).json({ errorMessage: "댓글 내용을 입력해주세요" });
    }

    if (!postId) {
      return res.status(400).json({ errorMessage: "로그인이 필요한 기능입니다. " });
    }

    const createdPost = await Comments.create({
      postId,
      nickname,
      commentId: uuidv4(),
      content,
    });

    return res.status(201).json({ errorMessage: "댓글을 생성하였습니다." });
  } catch (error) {
    return res.status(500).json({ error, errorMessage: "서버오류" });
  }
});

router.put("/:commentId", isAuth, async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const nickname = req.userId;

    const comment = await Comments.findOne({ commentId });

    if (!nickname) {
      return res.status(403).json({ errorMessage: "로그인이 필요한 기능입니다." });
    }
    if (!commentId) {
      return res.status(400).json({ errorMessage: "댓글_id를 입력해주세요." });
    }
    if (!content) {
      return res.status(400).json({ errorMessage: "댓글 내용을 입력해주세요." });
    }
    if (!comment) {
      return res.status(404).json({ errorMessage: "댓글 조회에 실패하였습니다." });
    }

    if (comment.nickname === nickname) {
      await Comments.updateOne({ commentId }, { $set: { content } });
    } else {
      return res.status(401).json({ errorMessage: "수정 권한이 없습니다." });
    }

    return res.status(200).json({ errorMessage: "댓글을 수정하였습니다." });
  } catch (error) {
    return res.status(500).json({ error, errorMessage: "서버오류" });
  }
});

router.delete("/:commentId", isAuth, async (req, res) => {
  try {
    const { commentId } = req.params;
    const nickname = req.userId;

    const comment = await Comments.findOne({ commentId });

    if (!nickname) {
      return res.status(403).json({ errorMessage: "로그인이 필요한 기능입니다." });
    }
    if (!commentId) {
      return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }
    if (!comment) {
      return res.status(404).json({ errorMessage: "댓글 조회에 실패하였습니다." });
    }

    if (comment.nickname === nickname) {
      await Comments.deleteOne({ commentId });
    } else {
      return res.status(401).json({ errorMessage: "삭제 권한이 없습니다." });
    }

    return res.status(200).json({ errorMessage: "댓글을 삭제하였습니다." });
  } catch (error) {
    return res.status(500).json({ error, errorMessage: "서버오류" });
  }
});

module.exports = router;
