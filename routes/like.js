import express from "express";
const router = express.Router();
import AuthMiddleware from "../middleware/auth.js";
import LikeController from "../controller/like.js";

const likeController = new LikeController();

const { isAuth } = new AuthMiddleware();

router.get("/likes", isAuth, likeController.getByUserId);

router.put("/:postId/likes", isAuth, likeController.toggleLike);

export default router;
