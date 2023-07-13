import { request } from "express";
import httpMocks from "node-mocks-http";
import AuthMiddleware from "../auth";

describe("AuthMiddleware", () => {
  // let authMiddleware: AuthMiddleware;
  // let req: any;
  // let res: any;
  // let next: any;

  // beforeEach(() => {
  //   authMiddleware = new AuthMiddleware();
  //   req = {
  //     get: jest.fn(),
  //     status: jest.fn().mockReturnThis(),
  //     json: jest.fn(),
  //   };
  //   res = {
  //     status: jest.fn().mockReturnThis(),
  //     json: jest.fn(),
  //   };
  //   next = jest.fn();
  // });

  // afterEach(() => {
  //   jest.clearAllMocks();
  // });

  it("401 response : without Authorization Header", () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/posts",
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();
    const authMiddleware = new AuthMiddleware();
    authMiddleware.isAuth(request, response, next);

    expect(response.statusCode).toBe(401);
    expect(response._getJSONData().message).toBe("로그인이 필요한 기능입니다.");
    expect(next).not.toBeCalled();
  });

  // it("유효한 토큰값: 쿠키를 해독해 userId를 req.userId에 대입 후 next()", async () => {
  //   // 유효한 토큰값
  //   req.get.mockReturnValue("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjg5MTYyMjAwLCJleHAiOjE2ODkzMzUwMDB9.qH0SmCS_xXctzeYEQ4C_RkveP_tA8aR0MbUHgrANPOU");
  // });
});
