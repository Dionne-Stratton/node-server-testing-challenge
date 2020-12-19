const express = require("express");

const Characters = require("./brotherhood/brotherhood-model.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/characters", (req, res) => {
  Characters.getAll()
    .then((Characters) => {
      res.status(200).json(Characters);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

server.get("/characters/:id", async (req, res) => {
  const hobbit = await Characters.getById(req.params.id);
  if (!hobbit) {
    res.status(404).end();
  } else {
    res.json(hobbit);
  }
});

server.post("/characters", async (req, res) => {
  const newCharacter = await Characters.insert(req.body);
  res.json(newCharacter);
});

server.delete("/characters/:id", (req, res) => {
  Characters.remove(req.params.id)
    .then((character) => {
      if (character !== 0) {
        res.status(200).json(character);
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch(() => {
      res.status(404).json({ message: "not found" });
    });
});


module.exports = server;
