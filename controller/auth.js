const authRepository = require("../data/auth");

const validateString = (string) => {
  const pattern = /^[a-zA-Z0-9]+$/;
  return pattern.test(string);
};

const signup = async (req, res, next) => {
  try {
    const { nickname, password, confirm } = req.body;

    if (!validateString(nickname) || nickname.length < 4) {
      return res.status(412).send({ errorMessage: "닉네임의 형식이 일치하지 않습니다." });
    }
    if (password !== confirm) {
      return res.status(412).send({ errorMessage: "패스워드가 일치하지 않습니다." });
    }
    if (password.length < 5) {
      return res.status(412).send({ errorMessage: "패스워드가 형식이 일치하지 않습니다." });
    }
    if (password.includes(nickname)) {
      return res.status(412).send({ errorMessage: "패스워드에 닉네임이 포함되어 있습니다." });
    }

    const existsUsers = await authRepository.getByNickname(nickname);

    if (existsUsers.length) return res.status(412).send({ errorMessage: "중복된 닉네임입니다." });

    const token = await authRepository.createUser(nickname, password);

    res.status(201).send({ message: "회원 가입에 성공하였습니다.", token });
  } catch (error) {
    return res.status(500).json({ error, message: "서버오류" });
  }
};

const login = async (req, res, next) => {
  const { nickname, password } = req.body;
  const user = await authRepository.getByNickname(nickname);

  if (!user || !user.length || user === null) {
    return res.status(401).json({ errorMessage: "닉네임 또는 패스워드를 확인해주세요." });
  }

  const isValidPassword = await authRepository.isValidPassword(password, user[0].password);
  if (!isValidPassword) {
    return res.status(401).json({ errorMessage: "닉네임 또는 패스워드를 확인해주세요." });
  }
  const token = authRepository.createJwtToken(user[0].userId);
  res.status(200).json({ token, nickname, message: "로그인에 성공했습니다." });
};

module.exports = { signup, login };
