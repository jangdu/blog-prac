const { Op } = require("sequelize");
const { Users } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const jwtSecretKey = "MPVjj3#we9DS4oV6mm8a$$6b9tqv4wMu";
const jwtExpiresInDays = "2d"; // 기간
const bcryptSaltRounds = 12; // 길이

const getByNickname = (nickname) => {
  const existsUsers = Users.findAll({
    where: {
      [Op.or]: [{ nickname }],
    },
  });
  return existsUsers;
};

const createJwtToken = (id) => {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
};

const createUser = async (nickname, password) => {
  console.log(nickname);
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);

  await Users.create({ nickname, password: hashed });

  return await createJwtToken(nickname);
};

const isValidPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = { getByNickname, createJwtToken, createUser, isValidPassword };
