const express = require('express');
const alunoController = require('../controllers/alunoController');
const router = express.Router();

// Rota para listar todos os alunos
router.get('/', alunoController.getAlunos);

// Rota para criar um novo aluno
router.post('/', alunoController.createAluno);

// Rota para atualizar um aluno existente
router.put('/:id', alunoController.updateAluno);

// Rota para desativar um aluno
router.put('/desativar/:id', alunoController.desativarAluno);

// Rota para reativar um aluno
router.put('/reativar/:id', alunoController.reativarAluno);

// Rota para pesquisar alunos
router.get('/pesquisar', alunoController.pesquisarAlunos);

module.exports = router;
