const fs = require("fs");
const path = require("path");
const ListDao = require("../dao/shList-dao");

let dao = new ListDao(path.join(__dirname, "..", "storage", "lists.json"));

async function ListAbl(req, res) {
  try {
    // Přečte obsah souboru lists.json
    const listsData = fs.readFileSync(path.join(__dirname, "..", "storage", "lists.json"), "utf-8");
    const lists = JSON.parse(listsData);
    
    // Odešle seznam jako odpověď na požadavek
    res.json(lists);
  } catch (error) {
    console.error("Error reading users.json file: ", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = ListAbl;