"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const path = require('path');
const database = require("./config/Database.js");
const ControllerUser = require("./controllers/User.js");
const ControllerAuth = require("./controllers/Auth.js");
const ControllerEvent = require("./controllers/Event.js");

database.connect();

const app = express();

app.use(cors());

// app.use(express.static(path.join(__dirname, 'public')))
// app.set('views', path.join(__dirname, 'views'))

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
