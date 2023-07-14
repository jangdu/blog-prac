import httpMocks from "node-mocks-http";
import AuthMiddleware from "../auth";
import jwt from "jsonwebtoken";
import faker from "faker";
import { Users } from "../../models";
import AuthRepository from "../../data/auth";

jest.mock("jsonwebtoken");
jest.mock("../../data/auth");

describe("AuthMiddleware", () => {
  let authRepository;
  let authMiddleware;
  beforeEach(() => {
    authRepository = new AuthRepository();
    authMiddleware = new AuthMiddleware();
    AuthRepository.mockClear();
  });

  it("401 response : without Authorization Header", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/posts",
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();
    authMiddleware.isAuth(request, response, next);

    await expect(response.statusCode).toBe(401);
    expect(response._getJSONData().message).toBe("로그인이 필요한 기능입니다.");
    expect(next).not.toBeCalled();
  });

  it("401 response : with somethings wrong Authorization Header", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/posts",
      headers: { Authorization: "Basic" },
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();

    await authMiddleware.isAuth(request, response, next);

    expect(response.statusCode).toBe(401);
    expect(response._getJSONData().message).toBe("로그인이 필요한 기능입니다.");
    expect(next).not.toBeCalled();
  });

  it("401 response : 잘못된 jwt 토큰 요청", async () => {
    const token = faker.random.alphaNumeric(128);
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/posts",
      headers: { Authorization: `Bearer ${token}` },
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();

    await authMiddleware.isAuth(request, response, next);

    expect(response.statusCode).toBe(401);
    expect(response._getJSONData().message).toBe("로그인이 필요한 기능입니다.");
    expect(next).not.toBeCalled();
  });

  it("401 response : 해당하는 userId를 찾을 수 없는 요청", async () => {
    const token = faker.random.alphaNumeric(128);
    const userId = faker.random.alphaNumeric(32);
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/posts",
      headers: { Authorization: `Bearer ${token}` },
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();

    jwt.verify = jest.fn((token, secret) => Promise.resolve({ id: 1 }));
    // authRepository.getById = jest.fn((id) => Promise.resolve(undefined));
    // authRepository.getById = jest.fn((userId) => Promise.resolve({ Users: { userId: 12 } }));
    authMiddleware.authRepository.getById = jest.fn().mockResolvedValue(null);

    await authMiddleware.isAuth(request, response, next);

    expect(response.statusCode).toBe(404);
    expect(response._getJSONData().message).toBe("해당하는 유저가 존재하지 않습니다.");
    expect(next).not.toBeCalled();
  });

  it("200 response : 정확한 로그인시 request.userId에 userId 대입", async () => {
    const token = faker.random.alphaNumeric(128);
    const userId = faker.random.alphaNumeric(32);
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/posts",
      headers: { Authorization: `Bearer ${token}` },
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();

    jwt.verify = jest.fn((token, secret) => Promise.resolve({ id: userId }));
    // authRepository.getById = jest.fn((id) => Promise.resolve(undefined));
    // authRepository.getById = jest.fn((userId) => Promise.resolve({ Users: { userId: 12 } }));
    authMiddleware.authRepository.getById = jest.fn().mockResolvedValue(userId);

    await authMiddleware.isAuth(request, response, next);

    expect(response.statusCode).toBe(200);
    expect(request.userId).toMatch(userId);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
