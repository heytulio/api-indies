const router = require("express").Router();

const routerJogos = require("./routerJogos.js");

router.use("/jogos", routerJogos);

module.exports = router;
