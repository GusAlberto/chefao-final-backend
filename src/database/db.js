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