const { DataTypes } = require("sequelize");

const db = require("../db/conn");

const Games = db.define("Games", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  consoles: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    require: true,
  },
});

module.exports = Games;
