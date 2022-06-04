"use strict";

const BOEvent = require("../bussines/Event.js");
const CheckToken = require("../config/CheckToken.js");

module.exports = class ControllerUser {
  static configure(app) {
    const event = new BOEvent();

    // ROTA PRIVADA
    app.post("/event", CheckToken.user, event.postEvento);
  }
};
