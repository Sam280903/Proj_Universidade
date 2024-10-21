// routes/salas.js
const express = require('express');
const router = express.Router();
const SalaController = require('../controllers/SalaController');

// Rota para obter todas as salas
router.get('/', SalaController.getSalas);

// Rota para criar uma nova sala
router.post('/', SalaController.createSala);

// Rota para editar uma sala
router.put('/:id', SalaController.updateSala);

// Rota para excluir uma sala
router.delete('/:id', SalaController.deleteSala);

module.exports = router;
