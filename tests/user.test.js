const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("POST /api/users", () => {
  it("creates a new user", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ name: "Alice", email: "alice@example.com", age: 25 });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Alice");
    expect(res.body._id).toBeDefined();
  });

  it("rejects missing required fields", async () => {
    const res = await request(app).post("/api/users").send({ age: 25 });
    expect(res.statusCode).toBe(500);
  });
});

describe("GET /api/users", () => {
  it("returns all users", async () => {
    await User.create({ name: "Bob", email: "bob@example.com", age: 24 });
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });
});

describe("DELETE /api/users/:id", () => {
  it("deletes a user by id", async () => {
    const user = await User.create({ name: "Carl", email: "carl@example.com", age:23 });
    const res = await request(app).delete(`/api/users/${user._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User deleted");
  });
});
