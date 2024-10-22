const express = require('express'); 
const router = express.Router();
const ProfessorController = require('../controllers/ProfessorController');
const VwProfessoresController = require('../controllers/VwProfessoresController'); // Importando o controller da view

// Rota para obter todos os professores (tabela Professores)
router.get('/', ProfessorController.getAllProfessores);

// Rota para obter os professores através da view vw_Professores
router.get('/view', VwProfessoresController.getAllFromView);  // Nova rota para a view

// Rota para criar um novo professor
router.post('/', ProfessorController.createProfessor);

// Rota para atualizar um professor existente
router.put('/:id', ProfessorController.updateProfessor);

// Rota para excluir um professor
router.delete('/:id', ProfessorController.deleteProfessor);

module.exports = router;
