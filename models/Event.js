const mongoose = require("mongoose");

const Event = mongoose.model("Event", {
  name: String,
  banner: String,
  date: Date,
  schedule: Date,
  adress: String,
  description: String,
  completeAddress: String,
  producer: String,
  tag: String,
  subtags: String,
});

module.exports = Event;

/*
const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },

  banner: {
    type: String,
    require: true,
  },

  date: {
    type: date,
    required: true,
  },

  schedule: {
    type: date,
    require: true,
  },

  address: {
    type: String,
    require: true,
  },

  description: {
    type: String,
    require: true,
  },

  completeAddress: {
    type: String,
    require: true,
  },

  producer: {
    type: String,
    require: true,
  },

  tag: {
    type: String,
    require: true,
  },

  subtags: {
    type: String,
    require: true,
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

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
*/
