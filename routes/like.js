const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middleware/auth");
const LikeController = require("../controller/like");

const likeController = new LikeController();

const { isAuth } = new AuthMiddleware();

router.get("/likes", isAuth, likeController.getByUserId);

router.put("/:postId/likes", isAuth, likeController.toggleLike);

module.exports = router;
