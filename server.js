require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const routes = require("./routes");
const connectToDatabase = require("./database");

const app = express();
const port = 2770;

app.use(routes);

app.listen(port, () => {
   console.log('Backend started at http://localhost:${port}');
});

connectToDatabase();