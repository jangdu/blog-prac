const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");
const { Posts, Users } = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.findAll({
      include: [
        {
          model: Users,
          attributes: ["nickname"],
        },
      ],
      attributes: ["postId", "UserId", "title", "createdAt"],
      order: [["createdAt", "DESC"]],
    });

    const postsData = posts.map((data) => {
      return {
        postId: data.postId,
        nickname: data.User.dataValues.nickname,
        title: data.title,
        createdAt: data.createdAt,
        updateAt: data.updateAt,
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
    const UserId = req.userId;

    if (!(title && content)) {
      return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }
    const createdPost = await Posts.create({
      UserId,
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
    const post = await Posts.findOne({
      include: [
        {
          model: Users,
          attributes: ["nickname"],
        },
      ],
      attributes: ["postId", "UserId", "title", "content", "createdAt"],
      where: { postId },
    });

    if (!post) {
      return res.status(400).json({ message: "해당 게시글을 찾을 수 없습니다." });
    }

    return res.status(200).json({
      data: {
        postId,
        nickname: post.User.dataValues.nickname,
        title: post.title,
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

    const userId = req.userId;
    const post = await Posts.findOne({ where: { postId } });

    if (!(title && content)) {
      return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
    }
    if (post === null) {
      return res.status(404).json({ message: "게시글 조회에 실패하였습니다." });
    }
    if (userId !== post.UserId) {
      return res.status(403).json({ errorMessage: "게시글 수정의 권한이 존재하지 않습니다." });
    }

    // await Posts.updateOne({ postId }, { $set: { title, content } });
    await Posts.update(
      { title, content },
      {
        where: {
          [Op.and]: [{ postId }, { UserId: userId }],
        },
      }
    );

    return res.status(200).json({ message: "게시글을 수정하였습니다." });
  } catch (error) {
    return res.status(500).json({ error, message: "서버오류" });
  }
});

router.delete("/:postId", isAuth, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.userId;

    const post = await Posts.findOne({ where: { postId } });

    if (userId !== post.UserId) {
      return res.status(403).json({ errorMessage: "게시글 수정의 권한이 존재하지 않습니다." });
    }

    if (!post) {
      return res.status(404).json({ message: "게시글 조회에 실패하였습니다." });
    }

    await Posts.destroy({
      where: {
        [Op.and]: [{ postId }, { UserId: userId }],
      },
    });

    return res.status(200).json({ message: "게시글을 삭제하였습니다." });
  } catch (error) {
    return res.status(500).json({ error, message: "서버오류" });
  }
});

module.exports = router;
