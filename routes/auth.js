const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { Op } = require("sequelize");
const { User } = require("../models");

const jwtSecretKey = "MPVjj3#we9DS4oV6mm8a$$6b9tqv4wMu";
const jwtExpiresInDays = "2d"; // 기간
const bcryptSaltRounds = 12; // 길이

const createJwtToken = (id) => {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
};

router.get("/", (req, res, next) => {
  res.json({ message: "auth" });
});

router.post("/signup", async (req, res, next) => {
  try {
    const { nickname, password, confirm } = req.body;

    if (password !== confirm) {
      return res.status(400).send({ errorMessage: "패스워드가 일치하지 않습니다." });
    }

    const existsUsers = await User.findAll({
      where: {
        [Op.or]: [{ nickname }],
      },
    });

    if (existsUsers.length) {
      return res.status(409).send({ errorMessage: "중복된 닉네임입니다." });
    }

    const hashed = await bcrypt.hash(password, bcryptSaltRounds);

    await User.create({ nickname, password: hashed });
    const token = createJwtToken(nickname);

    res.status(201).send({ message: "회원 가입에 성공하였습니다.", token });
  } catch (error) {
    return res.status(500).json({ error, message: "서버오류" });
  }
});

module.exports = router;
