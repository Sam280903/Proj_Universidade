// routes/professorRoutes.js

const express = require('express');
const professorController = require('../controllers/professorController');
const router = express.Router();

// Rota para listar todos os professores
router.get('/', professorController.getProfessores);

// Rota para criar um novo professor
router.post('/', professorController.createProfessor);

// Rota para atualizar um professor existente
router.put('/editar/:id', professorController.updateProfessor);

// Rota para desativar um professor
router.put('/desativar/:id', professorController.desativarProfessor);

// Rota para reativar um professor
router.put('/reativar/:id', professorController.reativarProfessor);

// Rota para pesquisar professores
router.get('/pesquisar', professorController.pesquisarProfessores);

module.exports = router;
