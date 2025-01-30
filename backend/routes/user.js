const express = require("express");

const router = express.Router();

const userCtrl = require("../controllers/user");

// Les deux méthodes sont post car le frontend enverra des requêtes pour les deux
router.post("/signup", userCtrl.signup);

router.post("/login", userCtrl.login);

module.exports = router;
