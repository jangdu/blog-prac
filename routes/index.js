const express = require("express");
const router = express.Router();

const postsRouter = require("./posts");
const commentsRouter = require("./comments");
const authRouter = require("./auth");

router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);
router.use("/auth", authRouter);

module.exports = router;
