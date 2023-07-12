const express = require("express");
const router = express.Router();
const AuthController = require("../controller/auth");

const authController = new AuthController();

router.post("/signup", authController.signup);

router.post("/login", authController.login);

module.exports = router;
