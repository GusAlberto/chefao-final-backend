/*IMPORTAÇÕES*/

require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express();

//Config JSON response
app.use(express.json());

// Models
 const User = require('./models/User')

// ABRIR ROTA - ROTA PÚBLICA 
app.get('/', (req,res) => {
  res.status(200).json({ msg: 'Bem vindo a nossa API' })
})

// CREDENCIAIS

const DATABASE_URL = process.env.DATABASE_URL

//CONECTAR AO BANCO DE DADOS
//Conexão com Mongoose que conecta ao MongoDB
const mongoose = require('mongoose');

 function connectToDatabase() {
  mongoose.connect(process.env.DATABASE_URL, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
  });  

  const db = mongoose.connection;
  db.on("error", (error) => console.error(error));
  db.modelNames("open", () => console.log("Connected to the data base!"));
}

module.exports = connectToDatabase;

// ROTA PRIVADA
app.get('/user/:id', checkToken, async (req, res) => {

  const id = req.params.id

  // VERIFICAR SE O USUÁRIO EXISTE
  const User = await User.findById(id, '-password')

  if(!User) {
    return res.status(404).json({ msg: 'Usuário não encontrado!'})
  }

  res.status(200).json({ user })
})

function checkToken(req, res, next) {

  const authHeader = req.headers('authorization')
  const token = authHeader && authHeader.split(" ")[1]

  if(!token){
    return res.status(401).json({ msg: 'Acesso negado!'})
  }

  try {
    const secret = process.env.SECRET

    jwt.verify(token, secret)

    next()
  } catch(error) {
    res.status(400).json({msg: "Token inválido!"})
  }
}

// REGISTRAR O USUÁRIO
app.post('/auth/register', async(req, res) => {
  const { name, lastName, email, password, confirmpassword } = req.body

  // VALIDAÇÕES
  if (!name) {
    return res.status(422).json({ msg: 'O nome é obrigatório!' }) 
  }  

  if (!lastName) {
    return res.status(422).json({ msg: 'O último nome é obrigatório!' }) 
  }  

  if (!email) {
    return res.status(422).json({ msg: 'O e-mail é obrigatório!' }) 
  }  

  if (!password) {
    return res.status(422).json({ msg: 'A senha é obrigatória!' }) 
  }  

  if (password !== confirmpassword) {
    return res.status(422).json({ msg: 'As senhas não conferem!' }) 
  }  

  // VERIFICAR SE O USUÁRIO JÁ EXISTE 
  const userExists = await User.findOnde({ email: email})
  
  if (userExists) {
    return res.status(422).json({ msg: 'Por favor, utilize outro e-mail' }) 
  }  

  // CRIANDO SENHA
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  // CRIANDO USUÁRIO
  const User = new User ({
    name,
    lastName,
    email,
    password: passwordHash,
  })

  try {
    await User.save()

    res.status(201).json({ msg: 'Usuário criado com sucesso' })
  } catch(error) {
    console.log(error)

    res.status(500).json({
      msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!',
    })
  }
})

// LOGIN DO USUÁRIO
app.post('/auth/login', async (req, res) =>  {

  const { email, password } = req.body

  // VALIDAÇÕES
  if(!email) {
    return res.status(422).json({ msg: 'O e-mail é obrigatório!' }) 
  }  

  if(!password) {
    return res.status(422).json({ msg: 'A senha é obrigatória!' }) 
  }  

  // EXISTÊNCIA DO USUÁRIO
  const user = await User.findOnde({ email: email})
  
  if (!user) {
    return res.status(404).json({ msg: 'Usuário não encontrado' }) 
  } 
  
  // VERIFICAÇÃO SE SENHA EXISTE
  const checkPassword = await bcrypt.compare(password, user.password)

  if(!checkPassword) {
    return res.status(422).json({ msg: 'Senha inválida' })
  }

  try {
    const secret = process.env.SECRET

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret,
    )

    res.status(200).json({ msg: 'Autenticação realizada com sucesso', token })

  } catch(err) {
    console.log(error)

    res.status(500).json({
      msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!',
    })
  }

})

module.exports = app;