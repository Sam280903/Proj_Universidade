const express = require('express');
const router = express.Router();
const DisciplinaController = require('../controllers/DisciplinaController'); // Controller de disciplinas
const VwDisciplinasController = require('../controllers/VwDisciplinasController'); // Controller da view vw_Disciplinas

// Rota para criar uma nova disciplina
router.post('/', DisciplinaController.create);

// Rota para obter todas as disciplinas (tabela Disciplinas)
router.get('/', DisciplinaController.getAll);

// Rota para obter disciplinas através da view vw_Disciplinas
router.get('/view', VwDisciplinasController.getAllFromView); // Nova rota para a view

// Rota para editar uma disciplina existente
router.put('/:id', DisciplinaController.update);

// Rota para excluir uma disciplina
router.delete('/:id', DisciplinaController.delete);

module.exports = router;
