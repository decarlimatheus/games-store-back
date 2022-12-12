const User = require("../models/User");
const conn = require("../db/conn");

module.exports = class UserController {
  static async login(req, res) {
    const { email, password } = req.body;

    //find user
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      res.status(404).send({ message: "Usuário não encontrado!" });

      return;
    }

    //check if passwords match
    if (!password || password != user.password) {
      res.status(400).send({ message: "Senha inválida!" });

      return;
    }

    res.send({ message: "Autenticação realizada com sucesso!" });
  }

  static async createUser(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      await User.create({ name: name, email: email, password: password });
      res.status(201).send({ message: "Novo usuário cadastrado!" });
      return;
    }

    res.status(400).send({ message: "Email já está em uso!" });
  }

  static async updateUserName(req, res) {
    const name = req.body.name;
    const email = req.body.email;

    await User.update(
      { name: name },
      {
        where: {
          email: email,
        },
      }
    );

    res
      .status(200)
      .send({ message: "Nome de usuário atualizado com sucesso!" });
  }

  static async deleteUser(req, res) {
    const { email, password } = req.body;

    //find user
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      res.status(404).send({ message: "Usuário não encontrado!" });

      return;
    }

    //check if passwords match
    if (!password || password != user.password) {
      res.status(400).send({ message: "Senha inválida!" });

      return;
    }

    await User.destroy({
      where: {
        email: email,
      },
    });

    res.send({ message: "Usuário deletado com sucesso!" });
  }
};
