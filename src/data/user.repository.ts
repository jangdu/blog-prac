const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import { DataSource, EntityRepository, Repository } from "typeorm";
import { User } from "../entity/User";

// AppDataSource.initialize()
//   .then(() => {
//     console.log("Data Source has been initialized!");
//   })
//   .catch((err) => {
//     console.error("Error during Data Source initialization:", err);
//   });
// @EntityRepository(User)
class UserRepository extends Repository<User> {
  jwtSecretKey = "MPVjj3#we9DS4oV6mm8a$$6b9tqv4wMu";
  jwtExpiresInDays = "2d"; // 기간
  bcryptSaltRounds = 12; // 길이

  getById = async (id: number) => {
    const existsUsers = await this.findOneBy({ id });
    return existsUsers;
  };

  getByNickname = async (nickname: string) => {
    const existsUsers = await this.findOneBy({ nickname });
    return existsUsers;
  };

  createJwtToken = (id: number) => {
    return jwt.sign({ id }, this.jwtSecretKey, { expiresIn: this.jwtExpiresInDays });
  };

  createUser = async (nickname: string, password: string, name: string, age: number, email: string) => {
    const hashed = await bcrypt.hash(password, this.bcryptSaltRounds);

    const newUser = await this.create({ nickname, password: hashed, name, age, email });

    return await this.createJwtToken(newUser.id);
  };

  isValidPassword = async (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
  };
}

export default UserRepository;
