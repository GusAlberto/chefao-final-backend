const BOAuth = require('../bussines/Auth')

module.exports = class ControllerAuth {
  static configure(app) {
    const auth = new BOAuth()

    //ROTA PARA REGISTRAR O USUÁRIO
    app.post('/auth/register', auth.register)

    //FAZENDO LOGIN DO USUÁRIO
    app.post('/auth/login', auth.login)

    //ATUALIZANDO DADOS DO USUÁRIO
    app.patch('/auth/update', auth.update)
  }
}
