const jwt = require("jsonwebtoken");

const { Op } = require("sequelize");
const { User } = require("../models");

const AUTH_ERROR = { message: "로그인이 필요한 기능입니다." };

const isAuth = async (req, res, next) => {
  const nickname = req.body.user;
  const authHeader = req.get("Authorization");
  console.log(authHeader);
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(" ")[1];
  // todo: Make it secure
  jwt.verify(token, "MPVjj3#we9DS4oV6mm8a$$6b9tqv4wMu", async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
    const existsUsers = await User.findAll({
      where: {
        [Op.or]: [{ nickname }],
      },
    });
    if (!existsUsers.length) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.userId = existsUsers;
    next();
  });
};
module.exports = isAuth;
