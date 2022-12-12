const { Op } = require("sequelize");
const Games = require("../models/Games");
const conn = require("../db/conn");

module.exports = class GamesController {
  static async getAllGames(req, res) {
    const games = await Games.findAll({ raw: true });

    res.status(200).send({ message: games });
  }

  static async getGameById(req, res) {
    const id = req.params.id;

    const gameId = await Games.findOne({ raw: true, where: { id: id } });

    if (!gameId) {
      res.status(422).send({ message: "Jogo não encontrado!" });
      return;
    }

    res.status(200).send({ message: gameId });
  }

  static async getGameBySearch(req, res) {
    const title = req.query.title;
    const category = req.query.category;

    const gameBySearch = await Games.findAll({
      where: {
        [Op.or]: [
          title
            ? {
                title: {
                  [Op.like]: `%${title}%`,
                },
              }
            : null,
          category
            ? {
                category: {
                  [Op.like]: `%${category}%`,
                },
              }
            : null,
        ],
      },
    });

    res.status(200).send({ message: gameBySearch });
  }

  static async createGame(req, res) {
    const { title, description, consoles, category, price } = req.body;

    const gametitle = await Games.findOne({ where: { title: title } });

    if (!gametitle) {
      await Games.create({ title, description, consoles, category, price });
      res.status(201).send({ message: "Novo jogo cadastrado!" });
      return;
    }
    res.status(400).send({ message: "Jogo já está em cadastrado!" });
  }
};
