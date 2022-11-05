const express = require("express");
const router = express.Router();
const path = require("path");
const GamesController = require("../controllers/GamesController");

router.get("/games", GamesController.getAllGames);
router.get("/games/:id", GamesController.getGameById);
router.get("/searchgames", GamesController.getGameByTitle);

module.exports = router;
