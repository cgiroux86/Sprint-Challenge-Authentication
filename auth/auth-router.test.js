const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

describe("server", () => {
  describe("post request to /register", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });
    it("should return a 201 ok status with correct user info", async () => {
      const user = { username: "testing", password: "123" };
      const send = await request(server).post("/api/auth/register").send(user);

      expect(send.status).toBe(201);
    });

    it("should return a 500 server error if username or password is omitted", async () => {
      const errUser = { username: "test123" };
      const err = await request(server)
        .post("/api/auth/register")
        .send(errUser);

      expect(err.status).toBe(500);
    });
  });
  describe("post request to /login", () => {
    beforeEach(async () => {
      await request(server)
        .post("/api/auth/register")
        .send({ username: "testing123", password: "12345" });
    });
    it("should return a token when user is registered and provides correct credentials", async () => {
      const loggedIn = await request(server)
        .post("/api/auth/login")
        .send({ username: "testing123", password: "12345" });

      expect(loggedIn.status).toBe(200);
      expect(loggedIn.body.token).toBeTruthy();
    });

    it("should return a forbidden 404 error if username or password are not correct", async () => {
      const wrongPw = await request(server)
        .post("/api/auth/login")
        .send({ username: "testing123", password: "123" });

      expect(wrongPw.status).toBe(401);

      const wrongUser = await request(server)
        .post("/api/auth/login")
        .send({ username: "test", password: "123" });

      expect(wrongUser.status).toBe(401);
    });
  });

  describe("test GET /jokes", () => {
    it("should return 400 if no token is present", async () => {
      const err = await request(server).get("/api/jokes");

      expect(err.status).toBe(400);
    });
    it("should return 401 if a bad token is passed", async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJDaHJpcyIsImlhdCI6MTU4Nzc0MTI1MSwiZXhwIjoxNTg3NzQxODUxfQ.YqA2OGO4itGR4jaaXLnOtmjoDCHlD2ABvOKoHxqSap8";
      const failed = await request(server)
        .get("/api/jokes")
        .set("Authorization", token);

      expect(failed.status).toBe(401);
    });
    it("should return 20 jokes if token is present", async () => {
      const register = await request(server)
        .post("/api/auth/register")
        .send({ username: "test", password: "123" });

      const login = await request(server)
        .post("/api/auth/login")
        .send({ username: "test", password: "123" });

      const token = login.body.token;

      const loggedIn = await request(server)
        .get("/api/jokes")
        .set("Authorization", token);

      expect(loggedIn.status).toBe(200);
    });
  });
  describe("test the db", () => {
    beforeEach(async () => {
      db("users").truncate();
    });
    it("should correctly add a user to DB", async () => {
      const inserted = await db("users").insert({
        username: "testing",
        password: "123",
      });

      const found = await db("users").where({ username: "test" });

      expect(found).toHaveLength(1);
    });
  });
});
