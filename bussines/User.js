const User = require("../models/User");

module.exports = class BOUser {
  async getUsuario(req, res) {
    const id = req.params.id;

    // CHECAR SE O USUÁRIO EXISTE
    const user = await User.findOne({ _id: id }, { password: false });

    // MOSTRA QUE USUARIO ESTÁ LOGADO
    console.log("userToken", req.userToken);

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    } else if (user && user.userActive == false) {
      return res.status(401).json({ msg: "Usuário está inativo!" });
    }
    res.status(200).json(user);
  }
};
