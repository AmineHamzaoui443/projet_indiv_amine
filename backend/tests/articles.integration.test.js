const request = require("supertest");

// Mock auth : simule user connecté (pour routes protégées)
jest.mock("../middlewares/auth", () => (req, _res, next) => {
  req.user = { userId: "user-1" };
  next();
});

// Mock Article model (évite Mongo)
const mockSort = jest.fn();
const mockFind = jest.fn(() => ({ sort: mockSort }));
const mockFindById = jest.fn();
const mockSave = jest.fn();
const mockDeleteOne = jest.fn();

jest.mock("../models/article", () => {
  return function Article(data) {
    Object.assign(this, data);
    this.save = mockSave;
    this.deleteOne = mockDeleteOne;
  };
});

const Article = require("../models/article");
Article.find = mockFind;
Article.findById = mockFindById;

// IMPORTANT: on importe l'app (API only), PAS server.js
const app = require("../app");

describe("API Articles (integration)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /api/articles -> 200 + array", async () => {
    mockSort.mockResolvedValueOnce([{ title: "A1" }, { title: "A2" }]);

    const res = await request(app).get("/api/articles");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(2);
  });

  test("GET /api/articles/me -> 200 + filtre owner", async () => {
    mockSort.mockResolvedValueOnce([{ title: "Mine" }]);

    const res = await request(app).get("/api/articles/me");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(mockFind).toHaveBeenCalledWith({ owner: "user-1" });
  });

  test("POST /api/articles -> 201 (sans image)", async () => {
    mockSave.mockResolvedValueOnce();

    const res = await request(app)
      .post("/api/articles")
      .send({ title: "T", description: "D" });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("T");
    expect(res.body.owner).toBe("user-1");
  });

  test("PUT /api/articles/:id -> 404 si absent", async () => {
    mockFindById.mockResolvedValueOnce(null);

    const res = await request(app)
      .put("/api/articles/999")
      .send({ title: "X" });

    expect(res.statusCode).toBe(404);
  });

  test("PUT /api/articles/:id -> 403 si pas owner", async () => {
    mockFindById.mockResolvedValueOnce({
      owner: { toString: () => "other-user" },
      save: mockSave,
    });

    const res = await request(app)
      .put("/api/articles/123")
      .send({ title: "NEW" });

    expect(res.statusCode).toBe(403);
  });

  test("DELETE /api/articles/:id -> 200 si owner", async () => {
    mockFindById.mockResolvedValueOnce({
      owner: { toString: () => "user-1" },
      deleteOne: mockDeleteOne,
    });

    const res = await request(app).delete("/api/articles/123");

    expect(res.statusCode).toBe(200);
    expect(mockDeleteOne).toHaveBeenCalledTimes(1);
  });
});
