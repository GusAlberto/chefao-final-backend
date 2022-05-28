const BOEvent = require("../bussines/Event");
const CheckToken = require("../config/checkToken");

module.exports = class ControllerUser {
  static configure(app) {
    const event = new BOEvent();

    // ROTA PRIVADA
    app.post("/event", CheckToken.user, event.postEvento);
  }
};
