const express = require("express");
const router = express.Router();
const UserGamesController = require("../controllers/UserGamesController");

router.get("/mygames", UserGamesController.getUserGames);
router.post("/registergame", UserGamesController.registerUserGame);
router.delete("/delete", UserGamesController.deleteGame);

module.exports = router;
