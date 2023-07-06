const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");
const { Posts, Users } = require("../models");
const { Op } = require("sequelize");
const PostsController = require("../controller/posts");
//import * as tweetController from '../controller/tweet.js';

const postsController = new PostsController();

router.get("/", postsController.getAll);

router.get("/:postId", postsController.getOne);

router.post("/", isAuth, postsController.create);

router.put("/:postId", isAuth, postsController.update);

router.delete("/:postId", isAuth, postsController.remove);

module.exports = router;
