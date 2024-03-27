const fs = require("fs");
const path = require("path");
const ListDao = require("../../dao/list-dao");
let dao = new ListDao(
  path.join(__dirname, "..", "..", "storage", "lists.json")
);

async function ListAbl(req, res) {
  try {
    // Přečte obsah souboru recipes.json
    const listsData = fs.readFileSync("./storage/lists.json", "utf-8");
    const lists = JSON.parse(listsData);
    
    // Odešle seznam receptů jako odpověď na požadavek
    res.json(lists);
  } catch (error) {
    console.error("Chyba při čtení souboru lists.json:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = ListAbl;
