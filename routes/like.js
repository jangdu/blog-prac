const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");
const likeController = require("../controller/like");

router.get("/likes", isAuth, likeController.getByUserId);

router.put("/:postId/likes", isAuth, likeController.toggleLike);

module.exports = router;
