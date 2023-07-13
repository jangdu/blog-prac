const jwt = require("jsonwebtoken");

const { Op } = require("sequelize");
const { Users } = require("../models");
const AuthRepository = require("../data/auth");

class AuthMiddleware {
  AUTH_ERROR = { message: "로그인이 필요한 기능입니다." };
  authRepository = new AuthRepository();
  isAuth = async (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!(authHeader && authHeader.startsWith("Bearer "))) {
      return res.status(401).json(this.AUTH_ERROR);
    }

    const token = authHeader.split(" ")[1];

    // todo: Make it secure
    try {
      const decoded = await jwt.verify(token, "MPVjj3#we9DS4oV6mm8a$$6b9tqv4wMu");
      if (!decoded.id || !decoded) {
        return res.status(403).json({ message: "전달 된 쿠키에서 오류가 발생하였습니다." });
      }

      console.log(decoded);
      const existsUsers = await this.authRepository.getById(decoded.id);

      if (!existsUsers) {
        return res.status(404).json({ message: "잘못된 UserId" });
      }

      req.userId = decoded.id;
      next();
    } catch (error) {
      return res.status(401).json(this.AUTH_ERROR);
    }
  };
}
module.exports = AuthMiddleware;
