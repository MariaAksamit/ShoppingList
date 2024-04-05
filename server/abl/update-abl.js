const path = require("path");
const Ajv = require("ajv");
const ListDao = require("../dao/shList-dao");
let dao = new ListDao(
  path.join(__dirname, "..", "storage", "lists.json")
);

let schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    owner: { type: "string" },
    members: {
        type: "array",
        minMembers: 0,
        members: []
      },
    items: {
        type: "array",
        minItems: 0,
        items: [
          {
            type: "object",
            properties: {
              item: { type: "string" },
              amount: { type: "string" },
              state: { type: "boolean" },
            },
            //required: ["item"],
          }
        ]
      },
    archived: "boolean"
  },
  required: ["id"],
};

async function UpdateAbl(req, res) {
  try {
    const ajv = new Ajv();
    let list = req.body;
    const valid = true;
    if (valid) {
      list = await dao.updateList(list);
      res.json(list);
    } else {
      res.status(400).send({
        errorMessage: "Validation of input failed.",
        params: list,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    if (e.message.startsWith("list with given id")) {
      res.status(400).json({ error: e.message });
    }
    res.status(500).send(e);
  }
}

module.exports = UpdateAbl;