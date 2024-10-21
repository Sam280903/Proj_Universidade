const express = require('express');
const router = express.Router();
const ProfessorController = require('../controllers/ProfessorController');

// Rota para obter todos os professores
router.get('/', ProfessorController.getAllProfessores);

// Rota para criar um novo professor
router.post('/', ProfessorController.createProfessor);

// Rota para atualizar um professor existente
router.put('/:id', ProfessorController.updateProfessor);

// Rota para excluir um professor
router.delete('/:id', ProfessorController.deleteProfessor);

module.exports = router;
