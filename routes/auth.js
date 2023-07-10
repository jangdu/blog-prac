import express from "express";
const router = express.Router();
import AuthController from "../controller/auth.js";

const authController = new AuthController();

router.post("/signup", authController.signup);

router.post("/login", authController.login);

export default router;
