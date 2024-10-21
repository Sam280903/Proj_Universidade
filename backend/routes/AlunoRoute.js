const express = require('express');
const router = express.Router();
const alunoController = require('./controllers/alunoController');  // Corrigido o caminho

// Rota para criar aluno
router.post('/', alunoController.createAluno);

// Rota para consultar todos os alunos
router.get('/', alunoController.getAllAlunos);

// Rota para editar um aluno
router.put('/:id', alunoController.updateAluno);

// Rota para excluir um aluno
router.delete('/:id', alunoController.deleteAluno);

module.exports = router;
