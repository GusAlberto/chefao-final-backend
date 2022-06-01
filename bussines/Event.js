const Event = require("../models/Event");

module.exports = class BOUser {
  async postEvento(req, res) {
    const {
      name,
      banner,
      date,
      schedule,
      adress,
      description,
      completeAddress,
      producer,
      tag,
      subtags,
    } = req.body;

    const event = new Event({
      name,
      banner,
      date,
      schedule,
      adress,
      description,
      completeAddress,
      producer,
      tag,
      subtags,
    });
    await event.save();

    res.status(200).json(event);
  }
};
