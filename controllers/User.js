"use strict";

const BOUser = require("../bussines/User.js");
const CheckToken = require("../config/CheckToken.js");

module.exports = class ControllerUser {
  static configure(app) {
    const user = new BOUser();

    // ROTA PRIVADA
    app.get("/user/:id", CheckToken.user, user.getUsuario);
  }
};
