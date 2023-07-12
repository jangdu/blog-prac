const AuthRepository = require("../data/auth");

class AuthService {
  authRepository = new AuthRepository();

  getByNickname = async (nickname) => {
    const existsUsers = await this.authRepository.getByNickname(nickname);
    return existsUsers;
  };

  create = async (nickname, password) => {
    const token = await this.authRepository.createUser(nickname, password);
    return token;
  };

  isValidPassword = async (password, hashedPassword) => {
    const isValidPassword = await this.authRepository.isValidPassword(password, hashedPassword);

    return isValidPassword;
  };

  createJwtToken = async (userId) => {
    const token = await this.authRepository.createJwtToken(userId);
    return token;
  };
}
module.exports = AuthService;
