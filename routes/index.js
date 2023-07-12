const express = require("express");
const router = express.Router();

const postsRouter = require("./posts");
const commentsRouter = require("./comments");
const authRouter = require("./auth");
const likeRouter = require("./like");

router.use("/posts", likeRouter, postsRouter);
router.use("/comments", commentsRouter);
router.use("/auth", authRouter);

module.exports = router;
