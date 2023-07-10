import express from "express";

const router = express.Router();

import postsRouter from "./posts.js";
import commentsRouter from "./comments.js";
import authRouter from "./auth.js";
import likeRouter from "./like.js";

router.use("/posts", likeRouter, postsRouter);
router.use("/comments", commentsRouter);
router.use("/auth", authRouter);

export default router;
