const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/login", UserController.login);
router.post("/register", UserController.createUser);
router.post("/edit", UserController.updateUserName);

module.exports = router;
