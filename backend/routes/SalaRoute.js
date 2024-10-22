const express = require('express');
const router = express.Router();
const SalaController = require('../controllers/SalaController');
const VwSalasController = require('../controllers/VwSalasController'); // Importando o controller da view

// Rota para obter todas as salas (tabela Salas)
router.get('/', SalaController.getSalas);

// Rota para obter as salas através da view vw_Salas
router.get('/view', VwSalasController.getAllFromView); // Nova rota para a view

// Rota para criar uma nova sala
router.post('/', SalaController.createSala);

// Rota para editar uma sala
router.put('/:id', SalaController.updateSala);

// Rota para excluir uma sala
router.delete('/:id', SalaController.deleteSala);

module.exports = router;
