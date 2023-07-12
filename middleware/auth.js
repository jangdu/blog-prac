const jwt = require("jsonwebtoken");

const { Op } = require("sequelize");
const { Users } = require("../models");

class AuthMiddleware {
  AUTH_ERROR = { message: "로그인이 필요한 기능입니다." };

  isAuth = async (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!(authHeader && authHeader.startsWith("Bearer "))) {
      return res.status(401).json(this.AUTH_ERROR);
    }

    const token = authHeader.split(" ")[1];

    // todo: Make it secure
    jwt.verify(token, "MPVjj3#we9DS4oV6mm8a$$6b9tqv4wMu", async (error, decoded) => {
      if (error) {
        return res.status(401).json(this.AUTH_ERROR);
      }
      if (!decoded.id) {
        return res.status(403).json({ errorMessage: "전달 된 쿠키에서 오류가 발생하였습니다." });
      }
      const existsUsers = await Users.findAll({
        where: {
          [Op.or]: [{ userId: decoded.id }],
        },
      });
      if (!existsUsers.length) {
        return res.status(401).json(this.AUTH_ERROR);
      }
      req.userId = decoded.id;
      next();
    });
  };
}
module.exports = AuthMiddleware;
