const { DataTypes } = require("sequelize");

const db = require("../db/conn");

const User = db.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      require: true,
    },
    email: {
      type: DataTypes.STRING,
      require: true,
    },
    password: {
      type: DataTypes.STRING,
      require: true,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

User.associate = function (models) {
  User.hasMany(models.UserGames, {
    foreignKey: "idUser",
    as: "games",
  });
};
module.exports = User;
