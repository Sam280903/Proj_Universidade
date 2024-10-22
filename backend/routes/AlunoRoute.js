const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');  // Corrigido o caminho para o controller de alunos
const VwAlunosController = require('../controllers/VwAlunosController');  // Controller da view vw_Alunos

// Rota para criar aluno
router.post('/', alunoController.createAluno);

// Rota para consultar todos os alunos (tabela Alunos)
router.get('/', alunoController.getAllAlunos);

// Rota para consultar alunos através da view vw_Alunos
router.get('/view', VwAlunosController.getAllFromView); // Nova rota para a view

// Rota para editar um aluno
router.put('/:id', alunoController.updateAluno);

// Rota para excluir um aluno
router.delete('/:id', alunoController.deleteAluno);

module.exports = router;
