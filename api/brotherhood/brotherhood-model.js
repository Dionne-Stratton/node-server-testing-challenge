const db = require("../../data/dbConfig.js");

module.exports = {
  insert,
  update,
  remove,
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

async function update(id, changes) {
    return db("actions")
    .where("id", id)
    .update(changes)
    .then((count) => (count > 0 ? getAll(id) : null));
}

function remove(id) {
  return db("actions").where("id", id).del();
}


