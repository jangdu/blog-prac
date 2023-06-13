const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const Posts = require("../schemas/posts");

router.get("/", async (req, res) => {
  const posts = await Posts.find();

  const postsData = posts.map((data) => {
    return {
      postId: data.postId,
      user: data.user,
      title: data.title,
      createdAt: data.createdAt,
    };
  });

  res.json({ data: postsData });
});

router.post("/", async (req, res) => {
  const { user, password, title, content } = req.body;

  if (!(user && password && title && content)) {
    return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
  }
  const createdPost = await Posts.create({
    postId: uuidv4(),
    user,
    password,
    title,
    content,
  });
  console.log(createdPost);

  res.json({ message: "게시글을 생성하였습니다." });
});

module.exports = router;
