const express = require("express");
const ejs = require("ejs");
const path = require("path");
const axios = require("axios");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
  let quote = await axios.get("https://api.quotable.io/random");
  res.render("home.ejs", { quote });
});

app.listen(5040, () => {
  console.log("Started listening on port 5040.");
});
