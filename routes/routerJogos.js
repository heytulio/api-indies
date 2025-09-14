const express = require("express");
const router = express.Router();
const controllerJogos = require("../controllers/controllerJogos");

router.get("/", controllerJogos.getJogos);
router.post("/add", controllerJogos.addJogo);

module.exports = router;
