const request = require("supertest");
const server = require("./server"); // a router
const db = require("../data/dbConfig");

const Ed = { first_name: "Edward", last_name: "Elric"};
// const Al = { first_name: "Alphonse", last_name: "Elric" };
const Hottie = { first_name: "Roy", last_name: "Mustang" };

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("Characters").truncate();
});
afterAll(async () => {
  await db.destroy();
});

describe("endpoints", () => {
  describe("[GET] /characters", () => {
    it("responds with 200 OK", async () => {
      const res = await request(server).get("/characters");
      expect(res.status).toBe(200);
    });
    it("responds with empty array if no Characters", async () => {
      const res = await request(server).get("/characters");
      expect(res.body).toHaveLength(0);
    });
    it("responds with Characters if Characters", async () => {
      await db("Characters").insert(Ed);
      let res = await request(server).get("/characters");
      expect(res.body).toHaveLength(1);
      await db("Characters").insert(Hottie);
      res = await request(server).get("/characters");
      expect(res.body).toHaveLength(2);
      expect(res.body[0]).toMatchObject(Ed);
      expect(res.body[1]).toMatchObject(Hottie);
    });
  });
  describe("[GET] /characters/:id", () => {
    it("responds with the hobbit with the given id", async () => {
      await db("Characters").insert(Hottie);
      let res = await request(server).get("/characters/1");
      expect(res.body).toMatchObject(Hottie);
    });
    it("responds with a 404 if id not in db", async () => {
      const response = await request(server).get("/characters/1");
      expect(response.status).toBe(404);
    });
  });
  describe("[POST] /characters", () => {
    it("resturns the newly created hobbit", async () => {
      const res = await request(server).post("/characters").send(Hottie);
      expect(res.body.id).toBe(1);
      expect(res.body.first_name).toBe("Roy");
    });
  });
});
