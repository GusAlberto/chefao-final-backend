const User = require("../models/User");

module.exports = class BOUser {
  async getUsuario(req, res) {
    const id = req.params.id;

    // CHECAR SE O USUÁRIO EXISTE
    const user = await User.findOne(
      { _id: id },
      { password: false },
      { idAtivo: true }
    );

    // MOSTRA QUE USUARIO ESTÁ LOGADO
    console.log("userToken", req.userToken);

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    res.status(200).json(user);
  }
};
