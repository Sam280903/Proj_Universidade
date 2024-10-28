// routes/salaRoutes.js

const express = require('express');
const salaController = require('../controllers/salaController');
const router = express.Router();

router.get('/', salaController.getSalas);
router.post('/', salaController.createSala);
router.put('/editar/:id', salaController.updateSala);
router.put('/desativar/:id', salaController.desativarSala);
router.put('/reativar/:id', salaController.reativarSala);

module.exports = router;
