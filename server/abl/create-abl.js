const path = require("path");
const Ajv = require("ajv");
const ListDao = require("../dao/shList-dao");
let dao = new ListDao(
  path.join(__dirname, "..", "storage", "lists.json")
);

let schema = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 3, maxLength: 50 },
    owner: { type: "string" },
    members: {
      type: "array",
      items: { type: "string" }
    },
    items: {
      type: "array",
      minItems: 1,
      items: [
        {
          type: "object",
          properties: {
            item: { type: "string", minLength: 2, maxLength: 50 },
            amount: { type: "string", default: "" },
            state: { type: "boolean", default: false },
          },
         required: ["item"],
        }
      ]
    },
    archived: { type: "boolean", default: false } 
  },
  required: ["title", "owner", "items"],
};

async function CreateAbl(req, res) {
  try {   
    const ajv = new Ajv();
    const valid = ajv.validate(schema, req.body);
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