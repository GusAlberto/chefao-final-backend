require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

// ACESSAR PASTA MODELS
const User = require("./src/models/User");
const Event = require("./src/models/Event");

// Config JSON response
app.use(express.json());

// Open Route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a API!" });
});

// ROTA PRIVADA
app.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  // CHECAR SE O USUÁRIO EXISTE
  const user = await User.findById(id, "-password");

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  res.status(200).json({ user });
});

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Acesso negado!" });

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (err) {
    res.status(400).json({ msg: "O Token é inválido!" });
  }
}

// ROTA PARA REGISTRAR O USUÁRIO
app.post("/auth/register", async (req, res) => {
  const { name, lastName, email, password, confirmpassword } = req.body;

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
});
  // CONFIRMAÇÃO PELO E-MAIL

  
// FAZENDO LOGIN DO USUÁRIO
app.post("/auth/login", async (req, res) => {
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

  //AUTENTICAÇÃO COM TOKEN
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret, {
      expiresIn: 900,
  });

    res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

//CREDENCIAIS
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

//CONEXÃO COM BANCO DE DADOS
 //MONGOOSE PARA MONGODB
mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.vzof7.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectou ao banco!");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
