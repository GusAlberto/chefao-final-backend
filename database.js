//database.js
const mongoose = require("mongoose");

 function connectToDatabase() {
  mongoose.connect(process.env.DATABSE_URL, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
  });  

  const db = mongoose.connection;
  db.on("error", (error) => console.error(error));
  db.modelNames("open", () => console.log("Connected to the data base!"));
}

module.exports = connectToDatabase;


/*
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb+srv://EquipeGama:pdShxqkoYV3tv6PH@cluster0.vzof7.mongodb.net/?retryWrites=true&w=majority",
                    { useUnifiedTopology: true };
                    (error, conection) => {
                        if(error) return console.log(error);
                        global.conection = conection.db("gamaproject");
                        console.log("Connected!");                  
                    });

module.exports = {} */