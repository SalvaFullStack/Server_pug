require("dotenv").config();
require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const app = express();

const errors = require("./errors");

const { Task } = require("./models/task");
const { Tag } = require("./models/tag");

app.use(morgan("dev"));

app.use(express.static("./src/assets"));

require("./db")();

app.set("views", "./src/views");
app.set("view engine", "pug");

const siteSetup = {
  isDarkMode: true,
  auth: true,
};

app.get("/tasks", async (req, res) => {
  const pageSetup = {
    ...siteSetup,
    title: "My tasks",
  };

  const tasks = await Task.find();

  res.render("list", { ...pageSetup, tasks });
});

app.get("/task/:taskId", async (req, res) => {
  const task = await Task.findById(req.params.taskId).populate("tags");

  const pageSetup = {
    ...siteSetup,
    title: `Task "${task.title}"`,
  };

  res.render("details", { ...pageSetup, task });
});

app.get(errors);

app.listen(3000, () => console.log("server on"));
