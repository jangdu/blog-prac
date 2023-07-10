import express from "express";
const router = express.Router();

import AuthMiddleware from "../middleware/auth.js";
import CommentsController from "../controller/comments.js";

const commentsController = new CommentsController();
const { isAuth } = new AuthMiddleware();

router.get("/:PostId", commentsController.getAll);

router.post("/:PostId", isAuth, commentsController.create);

router.put("/:commentId", isAuth, commentsController.update);

router.delete("/:commentId", isAuth, commentsController.remove);

export default router;
