const UserGames = require("../models/UserGames");
const conn = require("../db/conn");

module.exports = class UserGamesController {
  static async getUserGames(req, res) {
    const { idUser } = req.query;

    //find user
    const user = await UserGames.findAll({ where: { idUser: idUser } });

    res.status(200).send({ message: "Todos os jogos do usuário: ", user });
  }

  static async registerUserGame(req, res) {
    const { idUser } = req.query;
    const { idGame } = req.query;

    const [user, created] = await UserGames.findOrCreate({
      where: { idUser: idUser, idGame: idGame },
    });

    if (created) {
      return res
        .status(201)
        .send({ message: "Novo jogo adquirido pelo usuário!" });
    }

    return res.status(201).send({ message: "Usuário já possui o jogo!" });
  }

  static async deleteGame(req, res) {
    const { idUser } = req.query;
    const { idGame } = req.query;

    const user = await UserGames.findOne({ where: { idUser: idUser } });

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado!" });
    }

    const game = await UserGames.findOne({ where: { idGame: idGame } });

    if (!game) {
      return res.status(404).send({ message: "Jogo não encontrado!" });
    }

    await UserGames.destroy({
      where: {
        idUser: idUser,
        idGame: idGame,
      },
    });

    return res.status(201).send({ message: "Jogo deletado pelo usuário!" });
  }
};
