const express = require("express");
const router = express.Router();
const GamesController = require("../controllers/GamesController");

router.get("/games", GamesController.getAllGames);
router.get("/games/:id", GamesController.getGameById);
router.get("/searchgames", GamesController.getGameBySearch);
router.post("/creategame", GamesController.createGame);

module.exports = router;
