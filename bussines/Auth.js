const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// REGISTRAR O USUÁRIO
module.exports = class BOAuth {
  async register(req, res) {
    const { name, lastName, password, confirmpassword } = req.body;
    let { email } = req.body;
    email = email.toLowerCase();
    let { idAtivo } = req.body;
    (idAtivo = true), false;

    // VALIDAÇÕES DO REGISTRO DE USUÁRIO
    if (!name) {
      return res.status(422).json({ msg: "O nome é obrigatório!" });
    }

    if (!lastName) {
      return res.status(422).json({ msg: "O sobrenome é obrigatório!" });
    }

    if (!email) {
      return res.status(422).json({ msg: "O email é obrigatório!" });
    }

    if (!password) {
      return res.status(422).json({ msg: "A senha é obrigatória!" });
    }

    if (password != confirmpassword) {
      return res
        .status(422)
        .json({ msg: "A senha e a confirmação precisam ser iguais!" });
    }

    // CHECAR SE O USUÁRIO JÁ FOI CRIADO
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
    }

    // CRIAR SENHA
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // CRIAR USUÁRIO
    const user = new User({
      name,
      lastName,
      email,
      password: passwordHash,
    });

    try {
      await user.save();

      res.status(201).json({ msg: "Usuário criado com sucesso!" });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    // VALIDAÇÕES
    if (!email) {
      return res.status(422).json({ msg: "O email é obrigatório!" });
    }

    if (!password) {
      return res.status(422).json({ msg: "A senha é obrigatória!" });
    }

    // VERIFICAR SE O USUÁRIO EXISTE
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    // CHECAR SE A SENHA CONFERE
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ msg: "Senha inválida" });
    }

    try {
      const secret = process.env.SECRET;

      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );

      res
        .status(200)
        .json({ msg: "Autenticação realizada com sucesso!", token });
    } catch (error) {
      res.status(500).json({ msg: error.toString() });
    }
  }
};
