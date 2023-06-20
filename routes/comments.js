const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const { Posts, Users, Comments } = require("../models");

const isAuth = require("../middleware/auth");
const { Op } = require("sequelize");

router.get("/:PostId", async (req, res) => {
  try {
    const { PostId } = req.params;

    if (!PostId) {
      return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }
    const post = await Posts.findOne({ where: { PostId } });
    if (!post) {
      return res.status(400).json({ message: "해당 게시글을 찾을 수 없습니다." });
    }

    const comments = await Comments.findAll({
      include: [{ model: Users, attributes: ["nickname"] }],
      attributes: ["PostId", "id", "UserId", "comment", "createdAt"],
      where: { PostId },
    });
    const commentsData = comments.map((data) => {
      return {
        commentId: data.id,
        postId: data.PostId,
        nickname: data.User.dataValues.nickname,
        comment: data.comment,
        createdAt: data.createdAt,
      };
    });

    return res.status(200).json({ data: commentsData });
  } catch (error) {
    return res.status(500).json({ error, errorMessage: "서버오류" });
  }
});

router.post("/:PostId", isAuth, async (req, res) => {
  try {
    const { comment } = req.body;
    const { PostId } = req.params;
    const UserId = req.userId;
    if (!UserId) {
      return res.status(403).json({ errorMessage: "로그인이 필요한 기능입니다." });
    }
    if (!comment) {
      return res.status(400).json({ errorMessage: "댓글 내용을 입력해주세요" });
    }
    if (!PostId) {
      return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }

    const post = await Posts.findOne({ where: { PostId } });

    if (!post) {
      return res.status(400).json({ message: "해당 게시글을 찾을 수 없습니다." });
    }

    const createdPost = await Comments.create({
      PostId,
      UserId,
      comment,
    });

    return res.status(201).json({ errorMessage: "댓글을 생성하였습니다." });
  } catch (error) {
    return res.status(500).json({ error, errorMessage: "서버오류" });
  }
});

router.put("/:commentId", isAuth, async (req, res) => {
  try {
    const id = req.params.commentId;
    const { comment } = req.body;
    const UserId = req.userId;

    if (!UserId) {
      return res.status(403).json({ errorMessage: "로그인이 필요한 기능입니다." });
    }
    if (!id) {
      return res.status(400).json({ errorMessage: "댓글_id를 입력해주세요." });
    }
    if (!comment) {
      return res.status(400).json({ errorMessage: "댓글 내용을 입력해주세요." });
    }

    const hasComments = await Comments.findOne({ where: { id } });
    if (!hasComments) {
      return res.status(404).json({ errorMessage: "댓글 조회에 실패하였습니다." });
    }

    if (UserId !== hasComments.UserId) {
      return res.status(401).json({ errorMessage: "수정 권한이 없습니다." });
    }

    await Comments.update(
      { comment },
      {
        where: {
          [Op.and]: [{ UserId }, { id }],
        },
      }
    );

    return res.status(200).json({ errorMessage: "댓글을 수정하였습니다." });
  } catch (error) {
    return res.status(500).json({ error, errorMessage: "서버오류" });
  }
});

router.delete("/:commentId", isAuth, async (req, res) => {
  try {
    const id = req.params.commentId;
    const UserId = req.userId;

    if (!UserId) {
      return res.status(403).json({ errorMessage: "로그인이 필요한 기능입니다." });
    }
    if (!id) {
      return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }

    const comment = await Comments.findOne({ where: { id } });

    if (!comment) {
      return res.status(404).json({ errorMessage: "댓글 조회에 실패하였습니다." });
    }

    if (comment.UserId !== UserId) {
      return res.status(401).json({ errorMessage: "삭제 권한이 없습니다." });
    }

    await Comments.destroy({
      where: {
        [Op.and]: [{ id }, { UserId }],
      },
    });

    return res.status(200).json({ errorMessage: "댓글을 삭제하였습니다." });
  } catch (error) {
    return res.status(500).json({ error, errorMessage: "서버오류" });
  }
});

module.exports = router;
