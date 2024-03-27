const path = require("path");
const Ajv = require("ajv").default;
const ListDao = require("../../dao/list-dao");
let dao = new ListDao(
  path.join(__dirname, "..", "..", "storage", "lists.json")
);

let schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
};

async function GetAbl(req, res) {
  try {
    const ajv = new Ajv();
    const body = req.query.id ? req.query : req.body;

    const valid = ajv.validate(schema, body);
    if (valid) {
      const listId = body.id;
      const list = await dao.getList(listId);
      if (!list) {
        res
          .status(400)
          .send({ error: `list with id '${listId}' doesn't exist` });
      }
      res.json(list);
    } else {
      res.status(400).send({
        errorMessage: "validation of input failed",
        params: body,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

module.exports = GetAbl;
