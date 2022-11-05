const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("games_store_db", "root", "Password", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
