const path = require("path");
const Ajv = require("ajv");
const ListDao = require("../dao/shList-dao");
let dao = new ListDao(
  path.join(__dirname, "..", "storage", "lists.json")
);

let schema = {
  type: "object",
  properties: {
    title: { type: "string" },
    owner: { type: "string" },
    members: {
      type: "array",
      minMembers: 0,
      members: []
    },
    items: {
      type: "array",
      minItems: 1,
      items: [
        {
          type: "object",
          properties: {
            item: { type: "string" },
            amount: { type: "string" },
            state: { type: "boolean" },
          },
         required: ["item"],
        }
      ]
    },
    archived: "boolean" 
  },
  required: ["title"],
};

async function CreateAbl(req, res) {
  try {
    const ajv = new Ajv();
    const valid = true;
    if (valid) {
      let list = req.body;
      list = await dao.createList(list);
      res.json(list);
    } else {
      res.status(400).send({
        errorMessage: "Validation of input failed.",
        params: req.body,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}

module.exports = CreateAbl;