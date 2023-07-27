import { Router } from "express";

export const router = Router();

const postsRouter = require("./posts");
const commentsRouter = require("./comments");
import authRouter from "./user.router";
const likeRouter = require("./like");

router.use("/posts", likeRouter, postsRouter);
router.use("/comments", commentsRouter);
router.use("/auth", authRouter);

// module.exports = router;
