const mongoose = require('mongoose')
require('dotenv').config()

module.exports = class Database {
  static connect() {
    //CREDENCIAIS
    const dbUser = process.env.DB_USER
    const dbPassword = process.env.DB_PASS

    mongoose.connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.vzof7.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )
    mongoose.set('debug')

    mongoose.connection.on('connected', function () {
      console.debug('Mongoose! Connected at')
    })

    mongoose.connection.on('disconnected', function () {
      console.debug('Mongoose! Disconnected')
    })

    mongoose.connection.on('error', function (erro) {
      console.error('Mongoose! Error : ' + erro)
    })

    process.on('SIGINT', function () {
      mongoose.connection.close(function () {
        console.error('Mongoose! Disconnected by the application')
        process.exit(0)
      })
    })

    return mongoose
  }
}
