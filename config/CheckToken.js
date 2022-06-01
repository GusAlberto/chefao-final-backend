const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

module.exports = class CheckToken {
  static async user(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ msg: "Acesso negado!" });

    try {
      const secret = process.env.SECRET;
      const userToken = jwt.verify(token, secret);
      const user = await User.findOne(
        { _id: userToken.id },
        { password: false }
      );
      req.userToken = user;
      next();
    } catch (err) {
      console.log("err", err);
      res.status(400).json({ msg: "O Token é inválido!" });
    }
  }

  admin() {}
};
