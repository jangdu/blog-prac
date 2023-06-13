const express = require("express");
const Posts = require("../schemas/posts");
const router = express.Router();

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

  res.json({ postsData: postsData });
});

module.exports = router;
