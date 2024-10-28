const express = require('express');
const disciplinaController = require('../controllers/disciplinaController');
const router = express.Router();

// Rota para listar todas as disciplinas
router.get('/', disciplinaController.getDisciplinas);

// Rota para criar uma nova disciplina
router.post('/', disciplinaController.createDisciplina);

// Rota para editar uma disciplina existente
router.put('/editar/:id', disciplinaController.updateDisciplina);

// Rota para desativar uma disciplina
router.put('/desativar/:id', disciplinaController.desativarDisciplina);

// Rota para reativar uma disciplina
router.put('/reativar/:id', disciplinaController.reativarDisciplina);

// Rota para pesquisar disciplinas
router.get('/pesquisar', disciplinaController.pesquisarDisciplinas);

module.exports = router;
