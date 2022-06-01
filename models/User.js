const mongoose = require("mongoose");
/*
const User = mongoose.model("User", {
  name: String,
  lastName: String,
  email: String,
  password: String,
  idAtivo: Boolean,
});
module.exports = User;
*/

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  lastName: {
    type: String,
  },

  email: {
    type: String,
  },

  password: {
    type: String,
  },

  idAtivo: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
