const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const { Posts, Users, Comments } = require("../models");

const isAuth = require("../middleware/auth");
const { Op } = require("sequelize");

const commentsController = require("../controller/comments");

router.get("/:PostId", commentsController.getAll);

router.post("/:PostId", isAuth, commentsController.create);

router.put("/:commentId", isAuth, commentsController.update);

router.delete("/:commentId", isAuth, commentsController.remove);

module.exports = router;
