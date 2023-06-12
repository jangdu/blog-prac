const express = require("express");
const Posts = require("../schemas/posts");
const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await Posts.find();
  const postIds = carts.map((data) => data.postId);

  const post = await Goods.find({ postId: postIds });

  const results = carts.map((cart) => {
    return {
      quantity: cart.quantity,
      goods: goods.find((item) => item.goodsId === cart.goodsId),
    };
  });

  res.json({ carts: results });
});

module.exports = router;
