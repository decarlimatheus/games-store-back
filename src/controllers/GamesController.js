const { Op } = require("sequelize");
const Games = require("../models/Games");
const conn = require("../db/conn");

module.exports = class GamesController {
  static async getAllGames(req, res) {
    const games = await Games.findAll({ raw: true });

    //console.log(games);

    res.status(200).send({ message: games });
  }

  static async getGameById(req, res) {
    const id = req.params.id;

    const gameId = await Games.findOne({ raw: true, where: { id: id } });

    res.status(200).send({ message: gameId });
  }

  static async getGameByTitle(req, res) {
    const title = req.query.title;
    const category = req.query.category;

    const gameByTitle = await Games.findAll({
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

    res.status(200).send({ message: gameByTitle });
  }
};
