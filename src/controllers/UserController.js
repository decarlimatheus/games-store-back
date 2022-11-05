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

    //find user
    const user = await User.findOne({ where: { email: email } });

    //check if email exists
    if (!user) {
      const sql = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}')`;
      res.status(201).send({ message: "Novo usuário cadastrado!" });

      conn.query(sql, function (err) {
        if (err) {
          console.log(err);
        }

        res.redirect("/");
      });

      return;
    }

    res.status(400).send({ message: "Email já está em uso!" });
  }

  static updateUserName(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const sql = `UPDATE users SET name = '${name}' WHERE email = '${email}' `;

    conn.query(sql, function (err) {
      if (err) {
        console.log(err);
      }

      res.redirect("/");
    });

    res
      .status(200)
      .send({ message: "Nome de usuário atualizado com sucesso!" });
  }
};
