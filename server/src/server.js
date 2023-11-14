const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));

app.use(express.static("./src/assets"));

app.set("views", "./src/views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("home", {
    title: "Hey",
    message: "Vamos rafael!",
    genre: "Action",
  });
});

app.listen(3000, () => console.log("server on"));
