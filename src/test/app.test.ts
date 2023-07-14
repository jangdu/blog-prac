import httpMocks from "node-mocks-http";
import app from "../app";

describe("GET /", () => {
  it('should return 200 status code and "Hello, World!" message', async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/posts",
    });
    let response = httpMocks.createResponse();

    response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Hello, World!");
  });
});
