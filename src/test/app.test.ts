import supertest from "supertest";
import { describe, expect, it } from "@jest/globals";
import App from "../app";

describe("Auth APIs", () => {
  //   let server;
  let app;
  let server;

  beforeAll(() => {
    app = new App();
    server = supertest(app.app);
  });

  it("200: app.ts test", async () => {
    // 테스트 코드 작성

    // GET / 요청 보내기
    const response = await server.get("/");

    // 응답 검증
    expect(response.status).toBe(200);
    expect(response.body).toBe("blog-api");
    // 추가적인 테스트 검증 로직
  }); // 10000ms (10초)의 제한 시간 설정

  // 다른 테스트 케이스 작성 가능
});
