const express = require("express");
const router = express.Router();
import AuthController from "../controller/user.controller";

const authController = new AuthController();

router.post("/signup", authController.signup);

router.post("/login", authController.login);

export default router;
