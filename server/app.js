const fs = require("fs");
const express = require("express");
const cors = require("cors");
const path = require("path");

const shoppingListRouter = require("./controller/shList-controller");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.use("/shoppingList", shoppingListRouter);

app.get("/users", (req, res) => {
  try {
    const usersData = fs.readFileSync(path.join(__dirname, "storage", "users.json"), "utf-8");
    const users = JSON.parse(usersData);
    res.json(users);
  } catch (error) {
    console.error("Error reading users.json file: ", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/*", (req, res) => {
  res.send("Unknown path!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});