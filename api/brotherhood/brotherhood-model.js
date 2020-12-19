const db = require("../../data/dbConfig.js");

module.exports = {
  insert,
//   remove,
  getAll,
  getById,
};

function getAll() {
  return db("characters");
}

function getById(id) {
  return db("characters").where("id", id).first();
}

async function insert(character) {
  const [id] = await db("characters").insert(character);
  return db("characters").where({ id }).first();
}

// function remove(id) {
//   return null;
// }
