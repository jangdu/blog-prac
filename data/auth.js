import { Op } from "sequelize";
const { Users } = db.import("../models/index.js");
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class AuthRepository {
  jwtSecretKey = "MPVjj3#we9DS4oV6mm8a$$6b9tqv4wMu";
  jwtExpiresInDays = "2d"; // 기간
  bcryptSaltRounds = 12; // 길이

  getByNickname = (nickname) => {
    const existsUsers = Users.findAll({
      where: {
        [Op.or]: [{ nickname }],
      },
    });
    return existsUsers;
  };

  createJwtToken = (id) => {
    return jwt.sign({ id }, this.jwtSecretKey, { expiresIn: this.jwtExpiresInDays });
  };

  createUser = async (nickname, password) => {
    const hashed = await bcrypt.hash(password, this.bcryptSaltRounds);

    await Users.create({ nickname, password: hashed });

    return await this.createJwtToken(nickname);
  };

  isValidPassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  };
}

export default AuthRepository;
