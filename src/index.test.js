// require the Koa server
import server from "./index"
// require supertest
const request = require("supertest");
// close the server after each test
afterEach(() => {
  server.close();
});

describe("routes: players", () => {
  test("should respond as expected", async () => {
    const response = await request(server).get("/players");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(response.body).toEqual([]);
  });
});

describe("routes: player by id", () => {
  test("should respond 404 not found", async () => {
    const response = await request(server).get("/players/0");
    expect(response.status).toEqual(404);
    expect(response.type).toEqual("application/json");
    expect(response.body).toEqual("");
  });
});
