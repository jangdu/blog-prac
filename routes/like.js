const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middleware/auth");
const likeController = require("../controller/like");

const { isAuth } = new AuthMiddleware();

router.get("/likes", isAuth, likeController.getByUserId);

router.put("/:postId/likes", isAuth, likeController.toggleLike);

module.exports = router;
