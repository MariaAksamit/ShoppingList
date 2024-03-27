const fs = require("fs");
//načtení modulu express
const express = require("express");
const cors = require("cors");

const shoppingListRouter = require("./controller/list-controller");

//inicializace nového Express.js serveru
const app = express();
//definování portu, na kterém má aplikace běžet na localhostu
const port = process.env.PORT || 8000;

// Parsování body
app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use(cors())

app.use("/shoppingList", shoppingListRouter);


app.get("/*", (req, res) => {
  res.send("Unknown path!");
});


//nastavení portu, na kterém má běžet HTTP server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
