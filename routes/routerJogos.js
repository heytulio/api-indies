const express = require('express');
const router = express.Router();
const controllerJogos = require('../controllers/controllerJogos');

router.get('/', controllerJogos.getJogos);
router.post('/add', controllerJogos.addJogo);
router.post('/delete', controllerJogos.deleteJogo);

module.exports = router;
