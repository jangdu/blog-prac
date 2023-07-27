import { getCustomRepository, getRepository } from "typeorm";
import UserRepository from "../data/user.repository";
import { User } from "../entity/User";

class UserService {
  private userRepository = getCustomRepository(UserRepository);
  getByNickname = async (nickname: string) => {
    const existsUsers = await this.userRepository.getByNickname(nickname);
    return existsUsers;
  };

  create = async (nickname: string, password: string, name: string, age: number, email: string) => {
    const token = await this.userRepository.createUser(nickname, password, name, age, email);
    return token;
  };

  isValidPassword = async (password: string, hashedPassword: string) => {
    const isValidPassword = await this.userRepository.isValidPassword(password, hashedPassword);

    return isValidPassword;
  };

  createJwtToken = async (userId: number) => {
    const token = await this.userRepository.createJwtToken(userId);
    return token;
  };
}
export default UserService;
