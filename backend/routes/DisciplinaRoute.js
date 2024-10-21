const express = require('express');
const router = express.Router();
const DisciplinaController = require('../controllers/DisciplinaController'); // Controller de disciplinas

// Rota para criar uma nova disciplina
router.post('/', DisciplinaController.create);

// Rota para obter todas as disciplinas
router.get('/', DisciplinaController.getAll);

// Rota para editar uma disciplina existente
router.put('/:id', DisciplinaController.update);

// Rota para excluir uma disciplina
router.delete('/:id', DisciplinaController.delete);

module.exports = router;
