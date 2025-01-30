const express = require("express");
// Création d'une route avec express pour séparé chaque route principale
const router = express.Router();
const auth = require("../middleware/auth"); // middleware d'authentification pour sécuriser les routes
const multer = require("../middleware/multer_config");

const stuffCtrl = require("../controllers/stuff");
// Chemin de publication des données
router.post("/", auth, multer, stuffCtrl.createThing);

// Récupération de la liste de Things en vente (Récupération de tout les objets)
router.get("/", auth, stuffCtrl.getAllThings);
// nous utilisons deux-points ":" en face du segment dynamique de la route pour la rendre accessible en tant que paramètre ;
// Récupération d'un sThing spécifique avec son id
router.get("/:id", auth, stuffCtrl.getOneThing);

router.put("/:id", auth, multer, stuffCtrl.modifyThing);

router.delete("/:id", auth, stuffCtrl.deleteThing);

module.exports = router;
