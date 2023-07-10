import express from "express";
const router = express.Router();
import PostsController from "../controller/posts.js";
import AuthMiddleware from "../middleware/auth.js";

const postsController = new PostsController();
const { isAuth } = new AuthMiddleware();

router.get("/", postsController.getAll);

router.get("/:postId", postsController.getOne);

router.post("/", isAuth, postsController.create);

router.put("/:postId", isAuth, postsController.update);

router.delete("/:postId", isAuth, postsController.remove);

export default router;
