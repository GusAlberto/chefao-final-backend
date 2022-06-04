require("dotenv").config();
const express = require("express");
const database = require("./config/Database");
const ControllerUser = require("./controllers/User");
const ControllerAuth = require("./controllers/Auth");
const ControllerEvent = require("./controllers/Event");

database.connect();

const app = express();

// Open Route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a API!" });
});

// Config JSON response
app.use(express.json());

// Add Controllers
ControllerUser.configure(app);
ControllerAuth.configure(app);
ControllerEvent.configure(app);

app.listen(process.env.PORT || 3000, () => {
  console.log("Projeto rodando na porta: ");
});
