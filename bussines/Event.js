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

    // VALIDAÇÕES DA CRIAÇÃO DE EVENTO

    // NÃO PODE DEIXAR DE COLOCAR ALGUM CAMPO
    if (
      (!name,
      !banner,
      !date,
      !schedule,
      !description,
      !completeAddress,
      !producer,
      !tag)
    ) {
      return res.status(422).json({ msg: "Todos os campos são obrigatórios!" });
    }

    // NÃO PODE DEIXAR CAMPOS VAZIOS
    if (
      !name.length ||
      !banner.length ||
      !date.length ||
      !schedule.length ||
      !description.length ||
      !completeAddress.length ||
      !producer.length ||
      !tag.length
    ) {
      return res
        .status(422)
        .json({ msg: "Os campos tem que ser preenchidos!" });
    }
    try {
      await event.save();

      res.status(201).json({ msg: "Evento criado com sucesso!" });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
};
