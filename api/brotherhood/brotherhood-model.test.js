const Characters = require("./brotherhood-model");
const db = require("../../data/dbConfig");

const Ed = { first_name: "Edward", last_name: "Elric" };
// const Al = { first_name: "Alphonse", last_name: "Elric" };
// const Hottie = { first_name: "Roy", last_name: "Mustang" };

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("characters").truncate();
});
afterAll(async () => {
  await db.destroy();
});

describe("Brotherhood model", () => {
  it("Characters.getAll returns empty array", async () => {
    const result = await Characters.getAll();
    expect(result).toHaveLength(0);
  });
  it("Characters.getAll returns characters", async () => {
    await db("characters").insert(Ed);
    const result = await Characters.getAll();
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("first_name", "Edward");
    expect(result[0]).toHaveProperty("last_name", "Elric");
    expect(result[0]).toMatchObject(Ed);
  });
});
