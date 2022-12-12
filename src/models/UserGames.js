const { DataTypes } = require("sequelize");

const db = require("../db/conn");

const UserGames = db.define("UserGames", {
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    require: true,
  },
  idGame: {
    type: DataTypes.INTEGER,
    allowNull: false,
    require: true,
  },
});

UserGames.associate = function (models) {
  UserGames.belongsTo(models.User, {
    foreignKey: "idUser",
  });
  UserGames.belongsTo(models.Games, {
    foreignKey: "idGame",
  });
};

module.exports = UserGames;
