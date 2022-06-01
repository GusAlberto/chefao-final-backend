const BOUser = require("../bussines/User");
const CheckToken = require("../config/checkToken");

module.exports = class ControllerUser {
  static configure(app) {
    const user = new BOUser();

    // ROTA PRIVADA
    app.get("/user/:id", CheckToken.user, user.getUsuario);
  }
};
